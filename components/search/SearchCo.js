import algoliasearch from "algoliasearch/lite";
import { Emoji } from "emoji-mart";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import { auth, storage } from "../../firebase";
import { UserContext } from "../../UserContext";
import { Address } from "../atoms/Address";
import { hitComponentCo } from "./HitComponentCo";
import { CustomSearchBox } from "./SearchBox";

export const SearchCo = () => {
  const searchClient = algoliasearch(
    "0TMIYQ8E9N",
    "58e6e394abd7a5cfcc6fcae0d7b51ac5"
  );

  const indexName = "pham_companies";

  const [companyDemoImg, setCompanyDemoImg] = useState("");
  const {
    selectCompanyAddress,
    setSelectCompanyAddress,
    selectCompany,
    setCompanyId,
    setSelectPharmacy,
    setPharmId,
    setPharmacyId,
  } = useContext(UserContext);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const url = await storage
        .ref()
        .child("company_demo_img.png")
        .getDownloadURL();

      if (isMounted) {
        setCompanyDemoImg(url);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

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
        {/* ////// 企業検索(ページ左) ////// */}

        <div className="md:col-span-3 col-span-12 border-r-2 border-blue-400 relative">
          <div className="md:absolute h-full flex flex-col w-full">
            <div className="text-center">
              <h4 className="text-white bg-blue-400 font-bold text-lg py-3">
                企業検索
              </h4>
            </div>
            <InstantSearch indexName={indexName} searchClient={searchClient}>
              <div className="border-b">
                <div className="mx-5 my-7">
                  <div className="my-5">
                    <p>企業名</p>
                    <div>
                      <CustomSearchBox />
                    </div>
                  </div>

                  <div className="my-5">
                    <label>
                      <p>所在地</p>
                      <select
                        className="bg-blue-100 rounded-full outline-none pl-3 w-full py-1"
                        name="selectCompanyAddress"
                        value={selectCompanyAddress}
                        onChange={(e) =>
                          setSelectCompanyAddress(e.target.value)
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
                <Hits hitComponent={hitComponentCo} />
              </div>
            </InstantSearch>
          </div>
        </div>

        {/* ////// 企業検索描画(ページ右) ////// */}
        {selectCompany ? (
          <div className="md:col-span-9 col-span-12 min-h-screen md:px-10 px-5">
            <div className="grid grid-cols-12 my-10 mr-10">
              <div className="col-span-3 justify-self-center">
                {selectCompany.companyImageUrl ? (
                  <Image
                    className="inline object-cover mr-2 rounded-full"
                    width={200}
                    height={200}
                    src={selectCompany.companyImageUrl}
                    alt="Company Image"
                  />
                ) : (
                  companyDemoImg && (
                    <Image
                      className="inline object-cover mr-2 rounded-full"
                      width={200}
                      height={200}
                      src={companyDemoImg}
                      alt="Company Image"
                    />
                  )
                )}
              </div>

              <div className="col-span-9">
                <div className="flex flex-row flex-wrap items-end my-10 gap-8">
                  <div>
                    <h2 className="text-4xl font-bold">
                      {selectCompany.companyName}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-row flex-wrap my-5 gap-6 leading-none">
                  {selectCompany.companyPrefecture && (
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="round_pushpin" size={20} />
                      <p className="text-base">{`${selectCompany.companyPrefecture.slice(
                        3
                      )}${selectCompany.companyAddress}`}</p>
                    </div>
                  )}

                  {selectCompany.establishment && (
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="birthday" size={20} />
                      <p className="text-base">{selectCompany.establishment}</p>
                    </div>
                  )}

                  {selectCompany.pharmacies && (
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="house" size={20} />
                      <p className="text-base">{`${selectCompany.pharmacies}店舗`}</p>
                    </div>
                  )}

                  {selectCompany.websiteUrl && (
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="link" size={20} />
                      <p className="text-base">{selectCompany.websiteUrl}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="my-10 mr-10">
              {selectCompany.comments && (
                <div className="my-12 whitespace-pre-wrap">
                  <p className="text-base">{selectCompany.comments}</p>
                </div>
              )}

              {selectCompany.unique && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="point_up" size={20} />
                    <p className="text-base font-bold">企業の特徴</p>
                  </div>
                  <p className="text-base">{selectCompany.unique}</p>
                </div>
              )}

              {selectCompany.presidentHobby && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="camping" size={20} />
                    <p className="text-base font-bold">社長の趣味</p>
                  </div>
                  <p className="text-base">{selectCompany.presidentHobby}</p>
                </div>
              )}

              {selectCompany.exchange && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="smiley" size={20} />
                    <p className="text-base font-bold">社長と社員の交流</p>
                  </div>
                  <p className="text-base">{selectCompany.exchange}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-10 my-20 mr-10">
              <div className="text-center">
                <Link href="/pharmacies/search">
                  <button
                    className="text-blue-400 border-2 border-blue-400 bg-white transition duration-300 hover:bg-blue-100 py-2 w-3/5 rounded-full shadow-lg font-bold"
                    onClick={() => {
                      setCompanyId(selectCompany.objectID);
                      setSelectPharmacy("");
                      setPharmId("");
                    }}
                  >
                    薬局一覧
                  </button>
                </Link>
              </div>

              <div className="text-center">
                <Link href="/jobs/search">
                  <button
                    className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-2 w-3/5 rounded-full shadow-lg font-bold"
                    onClick={() => {
                      setCompanyId(selectCompany.objectID);
                      setSelectPharmacy("");
                      setPharmacyId("");
                      setPharmId("");
                    }}
                  >
                    求人一覧
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-screen md:col-span-9 col-span-12 justify-self-center self-center md:pt-24">
            <Image
              src="/companies_search_img.png"
              alt="login_img"
              width={400}
              height={300}
            />
          </div>
        )}
      </div>
    </div>
  );
};
