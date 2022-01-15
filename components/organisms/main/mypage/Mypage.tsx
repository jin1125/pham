import Image from "next/image";
import Router from "next/router";
import React, {
  Dispatch,
  memo,
  useContext,
  useEffect,
  useState,
  VFC,
} from "react";
import Skeleton from "react-loading-skeleton";
import { auth, db, storage } from "../../../../firebase";
import { Profile } from "../../../../types/profile";
import { UserContext } from "../../../../UserContext";
import { MypageFreeImg } from "../../../molecules/free_img/MypageFreeImg";
import { ProfileDetails } from "./ProfileDetails";
import { ProfilePC } from "./ProfilePC";
import { ProfileSP1 } from "./ProfileSP1";
import { ProfileSP2 } from "./ProfileSP2";
import { ProfileStatus } from "./ProfileStatus";

type Props = {
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

export const Mypage: VFC<Props> = memo(({ setIsOpen }) => {
  ///////// ステートエリア /////////
  const [profile, setProfile] = useState<Profile>({});
  const [displayName, setDisplayName] = useState<string>("");
  const [demoImg, setDemoImg] = useState<string>("");
  const [demoImgs, setDemoImgs] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  // グローバルなステート
  const { userId, setUserId } = useContext(UserContext);
  
  ///////// 関数エリア /////////
  // ストレージからプロフィール＆フリーデモ画像取得
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

  // ユーザーID＆ユーザーネーム取得
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

  // firestoreからプロフィールデータ取得
  useEffect(() => {
    if (userId) {
      setLoading(true);
      
      const unSub = db
        .collection("userProfiles")
        .doc(userId)
        .onSnapshot((doc) => {
          if (doc.data()) {
            setProfile(doc.data());
            setLoading(false);
          }else{
            setLoading(false);
          }
        })

      return () => unSub();
    }
  }, [userId]);
  
  

  // 分割代入
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

  ///////// JSXエリア /////////
  return (
    <main className="grid grid-cols-12 my-10">
      <div 
        className="lg:col-span-3 col-span-12 text-center justify-self-center "
      >
        {loading ? (
          <Skeleton circle={true} height={200} width={200} />
        ) : profileImageUrl ? (
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

        {/* スマホ用プロフィール1 */}
        <div className="lg:hidden block">
          <ProfileSP1
            userName={userName}
            displayName={displayName}
            jobTitle={jobTitle}
            loading={loading}
          />
        </div>

        {/* プロフィールステータス */}
        <ProfileStatus
          scout={scout}
          userId={userId}
          setIsOpen={setIsOpen}
          loading={loading}
        />

        {/* スマホ用プロフィール2 */}
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
            loading={loading}
          />
        </div>

        {/* フリー画像 */}
        <MypageFreeImg
          demoImgs={demoImgs}
          freeImageUrl0={freeImageUrl0}
          freeImageUrl1={freeImageUrl1}
          freeImageUrl2={freeImageUrl2}
          loading={loading}
        />
      </div>

      {/* PC用プロフィール */}
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
            loading={loading}
          />
        </div>

        {/* プロフィール詳細 */}
        <ProfileDetails
          hobby={hobby}
          dream={dream}
          certification={certification}
          strongArea={strongArea}
          subjectArea={subjectArea}
          experiences={experiences}
          resumes={resumes}
          loading={loading}
        />
      </div>
    </main>
  );
});
