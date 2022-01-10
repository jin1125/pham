import Head from "next/head";
import React from "react";
import { LoginHeader } from "../components/header/LoginHeader";
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
      <LoginHeader />

      {/* メインページ */}
      <LoginPage />
    </div>
  );
}
