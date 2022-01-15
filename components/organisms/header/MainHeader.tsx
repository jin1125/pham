import { Emoji } from "emoji-mart";
import Link from "next/link";
import React, { memo, useContext, useEffect, useState, VFC } from "react";
import { auth, db } from "../../../firebase";
import { UserContext } from "../../../UserContext";

export const MainHeader: VFC = memo(() => {
  ///////// ステートエリア /////////
  const [check, setCheck] = useState<boolean>(false);

  // グローバルなステート
  const {
    setSelectJob,
    setCompanyId,
    setPharmacyId,
    setPharmId,
    userId,
    setUserId,
    setSelectProfile,
  } = useContext(UserContext);

  ///////// 関数エリア /////////
  // ユーザーIDを取得
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => unSub();
  }, []);

  // ヘッダーボタンのdisabled判定
  useEffect(() => {
    if (userId) {
      let unSub = db
        .collection("userProfiles")
        .doc(userId)
        .onSnapshot((doc) => {
          if (doc.data() && doc.data().homeAddress) {
            setCheck(false);
          } else {
            setCheck(true);
          }
        });

      return () => unSub();
    }
  }, [userId]);

  ///////// JSXエリア /////////
  return (
    <header>
      <div 
        className="grid grid-cols-6 gap-3 bg-blue-300 py-4 
        justify-items-center items-center leading-none px-1"
      >
        <Link href="/mypage">
          <button>
            <h2 className="md:text-2xl text-lg text-white font-bold">Pham</h2>
          </button>
        </Link>

        <Link href="/message">
          <button
            className="font-bold text-center text-blue-400 transition 
            duration-300 hover:text-white bg-white hover:bg-blue-300 
            disabled:bg-blue-300 disabled:hover:text-blue-400 py-2 
            rounded-full w-full"
            disabled={check}
          >
            <div className="hidden md:block">メッセージ</div>
            <div className="md:hidden block">
              <Emoji emoji="envelope_with_arrow" size={30} />
            </div>
          </button>
        </Link>

        <Link href="/pharmacists/search">
          <button
            className="font-bold text-center text-blue-400 transition 
            duration-300 hover:text-white disabled:bg-blue-300 
            bg-white hover:bg-blue-300 disabled:hover:text-blue-400 
            py-2 rounded-full w-full"
            disabled={check}
            onClick={() => setSelectProfile({})}
          >
            <div className="hidden md:block">薬剤師検索</div>
            <div className="md:hidden block">
              <Emoji emoji="pill" size={30} />
            </div>
          </button>
        </Link>

        <Link href="/companies/search">
          <button
            className="font-bold text-center text-blue-400 transition 
            duration-300 hover:text-white disabled:bg-blue-300 bg-white
            hover:bg-blue-300 disabled:hover:text-blue-400 py-2 
            rounded-full w-full"
            disabled={check}
            onClick={() => {
              setSelectJob({});
              setPharmacyId("");
              setCompanyId("");
              setPharmId("");
            }}
          >
            <div className="hidden md:block">企業検索</div>
            <div className="md:hidden block">
              <Emoji emoji="office" size={30} />
            </div>
          </button>
        </Link>

        <Link href="/jobs/search">
          <button
            className="font-bold text-center text-blue-400 transition 
            duration-300 hover:text-white disabled:bg-blue-300 
            bg-white hover:bg-blue-300 disabled:hover:text-blue-400 
            py-2 rounded-full w-full"
            disabled={check}
            onClick={() => {
              setSelectJob({});
              setPharmacyId("");
              setCompanyId("");
              setPharmId("");
            }}
          >
            <div className="hidden md:block">求人検索</div>
            <div className="md:hidden block">
              <Emoji emoji="ledger" size={30} />
            </div>
          </button>
        </Link>

        <Link href="/mypage/edit">
          <button>
            <Emoji emoji="gear" size={30} />
          </button>
        </Link>
      </div>
    </header>
  );
});
