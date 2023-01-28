import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import tw from 'twin.macro';
import { t } from '../../../public/locales/LocaleContext';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  BodyLink,
  Grid,
  Typography,
} from '../../sormus';

interface FAQQuestionProps {
  children: ReactElement;
}

interface FAQAnswerProps {
  children: ReactElement;
}

const FAQQuestionWrapper = tw.div`
  py-3
  border-t
  border-white
  border-opacity-25
  md:(py-10)
`;

const FAQQuestionText = tw(Typography)`
  font-bold
  text-sm
  md:(text-xl)
`;

const FAQQuestion = ({ children }: FAQQuestionProps) => {
  return (
    <FAQQuestionWrapper>
      <FAQQuestionText Element="h3" variant="body" color="inherit">
        {children}
      </FAQQuestionText>
    </FAQQuestionWrapper>
  );
};

const FAQAnswerWrapper = tw.div`
  pb-3
  md:(pb-10)
`;

const FAQAnswerText = tw(Typography)`
  text-xs
  md:(text-xl)
`;

const FAQAnswer = ({ children }: FAQAnswerProps) => {
  return (
    <FAQAnswerWrapper>
      <FAQAnswerText color="inherit">{children}</FAQAnswerText>
    </FAQAnswerWrapper>
  );
};

const Section = tw.section`
  bg-helsinkiBlue-dark
  py-20
  text-white
  md:(py-24)
`;

const SectionInner = tw.div`
  col-main
  md:(col-start-3 col-end-13)
`;

const Title = tw(Typography)`
  mb-6
  md:(mb-10)
`;

const AccordionWrapper = tw.div`
  border-b
  border-white
  border-opacity-25
`;

export const MembershipFAQ = (): JSX.Element => {
  const oneMonthEnabled = checkFeatureFlag('one-month-free-membership');

  return (
    <Section>
      <Grid>
        <SectionInner>
          <Title Element="h2" variant="h3" color="inherit">
            {t('membership_faq_title')}
          </Title>
          <AccordionWrapper>
            <Accordion
              openAtIndex={1}
              icon={<ArrowDownwardIcon className="text-inherit" />}
            >
              <AccordionHeader>
                <FAQQuestion>{t('membership_faq_question_1')}</FAQQuestion>
              </AccordionHeader>
              <AccordionContent>
                <FAQAnswer>{t('membership_faq_answer_1')}</FAQAnswer>
              </AccordionContent>
              <AccordionHeader>
                <FAQQuestion>{t('membership_faq_question_2')}</FAQQuestion>
              </AccordionHeader>
              <AccordionContent>
                <FAQAnswer>{t('membership_faq_answer_2')}</FAQAnswer>
              </AccordionContent>
              <AccordionHeader>
                <FAQQuestion>{t('membership_faq_question_3')}</FAQQuestion>
              </AccordionHeader>
              <AccordionContent>
                <FAQAnswer>
                  {t('membership_faq_answer_3', {
                    myAccountLink: (
                      <Link href="/my-account" passHref>
                        <BodyLink color="inherit">
                          {t('footer_my_account')}
                        </BodyLink>
                      </Link>
                    ),
                  })}
                </FAQAnswer>
              </AccordionContent>
              <AccordionHeader>
                <FAQQuestion>{t('membership_faq_question_4')}</FAQQuestion>
              </AccordionHeader>
              <AccordionContent>
                <FAQAnswer>{t('membership_faq_answer_4')}</FAQAnswer>
              </AccordionContent>
              <AccordionHeader>
                <FAQQuestion>{t('membership_faq_question_5')}</FAQQuestion>
              </AccordionHeader>
              <AccordionContent>
                <FAQAnswer>
                  {t('membership_faq_answer_5', {
                    privacyPolicyLink: (
                      <Link href="/privacy-policy" passHref>
                        <BodyLink color="inherit">
                          {t('footer_privacy_policy')}
                        </BodyLink>
                      </Link>
                    ),
                    ouraOnTheWebLink: (
                      <BodyLink
                        color="inherit"
                        href="https://cloud.ouraring.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('footer_oura_on_the_web')}
                      </BodyLink>
                    ),
                  })}
                </FAQAnswer>
              </AccordionContent>
              <AccordionHeader>
                <FAQQuestion>{t('membership_faq_question_6')}</FAQQuestion>
              </AccordionHeader>
              <AccordionContent>
                <FAQAnswer>
                  {oneMonthEnabled
                    ? t('membership_faq_answer_6_onemonth')
                    : t('membership_faq_answer_6')}
                </FAQAnswer>
              </AccordionContent>
              <AccordionHeader>
                <FAQQuestion>{t('membership_faq_question_7')}</FAQQuestion>
              </AccordionHeader>
              <AccordionContent>
                <FAQAnswer>{t('membership_faq_answer_7')}</FAQAnswer>
              </AccordionContent>
            </Accordion>
          </AccordionWrapper>
        </SectionInner>
      </Grid>
    </Section>
  );
};

export default MembershipFAQ;
