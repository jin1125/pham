import React, { useEffect, useState } from 'react'
import { Emoji } from "emoji-mart";
import { db } from '../../../../firebase';

export const ProfileStatus = ({ setIsOpen,scout,userId }) => {
  const [phMatch, setPhMatch] = useState([]);
  const [phMatchA, setPhMatchA] = useState([]);
  const [phMatchB, setPhMatchB] = useState([]);

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

  const connect = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <div className="flex flex-row flex-wrap my-5 justify-center gap-1 items-center">
          <Emoji emoji="handshake" size={20} />
          <p className="text-base">{`${phMatch.length}人`}</p>
          <button
            className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-1 px-2 mx-2 rounded-full shadow-lg text-xs"
            onClick={connect}
          >
            リクエスト
          </button>
        </div>

        {scout && (
          <div className="flex flex-row flex-wrap mt-5 mb-10 justify-center gap-1 items-center">
            <Emoji emoji="female-detective" size={20} />
            <p className="text-base">{scout}</p>
          </div>
        )}
    </div>
  )
}
