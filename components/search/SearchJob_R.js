import React, { memo, useContext, useEffect, useState } from 'react'
import firebase from "firebase/app";
import { Emoji } from "emoji-mart";
import Image from "next/image";
import Link from "next/link";
import { useAlert } from "react-alert";
import { db, storage } from '../../firebase';
import { UserContext } from '../../UserContext';

export const SearchJob_R = memo(({coPassId,setCoPassId,coReceiveId,setCoReceiveId,setIsOpen}) => {
  const alert = useAlert();
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
  const {
    selectJob,
    setPharmId,
    setCompanyId,
    userId,
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
    if (userId && selectJob.objectID) {
      let unSub = db
        .collection("coMatch")
        .where("pharmacist", "==", selectJob.coId)
        .where("company", "==", userId)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            setCoReceiveId(doc.id);
          });
        });

      return () => unSub();
    }
  }, [userId, selectJob.coId]);


  useEffect(() => {
    if (userId && selectJob.objectID) {
      let unSub = db
        .collection("coMatch")
        .where("pharmacist", "==", userId)
        .where("company", "==", selectJob.coId)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            setCoPassId(doc.id);
          });
        });

      return () => unSub();
    }
  }, [userId, selectJob.coId]);


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

        await db.collection("coMatch").add({
          pharmacist: userId,
          company: selectJob.coId,
          requestPh: true,
          requestCo: false,
        })
        .then(()=>{
          console.log('add');
        })
        .catch((error) => {
          console.log(error);
        });
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

  return (
    <div className="md:col-span-9 col-span-12 min-h-screen md:px-10 px-5">
    <div className="text-right my-5">
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

    <div className="grid grid-cols-3 my-5 md:gap-8 gap-2 justify-center">
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

    <div className="my-10">
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

    

    <div className="text-center my-20">
      <button
        className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 disabled:bg-blue-200 py-2 w-3/5 rounded-full shadow-lg font-bold"
        onClick={apply}
        disabled={coPassId}
      >
        {coPassId ? "応募済み" : "応募！"}
      </button>
      <p className="text-xs text-gray-400 my-3">
        応募すると採用担当者へあなたのプロフィール情報が伝えられます
      </p>
    </div>
  </div>
  )
})
