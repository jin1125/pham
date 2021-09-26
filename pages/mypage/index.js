import Head from "next/head";
import React, { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Mypage } from "../../components/organisms/main/Mypage/Mypage";
import ConnectModal from "../../components/organisms/modal/ConnectModal";

export default function mypage() {
  const [isOpen, setIsOpen] = useState(false);

  ////////////////////////// JSXエリア //////////////////////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham マイページ</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <ConnectModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <Layout>
        <Mypage setIsOpen={setIsOpen}/>
      </Layout>
    </div>
  );
}
