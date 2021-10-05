import { Emoji } from "emoji-mart";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useContext, useEffect, useState, VFC } from "react";
import { useAlert } from "react-alert";
import { db, storage } from "../../firebase";
import { UserContext } from "../../UserContext";

///////// 型定義エリア /////////
type Props = {
  phMatch: any[];
  passId: string;
  receiveId: string;
};

export const Search_R: VFC<Props> = memo(
  ({ phMatch, passId, receiveId }) => {
    const alert = useAlert();
    ///////// ステートエリア /////////
    const [demoImg, setDemoImg] = useState("");
    const [demoImgs, setDemoImgs] = useState("");
    const { selectProfile, userId, setSelectMsg,disabledState } = useContext(UserContext);

    ///////// 関数エリア /////////
    //  ストレージからプロフィールデモ画像取得
    useEffect(() => {
      let isMounted = true;
      (async () => {
        const url = await storage.ref().child("demo_img.png").getDownloadURL();

        const Url = await storage
          .ref()
          .child("demo_imgs.jpeg")
          .getDownloadURL();

        if (isMounted) {
          setDemoImg(url);
          setDemoImgs(Url);
        }
      })();

      return () => {
        isMounted = false;
      };
    }, []);

    // つながりボタン処理
    const connectBtn = async () => {
      // receiveIdがあれば
      if (receiveId) {
        console.log('a');
        
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

        // receiveIdがなければ
      } else {
        // 既に申請済みであればリターン
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
    

    ///////// JSXエリア /////////
    return (
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
              {disabledState !== "receiveId" && disabledState !== "match" && (
                <button
                  className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 disabled:bg-blue-200 py-2 w-full rounded-full shadow-lg font-bold"
                  onClick={connectBtn}
                  disabled={disabledState === "passed"}
                >
                  {disabledState === "initial" && "つながる"}
                  {disabledState === "passed" && "申請中"}
                </button>
              )}

              {disabledState === "receiveId" && (
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
    );
  }
);
