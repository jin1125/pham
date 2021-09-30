import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ja" prefix="og: http://ogp.me/ns#">
        <Head>
          <meta name="description" content="薬局薬剤師さんのお仕事SNSです。" />
          <meta property="og:url" content="https://pham.vercel.app/" />
          <meta property="og:title" content="Pham" />
          <meta property="og:type" content="website" />
          <meta property="og:description" content="薬局薬剤師さんのお仕事SNS" />
          <meta property="og:image" content="/ogp.png" />
          <meta property="og:site_name" content="Pham" />
          <meta property="og:locale" content="ja_JP" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Noto+Sans+JP:wght@400;700&display=swap"
            rel="stylesheet"
          ></link>
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
