import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { auth } from "../../firebase";
import { UserContext } from "../../UserContext";
import Router from "next/router";

export default function mypage() {
  const { userId,userName,userEmail } = useContext(UserContext);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && Router.push("/login");
    });
    return () => unSub();
  }, []);

  return (
    <>
      <Layout>
        {userId}
        {userName}
        {userEmail}
      </Layout>
    </>
  );
}
