import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { auth, db, storage } from "../../../firebase";
import { Company } from "../../../types/company";
import { Profile } from "../../../types/profile";
import { Receives } from "../../../types/receives";
import { UserContext } from "../../../UserContext";

export default function ConnectModal({ isOpen, setIsOpen }) {
  ///////// ステートエリア /////////
  const alert = useAlert();
  const [phMatchA, setPhMatchA] = useState<string[]>([]);
  const [phMatchB, setPhMatchB] = useState<string[]>([]);
  const [coMatchB, setCoMatchB] = useState<string[]>([]);
  const [receives, setReceives] = useState<Receives[]>([]);
  const [passes, setPasses] = useState<typeof passesA|typeof passesB[]>([]);
  const [passesA, setPassesA] = useState<Profile[]>([]);
  const [passesB, setPassesB] = useState<Company[]>([]);
  const [demoImg, setDemoImg] = useState<string>("");
  const [companyDemoImg, setCompanyDemoImg] = useState<string>("");
  const [request, setRequest] = useState<boolean>(true);
  const { userId, setUserId } = useContext(UserContext);

  ///////// 関数エリア /////////
  // つながりリクエストモーダルを閉じる
  function closeModal(): void {
    setIsOpen(false);
  }

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

  // ユーザーID取得
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => unSub();
  }, []);

  // 相手から申請されてまだつながっていないユーザー
  useEffect(() => {
    if (userId) {
      let unSub = db
        .collection("phMatch")
        .where("pharmacistB", "==", userId)
        .where("requestB", "==", false)
        .onSnapshot((snapshot) => {
          const user = snapshot.docs.map((doc) => doc.data().pharmacistA);
          setPhMatchA([...user]);
        });

      return () => unSub();
    }
  }, [userId]);

  // 自分から申請してまだつながっていないユーザー
  useEffect(() => {
    if (userId) {
      let unSub = db
        .collection("phMatch")
        .where("pharmacistA", "==", userId)
        .where("requestB", "==", false)
        .onSnapshot((snapshot) => {
          const user = snapshot.docs.map((doc) => doc.data().pharmacistB);
          setPhMatchB([...user]);
        });

      return () => unSub();
    }
  }, [userId]);

  // 自分から申請してまだつながっていない企業
  useEffect(() => {
    if (userId) {
      let unSub = db
        .collection("coMatch")
        .where("pharmacist", "==", userId)
        .where("requestCo", "==", false)
        .onSnapshot((snapshot) => {
          const com = snapshot.docs.map((doc) => doc.data().company);
          setCoMatchB([...com]);
        });

      return () => unSub();
    }
  }, [userId]);

  //相手から申請されてまだつながっていないユーザーのデータをfirestoreから取得
  useEffect(() => {
    if (phMatchA) {
      let unSub = db.collection("userProfiles").onSnapshot((snapshot) => {
        let user = [];
        snapshot.docs.forEach((doc) => {
          if (phMatchA.includes(doc.id)) {
            user.push({ ...doc.data(), id: doc.id });
          }
        });
        setReceives([...user]);
      });

      return () => unSub();
    }
  }, [phMatchA]);

  //自分から申請してまだつながっていないユーザーのデータをfirestoreから取得
  useEffect(() => {
    if (phMatchB) {
      let unSub = db.collection("userProfiles").onSnapshot((snapshot) => {
        let user = [];
        snapshot.docs.forEach((doc) => {
          if (phMatchB.includes(doc.id)) {
            user.push({ ...doc.data(), id: doc.id });
          }
        });
        setPassesA([...user]);
      });

      return () => unSub();
    }
  }, [phMatchB]);

  //自分から申請してまだつながっていない企業のデータをfirestoreから取得
  useEffect(() => {
    if (coMatchB) {
      let unSub = db.collection("companies").onSnapshot((snapshot) => {
        let com = [];
        snapshot.docs.forEach((doc) => {
          if (coMatchB.includes(doc.id)) {
            com.push({ ...doc.data(), id: doc.id });
          }
        });
        setPassesB([...com]);
      });

      return () => unSub();
    }
  }, [coMatchB]);

  // 上記の自分から申請したユーザーと企業のデータを結合
  useEffect(() => {
    if (passesA && passesB) {
      setPasses([...passesA, ...passesB]);
    }
  }, [passesA, passesB]);

  // 相手からのつながりリクエストを許可
  const allow = async (receive: Receives): Promise<void> => {
    if (receive) {
      await db
        .collection("phMatch")
        .where("pharmacistA", "==", receive.id)
        .where("pharmacistB", "==", userId)
        .get()
        .then((querySnapshot) =>
          querySnapshot.docs.forEach(
            async (doc) =>
              await db
                .collection("phMatch")
                .doc(doc.id)
                .update({ requestB: true })
                .then(() => {
                  alert.success("つながりました");
                })
                .catch(() => {
                  alert.error("つながれませんでした");
                })
          )
        );
    }
  };

  ///////// JSXエリア /////////
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div 
                className="inline-block w-full max-w-md p-6 my-8 
                overflow-hidden text-center align-middle transition-all 
                transform bg-white shadow-xl rounded-2xl"
              >
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-blue-400 my-5"
                >
                  つながりリクエスト
                </Dialog.Title>

                <div className="grid grid-cols-2">
                  <div>
                    <button
                      onClick={() => setRequest(true)}
                      className="font-bold my-5 hover:text-gray-500 
                      transition duration-300"
                    >
                      <p
                        className={request ? "border-b-4 border-blue-400" : ""}
                      >
                        相手から
                      </p>
                    </button>
                  </div>
                  
                  <div>
                    <button
                      onClick={() => setRequest(false)}
                      className="font-bold my-5 hover:text-gray-500 
                      transition duration-300"
                    >
                      <p
                        className={request ? "" : "border-b-4 border-blue-400"}
                      >
                        自分から
                      </p>
                    </button>
                  </div>
                </div>

                {request ? (
                  <div className="mb-10">
                    {receives.map((receive, index) => (
                      <div key={index}>
                        <div 
                          className="grid grid-cols-12 gap-3 px-3 
                          py-2 border-b items-center"
                        >
                          <div className="col-span-3 flex items-center">
                            {receive.profileImageUrl ? (
                              <Image
                                className="inline object-cover rounded-full"
                                width={50}
                                height={50}
                                src={receive.profileImageUrl}
                                alt="Profile image"
                              />
                            ) : (
                              demoImg && (
                                <Image
                                  className="inline object-cover rounded-full"
                                  width={50}
                                  height={50}
                                  src={demoImg}
                                  alt="Profile image"
                                />
                              )
                            )}
                          </div>

                          <div 
                            className="col-span-5 break-words 
                            justify-self-start text-left"
                          >
                            <p>{receive.userName}</p>

                            <p className="text-xs text-blue-300">
                              {receive.homeAddress}
                            </p>
                          </div>

                          <div className="col-span-4">
                            <button
                              className="text-white bg-blue-400 transition 
                              duration-300 hover:bg-blue-300 py-1 px-2 mx-2 
                              rounded-full shadow-lg text-xs"
                              onClick={() => allow(receive)}
                            >
                              つながる
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mb-10">
                    {passes.map((pass, index) => (
                      <div key={index}>
                        {pass.userName && (
                          <div 
                            className="grid grid-cols-12 gap-3 
                            px-3 py-2 border-b items-center"
                          >
                            <div className="col-span-3 flex items-center">
                              {pass.profileImageUrl ? (
                                <Image
                                  className="inline object-cover rounded-full"
                                  width={50}
                                  height={50}
                                  src={pass.profileImageUrl}
                                  alt="Profile image"
                                />
                              ) : (
                                demoImg && (
                                  <Image
                                    className="inline object-cover rounded-full"
                                    width={50}
                                    height={50}
                                    src={demoImg}
                                    alt="Profile image"
                                  />
                                )
                              )}
                            </div>

                            <div 
                              className="col-span-5 break-words 
                              justify-self-start text-left"
                            >
                              <p>{pass.userName}</p>

                              <p className="text-xs text-blue-300">
                                {pass.homeAddress}
                              </p>
                            </div>
                          </div>
                        )}
                        {pass.companyName && (
                          <div 
                            className="grid grid-cols-12 gap-3 
                            px-3 py-2 border-b items-center"
                          >
                            <div className="col-span-3 flex items-center">
                              {pass.companyImageUrl ? (
                                <Image
                                  className="inline object-cover rounded-full"
                                  width={50}
                                  height={50}
                                  src={pass.companyImageUrl}
                                  alt="Company image"
                                />
                              ) : (
                                companyDemoImg && (
                                  <Image
                                    className="inline object-cover rounded-full"
                                    width={50}
                                    height={50}
                                    src={companyDemoImg}
                                    alt="Company image"
                                  />
                                )
                              )}
                            </div>

                            <div 
                              className="col-span-5 break-words 
                              justify-self-start text-left"
                            >
                              <p>{pass.companyName}</p>

                              <p className="text-xs text-blue-300">
                                {pass.companyPrefecture}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 
                    text-sm font-medium text-white bg-blue-400 
                    border border-transparent rounded-md 
                    hover:bg-blue-300 focus:outline-none"
                    onClick={closeModal}
                  >
                    戻る
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
