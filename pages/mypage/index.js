import Router from "next/router";
import React, { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { auth } from "../../firebase";
import { UserContext } from "../../UserContext";

export default function mypage() {
  const { userId, userName, userEmail, profileImageSrc } =
    useContext(UserContext);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && Router.push("/login");
    });
    return () => unSub();
  }, []);

  return (
    <Layout>
      {profileImageSrc && (
        <img
          className="inline object-cover w-16 h-16 mr-2 rounded-full"
          src={profileImageSrc}
          alt="Profile image"
        />
      )}
      {userId}
      {userName}
      {userEmail}
    </Layout>
  );
}
