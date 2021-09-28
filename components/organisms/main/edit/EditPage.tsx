import Image from "next/image";
import Router from "next/router";
import React, { memo, useContext, useEffect, useState, VFC } from "react";
import { useAlert } from "react-alert";
import Loader from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";
import { auth, db, storage } from "../../../../firebase";
import { AllProfile } from "../../../../types/allProfile";
import { UserContext } from "../../../../UserContext";
import { EditFreeImg } from "../../../molecules/EditFreeImg";
import { EditDetails } from "./EditDetails";
import { EditPC } from "./EditPC";
import { EditSP1 } from "./EditSP1";
import { EditSP2 } from "./EditSP2";
import { EditStatus } from "./EditStatus";
import { Footer } from "./Footer";

export const EditPage: VFC = memo(() => {
  ////////////////// ステートエリア //////////////////
  const { userId, setUserId } = useContext(UserContext);

  const [profile, setProfile] = useState<AllProfile>({
    birthPlace: "",
    certification: "",
    comments: "",
    dobDD: "",
    dobMM: "",
    dobYY: "",
    dream: "",
    freeImageUrl0: "",
    freeImageUrl1: "",
    freeImageUrl2: "",
    hobby: "",
    homeAddress: "",
    jobTitle: "",
    language: "",
    profileImageUrl: "",
    school: "",
    scout: "",
    strongArea: "",
    subjectArea: "",
    userName: "",
    experiences: [{ experience: "", years: "" }],
    resumes: [
      { companyName: "", employmentStatus: "", workEnd: "", workStart: "" },
    ],
  });
  const [userEmail, setUserEmail] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [freeImage0, setFreeImage0] = useState<File | null>(null);
  const [freeImage1, setFreeImage1] = useState<File | null>(null);
  const [freeImage2, setFreeImage2] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [demoImg, setDemoImg] = useState<string>("");
  const [demoImgs, setDemoImgs] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(false);

  ////////////////// 関数エリア //////////////////

  const alert = useAlert();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setUserEmail(user.email);
        setDisplayName(user.displayName);
      } else {
        Router.push("/login");
      }
    });

    return () => unSub();
  }, []);

  useEffect(() => {
    if (userId) {
      setLoadingProfile(true);
      let unSub = db
        .collection("userProfiles")
        .doc(userId)
        .onSnapshot((doc) => {
          if (doc.data()) {
            setProfile({ ...profile, ...doc.data() });
            setLoadingProfile(false);
          } else {
            if (!profile.userName) {
              setProfile({ ...profile, userName: displayName });
              setLoadingProfile(false);
            }
          }
        });
      return () => unSub();
    }
  }, [userId, displayName]);

  useEffect(() => {
    (async () => {
      const url = await storage.ref().child("demo_img.png").getDownloadURL();
      setDemoImg(url);

      const Url = await storage.ref().child("demo_imgs.jpeg").getDownloadURL();
      setDemoImgs(Url);
    })();
  }, []);

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

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>):void => {
    if (e.target.files![0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrl(imageUrl);
      setProfileImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  /// 変更を保存ボタン処理 ///
  const editHandler = async ():Promise<void> => {
    setLoading(true);
    let profileUrl = "";
    let freeUrl0 = "";
    let freeUrl1 = "";
    let freeUrl2 = "";

    //アップロード画像があれば
    if (profileImage) {
      //画像をストレージにアップロード
      await storage.ref(`profileImages/${userId}`).put(profileImage);
      //画像がクラウド上のどこにあるかURLで取得
      profileUrl = await storage
        .ref("profileImages")
        .child(userId)
        .getDownloadURL();
      //アップロード画像がない && firestoreにデータがある
    } else if (!profileImage && profileImageUrl) {
      profileUrl = profileImageUrl;
    } else {
      profileUrl = "";
    }

    if (freeImage0) {
      await storage.ref(`freeImages/${userId}0`).put(freeImage0);
      freeUrl0 = await storage
        .ref("freeImages")
        .child(`${userId}0`)
        .getDownloadURL();
    } else if (!freeImage0 && freeImageUrl0) {
      //アップロード画像がない&&firestoreにデータがある
      freeUrl0 = freeImageUrl0;
    } else {
      freeUrl0 = "";
    }

    if (freeImage1) {
      await storage.ref(`freeImages/${userId}1`).put(freeImage1);
      freeUrl1 = await storage
        .ref("freeImages")
        .child(`${userId}1`)
        .getDownloadURL();
    } else if (!freeImage1 && freeImageUrl1) {
      //アップロード画像がない&&firestoreにデータがある
      freeUrl1 = freeImageUrl1;
    } else {
      freeUrl1 = "";
    }

    if (freeImage2) {
      await storage.ref(`freeImages/${userId}2`).put(freeImage2);
      freeUrl2 = await storage
        .ref("freeImages")
        .child(`${userId}2`)
        .getDownloadURL();
    } else if (!freeImage2 && freeImageUrl2) {
      //アップロード画像がない&&firestoreにデータがある
      freeUrl2 = freeImageUrl2;
    } else {
      freeUrl2 = "";
    }

    const profileInfo = {
      ...profile,
      profileImageUrl: profileUrl,
      freeImageUrl0: freeUrl0,
      freeImageUrl1: freeUrl1,
      freeImageUrl2: freeUrl2,
    };

    await db
      .collection("userProfiles")
      .doc(userId)
      .set(profileInfo)
      .then(() => {
        alert.success("プロフィールを変更しました");
      })
      .catch(() => {
        alert.error("プロフィールを変更できませんでした");
      })
      .finally(() => setLoading(false));
  };

  const check1: boolean =
    !userName || !scout || !homeAddress || !dobYY || !dobMM || !dobDD;

  return (
    <div>
      <div className="grid lg:grid-cols-12 2xl:px-10 md:px-5 my-10">
        <div className="lg:col-span-3 col-span-12 text-center justify-self-center">
          <label>
            {loadingProfile ? (
              <Skeleton circle={true} height={200} width={200} />
            ) : fileUrl ? (
              <Image
                className="inline object-cover mr-2 rounded-full cursor-pointer"
                width={200}
                height={200}
                src={fileUrl}
                alt="Profile image"
              />
            ) : profileImageUrl ? (
              <Image
                className="inline object-cover mr-2 rounded-full cursor-pointer"
                width={200}
                height={200}
                src={profileImageUrl}
                alt="Profile image"
              />
            ) : (
              demoImg && (
                <Image
                  className="inline object-cover mr-2 rounded-full cursor-pointer"
                  width={200}
                  height={200}
                  src={demoImg}
                  alt="Profile image"
                />
              )
            )}

            <input
              className="hidden"
              accept="image/*"
              type="file"
              onChange={uploadImage}
            />
          </label>

          <div className="lg:hidden block">
            <EditSP1
              profile={profile}
              setProfile={setProfile}
              userName={userName}
              jobTitle={jobTitle}
              loadingProfile={loadingProfile}
            />
          </div>

          <EditStatus
            profile={profile}
            setProfile={setProfile}
            scout={scout}
            loadingProfile={loadingProfile}
          />

          <div className="lg:hidden block px-5 md:px-0">
            <EditSP2
              profile={profile}
              setProfile={setProfile}
              userId={userId}
              homeAddress={homeAddress}
              dobYY={dobYY}
              dobMM={dobMM}
              dobDD={dobDD}
              school={school}
              birthPlace={birthPlace}
              language={language}
              comments={comments}
              loadingProfile={loadingProfile}
            />
          </div>

          <EditFreeImg
            setFreeImage0={setFreeImage0}
            setFreeImage1={setFreeImage1}
            setFreeImage2={setFreeImage2}
            freeImageUrl0={freeImageUrl0}
            freeImageUrl1={freeImageUrl1}
            freeImageUrl2={freeImageUrl2}
            demoImgs={demoImgs}
            loadingProfile={loadingProfile}
          />
        </div>

        <div className="lg:col-span-9 col-span-12">
          <div className="lg:block hidden">
            <EditPC
              profile={profile}
              setProfile={setProfile}
              userName={userName}
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
              loadingProfile={loadingProfile}
            />
          </div>

          <EditDetails
            profile={profile}
            setProfile={setProfile}
            hobby={hobby}
            dream={dream}
            certification={certification}
            strongArea={strongArea}
            subjectArea={subjectArea}
            experiences={experiences}
            resumes={resumes}
            loadingProfile={loadingProfile}
          />

          {/* ////// 変更を保存 ////// */}
          <div>
            <div className="mt-5 mb-10 text-center">
              <button
                className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 disabled:bg-blue-200 py-2 w-1/2 rounded-full shadow-lg font-bold"
                onClick={editHandler}
                disabled={check1}
              >
                {loading ? (
                  <div className="flex justify-center">
                    <Loader
                      type="Watch"
                      color="#FFFFFF"
                      height={30}
                      width={30}
                    />
                  </div>
                ) : (
                  "変更を保存"
                )}
              </button>
              {check1 && (
                <p className="text-red-500 text-xs mt-2">
                  *必須項目を入力しましょう
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr />

      <Footer userEmail={userEmail} setUserEmail={setUserEmail} />
    </div>
  );
});
