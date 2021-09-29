import Head from "next/head";
import React, { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Mypage } from "../../components/organisms/main/mypage/Mypage";
import ConnectModal from "../../components/organisms/modal/ConnectModal";

export default function mypage() {
  ///////// 関数エリア /////////
  const [isOpen, setIsOpen] = useState<boolean>(false);

  ///////// JSXエリア /////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham マイページ</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* つながりリクエスト確認モーダル */}
      <ConnectModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <Layout>
        {/* メインページ */}
        <Mypage setIsOpen={setIsOpen} />
      </Layout>
    </div>
  );
}
