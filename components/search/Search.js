import Image from "next/image";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { UserContext } from "../../UserContext";
import { Search_L } from "./Search_L";
import { Search_R } from "./Search_R";

export const Search = () => {
  const [phMatch, setPhMatch] = useState([]);
  const [phMatchA, setPhMatchA] = useState([]);
  const [phMatchB, setPhMatchB] = useState([]);
  const [disabledState, setDisabledState] = useState("");
  const [passId, setPassId] = useState("");
  const [passData, setPassData] = useState("");
  const [receiveId, setReceiveId] = useState("");
  const [receiveData, setReceiveData] = useState("");

  const {
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

  useEffect(() => {
    if (userId && selectProfile.objectID) {
      let unSub = db
        .collection("phMatch")
        .where("pharmacistA", "==", selectProfile.objectID)
        .where("pharmacistB", "==", userId)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            setReceiveId(doc.id);
            setReceiveData(doc.data());
          });
        });

      return () => unSub();
    }
  }, [userId, selectProfile.objectID]);

  useEffect(() => {
    if (userId && selectProfile.objectID) {
      let unSub = db
        .collection("phMatch")
        .where("pharmacistA", "==", userId)
        .where("pharmacistB", "==", selectProfile.objectID)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            setPassId(doc.id);
            setPassData(doc.data());
          });
        });

      return () => unSub();
    }
  }, [userId, selectProfile.objectID]);


  useEffect(() => {
    if (passId) {
      setDisabledState("passed");
    }

    if (passData.requestB) {
      setDisabledState("match");
    }
  }, [passId, passData]);

  useEffect(() => {
    if (receiveId) {
      setDisabledState("received");
    }

    if (receiveData.requestB) {
      setDisabledState("match");
    }
  }, [receiveId, receiveData]);

  useEffect(() => {
    if (selectProfile) {
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
  }, [selectProfile]);

  useEffect(() => {
    if (selectProfile) {
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
  }, [selectProfile]);

  useEffect(() => {
    if (phMatchA && phMatchB) {
      setPhMatch([...phMatchA, ...phMatchB]);
    }
  }, [phMatchA, phMatchB]);

  return (
    <div>
      <div className="grid grid-cols-12">
        {/* ////// プロフィール検索(ページ左) ////// */}
        <Search_L setDisabledState={setDisabledState} setPassId={setPassId} setPassData={setPassData} setReceiveId={setReceiveId} setReceiveData={setReceiveData} receiveId={receiveId} passId={passId}/>

        {/* ////// プロフィール描画(ページ右) ////// */}
        {selectProfile ? (
          <Search_R disabledState={disabledState} phMatch={phMatch}/>
        ) : (
          <div className="h-screen md:col-span-9 col-span-12 justify-self-center self-center md:pt-24">
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
};
