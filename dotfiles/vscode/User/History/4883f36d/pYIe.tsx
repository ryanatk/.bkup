import { ReactElement } from 'react';
import {
  Grid,
  PageContainer,
  PageLayout,
  Typography,
  TypographyRhythm,
} from '../../../components/sormus';
import { privacyPolicyOuraHealth } from '../../../data-mock/page-details/privacy-policy-oura-health';
import Heading from './Heading';
import LI from './LI';
import P from './P';
import tx from './tx';

const PrivacyPolicyOuraHealth = (): ReactElement => {
  return (
    <PageLayout seoParams={privacyPolicyOuraHealth.seoParams}>
      <PageContainer name="privacy-policy-oura-health">
        <Grid>
          <TypographyRhythm className="col-main lg:col-start-3 lg:col-end-13">
            <Typography Element="h1" variant="h1" className="mb-4">
              {tx('privacy_policy_oh_title')}
            </Typography>

            <Typography weight="bold" className="mb-8">
              {tx('privacy_policy_oh_updated')}
            </Typography>

            {/* ABOUT THIS PRIVACY POLICY */}
            <Heading
              level="I" // I
              tx="privacy_policy_oh_about_heading"
            >
              <P tx="privacy_policy_oh_about_p1" />
              <P tx="privacy_policy_oh_about_p2" />
            </Heading>

            {/* WHY DOES OURA PROCESS YOUR PERSONAL DATA? */}
            <Heading
              level="I" // II
              tx="privacy_policy_oh_personal_heading"
            >
              <P tx="privacy_policy_oh_personal_p1" />

              <Heading
                level="A" // II.A
                tx="privacy_policy_oh_personal_device_heading"
                id="device-application-section"
              >
                <Heading
                  level="i" // II.A.i
                  tx="privacy_policy_oh_personal_device_purposes_heading"
                />
                <P tx="privacy_policy_oh_personal_device_purposes_p1" />

                <ol>
                  <LI tx="privacy_policy_oh_personal_device_purposes_item1" />
                  <LI tx="privacy_policy_oh_personal_device_purposes_item2" />
                  <LI tx="privacy_policy_oh_personal_device_purposes_item3" />
                  <LI tx="privacy_policy_oh_personal_device_purposes_item4" />
                  <LI tx="privacy_policy_oh_personal_device_purposes_item5" />
                  <LI tx="privacy_policy_oh_personal_device_purposes_item6" />
                </ol>

                <Heading
                  level="i" // II.A.ii
                  tx="privacy_policy_oh_personal_device_basis_heading"
                />
                <P tx="privacy_policy_oh_personal_device_basis_p1" />

                <ol>
                  <LI tx="privacy_policy_oh_personal_device_basis_item1" />
                  <LI tx="privacy_policy_oh_personal_device_basis_item2" />
                  <LI tx="privacy_policy_oh_personal_device_basis_item3" />
                  <LI tx="privacy_policy_oh_personal_device_basis_item4" />
                </ol>

                <Heading
                  level="i" // II.A.iii
                  tx="privacy_policy_oh_personal_device_source_heading"
                />
                <P tx="privacy_policy_oh_personal_device_source_p1" />
                <P tx="privacy_policy_oh_personal_device_source_p2" />

                <ol>
                  <LI tx="privacy_policy_oh_personal_device_source_item1" />
                  <LI tx="privacy_policy_oh_personal_device_source_item2" />
                  <LI tx="privacy_policy_oh_personal_device_source_item3" />
                  <LI tx="privacy_policy_oh_personal_device_source_item4" />
                  <LI tx="privacy_policy_oh_personal_device_source_item5" />
                  <LI tx="privacy_policy_oh_personal_device_source_item6" />
                </ol>

                <P tx="privacy_policy_oh_personal_device_source_p3" />
              </Heading>

              <Heading
                level="A" // II.B
                tx="privacy_policy_oh_personal_store_heading"
                id="website-online-store-section"
              >
                <Heading
                  level="i" // II.B.i
                  tx="privacy_policy_oh_personal_store_purposes_heading"
                />

                <P tx="privacy_policy_oh_personal_store_purposes_p1" />
                <ol>
                  <LI tx="privacy_policy_oh_personal_store_purposes_item1" />
                  <LI tx="privacy_policy_oh_personal_store_purposes_item2" />
                  <LI tx="privacy_policy_oh_personal_store_purposes_item3" />
                  <LI tx="privacy_policy_oh_personal_store_purposes_item4" />
                  <LI tx="privacy_policy_oh_personal_store_purposes_item5" />
                  <LI tx="privacy_policy_oh_personal_store_purposes_item6" />
                </ol>

                <Heading
                  level="i" // II.B.ii
                  tx="privacy_policy_oh_personal_store_source_heading"
                />

                <P tx="privacy_policy_oh_personal_store_source_p1" />
                <ol>
                  <LI tx="privacy_policy_oh_personal_store_source_item1" />
                  <LI tx="privacy_policy_oh_personal_store_source_item2" />
                  <LI tx="privacy_policy_oh_personal_store_source_item3" />
                  <LI tx="privacy_policy_oh_personal_store_source_item4" />
                </ol>

                <Heading
                  level="i" // II.B.iii
                  tx="privacy_policy_oh_personal_store_source_heading"
                />

                <P tx="privacy_policy_oh_personal_store_source_p1" />
                <ol>
                  <LI tx="privacy_policy_oh_personal_store_source_item1" />
                  <LI tx="privacy_policy_oh_personal_store_source_item2" />
                  <LI tx="privacy_policy_oh_personal_store_source_item3" />
                  <LI tx="privacy_policy_oh_personal_store_source_item4" />
                </ol>
              </Heading>

              <Heading
                level="A" // II.C
                tx="privacy_policy_oh_personal_california_heading"
              >
                <Heading
                  level="i" // II.C.i
                  tx="privacy_policy_oh_personal_california_ccpa_heading"
                />
                <P tx="privacy_policy_oh_personal_california_ccpa_p1" />

                <Heading
                  level="i" // II.C.ii
                  tx="privacy_policy_oh_personal_california_info_heading"
                />
                <P tx="privacy_policy_oh_personal_california_info_p1" />

                <ol>
                  <LI
                    tx="privacy_policy_oh_personal_california_info_item1"
                    values={{
                      a(chunks: string[]) {
                        return (
                          <a
                            href="#device-application-section"
                            className="underline"
                          >
                            {chunks}
                          </a>
                        );
                      },
                    }}
                  />
                  <LI
                    tx="privacy_policy_oh_personal_california_info_item2"
                    values={{
                      a(chunks: string[]) {
                        return (
                          <a
                            href="#website-online-store-section"
                            className="underline"
                          >
                            {chunks}
                          </a>
                        );
                      },
                    }}
                  />
                  <LI
                    tx="privacy_policy_oh_personal_california_info_item3"
                    values={{
                      a(chunks: string[]) {
                        return (
                          <a
                            href="#data-sharing-and-disclosures-section"
                            className="underline"
                          >
                            {chunks}
                          </a>
                        );
                      },
                    }}
                  />
                </ol>

                <P tx="privacy_policy_oh_personal_california_info_p2" />

                <Heading
                  level="i" // II.C.iii
                  tx="privacy_policy_oh_personal_california_rights_heading"
                />
                <P tx="privacy_policy_oh_personal_california_rights_p1" />

                <ol>
                  <LI tx="privacy_policy_oh_personal_california_rights_know_heading">
                    <P tx="privacy_policy_oh_personal_california_rights_know_p1" />

                    <ol>
                      <LI
                        marker="circle"
                        tx="privacy_policy_oh_personal_california_rights_know_item1"
                      />
                      <LI
                        marker="circle"
                        tx="privacy_policy_oh_personal_california_rights_know_item2"
                      />
                      <LI
                        marker="circle"
                        tx="privacy_policy_oh_personal_california_rights_know_item3"
                      />
                      <LI
                        marker="circle"
                        tx="privacy_policy_oh_personal_california_rights_know_item4"
                      />
                      <LI
                        marker="circle"
                        tx="privacy_policy_oh_personal_california_rights_know_item5"
                      />
                      <LI
                        marker="circle"
                        tx="privacy_policy_oh_personal_california_rights_know_item6"
                      />
                    </ol>
                  </LI>

                  <LI tx="privacy_policy_oh_personal_california_rights_deletion_heading">
                    <P tx="privacy_policy_oh_personal_california_rights_deletion_p1" />
                  </LI>

                  <LI tx="privacy_policy_oh_personal_california_rights_requests_heading">
                    <P tx="privacy_policy_oh_personal_california_rights_request_p1" />

                    <div className="pl-8">
                      <P tx="privacy_policy_oh_personal_california_rights_request_detail_p1" />
                      <P tx="privacy_policy_oh_personal_california_rights_request_detail_p2" />
                      <P tx="privacy_policy_oh_personal_california_rights_request_detail_p3" />
                    </div>
                  </LI>

                  <LI tx="privacy_policy_oh_personal_california_rights_discrimination_heading">
                    <P tx="privacy_policy_oh_personal_california_rights_discrimination_p1" />

                    <ol>
                      <LI tx="privacy_policy_oh_personal_california_rights_discrimination_item1" />
                      <LI tx="privacy_policy_oh_personal_california_rights_discrimination_item2" />
                      <LI tx="privacy_policy_oh_personal_california_rights_discrimination_item3" />
                      <LI tx="privacy_policy_oh_personal_california_rights_discrimination_item4" />
                    </ol>
                  </LI>
                </ol>
              </Heading>

              <Heading
                level="A" // II.D
                tx="privacy_policy_oh_personal_data_heading"
                id="data-sharing-and-disclosures-section"
              >
                <Heading
                  level="i" // II.D.i
                  tx="privacy_policy_oh_personal_data_sharing_heading"
                />
                <P tx="privacy_policy_oh_personal_data_sharing_p1" />
                <P tx="privacy_policy_oh_personal_data_sharing_p2" />

                <ol>
                  <LI tx="privacy_policy_oh_personal_data_sharing_item1" />
                  <LI tx="privacy_policy_oh_personal_data_sharing_item2" />
                  <LI tx="privacy_policy_oh_personal_data_sharing_item3" />
                  <LI tx="privacy_policy_oh_personal_data_sharing_item4" />
                  <LI tx="privacy_policy_oh_personal_data_sharing_item5" />
                </ol>

                <P tx="privacy_policy_oh_personal_data_sharing_p3" />

                <Heading
                  level="i" // II.D.ii
                  tx="privacy_policy_oh_personal_data_disclosures_heading"
                />
                <P tx="privacy_policy_oh_personal_data_disclosures_p1" />

                <ol>
                  <LI tx="privacy_policy_oh_personal_data_disclosures_item1" />
                  <LI tx="privacy_policy_oh_personal_data_disclosures_item2" />
                  <LI tx="privacy_policy_oh_personal_data_disclosures_item3" />
                  <LI tx="privacy_policy_oh_personal_data_disclosures_item4" />
                </ol>

                <P tx="privacy_policy_oh_personal_data_disclosures_p2" />
              </Heading>
            </Heading>

            {/* SAFEGUARDING YOUR DATA */}
            <Heading
              level="I" // III
              tx="privacy_policy_oh_safeguarding_heading"
            />
            <P tx="privacy_policy_oh_safeguarding_p1" />
            <P tx="privacy_policy_oh_safeguarding_p2" />
            <P tx="privacy_policy_oh_safeguarding_p3" />
            <P tx="privacy_policy_oh_safeguarding_p4" />

            {/* DATA RETENTION */}
            <Heading
              level="I" // IV
              tx="privacy_policy_oh_retention_heading"
            />
            <P tx="privacy_policy_oh_retention_p1" />
            <P tx="privacy_policy_oh_retention_p2" />
            <P tx="privacy_policy_oh_retention_p3" />

            {/* USE OF COOKIES */}
            <Heading
              level="I" // V
              tx="privacy_policy_oh_cookies_heading"
            />
            <P tx="privacy_policy_oh_cookies_p1" />
            <P tx="privacy_policy_oh_cookies_p2" />
            <P tx="privacy_policy_oh_cookies_p3" />

            {/* YOUR RIGHTS AS A DATA SUBJECT */}
            <Heading
              level="I" // VI
              tx="privacy_policy_oh_rights_heading"
            />
            <P tx="privacy_policy_oh_rights_p1" />

            <ol>
              <LI tx="privacy_policy_oh_rights_item1">
                <P tx="privacy_policy_oh_rights_item1_p1" />
                <P tx="privacy_policy_oh_rights_item1_p2" 
                    values={{
                      a(chunks: string[]) {
                        return (
                          <a
                            href="https://cloud.ouraring.com"
                            className="underline"
                            target="_blank"
                          >
                            {chunks}
                          </a>
                        );
                      },
 />
              </LI>
              <LI tx="privacy_policy_oh_rights_item2">
                <P tx="privacy_policy_oh_rights_item1_p1" />
              </LI>
              <LI tx="privacy_policy_oh_rights_item3">
                <P tx="privacy_policy_oh_rights_item3_p1" />
              </LI>
              <LI tx="privacy_policy_oh_rights_item4">
                <P tx="privacy_policy_oh_rights_item4_p1" />
              </LI>
              <LI tx="privacy_policy_oh_rights_item5">
                <P tx="privacy_policy_oh_rights_item5_p1" />
              </LI>
              <LI tx="privacy_policy_oh_rights_item6">
                <P tx="privacy_policy_oh_rights_item6_p1" />
              </LI>
              <LI tx="privacy_policy_oh_rights_item7">
                <P tx="privacy_policy_oh_rights_item7_p1" />
                <P tx="privacy_policy_oh_rights_item7_p2" />
              </LI>
            </ol>

            <P tx="privacy_policy_oh_rights_p2" />
            <P tx="privacy_policy_oh_rights_p3" />

            {/* CONTROLLER CONTACT INFORMATION */}
            <Heading
              level="I" // VII
              tx="privacy_policy_oh_contact_heading"
            />
            <P tx="privacy_policy_oh_contact_p1" />
            <P tx="privacy_policy_oh_contact_p2" />
            <P tx="privacy_policy_oh_contact_p3" />

            {/* CHANGES TO THIS PRIVACY NOTICE */}
            <h2 className="text-uppercase">
              {tx('privacy_policy_oh_changes_heading')}
            </h2>
            <P tx="privacy_policy_oh_changes_p1" />
          </TypographyRhythm>
        </Grid>
      </PageContainer>
    </PageLayout>
  );
};

export default PrivacyPolicyOuraHealth;
