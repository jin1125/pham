import Head from "next/head";
import React from "react";
import { Layout } from "../../components/layout/Layout";
import { EditPage } from "../../components/organisms/main/edit/EditPage";

export default function edit() {


  ////////////////// JSXエリア //////////////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham プロフィール変更</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <EditPage/>
      </Layout>
    </div>
  );
}
