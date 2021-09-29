import { Emoji } from "emoji-mart";
import Link from "next/link";
import React, { memo, useContext, useEffect, useState, VFC } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { db } from "../../firebase";
import { UserContext } from "../../UserContext";

export const SearchPh_R: VFC = memo(() => {
  ///////// ステートエリア /////////
  const [isApply, setIsApply] = useState<boolean>(false);
  const { selectPharmacy, setPharmacyId, setSelectJob, setComId } =
    useContext(UserContext);

  ///////// 関数エリア /////////
  // 企業に求人があるか判定
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

  ///////// JSXエリア /////////
  return (
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
            <button
              className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-2 px-5 rounded-full shadow-lg font-bold"
              onClick={() => {
                setComId(selectPharmacy.coId);
              }}
            >
               企業詳細
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-row flex-wrap items-end my-10 gap-8">
        <div>
          <h2 className="text-4xl font-bold">{selectPharmacy.pharmacyName}</h2>
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
                setSelectJob({});
              }}
            >
              募集内容
            </button>
          </Link>
        </div>
      )}
    </div>
  );
});
