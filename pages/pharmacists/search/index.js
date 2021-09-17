import Head from "next/head";
import React, { useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import Search from "../../../components/search/Search";
import { auth } from "../../../firebase";
import Router from "next/router";



export default  function profiles() {
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (!user) {
        Router.push("/login");
      }
    });
    return () => unSub();
  }, []);
  
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham 薬剤師検索</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Search/>
      </Layout>
    </div>
  );
}
