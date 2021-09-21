import { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { UserContext } from "../../UserContext";
import Hit from "./Hit";

export function hitComponentMsg({ hit }) {
  const {
    selectMsg, 
    setSelectMsg,
    userId,
    setUserId,
  } = useContext(UserContext);
  const [phMatch,setPhMatch] = useState('');

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
        .collection("phMatch")
        .where("pharmacistA", "==", userId)
        .where("requestB", "==", true)
        .onSnapshot((docs) => { 
          docs.forEach((doc)=>{
            setPhMatch(doc.data().pharmacistB)
          })
        });

        return () => unSub();
    }
}, [userId]);

  // console. log(hit);
  console.log(phMatch);

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
        {hit.objectID !== userId && (
          <Hit hit={hit} />
        ) }
      </div>
    </>
  );
}
