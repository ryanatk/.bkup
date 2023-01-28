import { LokaliseApi } from '@lokalise/node-api';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import JSZip from 'jszip';
import path from 'path';
import prettier from 'prettier';
dotenv.config();

async function saveLocalizationFiles() {
  const baseLocalizationPath = path.join('public', 'locales');

  const { files } = await fetchLocales();
  const data = await getLanguagesData(files);

  await saveLocalizationJsonFiles(data, baseLocalizationPath);
  await saveLocalizationSetupCode(data, baseLocalizationPath);
}

saveLocalizationFiles().catch((err) => {
  console.error('Error saving localization files from Lokalise', err);
});

function getEnvVariables() {
  const apiKey = process.env.LOKALISE_PROJECT_API_KEY;
  const projectID = process.env.LOKALISE_PROJECT_ID;
  if (!apiKey || !projectID) {
    throw new Error(
      `Missing environment Variable for Lokalize. Check that LOKALISE_PROJECT_API_KEY
     and LOKALISE_PROJECT_ID are provided`,
    );
  }
  return {
    apiKey,
    projectID,
  };
}

async function fetchLocales() {
  const { projectID, apiKey } = getEnvVariables();
  const lokaliseApi = new LokaliseApi({ apiKey });

  const lokalise = await lokaliseApi.files.download(projectID, {
    format: 'json',
    original_filenames: false,
    export_empty_as: 'base',
    replace_breaks: false,
  });

  const response = await axios.get(lokalise.bundle_url, {
    responseType: 'arraybuffer',
  });

  return new JSZip().loadAsync(response.data);
}

interface LanguageData {
  language: string;
  dataInBytes: Buffer;
}

async function getLanguagesData(
  files: Record<string, JSZip.JSZipObject>,
): Promise<LanguageData[]> {
  return await Promise.all(
    Object.values(files)
      .filter((f) => !f.dir)
      .map(async (file) => {
        return {
          language: extractLanguageFromFileName(file.name),
          dataInBytes: await file.async('nodebuffer'),
        };
      }),
  );
}

function extractLanguageFromFileName(localePath: string) {
  // e.g Input: 'locale/fi.json'
  // Output: "fi"
  const extractedLocale = localePath.match(/\/(.*)\.json/)?.pop();

  if (!extractedLocale) {
    throw new Error('unable to extract language from file name');
  }

  // Convert compound locale (e.g: en_AU) to en-AU
  return extractedLocale.split('_').join('-');
}

async function saveLocalizationJsonFiles(
  languagesData: LanguageData[],
  baseLocalizationPath: string,
) {
  const data = await languagesData;
  const localePath = path.join(baseLocalizationPath, 'locale');

  fs.rmdirSync(localePath, { recursive: true });
  fs.mkdirSync(localePath, { recursive: true });

  data.forEach(({ language, dataInBytes }) => {
    const localeMessagesPath = path.join(localePath, `${language}.json`);
    fs.writeFileSync(localeMessagesPath, dataInBytes);
    fs.appendFileSync(localeMessagesPath, '\r\n');
  });
}

async function saveLocalizationSetupCode(
  languages: LanguageData[],
  baseLocalizationPath: string,
) {
  const englishData = languages.filter(({ language }) => language === 'en')[0];
  const messageKey = Object.keys(parseBufferToObject(englishData.dataInBytes));
  const setupPath = path.join(baseLocalizationPath, 'setup.ts');

  const typescriptFile = `
            // DO NOT EDIT!!! This file is auto-generated.

           export const LOCALES_SUPPORTED = [${languages
             .map(({ language }) => `'${language}'`)
             .join(', ')}, 'eu', 'us'] as const;
           export const LOCALE_DEFAULT: LocaleSupported = 'en';
           
           export async function getMessagesForLocale(locale: LocaleSupported = LOCALE_DEFAULT) {
             switch (locale) {
               ${languages
                 .map(
                   ({ language }) =>
                     `case '${language}': \n return import('./locale/${language}.json');`,
                 )
                 .join('\n')}
	       case 'eu': return import('./locale/en.json'); 
               case 'us': return import('./locale/en.json'); 
	       default:
                 throw new Error("Language not supported");
                }
              }
              
            export type LocaleSupported = typeof LOCALES_SUPPORTED[number];

            export type MessageKey = ${messageKey
              .map((k) => `'${k}'`)
              .join(' | ')};
              
            interface PluralObject {
              one: string;
              other: string;
            }

            export type LocaleMessagesJson = Record<MessageKey, string | PluralObject>;
        `;

  // Format the file contents before writing
  const prettierOptions = await prettier.resolveConfig(setupPath);
  fs.writeFileSync(
    setupPath,
    prettier.format(typescriptFile, {
      ...prettierOptions,
      parser: 'typescript',
    }),
  );
}

function parseBufferToObject(data: Buffer) {
  const dataBytes = new Uint8Array(data);
  const dataStr = new TextDecoder().decode(dataBytes);
  return JSON.parse(dataStr);
}
