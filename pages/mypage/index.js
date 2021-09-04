import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import React, { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { auth } from "../../firebase";
import { UserContext } from "../../UserContext";

export default function mypage() {
  const {
    userId,
    userName,
    profileImageSrc,
    demoImg,
    jobTitle,
    homeAddress,
    dobYY,
    dobMM,
    dobDD,
    school,
    birthPlace,
    language,
    comments,
    hobby,
    dream,
    certification,
    strongArea,
    subjectArea,
    yearsOfExperience,
    resume,
  } = useContext(UserContext);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && Router.push("/login");
    });
    return () => unSub();
  }, []);

  console.log(jobTitle);
  console.log(homeAddress);
  console.log(dobYY);
  console.log(dobMM);
  console.log(dobDD);
  console.log(school);
  console.log(birthPlace);
  console.log(language);
  console.log(comments);
  console.log(hobby);
  console.log(dream);
  console.log(certification);
  console.log(strongArea);
  console.log(subjectArea);

  console.log(yearsOfExperience);
  console.log(resume);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham マイページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="grid grid-cols-12 gap-8 m-4">
          <div className="col-span-3 justify-self-center">
            {profileImageSrc ? (
              <Image
                className="inline object-cover mr-2 rounded-full"
                width={300}
                height={300}
                src={profileImageSrc}
                alt="Profile image"
              />
            ) : (
              demoImg && (
                <Image
                  className="inline object-cover mr-2 rounded-full"
                  width={300}
                  height={300}
                  src={demoImg}
                  alt="Profile image"
                />
              )
            )}
          </div>

          <div className="col-span-9">
            <div className="flex flex-row flex-wrap items-end">
              <div>
                <h2 className="text-4xl font-bold">{userName}</h2>
              </div>

              <div>
                <p className="text-xl font-bold ml-8 text-blue-400">
                  管理薬剤師
                </p>
              </div>
            </div>

            <div>
              <p className="text-base">{userId}</p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
