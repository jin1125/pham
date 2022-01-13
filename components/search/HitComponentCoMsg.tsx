import { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";

import { HitCo } from "./HitCo";
import { UserContext } from "../../UserContext";

export function hitComponentCoMsg({ hit }) {
  ///////// ステートエリア /////////
  const [coMatch, setCoMatch] = useState([]);
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

  // 自分から申請して許可済みの企業ID取得
  useEffect(() => {
    if (userId) {
      let unSub = db
        .collection("coMatch")
        .where("pharmacist", "==", userId)
        .where("requestCo", "==", true)
        .onSnapshot((snapshot) => {
          const user = snapshot.docs.map((doc) => doc.data().company);
          setCoMatch([...user]);
        });

      return () => unSub();
    }
  }, [userId]);

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
        {coMatch.map(
          (co, index) =>
            co === hit.objectID && (
              <div key={index}>
                <HitCo hit={hit} />
              </div>
            )
        )}
      </div>
    </>
  );
}
