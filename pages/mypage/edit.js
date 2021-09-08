import { Emoji } from "emoji-mart";
import firebase from "firebase/app";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import React, { useContext, useState } from "react";
import { useAlert } from "react-alert";
import Layout from "../../components/layout/Layout";
import { auth, db, storage } from "../../firebase";
import { UserContext } from "../../UserContext";

export default function edit() {
  ////////////////// ステートエリア //////////////////
  const {
    userId,
    setUserId,
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    demoImg,
    setDemoImg,
    demoImgs,
    setDemoImgs,
    nameTrigger,
    setNameTrigger,
    profileId,
    setProfileId,
    profileImageUrl,
    setProfileImageUrl,
    freeImageUrl0,
    setFreeImageUrl0,
    freeImageUrl1,
    setFreeImageUrl1,
    freeImageUrl2,
    setFreeImageUrl2,
    jobTitle,
    setJobTitle,
    homeAddress,
    setHomeAddress,
    dobYY,
    setDobYY,
    dobMM,
    setDobMM,
    dobDD,
    setDobDD,
    school,
    setSchool,
    birthPlace,
    setBirthPlace,
    language,
    setLanguage,
    comments,
    setComments,
    hobby,
    setHobby,
    dream,
    setDream,
    certification,
    setCertification,
    strongArea,
    setStrongArea,
    subjectArea,
    setSubjectArea,
    connection,
    setConnection,
    scout,
    setScout,
    experiences,
    setExperiences,
    resumes,
    setResumes,
  } = useContext(UserContext);

  const [profileImage, setProfileImage] = useState("");
  const [freeImage0, setFreeImage0] =  useState("");
  const [freeImage1, setFreeImage1] =  useState("");
  const [freeImage2, setFreeImage2] =  useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileUrls0, setFileUrls0] = useState("");
  const [fileUrls1, setFileUrls1] = useState("");
  const [fileUrls2, setFileUrls2] = useState("");

  ////////////////// 関数エリア //////////////////
  const alert = useAlert();
  const uploadImage = (e) => {

    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrl(imageUrl);
      setProfileImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  // const uploadImages = (e,index) => {
  //   if (e.target.files[0]) {
  //     const imageFile = e.target.files[0];
  //     const imageUrl = URL.createObjectURL(imageFile);
  //     const lists = [...fileUrls]
  //     const frees = [...freeImage]
  //     lists[index] = imageUrl;
  //     frees[index] = e.target.files[0]
  //     setFileUrls(lists);
  //     setFreeImage(frees);
  //     e.target.value = "";
  //   }
  // };

  const uploadFreeImage0 = (e) => {

    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrls0(imageUrl);
      setFreeImage0(e.target.files[0]);
      e.target.value = "";
    }
  };

  const uploadFreeImage1 = (e) => {

    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrls1(imageUrl);
      setFreeImage1(e.target.files[0]);
      e.target.value = "";
    }
  };

  const uploadFreeImage2 = (e) => {

    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrls2(imageUrl);
      setFreeImage2(e.target.files[0]);
      e.target.value = "";
    }
  };

  /// 変更を保存ボタン処理 ///
  const editHandler = async () => {
    let profileUrl = "";
    let freeUrl0 = "";
    let freeUrl1 = "";
    let freeUrl2 = "";

    if (profileImage) {
      //画像をストレージにアップロード
      await storage.ref(`profileImages/${userId}`).put(profileImage);
      //画像がクラウド上のどこにあるかURLで取得
      profileUrl = await storage.ref("profileImages").child(userId).getDownloadURL();
    } else {
      profileUrl = profileImageUrl;
    }

    if (freeImage0) {
      await storage.ref(`freeImages/${userId}0`).put(freeImage0);
      freeUrl0 = await storage.ref("freeImages").child(`${userId}0`).getDownloadURL();
    } else {
      freeUrl0 = freeImageUrl0;
    }

    if (freeImage1) {
      await storage.ref(`freeImages/${userId}1`).put(freeImage1);
      freeUrl1 = await storage.ref("freeImages").child(`${userId}1`).getDownloadURL();
    } else {
      freeUrl1 = freeImageUrl1;
    }

    if (freeImage2) {
      await storage.ref(`freeImages/${userId}2`).put(freeImage2);
      freeUrl2 = await storage.ref("freeImages").child(`${userId}2`).getDownloadURL();
    } else {
      freeUrl2 = freeImageUrl2;
    }



    const profileInformation = {
      profileImageUrl: profileUrl,
      freeImageUrl0: freeUrl0,
      freeImageUrl1: freeUrl1,
      freeImageUrl2: freeUrl2,
      connection: connection,
      scout: scout,
      jobTitle: jobTitle,
      homeAddress: homeAddress,
      dobYY: dobYY,
      dobMM: dobMM,
      dobDD: dobDD,
      school: school,
      birthPlace: birthPlace,
      language: language,
      comments: comments,
      hobby: hobby,
      dream: dream,
      certification: certification,
      strongArea: strongArea,
      subjectArea: subjectArea,
      experiences: experiences,
      resumes: resumes,
    };

    /// 名前変更処理 ///
    const user = auth.currentUser;
    console.log(user);
    user.updateProfile({
      displayName: userName,
    });

    await db
      .collection("userProfiles")
      .doc(userId)
      .set(profileInformation)
      .then(() => {
        alert.success("プロフィールを変更しました");
      })
      .catch(() => {
        alert.error("プロフィールを変更できませんでした");
      });
  };

  ///////////////////////////////////////////////

  const changeExperience = (e, index) => {
    const list = [...experiences];
    list[index] = {
      experience: e.target.value,
      years: list[index].years,
    };
    setExperiences(list);
  };

  const changeYears = (e, index) => {
    const list = [...experiences];
    list[index] = {
      experience: list[index].experience,
      years: e.target.value,
    };
    setExperiences(list);
  };

  const addExperience = () => {
    const list = [...experiences];
    list.push({ experience: "", years: "" });
    setExperiences(list);
  };

  const deleteExperience = (index) => {
    const list = [...experiences];
    list.splice(index, 1);
    setExperiences(list);
  };

  const changeCompanyName = (e, index) => {
    const list = [...resumes];
    list[index] = {
      companyName: e.target.value,
      employmentStatus: list[index].employmentStatus,
      workStart: list[index].workStart,
      workEnd: list[index].workEnd,
    };

    setResumes(list);
  };

  const changeEmploymentStatus = (e, index) => {
    const list = [...resumes];
    list[index] = {
      companyName: list[index].companyName,
      employmentStatus: e.target.value,
      workStart: list[index].workStart,
      workEnd: list[index].workEnd,
    };

    setResumes(list);
  };

  const changeWorkStart = (e, index) => {
    const list = [...resumes];
    list[index] = {
      companyName: list[index].companyName,
      employmentStatus: list[index].employmentStatus,
      workStart: e.target.value,
      workEnd: list[index].workEnd,
    };

    setResumes(list);
  };

  const changeWorkEnd = (e, index) => {
    const list = [...resumes];
    list[index] = {
      companyName: list[index].companyName,
      employmentStatus: list[index].employmentStatus,
      workStart: list[index].workStart,
      workEnd: e.target.value,
    };

    setResumes(list);
  };

  const addResume = () => {
    const list = [...resumes];
    list.push({
      companyName: "",
      employmentStatus: "",
      workStart: "",
      workEnd: "",
    });
    setResumes(list);
  };

  const deleteResume = (index) => {
    const list = [...resumes];
    list.splice(index, 1);
    setResumes(list);
  };

  ///////////////////////////////////////////////
  /// メールアドレス変更処理 ///
  const changeEmail = () => {
    // const result = confirm("メールアドレスを変更してもよろしいですか?");

    // if (result) {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        // ログインしていれば中通る
        console.log(user);

        // const userInfo = auth.currentUser;

        // console.log(userInfo);
        console.log(userEmail);

        user
          .updateEmail(userEmail)
          .then(() => {
            alert.success("メールアドレスを変更しました");
          })
          .catch((error) => {
            alert.error("メールアドレスを変更できませんでした");
          });
      }

      // 登録解除
      unsub();
    });

    // } else {
    //   alert.error("変更をキャンセルしました");
    // }
  };

  // function reauthenticateWithCredential() {

  //   const unsub = auth.onAuthStateChanged((user) => {

  //     console.log(user);

  //     // /**
  //     //  * @returns {object}
  //     //  */
  //     // function promptForCredentials() {
  //     //   return {};
  //     // }

  //     const credential = firebase.auth.EmailAuthProvider.credential(
  //       user.email,
  //       user.password,
  //     )

  //     // const credential = promptForCredentials();

  //     if (user) {
  //       // ログインしていれば中通る
  //       user.reauthenticateWithCredential(credential).then(() => {
  //         console.log('OK');
  //       }).catch((error) => {
  //         console.log('NG');
  //       });
  //     }
  //     // 登録解除
  //     unsub();
  //   });
  // }

  // reauthenticateWithCredential();

  /////////////////////////////////////////////////////

  /// パスワード変更処理 ///
  const sendResetEmail = async () => {
    await auth
      .sendPasswordResetEmail(userEmail)
      .then(() => {
        alert.success("メールを送信しました");
      })
      .catch(() => {
        alert.error("正しい内容を入力してください");
      });
  };

  /// ログアウト処理 ///
  const signOutUser = async () => {
    const result = confirm("ログアウトしますか？");
    if (result) {
      try {
        await auth.signOut();
        alert.success("ログアウトしました");
        Router.push("/login");
      } catch (error) {
        alert.error("ログアウトできませんでした");
      }
    }
  };

  /// 退会処理 ///
  const deleteUser = () => {
    const user = firebase.auth().currentUser;

    user
      .delete()
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };

  /// disabled判定処理 ///
  const check1 = !userName || !homeAddress || !dobYY || !dobMM || !dobDD;

  console.log(demoImgs);

  ////////////////// JSXエリア //////////////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham プロフィール変更</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="grid grid-cols-12 gap-10 m-10">
          <div className="col-span-3 justify-self-center">
            <label>
              {fileUrl ? (
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
              {/* <span className="text-red-500 align-top">*</span> */}

              <input
                className="hidden"
                accept="image/*"
                type="file"
                onChange={uploadImage}
              />
            </label>

            {/* /// スカウト受信設定 /// */}
            <div className="flex flex-row flex-wrap my-10 justify-center gap-1 items-center">
              <Emoji emoji="female-detective" size={20} />
              <select
                className="bg-blue-100 rounded-full pl-3 py-1"
                name="scout"
                value={scout}
                onChange={(e) => setScout(e.target.value)}
              >
                <option value="スカウトを受け取る">スカウトを受け取る</option>
                <option value="スカウトを受け取らない">
                  スカウトを受け取らない
                </option>
              </select>
            </div>

            {/* /// フリー画像アップロード0 /// */}
            <div className="my-5">

            <label>
              {fileUrls0 ? (
                <Image
                  className="inline object-cover mr-2 cursor-pointer"
                  width={200}
                  height={200}
                  src={fileUrls0}
                  alt="Free image0"
                />
              ) : freeImageUrl0 ? (
                <Image
                  className="inline object-cover mr-2 cursor-pointer"
                  width={200}
                  height={200}
                  src={freeImageUrl0}
                  alt="Free image0"
                />
              ) : (
                demoImgs && (
                  <Image
                    className="inline object-cover mr-2 cursor-pointer"
                    width={200}
                    height={200}
                    src={demoImgs}
                    alt="Free image0"
                  />
                )
              )}

              <input
                className="hidden"
                accept="image/*"
                type="file"
                onChange={uploadFreeImage0}
              />
            </label>

            </div>
            {/* /// フリー画像アップロード1 /// */}
            <div className="my-5">

            <label>
              {fileUrls1 ? (
                <Image
                  className="inline object-cover mr-2 cursor-pointer"
                  width={200}
                  height={200}
                  src={fileUrls1}
                  alt="Free image1"
                />
              ) : freeImageUrl1 ? (
                <Image
                  className="inline object-cover mr-2 cursor-pointer"
                  width={200}
                  height={200}
                  src={freeImageUrl1}
                  alt="Free image1"
                />
              ) : (
                demoImgs && (
                  <Image
                    className="inline object-cover mr-2 cursor-pointer"
                    width={200}
                    height={200}
                    src={demoImgs}
                    alt="Free image1"
                  />
                )
              )}

              <input
                className="hidden"
                accept="image/*"
                type="file"
                onChange={uploadFreeImage1}
              />
            </label>

            </div>
            {/* /// フリー画像アップロード2 /// */}
            <div className="my-5">

            <label>
              {fileUrls2 ? (
                <Image
                  className="inline object-cover mr-2 cursor-pointer"
                  width={200}
                  height={200}
                  src={fileUrls2}
                  alt="Free image2"
                />
              ) : freeImageUrl2 ? (
                <Image
                  className="inline object-cover mr-2 cursor-pointer"
                  width={200}
                  height={200}
                  src={freeImageUrl2}
                  alt="Free image2"
                />
              ) : (
                demoImgs && (
                  <Image
                    className="inline object-cover mr-2 cursor-pointer"
                    width={200}
                    height={200}
                    src={demoImgs}
                    alt="Free image2"
                  />
                )
              )}

              <input
                className="hidden"
                accept="image/*"
                type="file"
                onChange={uploadFreeImage2}
              />
            </label>

            </div>
          </div>

          <div className="col-span-9">
            <div className="flex flex-row flex-wrap items-end my-10 gap-8">
              <label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value.trim())}
                  placeholder="姓 名"
                  name="name"
                  maxLength="15"
                  className="text-4xl font-bold bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
                />
                <span className="text-red-500 align-top">*</span>
              </label>

              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value.trim())}
                placeholder="役職"
                name="jobTitle"
                maxLength="15"
                className="text-xl font-bold text-blue-400 bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
              />
            </div>

            <div className="flex flex-row flex-wrap items-center my-3 gap-1 leading-none">
              <Emoji emoji="id" size={20} />
              <p className="text-base">{userId}</p>
            </div>

            <div className="flex flex-row flex-wrap my-5 gap-6 leading-none">
              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="round_pushpin" size={20} />
                <label>
                  <input
                    type="text"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value.trim())}
                    placeholder="住所(〜市区郡)"
                    name="homeAddress"
                    maxLength="10"
                    className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
                  />
                  <span className="text-red-500 align-top">*</span>
                </label>
              </div>

              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="birthday" size={20} />
                <label>
                  <select
                    className="bg-blue-100 rounded-full pl-3 py-1"
                    name="dobYY"
                    value={dobYY}
                    onChange={(e) => setDobYY(e.target.value)}
                  >
                    <option value="">生年</option>
                    <option value="1950">1950</option>
                    <option value="1951">1951</option>
                    <option value="1952">1952</option>
                    <option value="1953">1953</option>
                    <option value="1954">1954</option>
                    <option value="1955">1955</option>
                    <option value="1956">1956</option>
                    <option value="1957">1957</option>
                    <option value="1958">1958</option>
                    <option value="1959">1959</option>
                    <option value="1960">1960</option>
                    <option value="1961">1961</option>
                    <option value="1962">1962</option>
                    <option value="1963">1963</option>
                    <option value="1964">1964</option>
                    <option value="1965">1965</option>
                    <option value="1966">1966</option>
                    <option value="1967">1967</option>
                    <option value="1968">1968</option>
                    <option value="1969">1969</option>
                    <option value="1970">1970</option>
                    <option value="1971">1971</option>
                    <option value="1972">1972</option>
                    <option value="1973">1973</option>
                    <option value="1974">1974</option>
                    <option value="1975">1975</option>
                    <option value="1976">1976</option>
                    <option value="1977">1977</option>
                    <option value="1978">1978</option>
                    <option value="1979">1979</option>
                    <option value="1980">1980</option>
                    <option value="1981">1981</option>
                    <option value="1982">1982</option>
                    <option value="1983">1983</option>
                    <option value="1984">1984</option>
                    <option value="1985">1985</option>
                    <option value="1986">1986</option>
                    <option value="1987">1987</option>
                    <option value="1988">1988</option>
                    <option value="1989">1989</option>
                    <option value="1990">1990</option>
                    <option value="1991">1991</option>
                    <option value="1992">1992</option>
                    <option value="1993">1993</option>
                    <option value="1994">1994</option>
                    <option value="1995">1995</option>
                    <option value="1996">1996</option>
                    <option value="1997">1997</option>
                    <option value="1998">1998</option>
                    <option value="1999">1999</option>
                  </select>
                  <span className="text-red-500 align-top">*</span>
                </label>
                <p>/</p>
                <label>
                  <select
                    className="bg-blue-100 rounded-full pl-3 py-1"
                    name="dobMM"
                    value={dobMM}
                    onChange={(e) => setDobMM(e.target.value)}
                  >
                    <option value="">生月</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  <span className="text-red-500 align-top">*</span>
                </label>
                <p>/</p>
                <label>
                  <select
                    className="bg-blue-100 rounded-full pl-3 py-1"
                    name="dobDD"
                    value={dobDD}
                    onChange={(e) => setDobDD(e.target.value)}
                  >
                    <option value="">生日</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                  <span className="text-red-500 align-top">*</span>
                </label>
              </div>

              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="school" size={20} />
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value.trim())}
                  placeholder="出身校"
                  name="school"
                  maxLength="10"
                  className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
                />
                <p className="text-base">卒業</p>
              </div>

              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="baby" size={20} />
                <input
                  type="text"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value.trim())}
                  placeholder="出身地"
                  name="birthPlace"
                  maxLength="10"
                  className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
                />
                <p className="text-base">出身</p>
              </div>

              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="speaking_head_in_silhouette" size={20} />
                <input
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value.trim())}
                  placeholder="話せる言語"
                  name="language"
                  maxLength="15"
                  className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
                />
              </div>
            </div>

            <div className="my-12">
              <textarea
                rows="5"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="自己紹介"
                maxLength="200"
                className="bg-blue-100 rounded-lg p-5 w-full outline-none"
              />
            </div>

            <div className="my-10">
              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="camping" size={20} />
                <p className="text-base font-bold">趣味</p>
              </div>

              <input
                type="text"
                value={hobby}
                name="hobby"
                onChange={(e) => setHobby(e.target.value.trim())}
                maxLength="30"
                className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full"
              />
            </div>

            <div className="my-10">
              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="thought_balloon" size={20} />
                <p className="text-base font-bold">将来の夢</p>
              </div>

              <input
                type="text"
                value={dream}
                name="dream"
                maxLength="30"
                onChange={(e) => setDream(e.target.value.trim())}
                className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full"
              />
            </div>

            <div className="my-10">
              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="pencil2" size={20} />
                <p className="text-base font-bold">資格</p>
              </div>
              <input
                type="text"
                value={certification}
                name="certification"
                maxLength="30"
                onChange={(e) => setCertification(e.target.value.trim())}
                className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full"
              />
            </div>

            <div className="my-10">
              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="muscle" size={20} />
                <p className="text-base font-bold">得意な業務</p>
              </div>
              <input
                type="text"
                value={strongArea}
                name="strongArea"
                maxLength="30"
                onChange={(e) => setStrongArea(e.target.value.trim())}
                className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full"
              />
            </div>

            <div className="my-10">
              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="pill" size={20} />
                <p className="text-base font-bold">経験科目</p>
              </div>
              <input
                type="text"
                value={subjectArea}
                name="subjectArea"
                maxLength="30"
                onChange={(e) => subjectArea(e.target.value.trim())}
                className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full"
              />
            </div>

            <div className="my-10">
              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="hourglass_flowing_sand" size={20} />
                <p className="text-base font-bold">経験年数</p>
                <button
                  className="text-white bg-blue-400 hover:bg-blue-300 py-1 px-2 ml-1 rounded-full shadow-lg text-xs"
                  onClick={addExperience}
                >
                  欄を追加
                </button>
              </div>
              {experiences.map((ex, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 items-center"
                >
                  <div className="grid grid-cols-12 my-1 col-span-8 gap-1 items-center">
                    <input
                      type="text"
                      value={ex.experience}
                      name="experience"
                      maxLength="15"
                      placeholder="一般薬剤師/管理薬剤師など"
                      onChange={(e) => changeExperience(e, index)}
                      className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full col-span-10"
                    />
                    <p className="text-base col-span-2">経験</p>
                  </div>
                  <div className="grid grid-cols-2 my-1 col-span-3 gap-1 items-center">
                    <input
                      type="text"
                      value={ex.years}
                      name="years"
                      maxLength="15"
                      onChange={(e) => changeYears(e, index)}
                      className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none"
                    />
                    <p className="text-base">年程度</p>
                  </div>
                  <div className="col-span-1">
                    <button
                      className="text-white bg-gray-400 hover:bg-gray-300 py-1 px-2 rounded-full shadow-lg text-xs"
                      onClick={() => deleteExperience(index)}
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-10">
              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="page_facing_up" size={20} />
                <p className="text-base font-bold">経歴詳細</p>
                <button
                  className="text-white bg-blue-400 hover:bg-blue-300 py-1 px-2 ml-1 rounded-full shadow-lg text-xs"
                  onClick={addResume}
                >
                  欄を追加
                </button>
              </div>
              {resumes.map((re, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 items-center"
                >
                  <input
                    type="text"
                    value={re.companyName}
                    name="companyName"
                    maxLength="15"
                    placeholder="企業名"
                    onChange={(e) => changeCompanyName(e, index)}
                    className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full col-span-4 my-1"
                  />

                  <input
                    type="text"
                    value={re.employmentStatus}
                    name="employmentStatus"
                    maxLength="10"
                    placeholder="雇用形態"
                    onChange={(e) => changeEmploymentStatus(e, index)}
                    className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full col-span-2 my-1"
                  />

                  <input
                    type="text"
                    value={re.workStart}
                    name="workStart"
                    maxLength="10"
                    placeholder="いつから"
                    onChange={(e) => changeWorkStart(e, index)}
                    className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full col-span-2 my-1"
                  />

                  <p className="col-span-1 justify-self-center">~</p>

                  <input
                    type="text"
                    value={re.workEnd}
                    name="workEnd"
                    maxLength="10"
                    placeholder="いつまで"
                    onChange={(e) => changeWorkEnd(e, index)}
                    className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full col-span-2 my-1"
                  />

                  <div className="col-span-1">
                    <button
                      className="text-white bg-gray-400 hover:bg-gray-300 py-1 px-2 rounded-full shadow-lg text-xs"
                      onClick={() => deleteResume(index)}
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ////// 変更を保存 ////// */}
        <div>
          <div className="mt-5 mb-10 text-center">
            <button
              className="text-white bg-blue-400 hover:bg-blue-300 disabled:bg-blue-200 py-2 w-1/2 rounded-full shadow-lg font-bold"
              onClick={editHandler}
              disabled={check1}
            >
              変更を保存
            </button>
            {check1 && (
              <p className="text-red-500 text-xs mt-2">
                *必須項目を入力しましょう
              </p>
            )}
          </div>
        </div>
        <hr />

        {/* ////// メールアドレス＆パスワード変更 ////// */}
        <div className="grid grid-cols-2 my-10 justify-items-center">
          <div className="w-full text-center">
            <p className="font-bold">メールアドレス変更</p>
            <label>
              <p>新しいメールアドレス</p>
            <input
              className="text-base bg-blue-100 placeholder-blue-300 rounded-full py-1 outline-none my-3 text-center w-3/5"
              placeholder="email@example.com"
              name="email"
              autoComplete="email"
              type="email"
              maxLength="256"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            </label>
            <div>
              <button
                className="text-white bg-blue-400 hover:bg-blue-300 py-1 px-5 rounded-full shadow-lg text-sm"
                onClick={changeEmail}
              >
                変更
              </button>
            </div>
          </div>

          <div className="w-full text-center">
            <p className="font-bold">パスワード変更</p>
            <p className="w-3/5 my-3 text-center mx-auto text-blue-300 text-sm">
              現在登録されているメールアドレスにパスワード変更メールが送信されます
            </p>
            <div>
              <button
                className="text-white bg-blue-400 hover:bg-blue-300 py-1 px-5 rounded-full shadow-lg text-sm"
                onClick={sendResetEmail}
              >
                変更
              </button>
            </div>
          </div>
        </div>
        <hr />

        {/* ////// ログアウト＆退会 ////// */}
        <div className="flex flex-row flex-wrap justify-center gap-10 my-10">
          <button
            className="text-white bg-gray-400 hover:bg-gray-300 py-1 px-5 rounded-full shadow-lg text-sm"
            onClick={signOutUser}
          >
            ログアウト
          </button>
          <button
            className="text-gray-400 border-2 border-gray-400 hover:bg-gray-200 py-1 px-5 rounded-full shadow-lg text-sm"
            onClick={deleteUser}
          >
            退会
          </button>
        </div>
      </Layout>
    </div>
  );
}
