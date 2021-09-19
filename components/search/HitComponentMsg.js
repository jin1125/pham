import { useContext, useEffect } from "react";
import { auth } from "../../firebase";
import { UserContext } from "../../UserContext";
import Hit from "./Hit";

export function hitComponentMsg({ hit }) {
  const {
    selectMsg, 
    setSelectMsg,
    userId,
    setUserId,
  } = useContext(UserContext);

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
