import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  TypographyH2 as H2,
  TypographyH3 as H3,
  TypographyH3List as H3List,
} from '../../../components/pages/privacy-policy-oura-health/Typography';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  BodyLink,
  Box,
  Footer,
  Header,
  List,
  ListItem,
  PageContainer,
  Typography,
  TypographyRhythm,
} from '../../../components/sormus';
import pageStyles from '../PrivacyPolicyOuraHealth.module.scss';

const PrivacyPolicyOuraHealth = () => {
  const accordionWrapper = useRef(null);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);

  const handleAccordionClick = (e: any, index: number) => {
    setActiveAccordionIndex(index);
    e.preventDefault();
  };

  const handleAccordionChange = (index: number) => {
    setActiveAccordionIndex(index);

    if (window && accordionWrapper.current) {
      window.scrollTo({
        top: accordionWrapper.current.offsetTop - 105, // TODO: Use header ref from ECOMM-1270
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="tailwind">
      <div className="bg-white" lang="jp">
        <Header bordered />
        <PageContainer name="privacy-policy-oura-health-jp" padding="both">
          <Box className={`max-w-3xl ${pageStyles.PrivacyPolicyOuraHealth}`}>
            <TypographyRhythm>
              <Typography Element="h1" variant="super">
                Ouraプライバシーステートメント
              </Typography>
              <H2>このプライバシー・ステートメントについて</H2>
              <Typography>
                Ouraでは、お客様の個人データの保護に真剣に取り組んでいます。このプライバシーステートメントは、Oura
                Health OyおよびOuraring
                Inc.(以下、総称して「Oura」)による個人データの処理に適用されます。
              </Typography>
              <Typography>
                Ouraリングのような当社の製品は、お客様のライフスタイルの選択と睡眠の質を追跡することを可能にします。私たちは、このようなデータは非常に個人的なものではあると理解しており、お客様の個人データの保護は、私たちにとって最も重要なことです。このステートメントをよくお読みください。
              </Typography>
              <H2>Ouraはお客様の個人データを処理する理由</H2>
              <Typography>
                以下のセクションの見出しを開いて、当社が収集および処理する個人データのカテゴリーと、お客様が当社のウェブサイトを訪問した際にサービスを提供するため、当社のサイトで購入を行うため、リングやアプリを使用するためなど、当社が収集および処理する理由を説明します。また、お客様のデータを処理するための当社の法的根拠、および当社のデータソースに関する情報も記載されています。
              </Typography>
              <div
                className={pageStyles.AccordionWrapper}
                ref={accordionWrapper}
              >
                <Accordion
                  openAtIndex={activeAccordionIndex}
                  icon={<ArrowDownwardIcon className="text-helsinkiBlue" />}
                  onChange={handleAccordionChange}
                >
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      デバイスとアプリケーションユーザー
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="device-application-section">
                      <Typography
                        Element="h1"
                        variant="heading"
                        className="sr-only"
                      >
                        デバイスとアプリケーションユーザー
                      </Typography>
                      <H2>処理目的</H2>
                      <Typography>
                        Ouraは、デバイス＆アプリケーションユーザー（以下「ユーザー」といいます）の個人情報を以下の目的でのみ収集・処理します。
                      </Typography>
                      <List type="ul">
                        <ListItem>
                          <H3List>Ouraサービスの提供のため</H3List>
                          <Typography>
                            当社は、Ouraのサービスやアプリの機能を提供するために個人データを処理します。例えば、お客様のコンディション、睡眠、アクティビティに関する毎日の洞察を提供するためです。
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>お客様へのサービス提供のため</H3List>
                          <Typography>
                            当社は、顧客サービスの提供および顧客とのコミュニケーションの管理を目的として個人データを処理します。お客様がアプリのデータに関する質問で当社のサポートに連絡した場合、当社は提供された情報をお客様の質問への回答およびお客様が抱える問題の解決のために使用することがあります。
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>当社の製品やサービスを開発するため</H3List>
                          <Typography>
                            当社は、Ouraアプリなど、当社のサービスや機能を向上させるために、お客様のOuraリングおよびプラットフォームの利用に関するデータを処理します。可能な限り、仮名化された、集約された、または個人を特定できないデータのみを使用してこれを行います。
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>当社の製品やサービスを販売するため</H3List>
                          <Typography>
                            当社は、オンライン広告およびOuraのマーケティングコミュニケーションを提供するために、マーケティング関連データを処理します。
                            例えば、当社のCookieポリシー
                            <Link href="/cookie-policy">
                              <BodyLink color="inherit">Cookie Policy</BodyLink>
                            </Link>
                            で詳しく説明されているように、当社は、オンライン広告のターゲットとなる視聴者を作成するために、当社のウェブサイトでCookieを使用しています。
                            お客様はいつでもマーケティング情報の配信を停止することができます。また、お客様がニュースレターの配信を希望された場合にのみ、ニュースレターをお届けします。
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            サードパーティとの統合を可能にするため
                          </H3List>
                          <Typography>
                            当社は、研究パートナーなどの特定のサードパーティとのデータ共有を希望するユーザーにデータを提供するためにデータを処理します。これは、お客様の明示的な同意があって初めて行われるものです。
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>法的義務を遵守するため</H3List>
                          <Typography>
                            場合によっては、適用される法律や規制によって必要とされる場合に、特定のデータを処理しなければなりません。このような法的義務は、例えば、会計・税務上の要求、法的請求、その他の法的目的に関連するものです。
                          </Typography>
                        </ListItem>
                      </List>
                      <H2>処理の法的根拠</H2>
                      <Typography>
                        欧州のデータ保護法では、欧州経済地域の居住者から個人情報を収集・保持する際に、「合法的根拠」が必要とされています。お客様のデータを処理するための当社の合法的根拠は、以下を含む特定の処理目的によって異なります。
                      </Typography>
                      <Typography>
                        <strong>契約:</strong>{' '}
                        Ouraのサービスを提供する目的で個人データを処理する場合、お客様がアカウントを作成し、当社の利用規約に同意することで成立するユーザー契約に基づいて処理します。
                      </Typography>
                      <Typography>
                        <strong>同意:</strong>{' '}
                        当社は、お客様の同意を得てのみ、お客様の健康関連データを処理します。
                        場合によっては、メモに健康データを挿入したり、Ouraアプリで健康関連のタグを追加したりするなど、お客様の行動を通じて、お客様のデータ処理に対する同意を当社に提供することができます。
                      </Typography>
                      <Typography>
                        <strong>正当な利益:</strong>{' '}
                        当社は、当社の製品およびサービスのマーケティング、当社の顧客サービスの提供、当社の製品およびサービスの改善を目的として、当社の正当な利益に基づいてお客様の個人データを処理します。当社の正当な利益に基づいてお客様のデータを使用することを選択する場合、当社は、適用される法律に準拠して、当社自身の利益とお客様のプライバシー権を慎重に比較検討します。
                      </Typography>
                      <Typography>
                        <strong>法的義務:</strong>{' '}
                        Ouraは、各国で異なる法的義務を遵守するために、特定の情報を処理する必要があります。例えば、そのような義務は、消費者保護や税法に関連するものです。
                      </Typography>
                      <H2>加工データとデータソース</H2>
                      <Typography>
                        ほとんどの場合、Ouraは、お客様がアカウントを登録したり、Oura
                        ringのトラッキング機能を使って測定データを収集したりするときなどに、お客様から直接個人データを収集します。また、お客様が当社に提供した情報から生成されたデータを処理することもあります。
                      </Typography>
                      <Typography>
                        Ouraは、デバイスおよびアプリケーションのユーザーに関する以下の個人データカテゴリーを処理します。
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          メールアドレスや住所などの<strong>連絡先情報</strong>
                        </ListItem>
                        <ListItem>
                          性別、身長・体重、ユーザーIDなどの
                          <strong>ユーザー情報</strong>
                          、およびお客様が当社に提供したお客様自身またはお客様のアカウントに関するその他の情報
                        </ListItem>
                        <ListItem>
                          IPアドレスや位置情報などの
                          <strong>デバイス情報</strong>
                        </ListItem>
                        <ListItem>
                          アクティビティ、メモ、タグなどの
                          <strong>
                            ユーザーのアクティビティやコンテキスト情報
                          </strong>
                        </ListItem>
                        <ListItem>
                          心拍数、動作データ、温度データなどの
                          <strong>計測データ</strong>
                        </ListItem>
                        <ListItem>
                          睡眠段階（深睡眠、浅睡眠、レム睡眠、覚醒）、1日のアクティビティレベル、コンディションレベル、肥満度（身長と体重に基づいて算出）など、
                          <strong>
                            ユーザー、睡眠、アクティビティデータを算出。
                          </strong>
                        </ListItem>
                      </List>
                      <Typography>
                        なお、当社が処理する個人データの中には、お客様の健康に関するデータを含め、特別な個人データまたはセンシティブな個人データとみなされるものがありますので、ご注意ください。適用される法律に基づき、このようなデータは、お客様が処理に同意した場合にのみ処理されます。お客様がOuraのロケーションベースのサービスにアクセスまたは使用した場合（アプリを通じてGPSベースのアクティビティトラッキングを有効にした場合など）、Ouraは、サービスがアクティブである間、お客様のデバイスのおおよそのまたは正確な位置情報を処理することがあります。このデータは、お客様のデバイスのサービスプロバイダーのネットワークID、GPS、および/またはWi-Fiデータを介して取得される場合があります。Ouraは、まずお客様の同意を得ることなく、このような位置情報データを処理することはありません。お客様は、お客様のデバイスの位置情報許可設定を使用して、いつでもこのような位置情報処理を無効にすることができます。
                      </Typography>
                    </section>
                  </AccordionContent>
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      オンラインストアのお客様とウェブサイトの訪問者
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="website-online-store-section">
                      <Typography
                        Element="h1"
                        variant="heading"
                        className="sr-only"
                      >
                        オンラインストアのお客様とウェブサイトの訪問者
                      </Typography>
                      <H2>処理目的</H2>
                      <Typography>
                        お客様がOuraのウェブサイトにアクセスする場合、またはOuraのオンラインストアで注文を完了する場合、当社は以下の目的で個人データを処理します。
                      </Typography>
                      <List type="ul">
                        <ListItem>
                          <H3List>
                            お客様のご注文を完了し、お届けするため
                          </H3List>
                          <Typography>
                            当社は、お客様のご購入を処理、取り扱い、お届けするために個人データを処理し、お客様のお買い物を円滑にします。
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>お客様へのサービス提供のため</H3List>
                          <Typography>
                            当社は、カスタマーサービスの提供とお客様とのコミュニケーションの管理を目的として、個人データを処理します。お客様がOura
                            ringや当社のサービスに関する質問で当社のサポートに連絡された場合、当社は提供された情報をお客様の質問に答えるために使用し、お客様が抱えている問題を解決するために使用します。
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>当社のサービスを開発・改善するため</H3List>
                          <Typography>
                            当社は、当社のオンラインサービスの質を向上させるために、訪問者の当社サイトの利用に関する情報を処理します。これには、当社のウェブサイトおよびオンラインストアにおけるウェブ統計およびトレンドの利用が含まれる場合があります。可能な限り、集約され匿名化されたデータのみを使用してこれを行います。
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>当社のサービスを宣伝・販売するため</H3List>
                          <Typography>
                            当社は、オンライン広告およびOuraのマーケティングコミュニケーションを提供するために、マーケティングデータを処理します。
                            Ouraは、Ouraアプリ内の健康データに基づいてオンライン広告のターゲットにすることはありません。当社のCookieポリシー
                            <Link href="/cookie-policy">
                              <BodyLink color="inherit">Cookie Policy</BodyLink>
                            </Link>
                            で詳しく説明されているように、当社は、オンライン広告のターゲットとなる視聴者を作成するために、当社のウェブサイトでCookieを使用しています。お客様はいつでもマーケティング情報の配信を停止することができます。また、お客様がニュースレターの配信を希望された場合にのみ、ニュースレターをお届けします。
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>法的義務を遵守するため</H3List>
                          <Typography>
                            適用される法律で要求される場合には、特定のデータを処理しなければならない場合があります。このような法的義務は、例えば、会計・税務上の要求、法的請求、その他の法的目的に関連するものです。
                          </Typography>
                        </ListItem>
                      </List>
                      <H2>処理の法的根拠</H2>
                      <Typography>
                        欧州のデータ保護法では、欧州経済地域の居住者から個人情報を収集・保持する際に、「合法的根拠」が必要とされています。お客様のデータを処理するための当社の合法的根拠は、以下を含む特定の処理目的によって異なります。
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>契約:</strong>{' '}
                          お客様の購入品を取り扱い、お届けするために個人情報を処理する際、当社は、お客様が注文する際に生じるユーザー契約という法的根拠に依拠しています。
                        </ListItem>
                        <ListItem>
                          <strong>同意:</strong>{' '}
                          当社は、お客様が同意した場合、電子的なダイレクトマーケティングの目的でお客様の個人データを処理します。
                        </ListItem>
                        <ListItem>
                          <strong>正当な利益:</strong>{' '}
                          カスタマーサービス、マーケティング、製品開発のためにお客様の個人情報を処理する場合、当社は、当社の事業を運営、維持、発展させ、顧客関係を構築、維持するという当社の正当な利益に基づいてこれを行います。当社の正当な利益に基づいてお客様のデータを使用することを選択する場合、当社は、当社自身の利益と適用法に基づくお客様のプライバシーの権利とを慎重に比較検討します。
                        </ListItem>
                        <ListItem>
                          <strong>法的義務:</strong>{' '}
                          Ouraは、各国で異なる法的義務を遵守するために、特定の情報を処理する必要があります。例えば、そのような義務は、消費者保護や会計に関する法律に関連するものです。
                        </ListItem>
                      </List>
                      <H2>加工データとデータソース</H2>
                      <Typography>
                        ほとんどの場合、当社は、お客様が当社のオンラインストアで注文を完了することを選択した場合、または質問や苦情を当社に連絡する場合に、お客様から直接個人データを収集します。お客様がOuraのウェブサイトやオンラインストアにアクセスされると、サービス開発や広告の目的で、お客様のデバイスやブラウザを介して、Cookieやその他のさまざまな技術により、お客様の分析データを収集します。
                      </Typography>
                      <Typography>
                        当社は、ウェブサイトおよびオンラインストアの訪問者に関する以下の個人データカテゴリーを処理します。
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          氏名、メールアドレス、住所などの
                          <strong>連絡先情報</strong>
                        </ListItem>
                        <ListItem>
                          購入した商品や選択した支払方法などの<strong></strong>
                        </ListItem>
                        <ListItem>
                          IPアドレス、訪問時間、位置情報などの
                          <strong>デバイス情報</strong>
                        </ListItem>
                        <ListItem>
                          サイトでの閲覧パターンなどの
                          <strong>ユーザーのアクティビティ</strong>
                          、およびお客様が当社と交わしたコミュニケーション。
                        </ListItem>
                      </List>
                    </section>
                  </AccordionContent>
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      カリフォルニア州在住者
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="ccpa-notice-for-californian-consumers-section">
                      <Typography Element="h1" className="sr-only">
                        カリフォルニア州在住者
                      </Typography>
                      <H2>カリフォルニア州の消費者のためのCCPA通知</H2>
                      <Typography>
                        本通知は、Ouraおよびその子会社（以下、総称して「当社」）の本プライバシーステートメントに含まれる情報を補足するものであり、カリフォルニア州に居住するすべての訪問者、ユーザー、その他の人々（以下、「お客様」または「お客様」）で、OuraのウェブサイトまたはOuraが提供するサービスにアクセスする人にのみ適用されます。当社は、2018年カリフォルニア州消費者プライバシー法（以下「CCPA」）を遵守するために本通知を採用しており、CCPAで定義されている用語は、本通知で使用される場合も同じ意味を持ちます。
                      </Typography>
                      <H2>情報の収集、使用、共有</H2>
                      <Typography>
                        お客様がOuraの製品および／またはサービスと相互に作用する場合、Ouraは、特定の消費者または機器を識別、関連、説明、参照、関連付けることが合理的に可能な、または直接的または間接的に関連付けることが合理的に可能な情報（「個人情報」）を収集します
                      </Typography>
                      <Typography>
                        当社が収集する個人情報のカテゴリー、お客様の個人情報の処理目的、およびお客様の個人情報の共有に関する情報は、上記の本プライバシーステートメントの関連セクションに記載されています。
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          <a
                            href="#device-application-section"
                            onClick={(e) => handleAccordionClick(e, 1)}
                          >
                            デバイスおよびアプリケーションのユーザー：収集した個人情報のカテゴリーと処理目的
                          </a>
                        </ListItem>
                        <ListItem>
                          <a
                            href="#website-online-store-section"
                            onClick={(e) => handleAccordionClick(e, 3)}
                          >
                            オンラインストアおよびウェブサイトの訪問者：収集した個人情報のカテゴリーと処理目的
                          </a>
                        </ListItem>
                        <ListItem>
                          <a href="#data-sharing-and-disclosures-section">
                            個人情報の共有
                          </a>
                        </ListItem>
                      </List>
                      <Typography>
                        過去12ヶ月間、当社はデータアグリゲーターを含むサードパーティに個人情報を販売していません。
                      </Typography>
                      <H2>カリフォルニア州の消費者の権利</H2>
                      <Typography>
                        お客様がカリフォルニア州にお住まいの場合、お客様はCCPAに基づき一定の権利を有します。
                      </Typography>
                      <H3>当社が収集・共有する個人情報について知る権利</H3>
                      <Typography>
                        CCPAは、過去12ヶ月間に当社が収集したお客様の個人情報の開示を要求する権利をお客様に与えており、当社はお客様の要求を受領して検証した後に開示します。検証可能な消費者の要求を受け取り、確認した後、当社はお客様に開示します。
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          当社が収集したお客様の個人情報のカテゴリー。
                        </ListItem>
                        <ListItem>
                          当社が開示したお客様の個人情報のカテゴリー（ある場合）。
                        </ListItem>
                        <ListItem>
                          当社が収集したお客様の個人情報の情報源のカテゴリー。
                        </ListItem>
                        <ListItem>
                          その個人情報を収集または販売するための当社の事業または商業目的。
                        </ListItem>
                        <ListItem>
                          当社がその個人情報を共有するサードパーティのカテゴリー、および
                        </ListItem>
                        <ListItem>
                          当社が収集したお客様の個人情報の具体的内容。CCPAは当社が以下を行うことを禁止していることに注意してください。
                        </ListItem>
                      </List>
                      <H3>削除権</H3>
                      <Typography>
                        お客様は、当社が当該データを保持する法的義務がある場合など、一定の例外を除き、お客様の個人情報の消去を要求する権利があります。当社は、お客様のご要望を受領し、検証した後、お客様の個人情報を削除するとともに、例外に該当しない限り、当社のサービスプロバイダーにお客様の個人情報を削除するよう指示します。
                      </Typography>
                      <H3>開示、アクセス、削除の要求方法</H3>
                      <Typography>
                        お客様がカリフォルニア州の住民である場合、お客様は、検証可能な消費者要求を当社に提出することにより、上記のような個人情報の開示、アクセス、および、または削除を要求することができます。
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          <strong>dataprotection@ouraring.com</strong>
                          までメールでお問い合わせください。その際、お客様の氏名、会社名（該当する場合）、住所、メールアドレス、電話番号などの情報を一緒にご記入ください。本人確認のために必要な場合は、追加情報の提供をお願いすることがあります。これはセキュリティのためであり、場合によっては法律で要求されることもあります。
                        </ListItem>
                      </List>
                      <Typography>
                        お客様の個人情報に関する検証可能な要求は、お客様ご本人、またはお客様が代理で行動することを認めたCalifornia
                        Secretary of
                        Stateに登録されている方のみが行うことができます。また、未成年の子供のために、検証可能な消費者請求を行うこともできます。
                      </Typography>
                      <Typography>
                        お客様は、12ヶ月間に2回まで無料で請求することができます。有効なリクエストには、当社が延長を要請しない限り、リクエストを受け取ってから45日以内に回答します。お客様のご要望にお応えするために延長が合理的に必要な場合は、最初の45日間の期間内にその旨をお客様に通知します。
                      </Typography>
                      <H3>非差別</H3>
                      <Typography>
                        Ouraは、CCPAに基づくプライバシー権の行使を要求するユーザーを差別しません。これには、例外的に適用される場合を除き、以下を行わないという旨も含まれます。
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          商品やサービスの提供を拒否すること。
                        </ListItem>
                        <ListItem>
                          商品やサービスについて、お客様に異なる価格や料金を請求すること（割引やその他の特典の付与、または違約金の賦課を含む）。
                        </ListItem>
                        <ListItem>
                          異なるレベルまたは品質の商品またはサービスを提供すること、または
                        </ListItem>
                        <ListItem>
                          商品やサービスに対して異なる価格や料金、または商品やサービスの異なるレベルや品質を受け取る可能性があることを示唆すること。
                        </ListItem>
                      </List>
                    </section>
                  </AccordionContent>
                </Accordion>
              </div>
              <section id="data-sharing-and-disclosures-section">
                <Typography Element="h1" variant="heading">
                  データの共有と開示
                </Typography>
                <H2>個人情報の共有</H2>
                <Typography>
                  Ouraは、お客様の個人情報を販売したり貸し出したりすることはなく、お客様にサービスを提供したり事業を運営したりするために、信頼できる特定のサービスプロバイダーとのみお客様の個人データを共有します。当社がサードパーティのサービスプロバイダーとデータを共有する場合、当社は、サードパーティがお客様の情報を、当社が承認した目的および本プライバシーステートメントで説明されている限定的な理由でのみ使用することを要求します。また、これらのサービスプロバイダーに対しても、少なくとも当社と同じ基準でお客様の個人情報を保護することを求めています。
                </Typography>
                <Typography>
                  多くの企業と同様に、Ouraは以下のような目的でサービスプロバイダーを利用しています。
                </Typography>
                <List type="ul" condensed>
                  <ListItem>
                    当社のオンラインサービスプラットフォームの提供および改善。
                  </ListItem>
                  <ListItem>ユーザーのデータを保存します。</ListItem>
                  <ListItem>顧客サービスの提供。</ListItem>
                  <ListItem>
                    当社のマーケティング活動を管理・運営するため。Ouraは、マーケティングの分析と最適化を目的として、ウェブサイトの利用データを広告ネットワークパートナーとのみ共有しています。Ouraは、Ouraアプリのデータをサードパーティの広告主と共有しません）、および
                  </ListItem>
                  <ListItem>
                    当社のサービス品質を向上させるために、当社のオンラインサービスの利用に関する情報を分析すること。
                  </ListItem>
                </List>
                <Typography>
                  Ouraは、個人データを主に、それが収集された地域内で保存します。個人データが収集された地域以外で処理される場合、当社は、適用されるプライバシー法に基づき、適切な保護手段でお客様の個人データが保護されることを常に確認します。また、業界標準のデータ保護手段を用いて、サービスプロバイダーとのデータ保護契約により、個人データのすべての国際転送を保護しています。
                </Typography>
                <H2>個人情報の開示について</H2>
                <Typography>
                  また、当社は、以下のような特定の状況下で個人情報を開示する権利を有します。
                </Typography>
                <List type="ul" condensed>
                  <ListItem>お客様の明示的な同意がある場合:</ListItem>
                  <ListItem>
                    合併、買収、売却の際など、当社の事業を行う上で当社の正当な利益のために合理的に必要とされる場合。
                  </ListItem>
                  <ListItem>
                    Ouraの法的権利および財産を保護するため、および
                  </ListItem>
                  <ListItem>法律または法執行機関に従うため。</ListItem>
                </List>
                <Typography>
                  それ以外の場合、お客様の個人情報が個人や他の組織と共有されることはありません。
                </Typography>
                <H2>お客様のデータの保護</H2>
                <Typography>
                  Ouraは、お客様のデータを安全かつセキュアに保つために、技術的および組織的なセーフガードを使用しています。必要に応じて、これらの保護措置には、当社が処理するデータを保護するための、個人データの匿名化または偽名化、厳格なアクセス制御、および暗号化の使用などの措置が含まれます。
                </Typography>
                <Typography>
                  また、個人データが適用法上の義務と一致した内部ポリシーに従ってのみ処理されるよう、スタッフに適切なトレーニングを受けさせています。また、お客様のセンシティブな個人データへのアクセスは、そのようなアクセスを特に許可された担当者に限定しています。
                </Typography>
                <Typography>
                  OuraオンラインストアやOura on the
                  Webなど、当社が提供するオンラインサービスでは、暗号化やその他のセキュリティ手段を用いて、転送中のお客様の個人データを保護しています。
                  また、当社のサービス、システム、その他の資産について、セキュリティ上の脆弱性の可能性がないかどうかを定期的にテストしています。
                </Typography>
                <Typography>
                  Ouraアプリとリングのファームウェアを定期的に更新しています。お客様のデータを最大限に保護するために、常に最新版のアプリとファームウェアをインストールすることをお勧めします。
                </Typography>
                <H2>データ保持</H2>
                <Typography>
                  お客様の個人データの保存期間は、通常、お客様のOuraアカウントのライフサイクルの期間に依存します。お客様の個人データは、当初収集された目的のために必要とされなくなった時点で削除されます。ただし、当社がデータをより長期間保持する法的義務を負っている場合はこの限りではありません。例えば、お客様の睡眠、コンディション、アクティビティに関する測定データは、お客様のOuraアカウントが有効である限り、保存されます。
                </Typography>
                <Typography>
                  また、Ouraは、税務上の目的などのために、特定の個人データを一定期間保持する法的義務を負っています。これらの必要な保存期間には、例えば、会計や税務上の要求、法的な請求、またはその他の法的な目的が含まれる場合があります。なお、個人情報の義務的な保存期間は、関連する法律によって異なります。
                </Typography>
                <Typography>
                  ご希望の方は、<strong>dataprotection@ouraring.com</strong>{' '}
                  にご連絡いただくことで、お客様のOuraアカウントの削除をご依頼いただけます。
                </Typography>
                <H2>Cookieの使用</H2>
                <Typography>
                  当社は、お客様が当社サイトをご利用になる際に、分析情報やその他の情報を収集・保存したり、パーソナライズや広告の目的で、Cookieやその他のさまざまな技術を使用しています。当社が使用するCookieには、ファーストパーティーCookieとサードパーティーCookieがあります。
                </Typography>
                <Typography>
                  Cookieとは、お客様のデバイスに送信・保存される小さなテキストファイルで、これにより、当社のウェブサイトの訪問者を識別し、当社のサイトの利用を容易にするとともに、訪問者の集計情報を作成することができます。これは、当社のサービスを改善し、お客様により良いサービスを提供するためのもので、お客様のデバイスやファイルに害を及ぼすことはありません。当社は、お客様の個々の関心事に応じて、当社サイトおよび当社が提供する情報を調整するためにCookieを使用しています。また、Cookieは、お客様の閲覧傾向を追跡したり、当社のサイトおよびお客様が訪問する他のサイトの両方で、広告をターゲットにして最適化するためにも使用されます。また、ソーシャルメディアのアカウントをウェブサイトに統合するためにもCookieを使用しています。
                </Typography>
                <H2>データ対象者としてのお客様の権利</H2>
                <Typography>
                  Ouraがお客様のデータを処理するときはいつでも、お客様はご自身の個人データの処理方法を管理できる一定の権利を有しています。このセクションでは、それぞれの権利についての情報を提供します。データ対象者としての権利の行使を希望される場合は、その旨を
                  <strong>dataprotection@ouraring.com</strong>
                  までご連絡ください。
                </Typography>
                <H3>データアクセス権</H3>
                <Typography>
                  お客様は、ご自身についてどのような個人データが処理されているかを知る権利があります。
                  お客様は、当社がお客様について収集した個人データへのアクセスを要求するために当社に連絡することができます。当社は、お客様のデータを処理しているかどうかを確認し、当社がお客様について収集し処理した個人データに関する情報をお客様に提供します。
                </Typography>
                <Typography>
                  なお、Ouraアプリを使用することで、当社が処理するお客様の睡眠、コンディション、アクティビティのデータに簡単にアクセスすることができます。また、
                  <a
                    href="https://cloud.ouraring.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Oura on Web
                  </a>
                  からもお客様のデータにアクセスできます。
                </Typography>
                <H3>削除権</H3>
                <Typography>
                  お客様は、特定の状況において、ご自身の個人データの削除を要求する権利を有しています。当社は、データを保存する正当な法的根拠または法的義務がない限り、このような要求に応じます。
                </Typography>
                <H3>修正権（不正確なデータの修正）</H3>
                <Typography>
                  お客様は、当社がお客様について保存している不正確または不完全な個人情報の修正を要求する権利があります。
                </Typography>
                <Typography>
                  なお、お客様の基本情報の一部は、OuraアプリやOura on
                  Webで修正・更新することができます。
                </Typography>
                <H3>データポータビリティー権 </H3>
                <Typography>
                  お客様は、お客様が当社に提供した個人情報を、構造化された一般的に使用される形式で受け取ることを要求する権利があります。データポータビリティの権利は、契約やお客様の同意など、特定の理由でお客様の個人データを処理する場合にのみ適用されます。
                </Typography>
                <Typography>
                  なお、Oura on
                  Webでは、お客様のデータをエクスポートする機能があります。
                </Typography>
                <H3>処理に対する異議申し立ての権利</H3>
                <Typography>
                  お客様は、特定の状況下において、ご自身の個人データの処理に異議を唱える権利を有しています。このような個人データの処理を継続する正当な理由がない場合、当社は、お客様の異議申し立てを受領し確認した後、お客様の個人データの処理を中止します。また、お客様には、ダイレクトマーケティングを目的とした個人情報の処理に対して、いつでも異議を唱える権利があります。
                </Typography>
                <H3>処理を制限する権利</H3>
                <Typography>
                  お客様には、特定の状況下でお客様の個人データの処理を制限するよう要請する権利があります。例えば、お客様がご自身のデータの正確性に異議を唱える場合、Ouraがお客様のデータの正確性を検証するまではお客様のデータを処理しないという制限要求を行うことができます。
                </Typography>
                <H3>同意を撤回する権利</H3>
                <Typography>
                  当社がお客様の個人データを処理するためにお客様の同意を求めた場合、お客様はいつでも当該処理に対する同意を撤回する権利を有します。ただし、同意を撤回すると、お客様がOuraのサービスを十分に利用できなくなる問題や制限が生じる可能性があります。
                </Typography>
                <Typography>
                  なお、お客様は、当社からのメールに記載されている「購読停止」リンクを使用することにより、当社のニュースレターやその他のマーケティング用メールの受信をいつでも停止することができますので、ご了承ください。
                </Typography>
                <Typography>
                  Ouraは、お客様のプライバシーに関する懸念に対応するよう努めています。お客様が問題についてOuraに連絡した後、Ouraの対応に不満がある場合、適用される法律に従って、お客様はお客様の問題について地域の監督機関に連絡することができます。ただし、問題をエスカレーションする前に、より迅速に問題を解決するために、まず
                  <strong>dataprotection@ouraring.com</strong>
                  にご連絡ください。
                </Typography>
                <Typography>
                  お客様がカリフォルニア州にお住まいの場合は、カリフォルニア州法に基づくお客様の権利について、OuraのCCPAプライバシー通知をお読みください。
                </Typography>
                <H2>管理者連絡先</H2>
                <Typography>
                  Ouraring
                  Inc.は、マーケティング目的で処理されたユーザーの個人データのデータ管理者です。その他のすべての処理目的で処理される個人データの管理者は、Oura
                  Health Oyです。お問い合わせ先は以下の通りです。
                </Typography>
                <H3>Oura Health Oy</H3>
                <Typography>
                  住所: Elektroniikkatie 10, 90590 Oulu Finland
                </Typography>
                <Typography>
                  データ保護責任者: <strong>dataprotection@ouraring.com</strong>
                </Typography>
                <H3>Ouraring Inc.</H3>
                <Typography>
                  住所: 415 Mission Street, 37th Floor San Francisco, CA 94105
                  United States
                </Typography>
                <Typography>
                  データ保護責任者: <strong>dataprotection@ouraring.com</strong>
                </Typography>
              </section>

              <H2>本プライバシーポリシーの変更</H2>
              <Typography>
                このプライバシー・ステートメントは、
                <strong>2021年9月15日</strong>
                の時点で有効です。当社は、独自の判断により本ポリシーを随時更新する権利を留保しますが、更新する場合には、重要な変更について、ウェブサイト上で通知するか、メールまたはプッシュ通知を送信することにより、お客様にお知らせします。変更後もお客様がOuraのサービスを継続してご利用になる場合、お客様がそのような変更に同意されたことになります。
              </Typography>
            </TypographyRhythm>
          </Box>
        </PageContainer>
        <Footer />
      </div>
    </div>
  );
};

PrivacyPolicyOuraHealth.pageName = 'Oura Health Privacy Policy';
PrivacyPolicyOuraHealth.isSormusCompatible = true;

export default PrivacyPolicyOuraHealth;
