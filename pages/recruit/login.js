import Head from "next/head";
import React from "react";
import { SecondHeader } from "../../components/header/SecondHeader";
import { RecruitLoginPage } from "../../components/organisms/main/RecruitLoginPage";

export default function login() {
  

  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham 企業ログイン</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SecondHeader/>

      <RecruitLoginPage/>
    </div>
  );
}
