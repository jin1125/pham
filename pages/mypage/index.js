import Router from "next/router";
import React, { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { auth } from "../../firebase";
import { UserContext } from "../../UserContext";
import Image from 'next/image'

export default function mypage() {
  const { userId, userName, profileImageSrc, demoImg } =
    useContext(UserContext);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && Router.push("/login");
    });
    return () => unSub();
  }, []);


  return (
    <Layout>
      <div className="grid grid-cols-6">
        <div className="col-span-1">
          {profileImageSrc ? (
            <Image
            className="inline object-cover mr-2 rounded-full"
            width={300} height={300}
            src={profileImageSrc}
            alt="Profile image"
          />
          ) : (
            demoImg && (
              <Image
                className="inline object-cover mr-2 rounded-full"
                width={300} height={300}
                src={demoImg}
                alt="Profile image"
              />
            )
          )}
        </div>

        <div className="col-span-5">{userName}</div>
      </div>

      {userId}
    </Layout>
  );
}
