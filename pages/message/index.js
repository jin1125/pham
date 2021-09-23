import Head from "next/head";
import React, { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { SearchCoMsg } from "../../components/search/SearchCoMsg";
import { SearchMsg } from "../../components/search/SearchMsg";

export default function message() {
  // const [changeMsg, setChangeMsg] = useState("ph");
  ////////////////////////// JSXエリア //////////////////////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham メッセージ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {/* {changeMsg === "ph" && <SearchMsg setChangeMsg={setChangeMsg} />}

        {changeMsg === "co" && <SearchCoMsg setChangeMsg={setChangeMsg} />} */}
        <SearchMsg/>
      </Layout>
    </div>
  );
}
