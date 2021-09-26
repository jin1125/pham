import Image from "next/image";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../../../../firebase";
import { UserContext } from "../../../../UserContext";
import { MypageFreeImg } from "../../../molecules/MypageFreeImg";
import { ProfileDetails } from "./ProfileDetails";
import { ProfilePC } from "./ProfilePC";
import { ProfileSP1 } from "./ProfileSP1";
import { ProfileSP2 } from "./ProfileSP2";
import { ProfileStatus } from "./ProfileStatus";

export const Mypage = ({ setIsOpen }) => {
  const { userId, setUserId } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [displayName, setDisplayName] = useState("");
  const [demoImg, setDemoImg] = useState("");
  const [demoImgs, setDemoImgs] = useState("");

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const url = await storage.ref().child("demo_img.png").getDownloadURL();
      const Url = await storage.ref().child("demo_imgs.jpeg").getDownloadURL();
      if (isMounted) {
        setDemoImg(url);
        setDemoImgs(Url);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setDisplayName(user.displayName);
      } else {
        Router.push("/login");
      }
    });

    return () => unSub();
  }, []);

  useEffect(() => {
    if (userId) {
      const unSub = db
        .collection("userProfiles")
        .doc(userId)
        .onSnapshot((doc) => {
          if (doc.data()) {
            setProfile(doc.data());
          }
        });
      return () => unSub();
    }
  }, [userId]);

  const {
    birthPlace,
    certification,
    comments,
    dobDD,
    dobMM,
    dobYY,
    dream,
    experiences,
    freeImageUrl0,
    freeImageUrl1,
    freeImageUrl2,
    hobby,
    homeAddress,
    jobTitle,
    language,
    profileImageUrl,
    resumes,
    school,
    scout,
    strongArea,
    subjectArea,
    userName,
  } = profile;

  return (
    <main className="grid grid-cols-12 my-10">
      <div className="lg:col-span-3 col-span-12 text-center justify-self-center ">
        {profileImageUrl ? (
          <Image
            className="inline object-cover mr-2 rounded-full"
            width={200}
            height={200}
            src={profileImageUrl}
            alt="Profile image"
          />
        ) : (
          demoImg && (
            <Image
              className="inline object-cover mr-2 rounded-full"
              width={200}
              height={200}
              src={demoImg}
              alt="Profile image"
            />
          )
        )}

        <div className="lg:hidden block">
          <ProfileSP1
            userName={userName}
            displayName={displayName}
            jobTitle={jobTitle}
          />
        </div>

        <ProfileStatus scout={scout} userId={userId} setIsOpen={setIsOpen} />

        <div className="lg:hidden block px-5">
          <ProfileSP2
            userId={userId}
            homeAddress={homeAddress}
            dobYY={dobYY}
            dobMM={dobMM}
            dobDD={dobDD}
            school={school}
            birthPlace={birthPlace}
            language={language}
            comments={comments}
          />
        </div>

        <MypageFreeImg
          demoImgs={demoImgs}
          freeImageUrl0={freeImageUrl0}
          freeImageUrl1={freeImageUrl1}
          freeImageUrl2={freeImageUrl2}
        />
      </div>

      <div className="lg:col-span-9 col-span-12 px-10 md:px-20 lg:px-0">
        <div className="lg:block hidden">
          <ProfilePC
            userName={userName}
            displayName={displayName}
            jobTitle={jobTitle}
            userId={userId}
            homeAddress={homeAddress}
            dobYY={dobYY}
            dobMM={dobMM}
            dobDD={dobDD}
            school={school}
            birthPlace={birthPlace}
            language={language}
            comments={comments}
          />
        </div>

        <ProfileDetails
          hobby={hobby}
          dream={dream}
          certification={certification}
          strongArea={strongArea}
          subjectArea={subjectArea}
          experiences={experiences}
          resumes={resumes}
        />
      </div>
    </main>
  );
};
