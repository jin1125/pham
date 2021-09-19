import { Emoji } from "emoji-mart";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { auth, db, storage } from "../../../../firebase";

export default function edit() {
  const alert = useAlert();
  const [demoImgs, setDemoImgs] = useState("");
  const [freeImage0, setFreeImage0] = useState("");
  const [freeImage1, setFreeImage1] = useState("");
  const [freeImage2, setFreeImage2] = useState("");
  const [fileUrls0, setFileUrls0] = useState("");
  const [fileUrls1, setFileUrls1] = useState("");
  const [fileUrls2, setFileUrls2] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobData, setJobData] = useState({
    access: "",
    allowance: "",
    bonus: "",
    businessHours: "",
    clothes: "",
    coId: "",
    employeeBenefits: "",
    employmentStatus: "",
    freeImageUrl0: "",
    freeImageUrl1: "",
    freeImageUrl2: "",
    holiday: "",
    jobAddress: "",
    jobDescription: "",
    jobPrefecture: "",
    notes: "",
    pay: "",
    phId: "",
    pharmacyName: "",
    raise: "",
    recommend: "",
    selection: "",
    training: "",
    transport: "",
    unique: "",
  });

  const {
    access,
    allowance,
    bonus,
    businessHours,
    clothes,
    coId,
    employeeBenefits,
    employmentStatus,
    freeImageUrl0,
    freeImageUrl1,
    freeImageUrl2,
    holiday,
    jobAddress,
    jobDescription,
    jobPrefecture,
    notes,
    pay,
    phId,
    pharmacyName,
    raise,
    recommend,
    selection,
    training,
    transport,
    unique,
  } = jobData;

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
        setJobId(user.uid);
      }
    });
    return () => unSub();
  }, []);

  const uploadFreeImage0 = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrls0(imageUrl);
      setFreeImage0(e.target.files[0]);
      e.target.value = "";
    }
  };

  const uploadFreeImage1 = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrls1(imageUrl);
      setFreeImage1(e.target.files[0]);
      e.target.value = "";
    }
  };

  const uploadFreeImage2 = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrls2(imageUrl);
      setFreeImage2(e.target.files[0]);
      e.target.value = "";
    }
  };

  const editHandler = async () => {
    let freeUrl0 = "";
    let freeUrl1 = "";
    let freeUrl2 = "";

    if (freeImage0) {
      await storage.ref(`jobFreeImages/${jobId}0`).put(freeImage0);
      freeUrl0 = await storage
        .ref("jobFreeImages")
        .child(`${jobId}0`)
        .getDownloadURL();
    } else {
      freeUrl0 = "";
    }

    if (freeImage1) {
      await storage.ref(`jobFreeImages/${jobId}1`).put(freeImage1);
      freeUrl1 = await storage
        .ref("jobFreeImages")
        .child(`${jobId}1`)
        .getDownloadURL();
    } else {
      freeUrl1 = "";
    }

    if (freeImage2) {
      await storage.ref(`jobFreeImages/${jobId}2`).put(freeImage2);
      freeUrl2 = await storage
        .ref("jobFreeImages")
        .child(`${jobId}2`)
        .getDownloadURL();
    } else {
      freeUrl2 = "";
    }

    const jobInfo = {
      ...jobData,
      freeImageUrl0: freeUrl0,
      freeImageUrl1: freeUrl1,
      freeImageUrl2: freeUrl2,
    };

    await db
      .collection("jobs")
      .add(jobInfo)
      .then(() => {
        alert.success("求人情報を追加しました");
        setFileUrls0('')
        setFileUrls1('')
        setFileUrls2('')
        setJobData({
          access: "",
          allowance: "",
          bonus: "",
          businessHours: "",
          clothes: "",
          coId: "",
          employeeBenefits: "",
          employmentStatus: "",
          freeImageUrl0: "",
          freeImageUrl1: "",
          freeImageUrl2: "",
          holiday: "",
          jobAddress: "",
          jobDescription: "",
          jobPrefecture: "",
          notes: "",
          pay: "",
          phId: "",
          pharmacyName: "",
          raise: "",
          recommend: "",
          selection: "",
          training: "",
          transport: "",
          unique: "",
        });
      })
      .catch(() => {
        alert.error("求人情報を追加できませんでした");
      });
  };

  return (
    <div className="mx-20">
      <div className="col-span-9">
        <div className="grid grid-cols-2 items-end my-10 gap-8">
          <div>
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="id" size={20} />
              <p className="text-base font-bold">企業ID</p>
            </div>
            <input
              type="text"
              value={coId}
              onChange={(e) =>
                setJobData({ ...jobData, coId: e.target.value.trim() })
              }
              name="coId"
              maxLength="30"
              className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none w-2/3"
            />
          </div>

          <div>
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="id" size={20} />
              <p className="text-base font-bold">薬局ID</p>
            </div>
            <input
              type="text"
              value={phId}
              onChange={(e) =>
                setJobData({ ...jobData, phId: e.target.value.trim() })
              }
              name="phId"
              maxLength="30"
              className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none w-2/3"
            />
          </div>
        </div>

        <div className="flex flex-row flex-wrap items-end my-10 gap-8">
          <div>
            <input
              type="text"
              value={pharmacyName}
              onChange={(e) =>
                setJobData({ ...jobData, pharmacyName: e.target.value.trim() })
              }
              placeholder="薬局名"
              name="pharmacyName"
              maxLength="20"
              className="text-4xl font-bold bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
            />
          </div>

          <div>
            <input
              type="text"
              value={employmentStatus}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  employmentStatus: e.target.value.trim(),
                })
              }
              placeholder="雇用形態"
              name="employmentStatus"
              maxLength="20"
              className="text-xl font-bold text-blue-400 bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-row flex-wrap my-5 gap-6 leading-none">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="round_pushpin" size={20} />
            <select
              className="bg-blue-100 rounded-full outline-none pl-3 pr-2 py-1"
              name="jobPrefecture"
              value={jobPrefecture}
              onChange={(e) =>
                setJobData({ ...jobData, jobPrefecture: e.target.value.trim() })
              }
            >
              <option value="">住所</option>
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

            <input
              type="text"
              value={jobAddress}
              onChange={(e) =>
                setJobData({ ...jobData, jobAddress: e.target.value.trim() })
              }
              placeholder="その他住所"
              name="jobAddress"
              maxLength="30"
              className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
            />
          </div>

          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="railway_car" size={20} />
            <input
              type="text"
              value={access}
              onChange={(e) =>
                setJobData({ ...jobData, access: e.target.value.trim() })
              }
              placeholder="アクセス"
              name="access"
              maxLength="30"
              className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-row flex-wrap my-5 gap-8 justify-center">
          <label>
            {fileUrls0 ? (
              <Image
                className="inline object-cover mr-2 cursor-pointer transform hover:scale-150 transition duration-300"
                width={200}
                height={200}
                src={fileUrls0}
                alt="FreeImage0"
              />
            ) : freeImageUrl0 ? (
              <Image
                className="inline object-cover mr-2 cursor-pointer transform hover:scale-150 transition duration-300"
                width={200}
                height={200}
                src={freeImageUrl0}
                alt="FreeImage0"
              />
            ) : (
              demoImgs && (
                <Image
                  className="inline object-cover mr-2 cursor-pointer"
                  width={200}
                  height={200}
                  src={demoImgs}
                  alt="FreeImage0"
                />
              )
            )}

            <input
              className="hidden"
              accept="image/*"
              type="file"
              onChange={uploadFreeImage0}
            />
          </label>

          <label>
            {fileUrls1 ? (
              <Image
                className="inline object-cover mr-2 cursor-pointer transform hover:scale-150 transition duration-300"
                width={200}
                height={200}
                src={fileUrls1}
                alt="FreeImage1"
              />
            ) : freeImageUrl1 ? (
              <Image
                className="inline object-cover mr-2 cursor-pointer transform hover:scale-150 transition duration-300"
                width={200}
                height={200}
                src={freeImageUrl1}
                alt="FreeImage1"
              />
            ) : (
              demoImgs && (
                <Image
                  className="inline object-cover mr-2 cursor-pointer"
                  width={200}
                  height={200}
                  src={demoImgs}
                  alt="FreeImage1"
                />
              )
            )}

            <input
              className="hidden"
              accept="image/*"
              type="file"
              onChange={uploadFreeImage1}
            />
          </label>

          <label>
            {fileUrls2 ? (
              <Image
                className="inline object-cover mr-2 cursor-pointer transform hover:scale-150 transition duration-300"
                width={200}
                height={200}
                src={fileUrls2}
                alt="FreeImage2"
              />
            ) : freeImageUrl2 ? (
              <Image
                className="inline object-cover mr-2 cursor-pointer transform hover:scale-150 transition duration-300"
                width={200}
                height={200}
                src={freeImageUrl2}
                alt="FreeImage2"
              />
            ) : (
              demoImgs && (
                <Image
                  className="inline object-cover mr-2 cursor-pointer"
                  width={200}
                  height={200}
                  src={demoImgs}
                  alt="FreeImage2"
                />
              )
            )}

            <input
              className="hidden"
              accept="image/*"
              type="file"
              onChange={uploadFreeImage2}
            />
          </label>
        </div>

        <div className="my-10 mr-10">
          <div className="my-10">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="point_up" size={20} />
              <p className="text-base font-bold">求人の特徴</p>
              <textarea
                rows="5"
                value={unique}
                maxLength="200"
                className="bg-blue-100 rounded-lg p-5 w-full outline-none"
                onChange={(e) =>
                  setJobData({ ...jobData, unique: e.target.value.trim() })
                }
              />
            </div>
          </div>

          <div className="my-10">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="man-gesturing-ok" size={20} />
              <p className="text-base font-bold">こんな薬剤師におすすめ！</p>
            </div>
            <textarea
              rows="5"
              value={recommend}
              maxLength="200"
              className="bg-blue-100 rounded-lg p-5 w-full outline-none"
              onChange={(e) =>
                setJobData({ ...jobData, recommend: e.target.value.trim() })
              }
            />
          </div>

          <div className="my-10">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="money_mouth_face" size={20} />
              <p className="text-base font-bold">給与</p>
            </div>
            <textarea
              rows="5"
              value={pay}
              maxLength="200"
              className="bg-blue-100 rounded-lg p-5 w-full outline-none"
              onChange={(e) =>
                setJobData({ ...jobData, pay: e.target.value.trim() })
              }
            />
          </div>

          <div className="my-10">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="runner" size={20} />
              <p className="text-base font-bold">勤務時間</p>
            </div>
            <textarea
              rows="5"
              value={businessHours}
              maxLength="200"
              className="bg-blue-100 rounded-lg p-5 w-full outline-none"
              onChange={(e) =>
                setJobData({ ...jobData, businessHours: e.target.value.trim() })
              }
            />
          </div>

          <div className="my-10">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="beers" size={20} />
              <p className="text-base font-bold">休日</p>
            </div>
            <input
              type="text"
              value={holiday}
              onChange={(e) =>
                setJobData({ ...jobData, holiday: e.target.value.trim() })
              }
              name="holiday"
              maxLength="30"
              className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none w-full"
            />
          </div>

          <div className="my-10">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="clipboard" size={20} />
              <p className="text-base font-bold">主な業務内容</p>
            </div>
            <textarea
              rows="5"
              value={jobDescription}
              maxLength="200"
              className="bg-blue-100 rounded-lg p-5 w-full outline-none"
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  jobDescription: e.target.value.trim(),
                })
              }
            />
          </div>

          <div className="my-10">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="dancer" size={20} />
              <p className="text-base font-bold">賞与</p>
            </div>
            <input
              type="text"
              value={bonus}
              placeholder="時期・回数など"
              onChange={(e) =>
                setJobData({ ...jobData, bonus: e.target.value.trim() })
              }
              name="bonus"
              maxLength="30"
              className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none w-full"
            />
          </div>

          <div className="my-10">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="chart_with_upwards_trend" size={20} />
              <p className="text-base font-bold">昇給</p>
            </div>
            <input
              type="text"
              value={raise}
              placeholder="時期・回数など"
              onChange={(e) =>
                setJobData({ ...jobData, raise: e.target.value.trim() })
              }
              name="raise"
              maxLength="30"
              className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none w-full"
            />
          </div>

          <div className="my-10">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="moneybag" size={20} />
              <p className="text-base font-bold">諸手当</p>
            </div>
            <textarea
              rows="5"
              value={allowance}
              maxLength="200"
              className="bg-blue-100 rounded-lg p-5 w-full outline-none"
              onChange={(e) =>
                setJobData({ ...jobData, allowance: e.target.value.trim() })
              }
            />
          </div>

          <div className="my-10">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="weight_lifter" size={20} />
              <p className="text-base font-bold">福利厚生</p>
            </div>
            <textarea
              rows="5"
              value={employeeBenefits}
              maxLength="200"
              className="bg-blue-100 rounded-lg p-5 w-full outline-none"
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  employeeBenefits: e.target.value.trim(),
                })
              }
            />
          </div>

          <div className="my-10">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="closed_book" size={20} />
              <p className="text-base font-bold">研修</p>
            </div>
            <textarea
              rows="5"
              value={training}
              maxLength="200"
              className="bg-blue-100 rounded-lg p-5 w-full outline-none"
              onChange={(e) =>
                setJobData({ ...jobData, training: e.target.value.trim() })
              }
            />
          </div>

          <div className="my-10">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="parachute" size={20} />
              <p className="text-base font-bold">通勤手段</p>
            </div>
            <input
              type="text"
              value={transport}
              onChange={(e) =>
                setJobData({ ...jobData, transport: e.target.value.trim() })
              }
              name="transport"
              maxLength="30"
              className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none w-full"
            />
          </div>

          <div className="my-10">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="shirt" size={20} />
              <p className="text-base font-bold">服装</p>
            </div>
            <textarea
              rows="5"
              value={clothes}
              maxLength="200"
              className="bg-blue-100 rounded-lg p-5 w-full outline-none"
              onChange={(e) =>
                setJobData({ ...jobData, clothes: e.target.value.trim() })
              }
            />
          </div>

          <div className="my-10">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="white_check_mark" size={20} />
              <p className="text-base font-bold">選考方法</p>
            </div>
            <textarea
              rows="5"
              value={selection}
              maxLength="200"
              className="bg-blue-100 rounded-lg p-5 w-full outline-none"
              onChange={(e) =>
                setJobData({ ...jobData, selection: e.target.value.trim() })
              }
            />
          </div>

          <div className="my-10">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="bulb" size={20} />
              <p className="text-base font-bold">備考</p>
            </div>
            <textarea
              rows="5"
              value={notes}
              maxLength="200"
              className="bg-blue-100 rounded-lg p-5 w-full outline-none"
              onChange={(e) =>
                setJobData({ ...jobData, notes: e.target.value.trim() })
              }
            />
          </div>
        </div>
      </div>

      {/* ////// 保存 ////// */}
      <div>
        <div className="mt-5 mb-10 text-center">
          <button
            className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-2 w-1/3 rounded-full shadow-lg font-bold"
            onClick={editHandler}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
