import Head from "next/head";
import React from "react";
import { SecondHeader } from "../../components/header/SecondHeader";
import { RecruitPage } from "../../components/organisms/main/RecruitPage";

export default function recruit() {
  

  ////////////////////////// JSXエリア //////////////////////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham 採用担当様お問い合わせ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SecondHeader/>
      
      <RecruitPage/>  
    </div>
  );
}
