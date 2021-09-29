import Head from "next/head";
import React from "react";
import { SecondHeader } from "../components/header/SecondHeader";
import { LoginPage } from "../components/organisms/main/LoginPage";

export default function login() {
  ///////// JSXエリア /////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham ログイン/新規登録</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ヘッダー */}
      <SecondHeader />

      {/* メインページ */}
      <LoginPage />
    </div>
  );
}
