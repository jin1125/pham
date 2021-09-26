import { Emoji } from "emoji-mart";
import firebase from "firebase/app";
import Image from "next/image";
import Router from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";
import { auth, db, storage } from "../../firebase";
import { UserContext } from "../../UserContext";
import { SearchMsg_L } from "./SearchMsg_L";

export const SearchMsg = () => {

  const [demoImg, setDemoImg] = useState("");
  const [companyDemoImg, setCompanyDemoImg] = useState("");
  const [msgImage, setMsgImage] = useState("");
  const [msg, setMsg] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [name, setName] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [coName, setCoName] = useState("");
  const [coAvatarImage, setCoAvatarImage] = useState("");
  const [changeMsg, setChangeMsg] = useState(true);
  const [loading, setLoading] = useState(false);
  const [feeds, setFeeds] = useState([
    {
      avatarImage: "",
      datetime: "",
      id: "",
      image: "",
      msgId: "",
      name: "",
      text: "",
    },
  ]);

  const { selectMsg, userId, setUserId } =
    useContext(UserContext);
  const ref = useRef(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const url = await storage.ref().child("demo_img.png").getDownloadURL();

      if (isMounted) {
        setDemoImg(url);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const url = await storage
        .ref()
        .child("company_demo_img.png")
        .getDownloadURL();

      if (isMounted) {
        setCompanyDemoImg(url);
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
            setName(doc.data().userName);
            setAvatarImage(doc.data().profileImageUrl);
          }
        });
      return () => unSub();
    }
  }, [userId, feeds]);

  useEffect(() => {
    if (userId) {
      const unSub = db
        .collection("companies")
        .doc(userId)
        .onSnapshot((doc) => {
          if (doc.data()) {
            setCoName(doc.data().companyName);
            setCoAvatarImage(doc.data().companyImageUrl);
          }
        });
      return () => unSub();
    }
  }, [userId, feeds]);

  useEffect(() => {
    if (userId && selectMsg.objectID) {
      const unSub = db
        .collection("msgs")
        .doc(userId)
        .collection(selectMsg.objectID)
        .orderBy("datetime", "asc")
        .onSnapshot((snapshot) => {
          setFeeds(
            snapshot.docs.map((doc) => ({
              avatarImage: doc.data().avatarImage,
              yyyy: doc.data().datetime.toDate().getFullYear(),
              MM: doc.data().datetime.toDate().getMonth() + 1,
              dd: doc.data().datetime.toDate().getDate(),
              HH: doc.data().datetime.toDate().getHours(),
              mm: doc.data().datetime.toDate().getMinutes(),
              id: doc.data().id,
              image: doc.data().image,
              msgId: doc.data().msgId,
              name: doc.data().name,
              text: doc.data().text,
            }))
          );
        });
      return () => unSub();
    }
  }, [userId, selectMsg.objectID]);

  const uploadImage = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrl(imageUrl);
      setMsgImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  const sendMsg = async () => {
    setLoading(true);
    if (msgImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + msgImage.name;
      await storage.ref(`msgImages/${fileName}`).put(msgImage);
      await storage
        .ref("msgImages")
        .child(fileName)
        .getDownloadURL()
        .then(async (url) => {
          await db
            .collection("msgs")
            .doc(userId)
            .collection(selectMsg.objectID)
            .add({
              id: userId,
              msgId: selectMsg.objectID,
              name: name,
              avatarImage: avatarImage,
              text: msg,
              image: url,
              datetime: firebase.firestore.Timestamp.now(),
            });

          await db
            .collection("msgs")
            .doc(selectMsg.objectID)
            .collection(userId)
            .add({
              id: userId,
              msgId: selectMsg.objectID,
              name: name,
              avatarImage: avatarImage,
              text: msg,
              image: url,
              datetime: firebase.firestore.Timestamp.now(),
            });
        })
        .finally(() => {
          setLoading(false);
          setMsg("");
          setFileUrl("");
          setMsgImage("");
        });
    } else {
      await db
        .collection("msgs")
        .doc(userId)
        .collection(selectMsg.objectID)
        .add({
          id: userId,
          msgId: selectMsg.objectID,
          name: name,
          avatarImage: avatarImage,
          text: msg,
          image: "",
          datetime: firebase.firestore.Timestamp.now(),
        });

      await db
        .collection("msgs")
        .doc(selectMsg.objectID)
        .collection(userId)
        .add({
          id: userId,
          msgId: selectMsg.objectID,
          name: name,
          avatarImage: avatarImage,
          text: msg,
          image: "",
          datetime: firebase.firestore.Timestamp.now(),
        })
        .finally(() => {
          setLoading(false);
          setMsg("");
          setFileUrl("");
          setMsgImage("");
        });
    }
  };

  const length = feeds.length;
  let isLastItem = false;

  useEffect(() => {
    if (isLastItem && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLastItem, ref.current, feeds]);

  return (
    <div>
      <div className="grid grid-cols-12">
        {/* ////// プロフィール検索(ページ左) ////// */}
        <SearchMsg_L changeMsg={changeMsg} setChangeMsg={setChangeMsg} setFeeds={setFeeds}/>

        {/* ////// プロフィール描画(ページ右) ////// */}
        {changeMsg && selectMsg ? (
          <div className="md:col-span-9 col-span-12">
            <div className="overflow-auto h-screen lg:pb-16 pb-12 md:px-10 px-5">
              {feeds.map((feed, index) => {
                isLastItem = length === index + 1;
                return (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-5 my-12"
                    ref={ref}
                  >
                    <div className="md:col-span-1 col-span-2">
                      {feed.id === userId && avatarImage ? (
                        <Image
                          className="inline object-cover  rounded-full"
                          width={50}
                          height={50}
                          src={avatarImage}
                          alt="avatarImage"
                        />
                      ) : feed.id === selectMsg.objectID &&
                        selectMsg.profileImageUrl ? (
                        <Image
                          className="inline object-cover  rounded-full"
                          width={50}
                          height={50}
                          src={selectMsg.profileImageUrl}
                          alt="avatarImage"
                        />
                      ) : (
                        demoImg && (
                          <Image
                            className="inline object-cover  rounded-full"
                            width={50}
                            height={50}
                            src={demoImg}
                            alt="avatarImage"
                          />
                        )
                      )}
                    </div>

                    <div className="md:col-span-11 col-span-10">
                      <div className="flex flex-row flex-wrap gap-3 items-end mb-1">
                        {feed.id === userId && (
                          <p className="font-bold">{name}</p>
                        )}
                        {feed.id === selectMsg.objectID && (
                          <p className="font-bold">{selectMsg.userName}</p>
                        )}
                        {feed.yyyy && (
                          <p className="text-xs text-blue-300">{`${feed.yyyy}/${feed.MM}/${feed.dd} ${feed.HH}:${feed.mm}`}</p>
                        )}
                      </div>
                      <p>{feed.text}</p>
                      {feed.image && (
                        <Image
                          className="inline object-cover  rounded-lg"
                          width={200}
                          height={200}
                          src={feed.image}
                          alt="uploadImg"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-12 gap-2 justify-items-center items-center leading-none fixed right-0 bottom-0 w-full p-4 bg-white border-t-2">
              <label className="col-span-1 cursor-pointer hover:opacity-60">
                {fileUrl ? (
                  <Image
                    className="inline object-cover  rounded-lg"
                    width={50}
                    height={50}
                    src={fileUrl}
                    alt="uploadImg"
                  />
                ) : (
                  <Emoji emoji="camera_with_flash" size={25} />
                )}
                <input
                  className="hidden"
                  accept="image/*"
                  type="file"
                  onChange={uploadImage}
                />
              </label>

              <textarea
                rows="1"
                autoFocus
                value={msg}
                name="msg"
                maxLength="200"
                className="bg-blue-100 rounded-lg p-2 w-full outline-none col-span-10"
                onChange={(e) => setMsg(e.target.value.trim())}
              />

              {loading ? (
                <div className="flex justify-center">
                  <Loader type="Watch" color="#93C5FD" height={30} width={30} />
                </div>
              ) : (
                <button
                  className="col-span-1 transform  duration-500 hover:scale-150 hover:-rotate-45 hover:-translate-y-6 disabled:opacity-60 disabled:hover:scale-100 disabled:hover:rotate-0 disabled:hover:-translate-y-0"
                  onClick={sendMsg}
                  disabled={!msg && !fileUrl}
                >
                  <Emoji emoji="rocket" size={35} />
                </button>
              )}
            </div>
          </div>
        ) : !changeMsg && selectMsg ? (
          <div className="md:col-span-9 col-span-12">
            <div className="overflow-auto h-screen lg:pb-16 pb-12 md:px-10 px-5">
              {feeds.map((feed, index) => {
                isLastItem = length === index + 1;
                return (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-5 my-12"
                    ref={ref}
                  >
                    <div className="md:col-span-1 col-span-2">
                      {feed.id === userId && avatarImage ? (
                        <Image
                          className="inline object-cover  rounded-full"
                          width={50}
                          height={50}
                          src={avatarImage}
                          alt="avatarImage"
                        />
                      ) : feed.id === selectMsg.objectID &&
                        selectMsg.profileImageUrl ? (
                        <Image
                          className="inline object-cover  rounded-full"
                          width={50}
                          height={50}
                          src={selectMsg.profileImageUrl}
                          alt="avatarImage"
                        />
                      ) : feed.id === userId && avatarImage && demoImg ? (
                        <Image
                          className="inline object-cover  rounded-full"
                          width={50}
                          height={50}
                          src={demoImg}
                          alt="avatarImage"
                        />
                      ) : (
                        feed.id === selectMsg.objectID &&
                        selectMsg.profileImageUrl &&
                        demoImg && (
                          <Image
                            className="inline object-cover  rounded-full"
                            width={50}
                            height={50}
                            src={demoImg}
                            alt="avatarImage"
                          />
                        )
                      )}

                      {feed.id === userId && coAvatarImage ? (
                        <Image
                          className="inline object-cover  rounded-full"
                          width={50}
                          height={50}
                          src={coAvatarImage}
                          alt="coAvatarImage"
                        />
                      ) : feed.id === selectMsg.objectID &&
                        selectMsg.companyImageUrl ? (
                        <Image
                          className="inline object-cover  rounded-full"
                          width={50}
                          height={50}
                          src={selectMsg.companyImageUrl}
                          alt="coAvatarImage"
                        />
                      ) : feed.id === userId &&
                        coAvatarImage &&
                        companyDemoImg ? (
                        <Image
                          className="inline object-cover  rounded-full"
                          width={50}
                          height={50}
                          src={companyDemoImg}
                          alt="coAvatarImage"
                        />
                      ) : (
                        feed.id === selectMsg.objectID &&
                        selectMsg.companyImageUrl &&
                        companyDemoImg && (
                          <Image
                            className="inline object-cover  rounded-full"
                            width={50}
                            height={50}
                            src={companyDemoImg}
                            alt="coAvatarImage"
                          />
                        )
                      )}
                    </div>

                    <div className="md:col-span-11 col-span-10">
                      <div className="flex flex-row flex-wrap gap-3 items-end mb-1">
                        {feed.id === userId && name && (
                          <p className="font-bold">{name}</p>
                        )}
                        {feed.id === userId && coName && (
                          <p className="font-bold">{coName}</p>
                        )}
                        {feed.id === selectMsg.objectID &&
                          selectMsg.userName && (
                            <p className="font-bold">{selectMsg.userName}</p>
                          )}
                        {feed.id === selectMsg.objectID &&
                          selectMsg.companyName && (
                            <p className="font-bold">{selectMsg.companyName}</p>
                          )}

                        {feed.yyyy && (
                          <p className="text-xs text-blue-300">{`${feed.yyyy}/${feed.MM}/${feed.dd} ${feed.HH}:${feed.mm}`}</p>
                        )}
                      </div>
                      <p>{feed.text}</p>
                      {feed.image && (
                        <Image
                          className="inline object-cover  rounded-lg"
                          width={200}
                          height={200}
                          src={feed.image}
                          alt="uploadImg"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-12 gap-2 justify-items-center items-center leading-none fixed right-0 bottom-0 w-full p-4 bg-white border-t-2">
              <label className="col-span-1 cursor-pointer hover:opacity-60">
                {fileUrl ? (
                  <Image
                    className="inline object-cover  rounded-lg"
                    width={50}
                    height={50}
                    src={fileUrl}
                    alt="uploadImg"
                  />
                ) : (
                  <Emoji emoji="camera_with_flash" size={25} />
                )}
                <input
                  className="hidden"
                  accept="image/*"
                  type="file"
                  onChange={uploadImage}
                />
              </label>

              <textarea
                rows="1"
                autoFocus
                value={msg}
                name="msg"
                maxLength="200"
                className="bg-blue-100 rounded-lg p-2 w-full outline-none col-span-10"
                onChange={(e) => setMsg(e.target.value.trim())}
              />

              {loading ? (
                <div className="flex justify-center">
                  <Loader type="Watch" color="#93C5FD" height={30} width={30} />
                </div>
              ) : (
                <button
                  className="col-span-1 transform  duration-500 hover:scale-150 hover:-rotate-45 hover:-translate-y-6 disabled:opacity-60 disabled:hover:scale-100 disabled:hover:rotate-0 disabled:hover:-translate-y-0"
                  onClick={sendMsg}
                  disabled={!msg && !fileUrl}
                >
                  <Emoji emoji="rocket" size={35} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="h-screen md:col-span-9 col-span-12 justify-self-center self-center md:pt-24">
            <Image
              src="/message_img.png"
              alt="login_img"
              width={400}
              height={350}
            />
          </div>
        )}
      </div>
    </div>
  );
};
