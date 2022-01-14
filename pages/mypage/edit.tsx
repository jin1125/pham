import Head from "next/head";
import React from "react";
import { EditPage } from "../../components/organisms/main/edit/EditPage";
import { Layout } from "../../components/templates/HeaderLayout";

export default function edit() {
  ///////// JSXエリア /////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham プロフィール変更</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {/* メインページ */}
        <EditPage />
      </Layout>
    </div>
  );
}
