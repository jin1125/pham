import Head from "next/head";
import { TopHeader } from "../components/header/TopHeader";
import { FirstPage } from "../components/organisms/main/FirstPage";

export default function Lp() {
  ///////// JSXエリア /////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham トップページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ヘッダー */}
      <TopHeader />

      {/* メインページ */}
      <FirstPage />
    </div>
  );
}
