import algoliasearch from "algoliasearch/lite";
import { Emoji } from "emoji-mart";
import Image from "next/image";
import { useContext } from "react";
import { Configure, Hits, InstantSearch } from "react-instantsearch-dom";
import { UserContext } from "../../UserContext";
import { hitComponentCo } from "./HitComponentCo";
import { CustomSearchBox } from "./SearchBox";

export default function SearchCo() {
  const searchClient = algoliasearch(
    "0TMIYQ8E9N",
    "58e6e394abd7a5cfcc6fcae0d7b51ac5"
  );

  const indexName = "pham_companies";

  const {
    selectCompanyAddress,
    setSelectCompanyAddress,
    selectCompany,
    companyDemoImg,
  } = useContext(UserContext);

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
                      <option value="北海道">北海道</option>
                      <option value="青森県">青森県</option>
                      <option value="岩手県">岩手県</option>
                      <option value="宮城県">宮城県</option>
                      <option value="秋田県">秋田県</option>
                      <option value="山形県">山形県</option>
                      <option value="福島県">福島県</option>
                      <option value="茨城県">茨城県</option>
                      <option value="栃木県">栃木県</option>
                      <option value="群馬県">群馬県</option>
                      <option value="埼玉県">埼玉県</option>
                      <option value="千葉県">千葉県</option>
                      <option value="東京都">東京都</option>
                      <option value="神奈川県">神奈川県</option>
                      <option value="新潟県">新潟県</option>
                      <option value="富山県">富山県</option>
                      <option value="石川県">石川県</option>
                      <option value="福井県">福井県</option>
                      <option value="山梨県">山梨県</option>
                      <option value="長野県">長野県</option>
                      <option value="岐阜県">岐阜県</option>
                      <option value="静岡県">静岡県</option>
                      <option value="愛知県">愛知県</option>
                      <option value="三重県">三重県</option>
                      <option value="滋賀県">滋賀県</option>
                      <option value="京都府">京都府</option>
                      <option value="大阪府">大阪府</option>
                      <option value="兵庫県">兵庫県</option>
                      <option value="奈良県">奈良県</option>
                      <option value="和歌山県">和歌山県</option>
                      <option value="鳥取県">鳥取県</option>
                      <option value="島根県">島根県</option>
                      <option value="岡山県">岡山県</option>
                      <option value="広島県">広島県</option>
                      <option value="山口県">山口県</option>
                      <option value="徳島県">徳島県</option>
                      <option value="香川県">香川県</option>
                      <option value="愛媛県">愛媛県</option>
                      <option value="高知県">高知県</option>
                      <option value="福岡県">福岡県</option>
                      <option value="佐賀県">佐賀県</option>
                      <option value="長崎県">長崎県</option>
                      <option value="熊本県">熊本県</option>
                      <option value="大分県">大分県</option>
                      <option value="宮崎県">宮崎県</option>
                      <option value="鹿児島県">鹿児島県</option>
                      <option value="沖縄県">沖縄県</option>
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
                      <p className="text-base">{`${selectCompany.companyPrefecture}${selectCompany.companyAddress}`}</p>
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
            
              <div className='text-center'>
                <button className="text-blue-400 border-2 border-blue-400 bg-white transition duration-300 hover:bg-blue-100 py-2 w-3/5 rounded-full shadow-lg font-bold">
                薬局一覧
                
                </button>
              </div>

              <div className='text-center'>
                <button className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-2 w-3/5 rounded-full shadow-lg font-bold">
                募集一覧
                </button>
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
