// IMPORTANT: ensure /svg/design-tokens directory exists before running this extraction

import dotenv from 'dotenv';
import * as Figma from 'figma-js';
import fs from 'fs';
import https from 'https';

dotenv.config();

const TOKEN = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
const FILE_ID = process.env.FIGMA_DESIGN_TOKEN_FILE_ID;

const figma = Figma.Client({
  personalAccessToken: TOKEN,
});

export const exportIcons = async () => {
  const response = await figma.file(FILE_ID);
  const canvases = response.data.document.children as Figma.Canvas[];

  function getCanvas(name: string) {
    const canvas = canvases.find((canvas) => canvas.name === name);
    if (!canvas) {
      throw new Error(`No canvas found: "${name}"`);
    }
    return canvas;
  }

  const getIcons = async (canvas: Figma.Canvas) => {
    const frames = canvas.children.filter(
      (child) => child.type === 'FRAME',
    ) as Figma.Frame[];
    const frame = frames.find((f) => f.name === 'Icons');
    const nodes = frame?.children;

    if (!nodes) {
      throw new Error("Couldn't find icons nodes");
    }

    const svgFiles = await figma.fileImages(FILE_ID, {
      ids: nodes.map((node) => node.id),
      format: 'svg',
      use_absolute_bounds: true,
    });

    const svgImages = svgFiles.data.images;

    Object.values(svgImages).map((image, index) => {
      const iconName = nodes[index].name;
      const iconSlug =
        iconName &&
        iconName
          .match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
          )
          .map((x) => x.toLowerCase())
          .join('_');
      const filePath = `./svg/design-tokens/${iconSlug}.svg`;
      const file = fs.createWriteStream(filePath);
      file
        .on('open', () => {
          console.log(`Downloading Icon ${iconSlug}`);
          https.get(image, (res) => res.pipe(file));
        })
        .on('end', () => {
          file.end();
        });
    });
  };

  await getIcons(getCanvas('👀  Iconography'));
};

exportIcons();
