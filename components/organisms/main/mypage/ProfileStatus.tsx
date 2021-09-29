import { Emoji } from "emoji-mart";
import React, { Dispatch, memo, useEffect, useState, VFC } from "react";
import Skeleton from "react-loading-skeleton";
import { db } from "../../../../firebase";

///////// 型定義エリア /////////
type Props = {
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  scout: string;
  userId: string;
  loading: boolean;
};

export const ProfileStatus: VFC<Props> = memo(
  ({ setIsOpen, scout, userId, loading }) => {
    ///////// ステートエリア /////////
    const [phMatch, setPhMatch] = useState([]);
    const [phMatchA, setPhMatchA] = useState([]);
    const [phMatchB, setPhMatchB] = useState([]);

    ///////// 関数エリア /////////
    //自分から申請してマッチしたユーザー
    useEffect(() => {
      if (userId) {
        let unSub = db
          .collection("phMatch")
          .where("pharmacistA", "==", userId)
          .where("requestB", "==", true)
          .onSnapshot((snapshot) => {
            const user = snapshot.docs.map((doc) => doc.data().pharmacistB);
            setPhMatchA([...user]);
          });

        return () => unSub();
      }
    }, [userId]);

    //相手から申請してマッチしたユーザー
    useEffect(() => {
      if (userId) {
        let unSub = db
          .collection("phMatch")
          .where("pharmacistB", "==", userId)
          .where("requestB", "==", true)
          .onSnapshot((snapshot) => {
            const user = snapshot.docs.map((doc) => doc.data().pharmacistA);
            setPhMatchB([...user]);
          });

        return () => unSub();
      }
    }, [userId]);

    //自分からと相手から申請してマッチしたユーザー
    useEffect(() => {
      if (phMatchA && phMatchB) {
        setPhMatch([...phMatchA, ...phMatchB]);
      }
    }, [phMatchA, phMatchB]);

    //つながりリクエストモーダルを開く
    const connect = () => {
      setIsOpen(true);
    };

    ///////// JSXエリア /////////
    return (
      <div>
        <div className="flex flex-row flex-wrap my-5 justify-center gap-1 items-center">
          {loading ? (
            <Skeleton width={200} />
          ) : (
            <>
              <Emoji emoji="handshake" size={20} />
              <p className="text-base">{`${phMatch.length}人`}</p>
              <button
                className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-1 px-2 mx-2 rounded-full shadow-lg text-xs"
                onClick={connect}
              >
                リクエスト
              </button>
            </>
          )}
        </div>

        {loading ? (
          <Skeleton width={200} />
        ) : (
          scout && (
            <div className="flex flex-row flex-wrap mt-5 mb-10 justify-center gap-1 items-center">
              <Emoji emoji="female-detective" size={20} />
              <p className="text-base">{scout}</p>
            </div>
          )
        )}
      </div>
    );
  }
);
