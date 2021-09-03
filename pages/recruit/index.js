import firebase from "firebase/app";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { db } from "../../firebase";

export default function recruit() {
  const [companyName, setCompanyName] = useState("");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [isContactUs, setIsContactUs] = useState(false);

  const alert = useAlert();

  const contactUs = async () => {
    const inquiry = {
      companyName: companyName,
      clientName: clientName,
      email: email,
      tel: tel,
      datetime: firebase.firestore.Timestamp.now(),
    };

    await db
      .collection("inquirys")
      .add(inquiry)
      .then((docRef) => {
        alert.success("お問い合わせしました");
        setIsContactUs(true);
      })
      .catch((error) => {
        alert("お問い合わせに失敗しました");
      });

    setCompanyName("");
    setClientName("");
    setEmail("");
    setTel("");
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham 採用担当様お問い合わせ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="m-5">
          <Link href="/">
            <button>
              <h2 className="text-2xl text-blue-400 font-bold">Pham</h2>
            </button>
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-2 items-center">
        <div className="text-center">
          <div>
            {isContactUs ? (
              <h1 className="text-2xl ml-20 text-blue-400 font-bold">
                お問い合わせ完了！
              </h1>
            ) : (
              <h1 className="text-2xl ml-20 text-blue-400 font-bold">
                Phamへようこそ！
              </h1>
            )}
          </div>

          <div className="text-left ml-20 mt-5">
            {isContactUs ? (
              <p className="text-sm">
                お問い合わせ頂き、誠にありがとうございます。弊社スタッフより3営業日以内に、折返しヒアリングのご連絡をさせて頂きます。今しばらくお待ち下さいませ。
              </p>
            ) : (
              <p className="text-sm">
                この度は、Phamにご興味をお持ち頂き、誠にありがとうございます。求人掲載をご検討の採用担当様は、下記フォームよりお問い合わせくださいませ。弊社スタッフより、折返しヒアリングのご連絡をさせて頂きます。
              </p>
            )}
          </div>

          {isContactUs ? (
            <div className='mt-10 ml-20'>
            <Link href="/">
               <button className='text-white bg-blue-400 hover:bg-blue-300 py-3 px-14 rounded-full shadow-lg font-bold'>トップページへ</button>
             </Link>
           </div>
          ) : (
            <div className="border my-7 ml-20 shadow-lg">
              <div className="my-7">
                <label>
                  <p>会社名</p>
                  <input
                    className="bg-blue-100 placeholder-blue-300 text-center rounded-full w-3/4 py-1 outline-none"
                    type="text"
                    name="organization"
                    autoComplete="organization"
                    autoFocus
                    required
                    maxLength="30"
                    pattern=".*\S+.*"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </label>
              </div>

              <div className="my-7">
                <label>
                  <p>名前</p>
                  <input
                    className="bg-blue-100 placeholder-blue-300 text-center rounded-full w-3/4 py-1 outline-none"
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    pattern=".*\S+.*"
                    placeholder="姓 名"
                    maxLength="20"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </label>
              </div>

              <div className="my-7">
                <label>
                  <p>メールアドレス</p>
                  <input
                    className="bg-blue-100 placeholder-blue-300 text-center rounded-full w-3/4 py-1 outline-none"
                    placeholder="email@example.com"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    required
                    maxLength="256"
                    pattern=".*\S+.*"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>

              <div className="my-7">
                <label>
                  <p>電話番号</p>
                  <input
                    className="bg-blue-100 placeholder-blue-300 text-center rounded-full w-3/4 py-1 outline-none"
                    placeholder="xxx-xxxx-xxxx"
                    name="tel"
                    type="tel"
                    autoComplete="tel"
                    value={tel}
                    required
                    maxLength="20"
                    pattern=".*\S+.*"
                    onChange={(e) => setTel(e.target.value)}
                  />
                </label>
              </div>

              <div>
                <div className="my-7">
                  <button
                    type="submit"
                    className="text-white bg-blue-400 hover:bg-blue-300 py-2 w-1/2 rounded-full shadow-lg font-bold"
                    onClick={contactUs}
                  >
                    お問い合わせ
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          {isContactUs ? (
            <Image
              src="/contactus_img.jpeg"
              alt="contactus_img"
              width={350}
              height={350}
            />
          ) : (
            <Image
              src="/recruit_img.jpeg"
              alt="recruit_img"
              width={420}
              height={280}
            />
          )}
        </div>
      </div>
    </div>
  );
}
