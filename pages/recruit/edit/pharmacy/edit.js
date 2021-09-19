import { Emoji } from "emoji-mart";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { db } from "../../../../firebase";

export default function edit() {
  const alert = useAlert();
  const [pharmacyData, setPharmacyData] = useState({
    access: "",
    ageRange: "",
    coId: "",
    comments: "",
    drugHistory: "",
    homeMedical: "",
    mainPrescription: "",
    nearClinic: "",
    numberOfPrescription: "",
    openingDate: "",
    openingHours: "",
    otherEquipment: "",
    pharmacyAddress: "",
    pharmacyName: "",
    pharmacyPrefecture: "",
    regularHoliday: "",
    structure: "",
    unique: "",
    staff: [{ age: "", comment: "", sex: "" }],
  });

  const {
    access,
    ageRange,
    coId,
    comments,
    drugHistory,
    homeMedical,
    mainPrescription,
    nearClinic,
    numberOfPrescription,
    openingDate,
    openingHours,
    otherEquipment,
    pharmacyAddress,
    pharmacyName,
    pharmacyPrefecture,
    regularHoliday,
    structure,
    unique,
    staff,
  } = pharmacyData;

  const editHandler = async () => {
    await db
      .collection("pharmacies")
      .add(pharmacyData)
      .then(() => {
        alert.success("薬局情報を追加しました");
        setPharmacyData({
          access: "",
          ageRange: "",
          coId: "",
          comments: "",
          drugHistory: "",
          homeMedical: "",
          mainPrescription: "",
          nearClinic: "",
          numberOfPrescription: "",
          openingDate: "",
          openingHours: "",
          otherEquipment: "",
          pharmacyAddress: "",
          pharmacyName: "",
          pharmacyPrefecture: "",
          regularHoliday: "",
          structure: "",
          unique: "",
          staff: [{ age: "", comment: "", sex: "" }],
        });
      })
      .catch(() => {
        alert.error("薬局情報を追加できませんでした");
      });
  };

  const addStaff = () => {
    if (staff) {
      const list = [...staff];
      list.push({ age: "", comment: "", sex: "" });
      setPharmacyData({ ...pharmacyData, staff: list });
    } else {
      setPharmacyData({
        ...pharmacyData,
        staff: [{ age: "", comment: "", sex: "" }],
      });
    }
  };

  const changeAge = (e, index) => {
    const list = [...staff];
    list[index] = {
      age: e.target.value,
      sex: list[index].sex,
      comment: list[index].comment,
    };
    setPharmacyData({ ...pharmacyData, staff: list });
  };

  const changeSex = (e, index) => {
    const list = [...staff];
    list[index] = {
      age: list[index].age,
      sex: e.target.value,
      comment: list[index].comment,
    };
    setPharmacyData({ ...pharmacyData, staff: list });
  };

  const changeComment = (e, index) => {
    const list = [...staff];
    list[index] = {
      age: list[index].age,
      sex: list[index].sex,
      comment: e.target.value,
    };
    setPharmacyData({ ...pharmacyData, staff: list });
  };

  const deleteStaff = (index) => {
    const list = [...staff];
    list.splice(index, 1);
    setPharmacyData({ ...pharmacyData, staff: list });
  };


  return (
    <div className="mx-20 ">
      <div className="flex flex-row flex-wrap items-end my-10 gap-8">
        <div>
          <h2 className="text-4xl font-bold">
            <input
              type="text"
              value={pharmacyName}
              onChange={(e) =>
                setPharmacyData({
                  ...pharmacyData,
                  pharmacyName: e.target.value.trim(),
                })
              }
              placeholder="薬局名"
              name="pharmacyName"
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
            value={pharmacyPrefecture}
            onChange={(e) =>
              setPharmacyData({
                ...pharmacyData,
                pharmacyPrefecture: e.target.value,
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
            value={pharmacyAddress}
            onChange={(e) =>
              setPharmacyData({
                ...pharmacyData,
                pharmacyAddress: e.target.value.trim(),
              })
            }
            placeholder="その他住所"
            name="pharmacyAddress"
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
              setPharmacyData({
                ...pharmacyData,
                access: e.target.value.trim(),
              })
            }
            placeholder="アクセス"
            name="access"
            maxLength="30"
            className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
          />
        </div>

        <div className="flex flex-row flex-wrap gap-1 items-center">
          <Emoji emoji="birthday" size={20} />
          <input
            type="text"
            value={openingDate}
            onChange={(e) =>
              setPharmacyData({
                ...pharmacyData,
                openingDate: e.target.value.trim(),
              })
            }
            placeholder="薬局開店日"
            name="openingDate"
            maxLength="20"
            className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
          />
        </div>

        <div className="flex flex-row flex-wrap gap-1 items-center">
          <Emoji emoji="alarm_clock" size={20} />
          <input
            type="text"
            value={openingHours}
            onChange={(e) =>
              setPharmacyData({
                ...pharmacyData,
                openingHours: e.target.value.trim(),
              })
            }
            placeholder="営業時間"
            name="openingHours"
            maxLength="20"
            className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
          />
        </div>

        <div className="flex flex-row flex-wrap gap-1 items-center">
          <Emoji emoji="zzz" size={20} />
          <input
            type="text"
            value={regularHoliday}
            onChange={(e) =>
              setPharmacyData({
                ...pharmacyData,
                regularHoliday: e.target.value.trim(),
              })
            }
            placeholder="定休日"
            name="regularHoliday"
            maxLength="20"
            className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
          />
        </div>
      </div>

      <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="id" size={20} />
            <p className="text-base font-bold">企業ID</p>
          </div>
          <input
            type="text"
            value={coId}
            onChange={(e) =>
              setPharmacyData({
                ...pharmacyData,
                coId: e.target.value.trim(),
              })
            }
            name="coId"
            maxLength="35"
            className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none w-1/2"
          />
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
              setPharmacyData({
                ...pharmacyData,
                comments: e.target.value.trim(),
              })
            }
          />
        </div>

        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="point_up" size={20} />
            <p className="text-base font-bold">薬局の特徴</p>
          </div>
          <textarea
            rows="5"
            value={unique}
            maxLength="200"
            className="bg-blue-100 rounded-lg p-5 w-full outline-none"
            onChange={(e) =>
              setPharmacyData({
                ...pharmacyData,
                unique: e.target.value.trim(),
              })
            }
          />
        </div>

        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="pill" size={20} />
            <p className="text-base font-bold">主な処方科目</p>
          </div>
          <textarea
            rows="5"
            value={mainPrescription}
            maxLength="200"
            className="bg-blue-100 rounded-lg p-5 w-full outline-none"
            onChange={(e) =>
              setPharmacyData({
                ...pharmacyData,
                mainPrescription: e.target.value.trim(),
              })
            }
          />
        </div>

        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="page_with_curl" size={20} />
            <p className="text-base font-bold">平均処方箋枚数(日)</p>
          </div>
          <input
            type="text"
            value={numberOfPrescription}
            onChange={(e) =>
              setPharmacyData({
                ...pharmacyData,
                numberOfPrescription: e.target.value.trim(),
              })
            }
            name="numberOfPrescription"
            maxLength="20"
            className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
          />
        </div>

        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="busts_in_silhouette" size={20} />
            <p className="text-base font-bold">営業体制人数(日)</p>
          </div>
          <input
            type="text"
            value={structure}
            onChange={(e) =>
              setPharmacyData({
                ...pharmacyData,
                structure: e.target.value.trim(),
              })
            }
            name="structure"
            maxLength="20"
            className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
          />
        </div>

        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="man-woman-girl-boy" size={20} />
            <p className="text-base font-bold">スタッフ年齢層</p>
          </div>
          <input
            type="text"
            value={ageRange}
            onChange={(e) =>
              setPharmacyData({
                ...pharmacyData,
                ageRange: e.target.value.trim(),
              })
            }
            name="ageRange"
            maxLength="20"
            className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
          />
        </div>

        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="desktop_computer" size={20} />
            <p className="text-base font-bold">薬歴</p>
          </div>
          <input
            type="text"
            value={drugHistory}
            onChange={(e) =>
              setPharmacyData({
                ...pharmacyData,
                drugHistory: e.target.value.trim(),
              })
            }
            name="drugHistory"
            maxLength="20"
            className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
          />
        </div>

        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="battery" size={20} />
            <p className="text-base font-bold">その他設備</p>
          </div>
          <textarea
            rows="5"
            value={otherEquipment}
            maxLength="200"
            className="bg-blue-100 rounded-lg p-5 w-full outline-none"
            onChange={(e) =>
              setPharmacyData({
                ...pharmacyData,
                otherEquipment: e.target.value.trim(),
              })
            }
          />
        </div>

        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="hospital" size={20} />
            <p className="text-base font-bold">門前</p>
          </div>
          <textarea
            rows="5"
            value={nearClinic}
            maxLength="200"
            placeholder="〇〇クリニック、△△病院"
            className="bg-blue-100 rounded-lg p-5 w-full outline-none placeholder-blue-300"
            onChange={(e) =>
              setPharmacyData({
                ...pharmacyData,
                nearClinic: e.target.value.trim(),
              })
            }
          />
        </div>

        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="car" size={20} />
            <p className="text-base font-bold">在宅対応</p>
          </div>
          <textarea
            rows="5"
            value={homeMedical}
            maxLength="200"
            placeholder="施設：〇〇件、個人宅：△△件"
            className="bg-blue-100 rounded-lg p-5 w-full outline-none placeholder-blue-300"
            onChange={(e) =>
              setPharmacyData({
                ...pharmacyData,
                homeMedical: e.target.value.trim(),
              })
            }
          />
        </div>

        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="woman-raising-hand" size={20} />
            <p className="text-base font-bold">スタッフ紹介</p>
            <button
              className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-1 px-2 ml-1 rounded-full shadow-lg text-xs"
              onClick={addStaff}
            >
              欄を追加
            </button>
          </div>
          {staff &&
            staff.map((st, index) => (
              <div key={index} className="">
                <div className='flex flex-row flex-wrap gap-5'>
                <div className="my-1">
                  <input
                    type="text"
                    value={st.age}
                    name="age"
                    maxLength="5"
                    placeholder="年代"
                    onChange={(e) => changeAge(e, index)}
                    className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none"
                  />
                  <span>代</span>
                </div>
                <div className="my-1">
                  <input
                    type="text"
                    value={st.sex}
                    name="sex"
                    maxLength="5"
                    placeholder="性別"
                    onChange={(e) => changeSex(e, index)}
                    className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none"
                  />
                </div>
                </div>

                <div className='grid grid-cols-12 gap-2 items-end'>
                <div className="my-1 col-span-11">
                  <textarea
                    rows="5"
                    value={st.comment}
                    maxLength="200"
                    placeholder="スタッフからのコメント"
                    className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-lg py-1 pl-5 outline-none w-full"
                    onChange={(e) => changeComment(e, index)}
                  />
                </div>

                <div className="col-span-1">
                  <button
                    className="text-white bg-gray-400 transition duration-300 hover:bg-gray-300 py-1 px-2 my-3 rounded-full shadow-lg text-xs"
                    onClick={() => deleteStaff(index)}
                  >
                    削除
                  </button>
                </div>
                </div>

              </div>
            ))}
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
