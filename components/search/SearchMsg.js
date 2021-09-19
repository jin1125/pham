import algoliasearch from "algoliasearch/lite";
import { Emoji } from "emoji-mart";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Configure, Hits, InstantSearch } from "react-instantsearch-dom";
import { storage } from "../../firebase";
import { UserContext } from "../../UserContext";
import { hitComponentMsg } from "./HitComponentMsg";
import { CustomSearchBox } from "./SearchBox";

export default function SearchMsg() {
  const searchClient = algoliasearch(
    "0TMIYQ8E9N",
    "58e6e394abd7a5cfcc6fcae0d7b51ac5"
  );

  const indexName = "pham";

  const [demoImg, setDemoImg] = useState("");
  const [demoImgs, setDemoImgs] = useState("");

  const { selectMsg } =
    useContext(UserContext);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const url = await storage
        .ref()
        .child("demo_img.png")
        .getDownloadURL()

        const Url = await storage
        .ref()
        .child("demo_imgs.jpeg")
        .getDownloadURL()

        if (isMounted) {
          setDemoImg(url);
          setDemoImgs(Url);
        }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-12 gap-10">
        {/* ////// プロフィール検索(ページ左) ////// */}
        <div className="col-span-3 border-r-2 border-blue-400 min-h-screen">
          <div className="text-center">
            <h4 className="text-white bg-blue-400 font-bold text-lg py-3">
            メッセージ検索
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

              </div>
            </div>

            <Hits hitComponent={hitComponentMsg}/>
            <Configure hitsPerPage={10} />
            <div className="mx-3 my-2">{/* <PoweredBy /> */}</div>
          </InstantSearch>
        </div>

        {/* ////// プロフィール描画(ページ右) ////// */}
        {selectMsg ? (
          <div className="col-span-9">
            <div className="grid grid-cols-12 gap-10 my-10 mr-10">
              <div className="col-span-3 justify-self-center">
                {selectMsg.profileImageUrl ? (
                  <Image
                    className="inline object-cover mr-2 rounded-full"
                    width={200}
                    height={200}
                    src={selectMsg.profileImageUrl}
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

                {selectMsg.connection && (
                  <div className="flex flex-row flex-wrap my-5 justify-center gap-1 items-center">
                    <Emoji emoji="handshake" size={20} />
                    <p className="text-base">{`${selectMsg.connection}人`}</p>
                  </div>
                )}

                <div className="my-10 text-center">
                  <button className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 disabled:bg-blue-200 py-2 w-full rounded-full shadow-lg font-bold">
                    つながる
                  </button>
                </div>

                {selectMsg.freeImageUrl0 ? (
                  <div className="mr-2 my-5">
                    <Image
                      className="inline object-cover transform  hover:scale-150 transition duration-300"
                      width={200}
                      height={200}
                      src={selectMsg.freeImageUrl0}
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
                {selectMsg.freeImageUrl1 ? (
                  <div className="mr-2 my-5">
                    <Image
                      className="inline object-cover transform hover:scale-150 transition duration-300"
                      width={200}
                      height={200}
                      src={selectMsg.freeImageUrl1}
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
                {selectMsg.freeImageUrl2 ? (
                  <div className="mr-2 my-5">
                    <Image
                      className="inline object-cover transform hover:scale-150 transition duration-300"
                      width={200}
                      height={200}
                      src={selectMsg.freeImageUrl2}
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
                    <h2 className="text-4xl font-bold">
                      {selectMsg.userName}
                    </h2>
                  </div>

                  {selectMsg.jobTitle && (
                    <div>
                      <p className="text-xl font-bold text-blue-400">
                        {selectMsg.jobTitle}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-row flex-wrap my-5 gap-6 leading-none">
                  {selectMsg.homeAddress && (
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="round_pushpin" size={20} />
                      <p className="text-base">
                        {selectMsg.homeAddress.slice(3)}
                      </p>
                    </div>
                  )}

                  {selectMsg.dobYY &&
                    selectMsg.dobMM &&
                    selectMsg.dobDD && (
                      <div className="flex flex-row flex-wrap gap-1 items-center">
                        <Emoji emoji="birthday" size={20} />
                        <p className="text-base">{`${selectMsg.dobYY}/${selectMsg.dobMM}/${selectMsg.dobDD}`}</p>
                      </div>
                    )}

                  {selectMsg.school && (
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="school" size={20} />
                      <p className="text-base">{`${selectMsg.school} 卒業`}</p>
                    </div>
                  )}

                  {selectMsg.birthPlace && (
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="baby" size={20} />
                      <p className="text-base">{`${selectMsg.birthPlace} 出身`}</p>
                    </div>
                  )}

                  {selectMsg.language && (
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="speaking_head_in_silhouette" size={20} />
                      <p className="text-base">{selectMsg.language}</p>
                    </div>
                  )}
                </div>

                {selectMsg.comments && (
                  <div className="my-12 whitespace-pre-wrap">
                    <p className="text-base">{selectMsg.comments}</p>
                  </div>
                )}

                {selectMsg.hobby && (
                  <div className="my-10">
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="camping" size={20} />
                      <p className="text-base font-bold">趣味</p>
                    </div>
                    <p className="text-base">{selectMsg.hobby}</p>
                  </div>
                )}

                {selectMsg.dream && (
                  <div className="my-10">
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="thought_balloon" size={20} />
                      <p className="text-base font-bold">将来の夢</p>
                    </div>
                    <p className="text-base">{selectMsg.dream}</p>
                  </div>
                )}

                {selectMsg.certification && (
                  <div className="my-10">
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="pencil2" size={20} />
                      <p className="text-base font-bold">資格</p>
                    </div>
                    <p className="text-base">{selectMsg.certification}</p>
                  </div>
                )}

                {selectMsg.strongArea && (
                  <div className="my-10">
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="muscle" size={20} />
                      <p className="text-base font-bold">得意な業務</p>
                    </div>
                    <p className="text-base">{selectMsg.strongArea}</p>
                  </div>
                )}

                {selectMsg.subjectArea && (
                  <div className="my-10">
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="pill" size={20} />
                      <p className="text-base font-bold">経験科目</p>
                    </div>
                    <p className="text-base">{selectMsg.subjectArea}</p>
                  </div>
                )}

                {selectMsg.experiences &&
                  selectMsg.experiences[0].experience && (
                    <div className="my-10">
                      <div className="flex flex-row flex-wrap gap-1 items-center">
                        <Emoji emoji="hourglass_flowing_sand" size={20} />
                        <p className="text-base font-bold">経験年数</p>
                      </div>
                      {selectMsg.experiences.map((ex, index) => (
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

                {selectMsg.resumes && selectMsg.resumes[0].companyName && (
                  <div className="my-10">
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="page_facing_up" size={20} />
                      <p className="text-base font-bold">経歴詳細</p>
                    </div>
                    {selectMsg.resumes.map((re, index) => (
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
          <div className="col-span-9 justify-self-center self-center">
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
}
