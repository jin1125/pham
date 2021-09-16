import algoliasearch from "algoliasearch/lite";
import { Emoji } from "emoji-mart";
import Image from "next/image";
import { useContext } from "react";
import { Configure, Hits, InstantSearch } from "react-instantsearch-dom";
import { UserContext } from "../../UserContext";
import { hitComponentPh } from "./HitComponentPh";
import { CustomSearchBox } from "./SearchBox";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useRouter } from 'next/router';

export default function SearchPh() {
  const searchClient = algoliasearch(
    "0TMIYQ8E9N",
    "58e6e394abd7a5cfcc6fcae0d7b51ac5"
  );

  const indexName = "pham_pharmacies";
  
  const router = useRouter();
  const {
    selectPharmacy,
    selectPharmacyAddress,
    setSelectPharmacyAddress,
  } = useContext(UserContext);

  console.log(router.query.input);

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-12 gap-10">
        {/* ////// 薬局検索(ページ左) ////// */}
        <div className="col-span-3 border-r-2 border-blue-400 min-h-screen">
          <div className="text-center">
            <h4 className="text-white bg-blue-400 font-bold text-lg py-3">
              薬局検索結果
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
                      name="selectCompanyAddress"
                      value={selectPharmacyAddress}
                      onChange={(e) => setSelectPharmacyAddress(e.target.value)}
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

            <Hits hitComponent={hitComponentPh} />
            <Configure hitsPerPage={10} />
            <div className="mx-3 my-2">{/* <PoweredBy /> */}</div>
          </InstantSearch>
        </div>

        {/* ////// 薬局検索描画(ページ右) ////// */}
        {selectPharmacy ? (
          <div className="col-span-9">
            <div className='text-right mx-10 my-5'>
               <AnchorLink href="#btn">
                <button className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-2 px-5 rounded-full shadow-lg font-bold">
                募集中
                </button>
              </AnchorLink>
             
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
                  <p className="text-base">{`${selectPharmacy.pharmacyPrefecture.slice(3)}${selectPharmacy.pharmacyAddress}`}</p>
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

            <div className="my-10 mr-10">
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

              {selectPharmacy.staff &&
                  selectPharmacy.staff[0].comment && (
                    <div className="my-10">
                      <div className="flex flex-row flex-wrap gap-1 items-center">
                        <Emoji emoji="woman-raising-hand" size={20} />
                        <p className="text-base font-bold">スタッフ紹介</p>
                      </div>
                      {selectPharmacy.staff.map((st, index) => (
                        <div key={index} className='my-5'>
                          <div className='flex flex-row flex-wrap gap-5 items-center'>
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
                            <div className='col-span-8'>
                              <p className="text-base">{st.comment}</p>
                            </div>
                          )}
                        </div>
                      ))}
                        </div>
                  )}

            
            </div>

            <div className='text-center my-20 mr-10' id="btn">
                <button className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-2 w-3/5 rounded-full shadow-lg font-bold">
                募集一覧
                </button>
              </div>
          </div>
        ) : (
          <div className="col-span-9 justify-self-center self-center">
            <Image
              src="/pharmacy_search_img.png"
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
