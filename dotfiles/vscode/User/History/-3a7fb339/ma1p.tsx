import Document, { Head, Html, Main, NextScript } from 'next/document';

function AddScript(props) {
  const { children, ...rest } = props;
  return (
    <script
      {...(children && { dangerouslySetInnerHTML: { __html: children } })}
      {...rest}
    />
  );
}

const cypressIsOn = typeof window !== 'undefined' && window['Cypress'];

interface Props {
  segmentKey: string;
  noTrackers?: boolean;
}

function PrefetchDomains() {
  if (process.env.NODE_ENV !== 'production') {
    return <></>;
  }

  return (
    <>
      <link rel="dns-prefetch" href="https://ouraring.imgix.net" />
      <link rel="dns-prefetch" href="https://api.ecom.ouraring.com" />
      <link rel="dns-prefetch" href="https://cdn.segment.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
    </>
  );
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx) {
    // if (ctx.req) {
    //     Device.setUserAgent(ctx.req.headers["user-agent"]);
    // }

    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        // useful for wrapping the whole react tree
        enhanceApp: (App) => App,

        // useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps` using `ctx` that now includes our custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      noTrackers: ctx.asPath.indexOf('notrackers') !== -1,
    };
  }

  render() {
    const enableTrackers = !this.props.noTrackers;

    return (
      <Html>
        <Head>
          <PrefetchDomains />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta
            name="msapplication-config"
            content="/favicon/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
          {enableTrackers && !cypressIsOn && (
            <AddScript
              dangerouslySetInnerHTML={{
                __html: `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware"];analytics.factory=function(t){return function(){var     e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";          
            }}();`,
              }}
            />
          )}

          <AddScript
            async
            dangerouslySetInnerHTML={{
              __html: ` _affirm_config = {
                 public_api_key: "${process.env.AFFIRM_KEY}",
                 script:"${process.env.AFFIRM_JS_LIBRARY}"
               };
              (function(m,g,n,d,a,e,h,c){var b=m[n]||{},k=document.createElement(e),p=document.getElementsByTagName(e)[0],l=function(a,b,c){return function(){a[b]._.push([c,arguments])}};b[d]=l(b,d,"set");var f=b[d];b[a]={};b[a]._=[];f._=[];b._=[];b[a][h]=l(b,a,h);b[c]=function(){b._.push([h,arguments])};a=0;for(c="set add save post open empty reset on off trigger ready setProduct".split(" ");a<c.length;a++)f[c[a]]=l(b,d,c[a]);a=0;for(c=["get","token","url","items"];a<c.length;a++)f[c[a]]=function(){};k.async=
              !0;k.src=g[e];p.parentNode.insertBefore(k,p);delete g[e];f(g);m[n]=b})(window,_affirm_config,"affirm","checkout","ui","script","ready","jsReady");`,
            }}
          />

          {/* <link rel="stylesheet" href="/css/fonts.css" /> */}
          {/* <style
            dangerouslySetInnerHTML={{
              __html: `
                @font-face {
                  font-family: 'AkkuratLL';
                  src: url('/fonts/AkkuratLL-Regular.woff2') format('woff2'),
                    url('/fonts/AkkuratLL-Regular.woff') format('woff');
                  font-weight: 400;
                }

                @font-face {
                  font-family: 'AkkuratLL';
                  src: url('/fonts/AkkuratLL-Light.woff2') format('woff2'),
                    url('/fonts/AkkuratLL-Light.woff') format('woff');
                  font-weight: 300;
                }
            `,
            }}
          /> */}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
