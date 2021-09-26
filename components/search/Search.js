import algoliasearch from "algoliasearch/lite";
import { Emoji } from "emoji-mart";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import { auth, db, storage } from "../../firebase";
import { UserContext } from "../../UserContext";
import { Address } from "../atoms/Address";
import { hitComponent } from "./HitComponent";
import { CustomSearchBox } from "./SearchBox";

export const Search = () => {
  const searchClient = algoliasearch(
    "0TMIYQ8E9N",
    "58e6e394abd7a5cfcc6fcae0d7b51ac5"
  );

  const indexName = "pham";

  const alert = useAlert();
  const [demoImg, setDemoImg] = useState("");
  const [demoImgs, setDemoImgs] = useState("");
  const [phMatch, setPhMatch] = useState([]);
  const [phMatchA, setPhMatchA] = useState([]);
  const [phMatchB, setPhMatchB] = useState([]);
  const [disabledState, setDisabledState] = useState("");
  const [passId, setPassId] = useState("");
  const [passData, setPassData] = useState("");
  const [receiveId, setReceiveId] = useState("");
  const [receiveData, setReceiveData] = useState("");

  const {
    selectHomeAddress,
    setSelectHomeAddress,
    selectProfile,
    userId,
    setUserId,
    setSelectMsg,
  } = useContext(UserContext);

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
      } else {
        Router.push("/login");
      }
    });

    return () => unSub();
  }, []);

  useEffect(() => {
    if (userId && selectProfile.objectID) {
      let unSub = db
        .collection("phMatch")
        .where("pharmacistA", "==", selectProfile.objectID)
        .where("pharmacistB", "==", userId)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            setReceiveId(doc.id);
            setReceiveData(doc.data());
          });
        });

      return () => unSub();
    }
  }, [userId, selectProfile.objectID]);

  useEffect(() => {
    if (userId && selectProfile.objectID) {
      let unSub = db
        .collection("phMatch")
        .where("pharmacistA", "==", userId)
        .where("pharmacistB", "==", selectProfile.objectID)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            setPassId(doc.id);
            setPassData(doc.data());
          });
        });

      return () => unSub();
    }
  }, [userId, selectProfile.objectID]);

  const connectBtn = async () => {
    if (receiveId) {
      await db
        .collection("phMatch")
        .doc(receiveId)
        .update({ requestB: true })
        .then(() => {
          alert.success("つながりました");
        })
        .catch(() => {
          alert.error("つながれませんでした");
        });
    } else {
      if (passId) {
        return;
      }
      await db
        .collection("phMatch")
        .add({
          pharmacistA: userId,
          pharmacistB: selectProfile.objectID,
          requestA: true,
          requestB: false,
        })
        .then(() => {
          alert.success("つながり申請しました");
        })
        .catch(() => {
          alert.error("つながり申請できませんでした");
        });
    }
  };

  useEffect(() => {
    if (passId) {
      setDisabledState("passed");
    }

    if (passData.requestB) {
      setDisabledState("match");
    }
  }, [passId, passData]);

  useEffect(() => {
    if (receiveId) {
      setDisabledState("received");
    }

    if (receiveData.requestB) {
      setDisabledState("match");
    }
  }, [receiveId, receiveData]);

  useEffect(() => {
    if (selectProfile) {
      let unSub = db
        .collection("phMatch")
        .where("pharmacistA", "==", selectProfile.objectID)
        .where("requestB", "==", true)
        .onSnapshot((snapshot) => {
          const user = snapshot.docs.map((doc) => doc.data().pharmacistB);
          setPhMatchA([...user]);
        });

      return () => unSub();
    }
  }, [selectProfile]);

  useEffect(() => {
    if (selectProfile) {
      let unSub = db
        .collection("phMatch")
        .where("pharmacistB", "==", selectProfile.objectID)
        .where("requestB", "==", true)
        .onSnapshot((snapshot) => {
          const user = snapshot.docs.map((doc) => doc.data().pharmacistA);
          setPhMatchB([...user]);
        });

      return () => unSub();
    }
  }, [selectProfile]);

  useEffect(() => {
    if (phMatchA && phMatchB) {
      setPhMatch([...phMatchA, ...phMatchB]);
    }
  }, [phMatchA, phMatchB]);

  return (
    <div>
      <div className="grid grid-cols-12">
        {/* ////// プロフィール検索(ページ左) ////// */}
        <div className="md:col-span-3 col-span-12 border-r-2 border-blue-400 relative">
          <div className="md:absolute h-full flex flex-col w-full">
            <div className="text-center">
              <h4 className="text-white bg-blue-400 font-bold text-lg py-3">
                薬剤師検索
              </h4>
            </div>
            <InstantSearch indexName={indexName} searchClient={searchClient}>
              <div className="border-b">
                <div className="mx-5 my-7">
                  <div className="my-5">
                    <p>名前</p>
                    <div>
                      <CustomSearchBox />
                    </div>
                  </div>

                  <div className="my-5">
                    <label>
                      <p>住所</p>
                      <select
                        className="bg-blue-100 rounded-full outline-none pl-3 w-full py-1"
                        name="selectHomeAddress"
                        value={selectHomeAddress}
                        onChange={(e) => setSelectHomeAddress(e.target.value)}
                      >
                        <option value="">指定しない</option>
                        <Address/>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
              <div
                className="overflow-y-auto md:max-h-screen  max-h-60"
                onClick={() => {
                  setDisabledState("");
                  setPassId("");
                  setPassData("");
                  setReceiveId("");
                  setReceiveData("");
                }}
              >
                <Hits hitComponent={hitComponent} />
              </div>
            </InstantSearch>
          </div>
        </div>

        {/* ////// プロフィール描画(ページ右) ////// */}
        {selectProfile ? (
          <div className="md:col-span-9 col-span-12 min-h-screen px-5">
            <div className="grid grid-cols-12 my-10">
              <div className="lg:col-span-3 col-span-12 justify-self-center text-center">
                {selectProfile.profileImageUrl ? (
                  <Image
                    className="inline object-cover rounded-full"
                    width={200}
                    height={200}
                    src={selectProfile.profileImageUrl}
                    alt="Profile image"
                  />
                ) : (
                  demoImg && (
                    <Image
                      className="inline object-cover rounded-full"
                      width={200}
                      height={200}
                      src={demoImg}
                      alt="Profile image"
                    />
                  )
                )}

                <div className="lg:hidden block">
                  <div className="flex flex-row flex-wrap items-end my-5 gap-8 justify-center">
                    <div>
                      <h2 className="text-4xl font-bold">
                        {selectProfile.userName}
                      </h2>
                    </div>

                    {selectProfile.jobTitle && (
                      <div>
                        <p className="text-xl font-bold text-blue-400">
                          {selectProfile.jobTitle}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row flex-wrap my-5 justify-center gap-1 items-center">
                  <Emoji emoji="handshake" size={20} />
                  <p className="text-base">{`${phMatch.length}人`}</p>
                </div>

                <div className="lg:hidden block">
                  <div className="flex flex-row flex-wrap my-5 gap-6 leading-none">
                    {selectProfile.homeAddress && (
                      <div className="flex flex-row flex-wrap gap-1 items-center">
                        <Emoji emoji="round_pushpin" size={20} />
                        <p className="text-base">
                          {selectProfile.homeAddress.slice(3)}
                        </p>
                      </div>
                    )}

                    {selectProfile.dobYY &&
                      selectProfile.dobMM &&
                      selectProfile.dobDD && (
                        <div className="flex flex-row flex-wrap gap-1 items-center">
                          <Emoji emoji="birthday" size={20} />
                          <p className="text-base">{`${selectProfile.dobYY}/${selectProfile.dobMM}/${selectProfile.dobDD}`}</p>
                        </div>
                      )}

                    {selectProfile.school && (
                      <div className="flex flex-row flex-wrap gap-1 items-center">
                        <Emoji emoji="school" size={20} />
                        <p className="text-base">{`${selectProfile.school} 卒業`}</p>
                      </div>
                    )}

                    {selectProfile.birthPlace && (
                      <div className="flex flex-row flex-wrap gap-1 items-center">
                        <Emoji emoji="baby" size={20} />
                        <p className="text-base">{`${selectProfile.birthPlace} 出身`}</p>
                      </div>
                    )}

                    {selectProfile.language && (
                      <div className="flex flex-row flex-wrap gap-1 items-center">
                        <Emoji emoji="speaking_head_in_silhouette" size={20} />
                        <p className="text-base">{selectProfile.language}</p>
                      </div>
                    )}
                  </div>

                  {selectProfile.comments && (
                    <div className="my-12 whitespace-pre-wrap">
                      <p className="text-base">{selectProfile.comments}</p>
                    </div>
                  )}
                </div>

                <div className="my-10 text-center">
                  {disabledState !== "received" && disabledState !== "match" && (
                    <button
                      className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 disabled:bg-blue-200 py-2 w-full rounded-full shadow-lg font-bold"
                      onClick={connectBtn}
                      disabled={disabledState === "passed"}
                    >
                      {disabledState === "passed" ? "申請中" : "つながる"}
                    </button>
                  )}

                  {disabledState === "received" && (
                    <button
                      className="text-white bg-blue-500 transition duration-300 hover:bg-blue-400 disabled:bg-blue-200 py-2 w-full rounded-full shadow-lg font-bold"
                      onClick={connectBtn}
                    >
                      申請あり
                    </button>
                  )}

                  {disabledState === "match" && (
                    <Link href="/message">
                      <button
                        className="text-blue-400 bg-white border-2 border-blue-400 transition duration-300 hover:bg-blue-100 disabled:bg-blue-200 py-2 w-full rounded-full shadow-lg font-bold"
                        onClick={() => {
                          setSelectMsg(selectProfile);
                        }}
                      >
                        メッセージ
                      </button>
                    </Link>
                  )}
                </div>

                <div className="flex lg:flex-col flex-row md:gap-5">
                  {selectProfile.freeImageUrl0 ? (
                    <div>
                      <Image
                        className="inline object-cover transform  hover:scale-150 transition duration-300"
                        width={200}
                        height={200}
                        src={selectProfile.freeImageUrl0}
                        alt="Free image0"
                      />
                    </div>
                  ) : (
                    demoImgs && (
                      <div>
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
                  {selectProfile.freeImageUrl1 ? (
                    <div>
                      <Image
                        className="inline object-cover transform hover:scale-150 transition duration-300"
                        width={200}
                        height={200}
                        src={selectProfile.freeImageUrl1}
                        alt="Free image1"
                      />
                    </div>
                  ) : (
                    demoImgs && (
                      <div>
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
                  {selectProfile.freeImageUrl2 ? (
                    <div>
                      <Image
                        className="inline object-cover transform hover:scale-150 transition duration-300"
                        width={200}
                        height={200}
                        src={selectProfile.freeImageUrl2}
                        alt="Free image2"
                      />
                    </div>
                  ) : (
                    demoImgs && (
                      <div>
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
              </div>

              <div className="lg:col-span-9 col-span-12 lg:px-10 px-5">
                <div className="lg:block hidden">
                  <div className="flex flex-row flex-wrap items-end my-10 gap-8">
                    <div>
                      <h2 className="text-4xl font-bold">
                        {selectProfile.userName}
                      </h2>
                    </div>

                    {selectProfile.jobTitle && (
                      <div>
                        <p className="text-xl font-bold text-blue-400">
                          {selectProfile.jobTitle}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row flex-wrap my-5 gap-6 leading-none">
                    {selectProfile.homeAddress && (
                      <div className="flex flex-row flex-wrap gap-1 items-center">
                        <Emoji emoji="round_pushpin" size={20} />
                        <p className="text-base">
                          {selectProfile.homeAddress.slice(3)}
                        </p>
                      </div>
                    )}

                    {selectProfile.dobYY &&
                      selectProfile.dobMM &&
                      selectProfile.dobDD && (
                        <div className="flex flex-row flex-wrap gap-1 items-center">
                          <Emoji emoji="birthday" size={20} />
                          <p className="text-base">{`${selectProfile.dobYY}/${selectProfile.dobMM}/${selectProfile.dobDD}`}</p>
                        </div>
                      )}

                    {selectProfile.school && (
                      <div className="flex flex-row flex-wrap gap-1 items-center">
                        <Emoji emoji="school" size={20} />
                        <p className="text-base">{`${selectProfile.school} 卒業`}</p>
                      </div>
                    )}

                    {selectProfile.birthPlace && (
                      <div className="flex flex-row flex-wrap gap-1 items-center">
                        <Emoji emoji="baby" size={20} />
                        <p className="text-base">{`${selectProfile.birthPlace} 出身`}</p>
                      </div>
                    )}

                    {selectProfile.language && (
                      <div className="flex flex-row flex-wrap gap-1 items-center">
                        <Emoji emoji="speaking_head_in_silhouette" size={20} />
                        <p className="text-base">{selectProfile.language}</p>
                      </div>
                    )}
                  </div>

                  {selectProfile.comments && (
                    <div className="my-12 whitespace-pre-wrap">
                      <p className="text-base">{selectProfile.comments}</p>
                    </div>
                  )}
                </div>

                {selectProfile.hobby && (
                  <div className="my-10">
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="camping" size={20} />
                      <p className="text-base font-bold">趣味</p>
                    </div>
                    <p className="text-base">{selectProfile.hobby}</p>
                  </div>
                )}

                {selectProfile.dream && (
                  <div className="my-10">
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="thought_balloon" size={20} />
                      <p className="text-base font-bold">将来の夢</p>
                    </div>
                    <p className="text-base">{selectProfile.dream}</p>
                  </div>
                )}

                {selectProfile.certification && (
                  <div className="my-10">
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="pencil2" size={20} />
                      <p className="text-base font-bold">資格</p>
                    </div>
                    <p className="text-base">{selectProfile.certification}</p>
                  </div>
                )}

                {selectProfile.strongArea && (
                  <div className="my-10">
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="muscle" size={20} />
                      <p className="text-base font-bold">得意な業務</p>
                    </div>
                    <p className="text-base">{selectProfile.strongArea}</p>
                  </div>
                )}

                {selectProfile.subjectArea && (
                  <div className="my-10">
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="pill" size={20} />
                      <p className="text-base font-bold">経験科目</p>
                    </div>
                    <p className="text-base">{selectProfile.subjectArea}</p>
                  </div>
                )}

                {selectProfile.experiences &&
                  selectProfile.experiences[0].experience && (
                    <div className="my-10">
                      <div className="flex flex-row flex-wrap gap-1 items-center">
                        <Emoji emoji="hourglass_flowing_sand" size={20} />
                        <p className="text-base font-bold">経験年数</p>
                      </div>
                      {selectProfile.experiences.map((ex, index) => (
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

                {selectProfile.resumes && selectProfile.resumes[0].companyName && (
                  <div className="my-10">
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="page_facing_up" size={20} />
                      <p className="text-base font-bold">経歴詳細</p>
                    </div>
                    {selectProfile.resumes.map((re, index) => (
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
          </div>
        ) : (
          <div className="h-screen md:col-span-9 col-span-12 justify-self-center self-center md:pt-24">
            <Image
              src="/pharmacists_search_img.png"
              alt="login_img"
              width={400}
              height={400}
            />
          </div>
        )}
      </div>
    </div>
  );
};
