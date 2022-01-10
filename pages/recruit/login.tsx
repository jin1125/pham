import Head from "next/head";
import React from "react";
import { FormHeader } from "../../components/header/FormHeader";
import { RecruitLoginPage } from "../../components/organisms/main/RecruitLoginPage";

export default function login() {
  ///////// JSXエリア /////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham 企業ログイン</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ヘッダー */}
      <FormHeader />

      {/* メインページ */}
      <RecruitLoginPage />
    </div>
  );
}
