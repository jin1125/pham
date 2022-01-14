import Head from "next/head";
import React from "react";
import { FormHeader } from "../../components/organisms/header/FormHeader";
import { RecruiterPage } from "../../components/organisms/main/recruiter/RecruiterPage";

export default function recruiter() {
  ///////// JSXエリア /////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham 採用担当者様お問い合わせ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ヘッダー */}
      <FormHeader />

      {/* メインページ */}
      <RecruiterPage />
    </div>
  );
}
