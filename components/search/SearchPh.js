import algoliasearch from "algoliasearch/lite";
import { Emoji } from "emoji-mart";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import { auth, db } from "../../firebase";
import { UserContext } from "../../UserContext";
import { Address } from "../atoms/Address";
import { hitComponentPh } from "./HitComponentPh";
import { CustomSearchBox } from "./SearchBox";

export const SearchPh = () => {
  const searchClient = algoliasearch(
    "0TMIYQ8E9N",
    "58e6e394abd7a5cfcc6fcae0d7b51ac5"
  );

  const indexName = "pham_pharmacies";

  const [isApply, setIsApply] = useState(false);

  const {
    selectPharmacy,
    selectPharmacyAddress,
    setSelectPharmacyAddress,
    setPharmacyId,
    setSelectJob,
    setComId,
  } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      await db
        .collection("jobs")
        .get()
        .then((data) => {
          const id = data.docs.map((d) => {
            return d.data().phId;
          });
          setIsApply(id.includes(selectPharmacy.objectID));
        });
    })();
  }, [selectPharmacy.objectID]);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (!user) {
        Router.push("/login");
      }
    });

    return () => unSub();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12">
        {/* ////// 薬局検索(ページ左) ////// */}
        <div className="md:col-span-3 col-span-12 border-r-2 border-blue-400 relative">
          <div className="md:absolute h-full flex flex-col w-full">
            <div className="text-center">
              <h4 className="text-white bg-blue-400 font-bold text-lg py-3">
                薬局検索
              </h4>
            </div>
            <InstantSearch indexName={indexName} searchClient={searchClient}>
              <div className="border-b">
                <div className="mx-5 my-7">
                  <div className="my-5">
                    <p>薬局名</p>
                    <div>
                      <CustomSearchBox />
                    </div>
                  </div>

                  <div className="my-5">
                    <label>
                      <p>所在地</p>
                      <select
                        className="bg-blue-100 rounded-full outline-none pl-3 w-full py-1"
                        name="selectPharmacyAddress"
                        value={selectPharmacyAddress}
                        onChange={(e) =>
                          setSelectPharmacyAddress(e.target.value)
                        }
                      >
                        <option value="">指定しない</option>
                        <Address/>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
              <div className="overflow-y-auto md:max-h-screen max-h-60">
                <Hits hitComponent={hitComponentPh} />
              </div>
            </InstantSearch>
          </div>
        </div>

        {/* ////// 薬局検索描画(ページ右) ////// */}
        {selectPharmacy ? (
          <div className="md:col-span-9 col-span-12 min-h-screen md:px-10 px-5">
            <div className="flex justify-between my-5">
              <div>
                {isApply && (
                  <AnchorLink href="#btn">
                    <button className="text-white bg-blue-500 transition duration-300 hover:bg-blue-400 py-2 px-5 rounded-full shadow-lg font-bold">
                       募集中
                    </button>
                  </AnchorLink>
                )}
              </div>
              <div>
                <Link href="/companies/search">
                  <button className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-2 px-5 rounded-full shadow-lg font-bold"
                  onClick={()=>{setComId(selectPharmacy.coId)}}
                  >
                     企業詳細
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex flex-row flex-wrap items-end my-10 gap-8">
              <div>
                <h2 className="text-4xl font-bold">
                  {selectPharmacy.pharmacyName}
                </h2>
              </div>
            </div>

            <div className="flex flex-row flex-wrap my-5 gap-6 leading-none">
              {selectPharmacy.pharmacyPrefecture && (
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="round_pushpin" size={20} />
                  <p className="text-base">{`${selectPharmacy.pharmacyPrefecture.slice(
                    3
                  )}${selectPharmacy.pharmacyAddress}`}</p>
                </div>
              )}

              {selectPharmacy.access && (
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="railway_car" size={20} />
                  <p className="text-base">{selectPharmacy.access}</p>
                </div>
              )}

              {selectPharmacy.openingDate && (
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="birthday" size={20} />
                  <p className="text-base">{selectPharmacy.openingDate}</p>
                </div>
              )}

              {selectPharmacy.openingHours && (
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="alarm_clock" size={20} />
                  <p className="text-base">{selectPharmacy.openingHours}</p>
                </div>
              )}

              {selectPharmacy.regularHoliday && (
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="zzz" size={20} />
                  <p className="text-base">{selectPharmacy.regularHoliday}</p>
                </div>
              )}
            </div>

            <div className="my-10">
              {selectPharmacy.comments && (
                <div className="my-12 whitespace-pre-wrap">
                  <p className="text-base">{selectPharmacy.comments}</p>
                </div>
              )}

              {selectPharmacy.unique && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="point_up" size={20} />
                    <p className="text-base font-bold">薬局の特徴</p>
                  </div>
                  <p className="text-base">{selectPharmacy.unique}</p>
                </div>
              )}

              {selectPharmacy.mainPrescription && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="pill" size={20} />
                    <p className="text-base font-bold">主な処方科目</p>
                  </div>
                  <p className="text-base">{selectPharmacy.mainPrescription}</p>
                </div>
              )}

              {selectPharmacy.numberOfPrescription && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="page_with_curl" size={20} />
                    <p className="text-base font-bold">平均処方箋枚数</p>
                  </div>
                  <p className="text-base">{`${selectPharmacy.numberOfPrescription}枚/日`}</p>
                </div>
              )}

              {selectPharmacy.structure && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="busts_in_silhouette" size={20} />
                    <p className="text-base font-bold">営業体制人数</p>
                  </div>
                  <p className="text-base">{`${selectPharmacy.structure}/日`}</p>
                </div>
              )}

              {selectPharmacy.ageRange && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="man-woman-girl-boy" size={20} />
                    <p className="text-base font-bold">スタッフ年齢層</p>
                  </div>
                  <p className="text-base">{selectPharmacy.ageRange}</p>
                </div>
              )}

              {selectPharmacy.drugHistory && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="desktop_computer" size={20} />
                    <p className="text-base font-bold">薬歴</p>
                  </div>
                  <p className="text-base">{selectPharmacy.drugHistory}</p>
                </div>
              )}

              {selectPharmacy.otherEquipment && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="battery" size={20} />
                    <p className="text-base font-bold">その他設備</p>
                  </div>
                  <p className="text-base">{selectPharmacy.otherEquipment}</p>
                </div>
              )}

              {selectPharmacy.nearClinic && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="hospital" size={20} />
                    <p className="text-base font-bold">門前</p>
                  </div>
                  <p className="text-base">{selectPharmacy.nearClinic}</p>
                </div>
              )}

              {selectPharmacy.homeMedical && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="car" size={20} />
                    <p className="text-base font-bold">在宅対応</p>
                  </div>
                  <p className="text-base">{selectPharmacy.homeMedical}</p>
                </div>
              )}

              {selectPharmacy.staff && selectPharmacy.staff[0].comment && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="woman-raising-hand" size={20} />
                    <p className="text-base font-bold">スタッフ紹介</p>
                  </div>
                  {selectPharmacy.staff.map((st, index) => (
                    <div key={index} className="my-5">
                      <div className="flex flex-row flex-wrap gap-5 items-center">
                        {st.age && (
                          <div>
                            <p className="text-base font-bold">{`${st.age}代`}</p>
                          </div>
                        )}
                        {st.sex && (
                          <div>
                            <p className="text-base font-bold">{st.sex}</p>
                          </div>
                        )}
                      </div>
                      {st.comment && (
                        <div className="col-span-8">
                          <p className="text-base">{st.comment}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isApply && (
              <div className="text-center my-20" id="btn">
                <Link href="/jobs/search">
                  <button
                    className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-2 w-3/5 rounded-full shadow-lg font-bold"
                    onClick={() => {
                      setPharmacyId(selectPharmacy.objectID);
                      setSelectJob("");
                    }}
                  >
                    募集内容
                  </button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="h-screen md:col-span-9 col-span-12 justify-self-center self-center md:pt-24">
            <Image
              src="/pharmacy_search_img.png"
              alt="login_img"
              width={300}
              height={300}
            />
          </div>
        )}
      </div>
    </div>
  );
};
