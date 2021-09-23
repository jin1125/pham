import { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { UserContext } from "../../UserContext";
import { HitCo } from "./HitCo";

export function hitComponentCoMsg({ hit }) {
  const { selectMsg, setSelectMsg, userId, setUserId } =
    useContext(UserContext);
  const [coMatch, setCoMatch] = useState([]);

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

  const click = () => {
    setSelectMsg(hit);
  };

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
