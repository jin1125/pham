import algoliasearch from "algoliasearch/lite";
import { Emoji } from "emoji-mart";
import Image from "next/image";
import { useContext } from "react";
import {
  Configure,
  Hits,
  InstantSearch,
  SearchBox,
} from "react-instantsearch-dom";
import { UserContext } from "../../UserContext";
import { hitComponent } from "./HitComponent";

export default function Search() {
  const searchClient = algoliasearch(
    "0TMIYQ8E9N",
    "58e6e394abd7a5cfcc6fcae0d7b51ac5"
  );
  const indexName = "pham";

  const {
    selectHomeAddress,
    setSelectHomeAddress,
    selectProfile,
    demoImg,
    demoImgs,
  } = useContext(UserContext);

  // console.log(selectProfile.objectID);

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-12 gap-10">
        {/* ////// プロフィール検索(ページ左) ////// */}
        <div className="col-span-3 border-r-2 border-blue-300 min-h-screen">
          <div className='text-center'>
            <h4 className='text-blue-400 font-bold text-lg py-3 border-b-2 border-blue-300'>薬剤師検索</h4>
          </div>
          <InstantSearch indexName={indexName} searchClient={searchClient}>
            <p>名前 </p>
            <SearchBox
              autoFocus
              translations={{
                submitTitle: "送信",
                resetTitle: "リセット.",
                placeholder: "phamを検索する",
              }}
              submit={<Emoji emoji="mag" size={20} />}
            />
            <label>
              <p>住所</p>
              <select
                className="bg-blue-100 rounded-full outline-none pl-3 pr-2 py-1"
                name="selectHomeAddress"
                value={selectHomeAddress}
                onChange={(e) => setSelectHomeAddress(e.target.value)}
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
              <span className="text-red-500 align-top">*</span>
            </label>

            <Hits hitComponent={hitComponent} />
            <Configure hitsPerPage={10} />
          </InstantSearch>
        </div>

        {/* ////// プロフィール描画(ページ右) ////// */}
        {selectProfile && (
          <div className="col-span-9">
            <div className="grid grid-cols-12 gap-10 my-10 mr-10">
              <div className="col-span-3 justify-self-center">
                {selectProfile.profileImageUrl ? (
                  <Image
                    className="inline object-cover mr-2 rounded-full"
                    width={200}
                    height={200}
                    src={selectProfile.profileImageUrl}
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
                  <p className="text-base">{`${selectProfile.connection}人`}</p>
                </div>

                {selectProfile.freeImageUrl0 ? (
                  <div className="mr-2 my-5">
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
                {selectProfile.freeImageUrl1 ? (
                  <div className="mr-2 my-5">
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
                {selectProfile.freeImageUrl2 ? (
                  <div className="mr-2 my-5">
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
                  {selectProfile.homeAddress ? (
                    <div className="flex flex-row flex-wrap gap-1 items-center">
                      <Emoji emoji="round_pushpin" size={20} />
                      <p className="text-base">{selectProfile.homeAddress}</p>
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

                {selectProfile.experiences[0] &&
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

                {selectProfile.resumes[0] &&
                  selectProfile.resumes[0].companyName && (
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
        )}
      </div>
    </div>
  );
}
