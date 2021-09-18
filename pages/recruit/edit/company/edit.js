import { Emoji } from "emoji-mart";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { auth, db, storage } from "../../../../firebase";
export default function edit() {
  const alert = useAlert();
  const [companyDemoImg, setCompanyDemoImg] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [companyImage, setCompanyImage] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companyData, setCompanyData] = useState({
    comments: "",
    companyAddress: "",
    companyImageUrl: "",
    companyName: "",
    companyPrefecture: "",
    establishment: "",
    exchange: "",
    pharmacies: "",
    presidentHobby: "",
    unique: "",
    websiteUrl: "",
  });

  const {
    comments,
    companyAddress,
    companyImageUrl,
    companyName,
    companyPrefecture,
    establishment,
    exchange,
    pharmacies,
    presidentHobby,
    unique,
    websiteUrl,
  } = companyData;

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
      if (user) {
        setCompanyId(user.uid);
      }
    });
    return () => unSub();
  }, []);

  const uploadImage = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrl(imageUrl);
      setCompanyImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  const editHandler = async () => {
    let companyUrl = "";

    //アップロード画像があれば
    if (companyImage) {
      //画像をストレージにアップロード
      await storage.ref(`companyImages/${companyId}`).put(companyImage);
      //画像がクラウド上のどこにあるかURLで取得
      companyUrl = await storage
        .ref("companyImages")
        .child(companyId)
        .getDownloadURL();
      //アップロード画像がない && firestoreにデータがある
    } else if (!companyImage && companyImageUrl) {
      companyUrl = companyImageUrl;
    } else {
      companyUrl = "";
    }

    const companyInfo = {
      ...companyData,
      companyImageUrl: companyUrl,
    };

    await db
      .collection("companies")
      .doc(companyId)
      .set(companyInfo)
      .then(() => {
        alert.success("企業情報を追加しました");
        setCompanyData({
          comments: "",
          companyAddress: "",
          companyImageUrl: "",
          companyName: "",
          companyPrefecture: "",
          establishment: "",
          exchange: "",
          pharmacies: "",
          presidentHobby: "",
          unique: "",
          websiteUrl: "",
        });
      })
      .catch(() => {
        alert.error("企業情報を追加できませんでした");
      });
  };

  console.log(companyData);

  return (
    <div className="mx-20">
      <div className="grid grid-cols-12 gap-10 my-10">
        <div className="col-span-3 justify-self-center">
          <label>
            {fileUrl ? (
              <Image
                className="inline object-cover mr-2 rounded-full cursor-pointer"
                width={200}
                height={200}
                src={fileUrl}
                alt="Company Image"
              />
            ) : companyImageUrl ? (
              <Image
                className="inline object-cover mr-2 rounded-full cursor-pointer"
                width={200}
                height={200}
                src={companyImageUrl}
                alt="Company Image"
              />
            ) : (
              companyDemoImg && (
                <Image
                  className="inline object-cover mr-2 rounded-full cursor-pointer"
                  width={200}
                  height={200}
                  src={companyDemoImg}
                  alt="Company Image"
                />
              )
            )}

            <input
              className="hidden"
              accept="image/*"
              type="file"
              onChange={uploadImage}
            />
          </label>
        </div>

        <div className="col-span-9">
          <div className="flex flex-row flex-wrap items-end my-10 gap-8">
            <div>
              <h2 className="text-4xl font-bold">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      companyName: e.target.value.trim(),
                    })
                  }
                  placeholder="企業名"
                  name="companyName"
                  maxLength="12"
                  className="text-4xl font-bold bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
                />
              </h2>
            </div>
          </div>

          <div className="flex flex-row flex-wrap my-5 gap-6 leading-none">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="round_pushpin" size={20} />
              <select
                className="bg-blue-100 rounded-full outline-none pl-3 pr-2 py-1"
                name="companyPrefecture"
                value={companyPrefecture}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    companyPrefecture: e.target.value,
                  })
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
                value={companyAddress}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    companyAddress: e.target.value.trim(),
                  })
                }
                placeholder="その他住所"
                name="companyAddress"
                maxLength="20"
                className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
              />
            </div>

            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="birthday" size={20} />
              <input
                type="text"
                value={establishment}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    establishment: e.target.value.trim(),
                  })
                }
                placeholder="企業設立日"
                name="establishment"
                maxLength="10"
                className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
              />
            </div>

            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="house" size={20} />
              <input
                type="text"
                value={pharmacies}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    pharmacies: e.target.value.trim(),
                  })
                }
                placeholder="店舗数 "
                name="pharmacies"
                maxLength="5"
                className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
              />
            </div>

            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="link" size={20} />
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    websiteUrl: e.target.value.trim(),
                  })
                }
                placeholder="企業WEBサイト"
                name="websiteUrl"
                maxLength="30"
                className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-10 mr-10">
        <div className="my-12 whitespace-pre-wrap">
          <textarea
            rows="5"
            value={comments}
            maxLength="200"
            placeholder="フリーPR欄"
            className="bg-blue-100 rounded-lg p-5 w-full outline-none"
            onChange={(e) =>
              setCompanyData({
                ...companyData,
                comments: e.target.value.trim(),
              })
            }
          />
        </div>

        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="point_up" size={20} />
            <p className="text-base font-bold">企業の特徴</p>
          </div>
          <textarea
            rows="5"
            value={unique}
            maxLength="200"
            className="bg-blue-100 rounded-lg p-5 w-full outline-none"
            onChange={(e) =>
              setCompanyData({
                ...companyData,
                unique: e.target.value.trim(),
              })
            }
          />
        </div>

        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="camping" size={20} />
            <p className="text-base font-bold">社長の趣味</p>
          </div>
          <textarea
            rows="5"
            value={presidentHobby}
            maxLength="200"
            className="bg-blue-100 rounded-lg p-5 w-full outline-none"
            onChange={(e) =>
              setCompanyData({
                ...companyData,
                presidentHobby: e.target.value.trim(),
              })
            }
          />
        </div>

        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="smiley" size={20} />
            <p className="text-base font-bold">社長と社員の交流</p>
          </div>
          <textarea
            rows="5"
            value={exchange}
            maxLength="200"
            className="bg-blue-100 rounded-lg p-5 w-full outline-none"
            onChange={(e) =>
              setCompanyData({
                ...companyData,
                exchange: e.target.value.trim(),
              })
            }
          />
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
