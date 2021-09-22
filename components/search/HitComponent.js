import { useContext, useEffect } from "react";
import { auth } from "../../firebase";
import { UserContext } from "../../UserContext";
import {Hit} from "./Hit";

export function hitComponent({ hit }) {
  const {
    selectHomeAddress,
    setSelectProfile,
    selectProfile,
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
    setSelectProfile(hit);
  };

  return (
    <>
      <div
        onClick={click}
        className={
          selectProfile.objectID === hit.objectID
            ? "bg-blue-100 cursor-pointer"
            : "cursor-pointer hover:bg-blue-100"
        }
      >
        {selectHomeAddress === "" && hit.objectID !== userId ? (
          <Hit hit={hit} />
        ) : (
          hit.homeAddress === selectHomeAddress &&
          hit.objectID !== userId && <Hit hit={hit} />
        )}
      </div>
    </>
  );
}
