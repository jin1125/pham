import algoliasearch from "algoliasearch/lite";
import { Emoji } from "emoji-mart";
import firebase from "firebase/app";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import { auth, db, storage } from "../../firebase";
import { UserContext } from "../../UserContext";
import ApplyModal from "../organisms/modal/applyModal";
import { hitComponentJob } from "./HitComponentJob";
import { CustomSearchBox } from "./SearchBox";

export default function SearchJob() {
  const searchClient = algoliasearch(
    "0TMIYQ8E9N",
    "58e6e394abd7a5cfcc6fcae0d7b51ac5"
  );

  const indexName = "pham_jobs";

  const [demoImgs, setDemoImgs] = useState("");
  const [applyData, setApplyData] = useState({
    jobId: "",
    userId: "",
    userName: "",
    companyId: "",
    pharmacyId: "",
    pharmacyName: "",
    datetime: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [coDisabledState, setCoDisabledState] = useState("");
  const [coPassId, setCoPassId] = useState("");
  const [coPassData, setCoPassData] = useState("");
  const [coReceiveId, setCoReceiveId] = useState("");
  const [coReceiveData, setCoReceiveData] = useState("");

  const alert = useAlert();
  const {
    selectJob,
    selectJobAddress,
    setSelectJobAddress,
    selectJobEmploymentStatus,
    setSelectJobEmploymentStatus,
    setPharmId,
    setCompanyId,
    userId,
    setUserId,
  } = useContext(UserContext);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const url = await storage.ref().child("demo_imgs.jpeg").getDownloadURL();

      if (isMounted) {
        setDemoImgs(url);
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
    if (userId && selectJob) {
      let unSub = db
        .collection("userProfiles")
        .doc(userId)
        .onSnapshot((doc) => {
          if (doc.data()) {
            setApplyData({
              ...applyData,
              jobId: selectJob.objectID,
              userId: userId,
              userName: doc.data().userName,
              companyId: selectJob.coId,
              pharmacyId: selectJob.phId,
              pharmacyName: selectJob.pharmacyName,
              datetime: firebase.firestore.Timestamp.now(),
            });
          }
        });
      return () => unSub();
    }
  }, [selectJob, userId]);

  useEffect(() => {
    if (userId && selectJob.objectID) {
      let unSub = db
        .collection("coMatch")
        .where("pharmacist", "==", selectJob.objectID)
        .where("company", "==", userId)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            setCoReceiveId(doc.id);
            setCoReceiveData(doc.data());
          });
        });

      return () => unSub();
    }
  }, [userId, selectJob.objectID]);

  useEffect(() => {
    if (userId && selectJob.objectID) {
      let unSub = db
        .collection("coMatch")
        .where("pharmacist", "==", userId)
        .where("company", "==", selectJob.objectID)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            setCoPassId(doc.id);
            setCoPassData(doc.data());
          });
        });

      return () => unSub();
    }
  }, [userId, selectJob.objectID]);

  const apply = async () => {
    const result = confirm("応募しますか?");
    if (result) {
      if (coReceiveId) {
        await db
          .collection("coMatch")
          .doc(coReceiveId)
          .update({ requestCo: true })
          .then(() => {
            alert.success("つながりました");
          })
          .catch((error) => {
            alert.error("つながれませんでした");
          });
      } else {
        if (coPassId) {
          return;
        }
        await db
          .collection("coMatch")
          .add({
            pharmacist: userId,
            company: selectJob.objectID,
            requestPh: true,
            requestCo: false,
          })
      }


      await db
        .collection("applies")
        .add(applyData)
        .then(() => {
          setIsOpen(true);
        })
        .catch(() => {
          alert.error("応募ができませんでした");
        });
    } else {
      alert.error("応募をキャンセルしました");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-10">
        {/* ////// 薬局検索(ページ左) ////// */}
        <div className="col-span-3 border-r-2 border-blue-400 relative">
          <div className="absolute h-full flex flex-col w-full">
            <div className="text-center">
              <h4 className="text-white bg-blue-400 font-bold text-lg py-3">
                求人検索
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
                      <p>雇用形態</p>
                      <select
                        className="bg-blue-100 rounded-full outline-none pl-3 w-full py-1"
                        name="selectJobEmploymentStatus"
                        value={selectJobEmploymentStatus}
                        onChange={(e) =>
                          setSelectJobEmploymentStatus(e.target.value)
                        }
                      >
                        <option value="">指定しない</option>
                        <option value="正社員">正社員</option>
                        <option value="パート">パート</option>
                        <option value="契約社員">契約社員</option>
                      </select>
                    </label>
                  </div>

                  <div className="my-5">
                    <label>
                      <p>勤務エリア</p>
                      <select
                        className="bg-blue-100 rounded-full outline-none pl-3 w-full py-1"
                        name="selectJobAddress"
                        value={selectJobAddress}
                        onChange={(e) => setSelectJobAddress(e.target.value)}
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
              <div
                className="overflow-y-auto"
                onClick={() => {
                  setCoDisabledState("");
                  setCoPassId("");
                  setCoPassData("");
                  setCoReceiveId("");
                  setCoReceiveData("");
                }}
              >
                <Hits hitComponent={hitComponentJob} />
              </div>
            </InstantSearch>
          </div>
        </div>

        {/* ////// 薬局検索描画(ページ右) ////// */}
        {selectJob ? (
          <div className="col-span-9 min-h-screen">
            <div className="text-right mx-10 my-5">
              <Link href="/pharmacies/search">
                <button
                  className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-2 px-5 rounded-full shadow-lg font-bold"
                  onClick={() => {
                    setPharmId(selectJob.phId);
                    setCompanyId("");
                  }}
                >
                   薬局詳細
                </button>
              </Link>
            </div>

            <div className="flex flex-row flex-wrap items-end my-10 gap-8">
              <div>
                <h2 className="text-4xl font-bold">{selectJob.pharmacyName}</h2>
              </div>

              <div>
                <p className="text-xl font-bold text-blue-400">
                  {selectJob.employmentStatus}
                </p>
              </div>
            </div>

            <div className="flex flex-row flex-wrap my-5 gap-6 leading-none">
              <div className="flex flex-row flex-wrap items-center my-3 gap-1 leading-none">
                <Emoji emoji="id" size={20} />
                <p className="text-base">{selectJob.objectID}</p>
              </div>

              {selectJob.jobPrefecture && (
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="round_pushpin" size={20} />
                  <p className="text-base">{`${selectJob.jobPrefecture.slice(
                    3
                  )}${selectJob.jobAddress}`}</p>
                </div>
              )}

              {selectJob.access && (
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Emoji emoji="railway_car" size={20} />
                  <p className="text-base">{selectJob.access}</p>
                </div>
              )}
            </div>

            <div className="flex flex-row flex-wrap my-5 gap-8 justify-center">
              {selectJob.freeImageUrl0 ? (
                <div className="my-5">
                  <Image
                    className="inline object-cover transform  hover:scale-150 transition duration-300"
                    width={200}
                    height={200}
                    src={selectJob.freeImageUrl0}
                    alt="Free image0"
                  />
                </div>
              ) : (
                demoImgs && (
                  <div className="my-5">
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
              {selectJob.freeImageUrl1 ? (
                <div className="my-5">
                  <Image
                    className="inline object-cover transform hover:scale-150 transition duration-300"
                    width={200}
                    height={200}
                    src={selectJob.freeImageUrl1}
                    alt="Free image1"
                  />
                </div>
              ) : (
                demoImgs && (
                  <div className="my-5">
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
              {selectJob.freeImageUrl2 ? (
                <div className="my-5">
                  <Image
                    className="inline object-cover transform hover:scale-150 transition duration-300"
                    width={200}
                    height={200}
                    src={selectJob.freeImageUrl2}
                    alt="Free image2"
                  />
                </div>
              ) : (
                demoImgs && (
                  <div className="my-5">
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

            <div className="my-10 mr-10">
              {selectJob.unique && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="point_up" size={20} />
                    <p className="text-base font-bold">求人の特徴</p>
                  </div>
                  <p className="text-base">{selectJob.unique}</p>
                </div>
              )}

              {selectJob.recommend && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="man-gesturing-ok" size={20} />
                    <p className="text-base font-bold">
                      こんな薬剤師におすすめ！
                    </p>
                  </div>
                  <p className="text-base">{selectJob.recommend}</p>
                </div>
              )}

              {selectJob.pay && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="money_mouth_face" size={20} />
                    <p className="text-base font-bold">給与</p>
                  </div>
                  <p className="text-base">{selectJob.pay}</p>
                </div>
              )}

              {selectJob.businessHours && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="runner" size={20} />
                    <p className="text-base font-bold">勤務時間</p>
                  </div>
                  <p className="text-base">{selectJob.businessHours}</p>
                </div>
              )}

              {selectJob.holiday && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="beers" size={20} />
                    <p className="text-base font-bold">休日</p>
                  </div>
                  <p className="text-base">{selectJob.holiday}</p>
                </div>
              )}

              {selectJob.jobDescription && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="clipboard" size={20} />
                    <p className="text-base font-bold">主な業務内容</p>
                  </div>
                  <p className="text-base">{selectJob.jobDescription}</p>
                </div>
              )}

              {selectJob.bonus && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="dancer" size={20} />
                    <p className="text-base font-bold">賞与</p>
                  </div>
                  <p className="text-base">{selectJob.bonus}</p>
                </div>
              )}

              {selectJob.raise && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="chart_with_upwards_trend" size={20} />
                    <p className="text-base font-bold">昇給</p>
                  </div>
                  <p className="text-base">{selectJob.raise}</p>
                </div>
              )}

              {selectJob.allowance && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="moneybag" size={20} />
                    <p className="text-base font-bold">諸手当</p>
                  </div>
                  <p className="text-base">{selectJob.allowance}</p>
                </div>
              )}

              {selectJob.employeeBenefits && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="weight_lifter" size={20} />
                    <p className="text-base font-bold">福利厚生</p>
                  </div>
                  <p className="text-base">{selectJob.employeeBenefits}</p>
                </div>
              )}

              {selectJob.training && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="closed_book" size={20} />
                    <p className="text-base font-bold">研修</p>
                  </div>
                  <p className="text-base">{selectJob.training}</p>
                </div>
              )}

              {selectJob.transport && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="parachute" size={20} />
                    <p className="text-base font-bold">通勤手段</p>
                  </div>
                  <p className="text-base">{selectJob.transport}</p>
                </div>
              )}

              {selectJob.clothes && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="shirt" size={20} />
                    <p className="text-base font-bold">服装</p>
                  </div>
                  <p className="text-base">{selectJob.clothes}</p>
                </div>
              )}

              {selectJob.selection && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="white_check_mark" size={20} />
                    <p className="text-base font-bold">選考方法</p>
                  </div>
                  <p className="text-base">{selectJob.selection}</p>
                </div>
              )}

              {selectJob.notes && (
                <div className="my-10">
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Emoji emoji="bulb" size={20} />
                    <p className="text-base font-bold">備考</p>
                  </div>
                  <p className="text-base">{selectJob.notes}</p>
                </div>
              )}
            </div>

            <ApplyModal isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="text-center my-20 mr-10">
              <button
                className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 disabled:bg-blue-200 py-2 w-3/5 rounded-full shadow-lg font-bold"
                onClick={apply} disabled={coPassId}
              >
                {coPassId ? "応募済み":"応募！"}
                
              </button>
              <p className="text-xs text-gray-400 my-3">
                応募すると採用担当者へあなたのプロフィール情報が伝えられます
              </p>
            </div>
          </div>
        ) : (
          <div className="h-screen col-span-9 justify-self-center self-center pt-24">
            <Image
              src="/job_search_img.png"
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
