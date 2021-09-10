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
    profileImageUrl,
    freeImageUrl0,
    freeImageUrl1,
    freeImageUrl2,
    demoImg,
    demoImgs,
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
    connection,
    scout,
    experiences,
    resumes,
  } = useContext(UserContext);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && Router.push("/login");
    });
    return () => unSub();
  }, []);

  ////////////////////////// JSXエリア //////////////////////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham マイページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="grid grid-cols-12 gap-10 m-10">
          <div className="col-span-3 justify-self-center">
            {profileImageUrl ? (
              <Image
                className="inline object-cover mr-2 rounded-full"
                width={200}
                height={200}
                src={profileImageUrl}
                alt="Profile image"
              />
            ) : (
              demoImg && (
                <Image
                  className="inline object-cover mr-2 rounded-full"
                  width={200}
                  height={200}
                  src={demoImg}
                  alt="Profile image"
                />
              )
            )}

            <div className="flex flex-row flex-wrap my-5 justify-center gap-1 items-center">
              <Emoji emoji="handshake" size={20} />
              <p className="text-base">{`${connection}人`}</p>
            </div>

            <div className="flex flex-row flex-wrap mt-5 mb-10 justify-center gap-1 items-center">
              <Emoji emoji="female-detective" size={20} />
              <p className="text-base">{scout}</p>
            </div>

            {freeImageUrl0 ? (
              <div className='mr-2 my-5'>
                <Image
                  className="inline object-cover"
                  width={200}
                  height={200}
                  src={freeImageUrl0}
                  alt="Free image0"
                />
              </div>
            ) : (
              demoImgs && (
                <div className='mr-2 my-5'>
                <Image
                  className="inline object-cover mr-2 my-5"
                  width={200}
                  height={200}
                  src={demoImgs}
                  alt="Free image0"
                />
                </div>
              )
            )}
            {freeImageUrl1 ? (
              <div className='mr-2 my-5'>
                <Image
                  className="inline object-cover"
                  width={200}
                  height={200}
                  src={freeImageUrl1}
                  alt="Free image1"
                />
              </div>
            ) : (
              demoImgs && (
                <div className='mr-2 my-5'>
                <Image
                  className="inline object-cover mr-2 my-5"
                  width={200}
                  height={200}
                  src={demoImgs}
                  alt="Free image1"
                />
                </div>
              )
            )}
            {freeImageUrl2 ? (
              <div className='mr-2 my-5'>
                <Image
                  className="inline object-cover"
                  width={200}
                  height={200}
                  src={freeImageUrl2}
                  alt="Free image2"
                />
              </div>
            ) : (
              demoImgs && (
                <div className='mr-2 my-5'>
                <Image
                  className="inline object-cover mr-2 my-5"
                  width={200}
                  height={200}
                  src={demoImgs}
                  alt="Free image2"
                />
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
              {homeAddress ? (
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="round_pushpin" size={20} />
                  <p className="text-base">{homeAddress}</p>
                </div>
              ) : (
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <p className="text-2xl font-bold text-blue-400">
                    まずは、画面上部の <Emoji emoji="gear" size={30} />{" "}
                    からプロフィール情報を入力
                    <Emoji emoji="male_mage" size={50} />
                  </p>
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
                  <p className="text-base">{`${school} 卒業`}</p>
                </div>
              )}

              {birthPlace && (
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="baby" size={20} />
                  <p className="text-base">{`${birthPlace} 出身`}</p>
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
              <div className="my-12 whitespace-pre-wrap">
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
                  <Emoji emoji="pill" size={20} />
                  <p className="text-base font-bold">経験科目</p>
                </div>
                <p className="text-base">{subjectArea}</p>
              </div>
            )}

            {experiences[0] && experiences[0].experience && (
              <div className="my-10">
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="hourglass_flowing_sand" size={20} />
                  <p className="text-base font-bold">経験年数</p>
                </div>
                {experiences.map((ex, index) => (
                  <div key={index} className="grid grid-cols-2">
                    {ex.experience && (
                      <div>
                        <p className="text-base">{`${ex.experience}経験`}</p>
                      </div>
                    )}
                    {ex.years && (
                      <div>
                        <p className="text-base">{`${ex.years}年程度`}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {resumes[0] && resumes[0].companyName && (
              <div className="my-10">
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="page_facing_up" size={20} />
                  <p className="text-base font-bold">経歴詳細</p>
                </div>
                {resumes.map((re, index) => (
                  <div key={index} className="grid grid-cols-3">
                    <div>
                      <p className="text-base">{re.companyName}</p>
                    </div>
                    <div>
                      <p className="text-base">{re.employmentStatus}</p>
                    </div>
                    {re.workStart && re.workEnd && (
                      <div>
                        <p className="text-base">
                          {`${re.workStart} ~ ${re.workEnd}`}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}
