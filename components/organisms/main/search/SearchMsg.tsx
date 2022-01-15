import firebase from "firebase/app";
import Image from "next/image";
import Router from "next/router";
import { memo, useContext, useEffect, useState, VFC } from "react";
import { auth, db, storage } from "../../../../firebase";
import { Feeds } from "../../../../types/feeds";
import { UserContext } from "../../../../UserContext";
import { SearchMsg_L } from "./SearchMsg_L";
import { SearchMsg_R_Co } from "./SearchMsg_R_Co";
import { SearchMsg_R_Ph } from "./SearchMsg_R_Ph";

export const SearchMsg: VFC = memo(() => {
  ///////// ステートエリア /////////
  const [demoImg, setDemoImg] = useState<string>("");
  const [companyDemoImg, setCompanyDemoImg] = useState<string>("");
  const [msgImage, setMsgImage] = useState<File | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [avatarImage, setAvatarImage] = useState<string>("");
  const [coName, setCoName] = useState<string>("");
  const [coAvatarImage, setCoAvatarImage] = useState<string>("");
  const [changeMsg, setChangeMsg] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [feeds, setFeeds] = useState<Feeds>([
    {
      avatarImage: "",
      yyyy: "",
      MM: "",
      dd: "",
      HH: "",
      mm: "",
      id: "",
      image: "",
      msgId: "",
      name: "",
      text: "",
    },
  ]);
  
  // グローバルなステート
  const { selectMsg, userId, setUserId } = useContext(UserContext);

  // 定数定義
  const loginPath = "/login";
  // メッセージの数
  const length: number = feeds.length;
  // メッセージの最後かを判定
  let isLastItem: boolean = false;

  ///////// 関数エリア /////////
  // ストレージからプロフィールデモ画像取得
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

  // ストレージから企業デモ画像取得
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

  //ユーザーID取得＆ログインしてなければログインページへ
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        Router.push(loginPath);
      }
    });

    return () => unSub();
  }, []);

  // firestoreからユーザーネームとアバタイメージを取得
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

  // firestoreから企業名と企業アバタイメージを取得
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

  // 選択したユーザーとのメッセージデータを取得
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

  // 画像アップロード処理
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files![0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrl(imageUrl);
      setMsgImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  // メッセージ送信処理
  const sendMsg = async (): Promise<void> => {
    {
      selectMsg.objectID && setLoading(true);
      // アップロード画像があれば
      if (msgImage) {
        const S =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const randomChar = Array.from(
          crypto.getRandomValues(new Uint32Array(N))
        )
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
            setMsgImage(null);
          });
      // アップロード画像がなければ
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
            setMsgImage(null);
          });
      }
    }
  };

  ///////// JSXエリア /////////
  return (
    <div>
      <div className="grid grid-cols-12">
        {/* プロフィール検索(ページ左) */}
        <SearchMsg_L
          changeMsg={changeMsg}
          setChangeMsg={setChangeMsg}
          setFeeds={setFeeds}
        />

        {/* プロフィール描画(ページ右)  */}
        {changeMsg && selectMsg && Object.keys(selectMsg).length ? (
          // ユーザー同士のメッセージ画面
          <SearchMsg_R_Ph
            feeds={feeds}
            demoImg={demoImg}
            fileUrl={fileUrl}
            loading={loading}
            length={length}
            isLastItem={isLastItem}
            uploadImage={uploadImage}
            sendMsg={sendMsg}
            msg={msg}
            setMsg={setMsg}
            avatarImage={avatarImage}
            name={name}
          />
        ) : !changeMsg && selectMsg && Object.keys(selectMsg).length ? (
          // ユーザーと企業のメッセージ画面
          <SearchMsg_R_Co
            feeds={feeds}
            demoImg={demoImg}
            companyDemoImg={companyDemoImg}
            fileUrl={fileUrl}
            coName={coName}
            coAvatarImage={coAvatarImage}
            loading={loading}
            length={length}
            isLastItem={isLastItem}
            uploadImage={uploadImage}
            sendMsg={sendMsg}
            msg={msg}
            setMsg={setMsg}
            avatarImage={avatarImage}
            name={name}
          />
        ) : (
          <div 
            className="h-screen md:col-span-9 col-span-12 
            justify-self-center self-center md:pt-24"
          >
            {/* 未選択時表示画像 */}
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
});
