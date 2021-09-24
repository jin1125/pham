import { Emoji } from "emoji-mart";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { auth, db, storage } from "../../firebase";
import { UserContext } from "../../UserContext";
import ConnectModal from "../../components/organisms/modal/ConnectModal";

export default function mypage() {
  const { userId, setUserId } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [displayName, setDisplayName] = useState("");
  const [demoImg, setDemoImg] = useState("");
  const [demoImgs, setDemoImgs] = useState("");
  const [phMatch, setPhMatch] = useState([]);
  const [phMatchA, setPhMatchA] = useState([]);
  const [phMatchB, setPhMatchB] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const url = await storage.ref().child("demo_img.png").getDownloadURL();
      const Url = await storage.ref().child("demo_imgs.jpeg").getDownloadURL();
      if (isMounted) {
        setDemoImg(url);
        setDemoImgs(Url);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setDisplayName(user.displayName);
      } else {
        Router.push("/login");
      }
    });

    return () => unSub();
  }, []);

  useEffect(() => {
    if (userId) {
      const unSub = db
        .collection("userProfiles")
        .doc(userId)
        .onSnapshot((doc) => {
          if (doc.data()) {
            setProfile(doc.data());
          }
        });
      return () => unSub();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      let unSub = db
        .collection("phMatch")
        .where("pharmacistA", "==", userId)
        .where("requestB", "==", true)
        .onSnapshot((snapshot) => {
          const user = snapshot.docs.map((doc) => doc.data().pharmacistB);
          setPhMatchA([...user]);
        });

      return () => unSub();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      let unSub = db
        .collection("phMatch")
        .where("pharmacistB", "==", userId)
        .where("requestB", "==", true)
        .onSnapshot((snapshot) => {
          const user = snapshot.docs.map((doc) => doc.data().pharmacistA);
          setPhMatchB([...user]);
        });

      return () => unSub();
    }
  }, [userId]);

  useEffect(() => {
    if (phMatchA && phMatchB) {
      setPhMatch([...phMatchA, ...phMatchB]);
    }
  }, [phMatchA, phMatchB]);

  const {
    birthPlace,
    certification,
    comments,
    dobDD,
    dobMM,
    dobYY,
    dream,
    experiences,
    freeImageUrl0,
    freeImageUrl1,
    freeImageUrl2,
    hobby,
    homeAddress,
    jobTitle,
    language,
    profileImageUrl,
    resumes,
    school,
    scout,
    strongArea,
    subjectArea,
    userName,
  } = profile;

  const connect =()=>{
    setIsOpen(true)
  }

  ////////////////////////// JSXエリア //////////////////////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham マイページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConnectModal isOpen={isOpen} setIsOpen={setIsOpen} />

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
              <p className="text-base">{`${phMatch.length}人`}</p>
              <button
                  className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-1 px-2 mx-2 rounded-full shadow-lg text-xs"
                  onClick={connect}
                >
                  リクエスト
                </button>
            </div>

            {scout && (
              <div className="flex flex-row flex-wrap mt-5 mb-10 justify-center gap-1 items-center">
                <Emoji emoji="female-detective" size={20} />
                <p className="text-base">{scout}</p>
              </div>
            )}

            {freeImageUrl0 ? (
              <div className="mr-2 my-5">
                <Image
                  className="inline object-cover transform hover:scale-150 transition duration-300"
                  width={200}
                  height={200}
                  src={freeImageUrl0}
                  alt="Free image0"
                />
              </div>
            ) : (
              demoImgs && (
                <div className="mr-2 my-5">
                  <Image
                    className="inline object-cover"
                    width={200}
                    height={200}
                    src={demoImgs}
                    alt="Free image0"
                  />
                </div>
              )
            )}
            {freeImageUrl1 ? (
              <div className="mr-2 my-5">
                <Image
                  className="inline object-cover transform hover:scale-150 transition duration-300"
                  width={200}
                  height={200}
                  src={freeImageUrl1}
                  alt="Free image1"
                />
              </div>
            ) : (
              demoImgs && (
                <div className="mr-2 my-5">
                  <Image
                    className="inline object-cover"
                    width={200}
                    height={200}
                    src={demoImgs}
                    alt="Free image1"
                  />
                </div>
              )
            )}
            {freeImageUrl2 ? (
              <div className="mr-2 my-5">
                <Image
                  className="inline object-cover transform hover:scale-150 transition duration-300"
                  width={200}
                  height={200}
                  src={freeImageUrl2}
                  alt="Free image2"
                />
              </div>
            ) : (
              demoImgs && (
                <div className="mr-2 my-5">
                  <Image
                    className="inline object-cover"
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
                {userName ? (
                  <h2 className="text-4xl font-bold">{userName}</h2>
                ) : (
                  <h2 className="text-4xl font-bold">{displayName}</h2>
                )}
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
                  <p className="text-base">{homeAddress.slice(3)}</p>
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

            {experiences && experiences[0].experience && (
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

            {resumes && resumes[0].companyName && (
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
