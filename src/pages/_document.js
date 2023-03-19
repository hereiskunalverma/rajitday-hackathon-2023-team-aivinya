import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { Html, Head, Main, NextScript } from 'next/document';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="title" content="Aivinya for Education - Empowering Education with AI" />
          <meta name="description" content="Empowering Education with AI" />
          <meta
            name="keywords"
            content="ai, marketing, education empower solutions, aivinya, content-write, ai-conten-writer, content writing, writing, email marketing, email automation, ai-aivinya, aivinya tech dev, aivinya ai content writer, aivinya marketing platform, aivinya ai marketing plaform"
          />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <meta name="revisit-after" content="1 days" />
          <meta itemProp="name" content="aivinya.education" />
          <meta name="application-name" content="aivinya.education" />
          <meta itemProp="description" content="Empowering Education with AI" />
          <meta
            itemProp="image"
            content="https://pbs.twimg.com/profile_banners/1567443458817949696/1662710110/1080x360"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Aivinya for Education - Empowering Education with AI"
          />
          <meta property="og:description" content="Empowering Education with AI" />
          <meta
            property="og:image"
            content="https://pbs.twimg.com/profile_banners/1567443458817949696/1662710110/1080x360"
          />
          <meta property="og:url" content="https://aivinya.education" />
          <meta property="og:site_name" content="aivinya.education" />
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:site" content="https://twitter.com/aivinya" />
          <meta property="twitter:title" content="Empowering Education with AI" />
          <meta property="twitter:description" content="Empowering Education with AI" />
          <meta
            property="instagram:image"
            content="https://pbs.twimg.com/profile_banners/1567443458817949696/1662710110/1080x360"
          />
          <meta property="instagram:url" content="https://www.instagram.com/aivinya_official/" />
          <link rel="canonical" href="https://aivinya.education" />
          <link rel="alternate" href="https://aivinya.education" hrefLang="x-default" />
          <link rel="shortcut icon" href="/img/logo_withoutname.png" />
          <link rel="apple-touch-icon-precomposed" href="/img/logo_withoutname.png" />
          <link rel="shortcut icon" href="/img/logo_withoutname.png" />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
