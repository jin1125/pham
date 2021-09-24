import { Emoji } from "emoji-mart";
import firebase from "firebase/app";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Layout } from "../../components/layout/Layout";
import { auth, db, provider, storage } from "../../firebase";
import { UserContext } from "../../UserContext";

export default function edit() {
  ////////////////// ステートエリア //////////////////
  const { userId, setUserId } = useContext(UserContext);

  const [profile, setProfile] = useState({
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
  const [userEmail, setUserEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [freeImage0, setFreeImage0] = useState("");
  const [freeImage1, setFreeImage1] = useState("");
  const [freeImage2, setFreeImage2] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileUrls0, setFileUrls0] = useState("");
  const [fileUrls1, setFileUrls1] = useState("");
  const [fileUrls2, setFileUrls2] = useState("");
  const [resetEmailPassword, setResetEmailPassword] = useState("");
  const [deleteAccountPassword, setDeleteAccountPassword] = useState("");
  const [openEditEmail, setOpenEditEmail] = useState(false);
  const [openEditPassword, setOpenEditPassword] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [demoImg, setDemoImg] = useState("");
  const [demoImgs, setDemoImgs] = useState("");
  const [loading, setLoading] = useState(false);

  ////////////////// 関数エリア //////////////////

  const alert = useAlert();

  useEffect(() => {
  const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setUserEmail(user.email);
        setDisplayName(user.displayName)
      } else {
        Router.push("/login");
      }
    });

    return () => unSub();
  }, []);
  

  useEffect(() => {
    if(userId){
      let unSub = db
            .collection("userProfiles")
            .doc(userId)
            .onSnapshot((doc) => {
              if (doc.data()) {
                setProfile({ ...profile, ...doc.data() });
              } else {
                if (!profile.userName) {
                  setProfile({ ...profile, userName: displayName });
                }
              }
            });
      return () => unSub();
    }
  }, [userId,displayName]);


  useEffect(() => {
    (async () => {
      const url = await storage
        .ref()
        .child("demo_img.png")
        .getDownloadURL()
        setDemoImg(url);

        const Url = await storage
        .ref()
        .child("demo_imgs.jpeg")
        .getDownloadURL()
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

  const uploadImage = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrl(imageUrl);
      setProfileImage(e.target.files[0]);
      e.target.value = "";
    }
  };

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
      });
  };

  /// 経験年数の各experienceの変更処理 ///
  const changeExperience = (e, index) => {
    const list = [...experiences];
    list[index] = {
      experience: e.target.value,
      years: list[index].years,
    };
    setProfile({ ...profile, experiences: list });
  };

  /// 経験年数の各yearsの変更処理 ///
  const changeYears = (e, index) => {
    const list = [...experiences];
    list[index] = {
      experience: list[index].experience,
      years: e.target.value,
    };
    setProfile({ ...profile, experiences: list });
  };

  /// 経験年数の欄追加処理 ///
  const addExperience = () => {
    if (experiences) {
      const list = [...experiences];
      list.push({ experience: "", years: "" });
      setProfile({ ...profile, experiences: list });
    } else {
      setProfile({ ...profile, experiences: [{ experience: "", years: "" }] });
    }
  };

  /// 経験年数の欄削除処理 ///
  const deleteExperience = (index) => {
    const list = [...experiences];
    list.splice(index, 1);
    setProfile({ ...profile, experiences: list });
  };

  const changeCompanyName = (e, index) => {
    const list = [...resumes];
    list[index] = {
      companyName: e.target.value,
      employmentStatus: list[index].employmentStatus,
      workStart: list[index].workStart,
      workEnd: list[index].workEnd,
    };

    setProfile({ ...profile, resumes: list });
  };

  const changeEmploymentStatus = (e, index) => {
    const list = [...resumes];
    list[index] = {
      companyName: list[index].companyName,
      employmentStatus: e.target.value,
      workStart: list[index].workStart,
      workEnd: list[index].workEnd,
    };

    setProfile({ ...profile, resumes: list });
  };

  const changeWorkStart = (e, index) => {
    const list = [...resumes];
    list[index] = {
      companyName: list[index].companyName,
      employmentStatus: list[index].employmentStatus,
      workStart: e.target.value,
      workEnd: list[index].workEnd,
    };

    setProfile({ ...profile, resumes: list });
  };

  const changeWorkEnd = (e, index) => {
    const list = [...resumes];
    list[index] = {
      companyName: list[index].companyName,
      employmentStatus: list[index].employmentStatus,
      workStart: list[index].workStart,
      workEnd: e.target.value,
    };

    setProfile({ ...profile, resumes: list });
  };

  const addResume = () => {
    if (resumes) {
      const list = [...resumes];
      list.push({
        companyName: "",
        employmentStatus: "",
        workStart: "",
        workEnd: "",
      });
      setProfile({ ...profile, resumes: list });
    } else {
      setProfile({
        ...profile,
        resumes: [
          { companyName: "", employmentStatus: "", workStart: "", workEnd: "" },
        ],
      });
    }
  };

  const deleteResume = (index) => {
    const list = [...resumes];
    list.splice(index, 1);
    setProfile({ ...profile, resumes: list });
  };

  /// google認識でログインか判別処理 ///
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.providerData[0].providerId === "google.com") {
          setIsGoogleLogin(true);
        }
      }
    });
    return () => unSub();
  }, []);

  /// メールアドレス変更処理 ///
  const changeEmail = () => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user && resetEmailPassword) {
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          resetEmailPassword
        );

        // ログインしていれば通る
        user
          .reauthenticateWithCredential(credential)
          .then(() => {
            const result = confirm("メールアドレスを変更してもよろしいですか?");

            if (result) {
              user
                .updateEmail(userEmail)
                .then(() => {
                  alert.success("メールアドレスを変更しました");
                })
                .catch((error) => {
                  alert.error("メールアドレスを変更できませんでした");
                });
            } else {
              alert.error("変更をキャンセルしました");
            }
          })
          .catch(() => {
            alert.error("パスワードが異なっています");
          });
      }
      // 登録解除
      return () => unSub();
    });
  };

  /// アカウント削除 ///
  const deleteAccount = () => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user && deleteAccountPassword) {
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          deleteAccountPassword
        );

        // ログインしていれば通る
        user
          .reauthenticateWithCredential(credential)
          .then(async () => {
            const result = confirm("本当にアカウントを削除しますか?");

            if (result) {
              await user
                .delete()
                .then(() => {
                  alert.success("アカウントを削除しました");
                  Router.push("/login");
                })
                .catch(() => {
                  alert.error("アカウントを削除できませんでした");
                });
            } else {
              alert.error("アカウント削除をキャンセルしました");
            }
          })
          .catch((err) => {
            alert.error("アカウントを削除できませんでした");
            console.log(err);
          });
      }
      // 登録解除
      unSub();
    });
  };

  /// アカウント(google)削除処理 ///
  //google認証
  const signInGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then(() => {
        alert.success("アカウント削除の準備ができました");
      })
      .catch(() => {
        alert.error("googleログイン情報を取得できませんでした");
      });
  };

  //アカウント(google)削除
  const deleteGoogleAccount = () => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        const result = confirm("本当にアカウントを削除しますか?");

        if (result) {
          user
            .delete()
            .then(() => {
              alert.success("アカウントを削除しました");
              Router.push("/login");
            })
            .catch(() => {
              alert.error("アカウントを削除できませんでした");
            });
        } else {
          alert.error("アカウント削除をキャンセルしました");
        }
      }
      // 登録解除
      return () => unSub();
    });
  };

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
        console.log(error);
        alert.error("ログアウトできませんでした");
      }
    }
  };

  const check1 =
    !userName || !scout || !homeAddress || !dobYY || !dobMM || !dobDD;

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
              <label>
                <select
                  className="bg-blue-100 rounded-full outline-none pl-3 py-1 w-11/12"
                  name="scout"
                  value={scout}
                  onChange={(e) =>
                    setProfile({ ...profile, scout: e.target.value })
                  }
                >
                  <option value="">スカウト設定</option>
                  <option value="スカウトを受け取る">スカウトを受け取る</option>
                  <option value="スカウトを受け取らない">
                    スカウトを受け取らない
                  </option>
                </select>
                <span className="text-red-500 align-top">*</span>
              </label>
            </div>

            {/* /// フリー画像アップロード0 /// */}
            <div className="my-5">
              <label>
                {fileUrls0 ? (
                  <Image
                    className="inline object-cover mr-2 cursor-pointer transform hover:scale-150 transition duration-300"
                    width={200}
                    height={200}
                    src={fileUrls0}
                    alt="Free image0"
                  />
                ) : freeImageUrl0 ? (
                  <Image
                    className="inline object-cover mr-2 cursor-pointer transform hover:scale-150 transition duration-300"
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
                    className="inline object-cover mr-2 cursor-pointer transform hover:scale-150 transition duration-300"
                    width={200}
                    height={200}
                    src={fileUrls1}
                    alt="Free image1"
                  />
                ) : freeImageUrl1 ? (
                  <Image
                    className="inline object-cover mr-2 cursor-pointer transform hover:scale-150 transition duration-300"
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
                    className="inline object-cover mr-2 cursor-pointer transform hover:scale-150 transition duration-300"
                    width={200}
                    height={200}
                    src={fileUrls2}
                    alt="Free image2"
                  />
                ) : freeImageUrl2 ? (
                  <Image
                    className="inline object-cover mr-2 cursor-pointer transform hover:scale-150 transition duration-300"
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
                  onChange={(e) =>
                    setProfile({ ...profile, userName: e.target.value.trim() })
                  }
                  placeholder="姓 名"
                  name="name"
                  maxLength="12"
                  className="text-4xl font-bold bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
                />
                <span className="text-red-500 align-top">*</span>
              </label>

              <input
                type="text"
                value={jobTitle}
                onChange={(e) =>
                  setProfile({ ...profile, jobTitle: e.target.value.trim() })
                }
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
                  <select
                    className="bg-blue-100 rounded-full outline-none pl-3 pr-2 py-1"
                    name="homeAddress"
                    value={homeAddress}
                    onChange={(e) =>
                      setProfile({ ...profile, homeAddress: e.target.value })
                    }
                  >
                    <option value="">住所</option>
                    <option value="01_北海道">北海道</option>
                    <option value="02_青森県">青森県</option>
                    <option value="03_岩手県">岩手県</option>
                    <option value="04_宮城県">宮城県</option>
                    <option value="05_秋田県">秋田県</option>
                    <option value="06_山形県">山形県</option>
                    <option value="07_福島県">福島県</option>
                    <option value="08_茨城県">茨城県</option>
                    <option value="09_栃木県">栃木県</option>
                    <option value="10_群馬県">群馬県</option>
                    <option value="11_埼玉県">埼玉県</option>
                    <option value="12_千葉県">千葉県</option>
                    <option value="13_東京都">東京都</option>
                    <option value="14_神奈川県">神奈川県</option>
                    <option value="15_新潟県">新潟県</option>
                    <option value="16_富山県">富山県</option>
                    <option value="17_石川県">石川県</option>
                    <option value="18_福井県">福井県</option>
                    <option value="19_山梨県">山梨県</option>
                    <option value="20_長野県">長野県</option>
                    <option value="21_岐阜県">岐阜県</option>
                    <option value="22_静岡県">静岡県</option>
                    <option value="23_愛知県">愛知県</option>
                    <option value="24_三重県">三重県</option>
                    <option value="25_滋賀県">滋賀県</option>
                    <option value="26_京都府">京都府</option>
                    <option value="27_大阪府">大阪府</option>
                    <option value="28_兵庫県">兵庫県</option>
                    <option value="29_奈良県">奈良県</option>
                    <option value="30_和歌山県">和歌山県</option>
                    <option value="31_鳥取県">鳥取県</option>
                    <option value="32_島根県">島根県</option>
                    <option value="33_岡山県">岡山県</option>
                    <option value="34_広島県">広島県</option>
                    <option value="35_山口県">山口県</option>
                    <option value="36_徳島県">徳島県</option>
                    <option value="37_香川県">香川県</option>
                    <option value="38_愛媛県">愛媛県</option>
                    <option value="39_高知県">高知県</option>
                    <option value="40_福岡県">福岡県</option>
                    <option value="41_佐賀県">佐賀県</option>
                    <option value="42_長崎県">長崎県</option>
                    <option value="43_熊本県">熊本県</option>
                    <option value="44_大分県">大分県</option>
                    <option value="45_宮崎県">宮崎県</option>
                    <option value="46_鹿児島県">鹿児島県</option>
                    <option value="47_沖縄県">沖縄県</option>
                  </select>
                  <span className="text-red-500 align-top">*</span>
                </label>
              </div>

              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="birthday" size={20} />
                <label>
                  <select
                    className="bg-blue-100 rounded-full outline-none pl-3 pr-2 py-1"
                    name="dobYY"
                    value={dobYY}
                    onChange={(e) =>
                      setProfile({ ...profile, dobYY: e.target.value })
                    }
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
                    className="bg-blue-100 rounded-full outline-none pl-3 pr-2 py-1"
                    name="dobMM"
                    value={dobMM}
                    onChange={(e) =>
                      setProfile({ ...profile, dobMM: e.target.value })
                    }
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
                    className="bg-blue-100 rounded-full outline-none pl-3 pr-2 py-1"
                    name="dobDD"
                    value={dobDD}
                    onChange={(e) =>
                      setProfile({ ...profile, dobDD: e.target.value })
                    }
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
                  onChange={(e) =>
                    setProfile({ ...profile, school: e.target.value.trim() })
                  }
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
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      birthPlace: e.target.value.trim(),
                    })
                  }
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
                  onChange={(e) =>
                    setProfile({ ...profile, language: e.target.value.trim() })
                  }
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
                placeholder="自己紹介"
                maxLength="200"
                className="bg-blue-100 rounded-lg p-5 w-full outline-none"
                onChange={(e) =>
                  setProfile({ ...profile, comments: e.target.value.trim() })
                }
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
                onChange={(e) =>
                  setProfile({ ...profile, hobby: e.target.value.trim() })
                }
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
                onChange={(e) =>
                  setProfile({ ...profile, dream: e.target.value.trim() })
                }
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
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    certification: e.target.value.trim(),
                  })
                }
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
                onChange={(e) =>
                  setProfile({ ...profile, strongArea: e.target.value.trim() })
                }
                className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none "
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
                onChange={(e) =>
                  setProfile({ ...profile, subjectArea: e.target.value.trim() })
                }
                className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full"
              />
            </div>

            <div className="my-10">
              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="hourglass_flowing_sand" size={20} />
                <p className="text-base font-bold">経験年数</p>
                <button
                  className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-1 px-2 ml-1 rounded-full shadow-lg text-xs"
                  onClick={addExperience}
                >
                  欄を追加
                </button>
              </div>
              {experiences &&
                experiences.map((ex, index) => (
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
                        className="text-white bg-gray-400 transition duration-300 hover:bg-gray-300 py-1 px-2 rounded-full shadow-lg text-xs"
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
                  className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-1 px-2 ml-1 rounded-full shadow-lg text-xs"
                  onClick={addResume}
                >
                  欄を追加
                </button>
              </div>
              {resumes &&
                resumes.map((re, index) => (
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
                        className="text-white bg-gray-400 transition duration-300 hover:bg-gray-300 py-1 px-2 rounded-full shadow-lg text-xs"
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
              className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 disabled:bg-blue-200 py-2 w-1/2 rounded-full shadow-lg font-bold"
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
        <div className="grid grid-cols-4 my-10 justify-items-center">
          <div className="w-full text-center">
            <button
              className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-1 px-5 rounded-full shadow-lg text-sm"
              onClick={() => setOpenEditEmail(!openEditEmail)}
            >
              メールアドレス変更
            </button>
            {openEditEmail && (
              <>
                {isGoogleLogin || (
                  <>
                    <label>
                      <p className="mt-5 text-sm text-blue-300">
                        新しいメールアドレス
                      </p>
                      <input
                        className="text-base bg-blue-100 placeholder-blue-300 rounded-full py-1 outline-none text-center w-11/12"
                        placeholder="email@example.com"
                        name="email"
                        autoComplete="email"
                        type="email"
                        maxLength="256"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                      />
                    </label>
                    <label>
                      <p className="mt-3 text-sm text-blue-300">パスワード</p>
                      <input
                        className="text-base bg-blue-100 placeholder-blue-300 rounded-full py-1 outline-none text-center w-11/12"
                        name="password"
                        autoComplete="password"
                        type="password"
                        maxLength="20"
                        value={resetEmailPassword}
                        onChange={(e) => setResetEmailPassword(e.target.value)}
                      />
                    </label>
                    <div>
                      <button
                        className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 disabled:bg-blue-200 py-1 px-5 rounded-full shadow-lg text-sm my-3"
                        onClick={changeEmail}
                        disabled={
                          userEmail.trim() === "" ||
                          resetEmailPassword.length < 6
                        }
                      >
                        変更
                      </button>
                    </div>
                  </>
                )}
                {isGoogleLogin && (
                  <p className="w-11/12 my-3 text-center mx-auto text-blue-300 text-sm">
                    google認識でログインしたアカウントはメールアドレスの変更ができません
                  </p>
                )}
              </>
            )}
          </div>

          <div className="w-full text-center">
            <button
              className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-1 px-5 rounded-full shadow-lg text-sm"
              onClick={() => setOpenEditPassword(!openEditPassword)}
            >
              パスワード変更
            </button>
            {openEditPassword && (
              <>
                <p className="w-11/12 my-3 text-center mx-auto text-blue-300 text-sm">
                  現在登録されているメールアドレスにパスワード変更メールが送信されます
                </p>
                <div>
                  <button
                    className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-1 px-5 rounded-full shadow-lg text-sm"
                    onClick={sendResetEmail}
                  >
                    変更
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="w-full text-center">
            <button
              className="text-white bg-gray-400 transition duration-300 hover:bg-gray-300 py-1 px-5 rounded-full shadow-lg text-sm"
              onClick={signOutUser}
            >
              ログアウト
            </button>
          </div>

          <div className="w-full text-center">
            <button
              className="text-white bg-gray-400 transition duration-300 hover:bg-gray-300 py-1 px-5 rounded-full shadow-lg text-sm"
              onClick={() => setOpenDeleteAccount(!openDeleteAccount)}
            >
              アカウント削除
            </button>
            {openDeleteAccount && (
              <>
                {isGoogleLogin || (
                  <>
                    <label>
                      <p className="mt-3 text-sm text-blue-300">パスワード</p>
                      <input
                        className="text-base bg-blue-100 placeholder-blue-300 rounded-full py-1 outline-none text-center w-11/12"
                        name="password"
                        autoComplete="password"
                        type="password"
                        maxLength="20"
                        value={deleteAccountPassword}
                        onChange={(e) =>
                          setDeleteAccountPassword(e.target.value)
                        }
                      />
                    </label>
                    <div>
                      <button
                        className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 disabled:bg-blue-200 py-1 px-5 rounded-full shadow-lg text-sm my-3"
                        onClick={deleteAccount}
                        disabled={deleteAccountPassword.length < 6}
                      >
                        削除
                      </button>
                    </div>
                  </>
                )}

                {isGoogleLogin && (
                  <>
                    <p className="w-11/12 my-3 text-center mx-auto text-blue-300 text-sm">
                      「google認証」した後に「削除」をクリックしてください
                    </p>
                    <div>
                      <button
                        className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 disabled:bg-blue-200 py-1 px-5 rounded-full shadow-lg text-sm my-3"
                        onClick={signInGoogle}
                      >
                        google認証
                      </button>
                    </div>
                    <div>
                      <button
                        className="text-white bg-red-400 transition duration-300 hover:bg-red-300 disabled:bg-blue-200 py-1 px-5 rounded-full shadow-lg text-sm my-3"
                        onClick={deleteGoogleAccount}
                      >
                        削除
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}
