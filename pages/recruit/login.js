import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { auth } from "../../firebase";

export default function login() {
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");

  const alert = useAlert();

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(companyEmail, companyPassword);
      alert.success("ログインしました");
      Router.push("/recruit/edit");
    } catch (error) {
      alert.error("ログインできませんでした");
    }
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham 企業ログイン</title>
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

      <div className="grid lg:grid-cols-2 min-h-screen md:-mt-20 justify-items-center items-center">
        <div className="text-center md:w-3/4 w-11/12 mb-5">
          <div>
            <h1 className="text-2xl text-blue-400 font-bold">
              企業ログイン
            </h1>
          </div>

          <div className="text-center block lg:hidden my-5">
          <Image
            src="/recruit_login_img.png"
            alt="login_img"
            width={200}
            height={200}
          />
        </div>

          <div className="border my-7 shadow-lg">
            <div className="my-7">
              <label>
                <p>メールアドレス</p>
                <input
                  className="bg-blue-100 placeholder-blue-300 text-center rounded-full w-3/4 py-1 outline-none"
                  placeholder="email@example.com"
                  name="email"
                  autoComplete="email"
                  type="email"
                  maxLength="256"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                />
              </label>
            </div>

            <div className="my-7">
              <label>
                <p>パスワード</p>
                <input
                  className="bg-blue-100 placeholder-blue-300 text-center rounded-full w-3/4 py-1 outline-none"
                  name="password"
                  type="password"
                  maxLength="20"
                  placeholder="半角英数字 6文字以上"
                  value={companyPassword}
                  onChange={(e) => setCompanyPassword(e.target.value)}
                />
              </label>
            </div>

            <div className="mt-10 mb-7">
              <div>
                <button
                  className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 disabled:bg-blue-200 py-2 w-1/2 rounded-full shadow-lg font-bold"
                  disabled={
                    companyEmail.trim() === "" ||
                    companyPassword.trim().length + 1 <= 6
                  }
                  onClick={signIn}
                >
                  ログイン
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center hidden lg:block">
          <Image
            src="/recruit_login_img.png"
            alt="login_img"
            width={350}
            height={350}
          />
        </div>
      </div>
    </div>
  );
}
