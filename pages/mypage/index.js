import { Emoji } from "emoji-mart";
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
    connection,
    jobOffer,
  } = useContext(UserContext);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && Router.push("/login");
    });
    return () => unSub();
  }, []);

  // console.log(jobTitle);
  // console.log(homeAddress);
  // console.log(dobYY);
  // console.log(dobMM);
  // console.log(dobDD);
  // console.log(school);
  // console.log(birthPlace);
  // console.log(language);
  // console.log(comments);
  // console.log(hobby);
  // console.log(dream);
  // console.log(certification);
  // console.log(strongArea);
  // console.log(subjectArea);
  // console.log(connection,jobOffer);

  // console.log(yearsOfExperience);
  // console.log(resume);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham マイページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="grid grid-cols-12 gap-10 m-10">
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
        

            {connection || connection === 0 ? (
              <div className="flex flex-row flex-wrap my-5 justify-center gap-1 items-center">
              <Emoji emoji="handshake" size={20} />
              <p className="text-base">{`${connection}人`}</p>
            </div>
            ) : (
              demoImg && (
                <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="handshake" size={20} />
              <p className="text-base"> -- 人</p>
            </div>
              )
            )}
          </div>

          <div className="col-span-9">
            <div className="flex flex-row flex-wrap items-end my-10 gap-8">
              <div>
                <h2 className="text-4xl font-bold">{userName}</h2>
              </div>

              {jobTitle && (
                <div>
                  <p className="text-xl font-bold text-blue-400">{jobTitle}</p>
                </div>
              )}
            </div>

            <div className="flex flex-row flex-wrap items-center my-3 gap-1 leading-none">
              <Emoji emoji="id" size={20} />
              <p className="text-base">{userId}</p>
            </div>

            <div className="flex flex-row flex-wrap my-5 gap-6 leading-none">
              {homeAddress && (
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="round_pushpin" size={20} />
                  <p className="text-base">{homeAddress}</p>
                </div>
              )}

              {dobYY && dobMM && dobDD && (
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="birthday" size={20} />
                  <p className="text-base">{`${dobYY}/${dobMM}/${dobDD}`}</p>
                </div>
              )}

              {school && (
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="school" size={20} />
                  <p className="text-base">{school}</p>
                </div>
              )}

              {birthPlace && (
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="baby" size={20} />
                  <p className="text-base">{birthPlace}</p>
                </div>
              )}

              {language && (
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="speaking_head_in_silhouette" size={20} />
                  <p className="text-base">{language}</p>
                </div>
              )}
            </div>

            {comments && (
              <div className="flex flex-row flex-wrap my-12 items-center whitespace-pre-wrap">
                <p className="text-base">{comments}</p>
              </div>
            )}

            {hobby && (
              <div className="my-10">
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="camping" size={20} />
                  <p className="text-base font-bold">趣味</p>
                </div>
                <p className="text-base">{hobby}</p>
              </div>
            )}

            {dream && (
              <div className="my-10">
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="thought_balloon" size={20} />
                  <p className="text-base font-bold">将来の夢</p>
                </div>
                <p className="text-base">{dream}</p>
              </div>
            )}

            {certification && (
              <div className="my-10">
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="pencil2" size={20} />
                  <p className="text-base font-bold">資格</p>
                </div>
                <p className="text-base">{certification}</p>
              </div>
            )}

            {strongArea && (
              <div className="my-10">
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="muscle" size={20} />
                  <p className="text-base font-bold">得意な業務</p>
                </div>
                <p className="text-base">{strongArea}</p>
              </div>
            )}

            {subjectArea && (
              <div className="my-10">
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="hourglass_flowing_sand" size={20} />
                  <p className="text-base font-bold">経験科目</p>
                </div>
                <p className="text-base">{subjectArea}</p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}
