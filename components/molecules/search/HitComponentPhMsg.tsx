import { useContext, useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { UserContext } from "../../../UserContext";
import { HitPh } from "../../atoms/search/HitPh";

export function hitComponentPhMsg({ hit }) {
  ///////// ステートエリア /////////
  const [phMatch, setPhMatch] = useState([]);
  const [phMatchA, setPhMatchA] = useState([]);
  const [phMatchB, setPhMatchB] = useState([]);
  
  // グローバルなステート
  const { selectMsg, setSelectMsg, userId, setUserId } =
    useContext(UserContext);

  ///////// 関数エリア /////////
  //ユーザーID取得
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unSub();
  }, []);

  // 選んだ検索結果を取得
  const click = (): void => {
    setSelectMsg(hit);
  };

  // 自分から申請して許可済みのユーザーID取得
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

  // 相手から申請して許可済みのユーザーID取得
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

  // 上記の、申請許可済みユーザーIDを結合(マッチしているユーザーIDを取得)
  useEffect(() => {
    if (phMatchA && phMatchB) {
      setPhMatch([...phMatchA, ...phMatchB]);
    }
  }, [phMatchA, phMatchB]);

  ///////// JSXエリア /////////
  return (
    <>
      <div
        onClick={click}
        className={
          selectMsg.objectID === hit.objectID
            ? "bg-blue-100 cursor-pointer"
            : "cursor-pointer hover:bg-blue-100"
        }
      >
        {phMatch.map(
          (ph, index) =>
            ph === hit.objectID && (
              <div key={index}>
                <HitPh hit={hit} />
              </div>
            )
        )}
      </div>
    </>
  );
}
