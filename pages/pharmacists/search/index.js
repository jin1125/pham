import Head from "next/head";
import React, { useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import Search from "../../../components/search/Search";
import { auth } from "../../../firebase";
import Router from "next/router";



export default  function profiles() {
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && Router.push("/login");
    });
    return () => unSub();
  }, []);
  
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham 薬剤師検索結果</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Search appId={'0TMIYQ8E9N'} searchKey={'58e6e394abd7a5cfcc6fcae0d7b51ac5'} title={'薬剤師検索'} name={"名前"} address={"住所"}/>
      </Layout>
    </div>
  );
}
