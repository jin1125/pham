import algoliasearch from "algoliasearch/lite";
import { Emoji } from "emoji-mart";
import firebase from "firebase/app";
import Image from "next/image";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { Configure, Hits, InstantSearch } from "react-instantsearch-dom";
import { auth, db, storage } from "../../firebase";
import { UserContext } from "../../UserContext";
import { hitComponentMsg } from "./HitComponentMsg";
import { CustomSearchBox } from "./SearchBox";

export default function SearchMsg() {
  const searchClient = algoliasearch(
    "0TMIYQ8E9N",
    "58e6e394abd7a5cfcc6fcae0d7b51ac5"
  );

  const indexName = "pham";

  const [demoImg, setDemoImg] = useState("");
  const [msgImage, setMsgImage] = useState("");
  const [msg, setMsg] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [name, setName] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
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

  const { selectMsg, userId, setUserId } = useContext(UserContext);

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
  }, [userId]);

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
              datetime: doc.data().datetime,
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
    if (msgImage) {
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
        });

      setMsg("");
      setMsgImage("");
      console.log("send!");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-12 gap-10">
        {/* ////// プロフィール検索(ページ左) ////// */}
        <div className="col-span-3 border-r-2 border-blue-400 min-h-screen">
          <div className="text-center">
            <h4 className="text-white bg-blue-400 font-bold text-lg py-3">
              メッセージ検索
            </h4>
          </div>
          <InstantSearch indexName={indexName} searchClient={searchClient}>
            <div className="border-b">
              <div className="mx-5 my-7">
                <div className="my-5">
                  <p>名前</p>
                  <div>
                    <CustomSearchBox />
                  </div>
                </div>
              </div>
            </div>

            <Hits hitComponent={hitComponentMsg} />
            <Configure hitsPerPage={10} />
            <div className="mx-3 my-2">{/* <PoweredBy /> */}</div>
          </InstantSearch>
        </div>

        {/* ////// プロフィール描画(ページ右) ////// */}
        {selectMsg ? (
          <div className="col-span-9">
            <div className="grid grid-cols-12 gap-10 my-10 mr-10">
              <div className="col-span-3 justify-self-center">
                {selectMsg.profileImageUrl ? (
                  <Image
                    className="inline object-cover mr-2 rounded-full"
                    width={200}
                    height={200}
                    src={selectMsg.profileImageUrl}
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
              </div>

              <div className="col-span-9">
                <div className="flex flex-row flex-wrap items-end my-10 gap-8">
                  <div>
                    <h2 className="text-4xl font-bold">{selectMsg.userName}</h2>
                  </div>

                  {selectMsg.jobTitle && (
                    <div>
                      <p className="text-xl font-bold text-blue-400">
                        {selectMsg.jobTitle}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              {feeds.map((feed, index) => (
                <div key={index}>
                  <p>{feed.name}</p>
                  <p>{feed.text}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-12 gap-2 mr-10 justify-items-center items-center leading-none">

              <label className="col-span-1 cursor-pointer">
              <Emoji emoji="camera_with_flash" size={25} />
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
                onChange={(e) => setMsg(e.target.value)}
              />

                <button className='col-span-1' onClick={sendMsg}>
                <Emoji emoji="rocket" size={35} />
                </button>
            </div>
          </div>
        ) : (
          <div className="col-span-9 justify-self-center self-center">
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
}
