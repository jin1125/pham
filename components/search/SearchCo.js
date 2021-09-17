import algoliasearch from "algoliasearch/lite";
import { Emoji } from "emoji-mart";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Configure, Hits, InstantSearch } from "react-instantsearch-dom";
import { storage } from "../../firebase";
import { UserContext } from "../../UserContext";
import { hitComponentCo } from "./HitComponentCo";
import { CustomSearchBox } from "./SearchBox";

export default function SearchCo() {
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
    setPharmacyId
  } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const url = await storage
        .ref()
        .child("company_demo_img.png")
        .getDownloadURL();
      setCompanyDemoImg(url);
    })();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-12 gap-10">
        {/* ////// 企業検索(ページ左) ////// */}
        <div className="col-span-3 border-r-2 border-blue-400 min-h-screen">
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
                      onChange={(e) => setSelectCompanyAddress(e.target.value)}
                    >
                      <option value="">指定しない</option>
                      <option value="01_北海道">北海道</option>
                      <option value="02_青森県">青森県</option>
                      <option value="03_岩手県">岩手県</option>
                      <option value="04_宮城県">宮城県</option>
                      <option value="05_秋田県">秋田県</option>
                      <option value="06_山形県">山形県</option>
                      <option value="07_福島県">福島県</option>
                      <option value="08_茨城県">茨城県</option>
                      <option value="09_栃木県">栃木県</option>
                      <option value="10_群馬県">群馬県</option>
                      <option value="11_埼玉県">埼玉県</option>
                      <option value="12_千葉県">千葉県</option>
                      <option value="13_東京都">東京都</option>
                      <option value="14_神奈川県">神奈川県</option>
                      <option value="15_新潟県">新潟県</option>
                      <option value="16_富山県">富山県</option>
                      <option value="17_石川県">石川県</option>
                      <option value="18_福井県">福井県</option>
                      <option value="19_山梨県">山梨県</option>
                      <option value="20_長野県">長野県</option>
                      <option value="21_岐阜県">岐阜県</option>
                      <option value="22_静岡県">静岡県</option>
                      <option value="23_愛知県">愛知県</option>
                      <option value="24_三重県">三重県</option>
                      <option value="25_滋賀県">滋賀県</option>
                      <option value="26_京都府">京都府</option>
                      <option value="27_大阪府">大阪府</option>
                      <option value="28_兵庫県">兵庫県</option>
                      <option value="29_奈良県">奈良県</option>
                      <option value="30_和歌山県">和歌山県</option>
                      <option value="31_鳥取県">鳥取県</option>
                      <option value="32_島根県">島根県</option>
                      <option value="33_岡山県">岡山県</option>
                      <option value="34_広島県">広島県</option>
                      <option value="35_山口県">山口県</option>
                      <option value="36_徳島県">徳島県</option>
                      <option value="37_香川県">香川県</option>
                      <option value="38_愛媛県">愛媛県</option>
                      <option value="39_高知県">高知県</option>
                      <option value="40_福岡県">福岡県</option>
                      <option value="41_佐賀県">佐賀県</option>
                      <option value="42_長崎県">長崎県</option>
                      <option value="43_熊本県">熊本県</option>
                      <option value="44_大分県">大分県</option>
                      <option value="45_宮崎県">宮崎県</option>
                      <option value="46_鹿児島県">鹿児島県</option>
                      <option value="47_沖縄県">沖縄県</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <Hits hitComponent={hitComponentCo} />
            <Configure hitsPerPage={10} />
            <div className="mx-3 my-2">{/* <PoweredBy /> */}</div>
          </InstantSearch>
        </div>

        {/* ////// 企業検索描画(ページ右) ////// */}
        {selectCompany ? (
          <div className="col-span-9">
            <div className="grid grid-cols-12 gap-10 my-10 mr-10">
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
                      setPharmacyId('');
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
          <div className="col-span-9 justify-self-center self-center">
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
}
