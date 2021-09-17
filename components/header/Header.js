import { Emoji } from "emoji-mart";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { UserContext } from "../../UserContext";

export default function Header() {
  const [check, setCheck] = useState(false);
  const { setSelectJob, setCompanyId, setPharmacyId, setPharmId } =
    useContext(UserContext);

  useEffect(() => {
    
    let un;
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        un = db
          .collection("userProfiles")
          .doc(user.uid)
          .onSnapshot((doc) => {
            if (doc.data().homeAddress) {
              setCheck(false);
            } else {
              setCheck(true);
            }
          });
      }
    });

    return () => {
      unSub();
      un();
    };
  }, []);

  return (
    <header>
      <div className="grid grid-cols-6 gap-3 bg-blue-300 py-4 justify-items-center items-center leading-none">
        <Link href="/mypage">
          <button>
            <h2 className="text-2xl text-white font-bold">Pham</h2>
          </button>
        </Link>

        <Link href="/mypage/message">
          <button
            className="font-bold text-center text-blue-400 transition duration-300 hover:text-white bg-white hover:bg-blue-300 disabled:bg-blue-300 disabled:hover:text-blue-400 py-2 rounded-full w-full"
            disabled={check}
          >
            メッセージ
          </button>
        </Link>

        <Link href="/pharmacists/search">
          <button
            className="font-bold text-center text-blue-400 transition duration-300 hover:text-white disabled:bg-blue-300 bg-white hover:bg-blue-300 disabled:hover:text-blue-400 py-2 rounded-full w-full"
            disabled={check}
          >
            薬剤師検索
          </button>
        </Link>

        <Link href="/companies/search">
          <button
            className="font-bold text-center text-blue-400 transition duration-300 hover:text-white disabled:bg-blue-300 bg-white hover:bg-blue-300 disabled:hover:text-blue-400 py-2 rounded-full w-full"
            disabled={check}
            onClick={() => {
              setSelectJob("");
              setPharmacyId("");
              setCompanyId("");
              setPharmId("");
            }}
          >
            企業検索
          </button>
        </Link>

        <Link href="/jobs/search">
          <button
            className="font-bold text-center text-blue-400 transition duration-300 hover:text-white disabled:bg-blue-300 bg-white hover:bg-blue-300 disabled:hover:text-blue-400 py-2 rounded-full w-full"
            disabled={check}
            onClick={() => {
              setSelectJob("");
              setPharmacyId("");
              setCompanyId("");
              setPharmId("");
            }}
          >
            求人検索
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
}
