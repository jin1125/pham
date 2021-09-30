import Image from "next/image";
import Router from "next/router";
import { memo, useContext, useEffect, useState, VFC } from "react";
import { auth, db } from "../../firebase";
import { Data } from "../../types/data";
import { UserContext } from "../../UserContext";
import { Search_L } from "./Search_L";
import { Search_R } from "./Search_R";



export const Search: VFC = memo(() => {
  ///////// ステートエリア /////////
  const [phMatch, setPhMatch] = useState<typeof phMatchA | typeof phMatchA>([]);
  const [phMatchA, setPhMatchA] = useState<string[]>([]);
  const [phMatchB, setPhMatchB] = useState<string[]>([]);
  const [disabledState, setDisabledState] = useState<
    "passed" | "received" | "match" | ""
  >("");
  const [passId, setPassId] = useState<string>("");
  const [passData, setPassData] = useState<Data>({} as Data);
  const [receiveId, setReceiveId] = useState<string>("");
  const [receiveData, setReceiveData] = useState<Data>({} as Data);

  const { selectProfile, userId, setUserId } = useContext(UserContext);

  ///////// 関数エリア /////////
  //ユーザーID取得＆ログインしてなければログインページへ
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

  // 相手から申請されたユーザーのIDとデータ取得
  useEffect(() => {
    if (userId && selectProfile.objectID) {
      let unSub = db
        .collection("phMatch")
        .where("pharmacistA", "==", selectProfile.objectID)
        .where("pharmacistB", "==", userId)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            setReceiveId(doc.id);
            setReceiveData(doc.data() as Data);
          });
        });

      return () => unSub();
    }
  }, [userId, selectProfile.objectID]);

  // 自分から申請したユーザーのIDとデータ取得
  useEffect(() => {
    if (userId && selectProfile.objectID) {
      let unSub = db
        .collection("phMatch")
        .where("pharmacistA", "==", userId)
        .where("pharmacistB", "==", selectProfile.objectID)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
           

            setPassId(doc.id);
            setPassData(doc.data() as Data);
          });
        });

      return () => unSub();
    }
  }, [userId, selectProfile.objectID]);

  // passIdがあればDisabledStateを"passed"にする
  // passDataのrequestBがtrueであればDisabledStateを"match"にする
  useEffect(() => {
    if (passId) {
      setDisabledState("passed");
    }

    if (passData.requestB) {
      setDisabledState("match");
    }
  }, [passId, passData]);

  // preceiveIdがあればDisabledStateを"received"にする
  // receiveDataのrequestBがtrueであればDisabledStateを"match"にする
  useEffect(() => {
    if (receiveId) {
      setDisabledState("received");
    }

    if (receiveData.requestB) {
      setDisabledState("match");
    }
  }, [receiveId, receiveData]);

  //選択したユーザーが他者から申請があって許可済みのユーザーIDを取得
  useEffect(() => {
    if (selectProfile.objectID) {
      let unSub = db
        .collection("phMatch")
        .where("pharmacistA", "==", selectProfile.objectID)
        .where("requestB", "==", true)
        .onSnapshot((snapshot) => {
          const user = snapshot.docs.map((doc) => doc.data().pharmacistB);
          setPhMatchA([...user]);
        });

      return () => unSub();
    }
  }, [selectProfile.objectID]);

  //選択したユーザーが自分から申請して許可済みのユーザーIDを取得
  useEffect(() => {
    if (selectProfile.objectID) {
      let unSub = db
        .collection("phMatch")
        .where("pharmacistB", "==", selectProfile.objectID)
        .where("requestB", "==", true)
        .onSnapshot((snapshot) => {
          const user = snapshot.docs.map((doc) => doc.data().pharmacistA);
          setPhMatchB([...user]);
        });

      return () => unSub();
    }
  }, [selectProfile.objectID]);

  // 上記の、申請後許可済みのユーザーIDを結合(選択ユーザーのつながり人数を計算)
  useEffect(() => {
    if (phMatchA && phMatchB) {
      setPhMatch([...phMatchA, ...phMatchB]);
    }
  }, [phMatchA, phMatchB]);

  ///////// JSXエリア /////////
  return (
    <div>
      <div className="grid grid-cols-12">
        {/* プロフィール検索(ページ左) */}
        <Search_L
          setDisabledState={setDisabledState}
          setPassId={setPassId}
          setPassData={setPassData}
          setReceiveId={setReceiveId}
          setReceiveData={setReceiveData}
        />

        {/* プロフィール描画(ページ右) */}
        {selectProfile && Object.keys(selectProfile).length ? (
          <Search_R
            disabledState={disabledState}
            phMatch={phMatch}
            passId={""}
            receiveId={""}
          />
        ) : (
          <div className="h-screen md:col-span-9 col-span-12 justify-self-center self-center md:pt-24">
            {/* 未選択時表示画像 */}
            <Image
              src="/pharmacists_search_img.png"
              alt="login_img"
              width={400}
              height={400}
            />
          </div>
        )}
      </div>
    </div>
  );
});
