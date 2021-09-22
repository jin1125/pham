import { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { UserContext } from "../../UserContext";
import {Hit} from "./Hit";

export function hitComponentMsg({ hit }) {
  const { selectMsg, setSelectMsg, userId, setUserId } =
    useContext(UserContext);
  const [phMatch, setPhMatch] = useState([]);
  const [phMatchA, setPhMatchA] = useState([]);
  const [phMatchB, setPhMatchB] = useState([]);

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
        .onSnapshot((snapshot) => {
          const user = snapshot.docs.map((doc) => doc.data().pharmacistB);
          setPhMatchA([...user]);
        });

      return () => unSub();
    }
  }, [userId]);

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

  useEffect(() => {
    if (phMatchA && phMatchB) {
      setPhMatch([...phMatchA, ...phMatchB]);
    }
  }, [phMatchA, phMatchB]);

  // console.log(phMatchA);
  // console.log(phMatchB);
  // console.log(phMatch);

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
                <Hit hit={hit} />
              </div>
            )
        )}
      </div>
    </>
  );
}
