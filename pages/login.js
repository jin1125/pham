import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { auth, provider } from "../firebase";

export default function login() {
  const [userName, setUserName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [openReset, setOpenReset] = useState(false);

  const alert = useAlert();

  const sendResetEmail = async (e) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenReset(false);
        alert.success("メールを送信しました");
        setResetEmail("");
      })
      .catch((err) => {
        alert.error("正しい内容を入力してください");
        setResetEmail("");
      });
  };

  const signInGoogle = async () => {
    await auth
      .signInWithPopup(provider)
      .then(() => {
        alert.success("Googleで続行しました");
        Router.push("/mypage");
      })
      .catch(() => alert.error("Googleで続行できませんでした"));
  };

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      alert.success("ログインしました");
      Router.push("/mypage");
    } catch (error) {
      alert.error("ログインできませんでした");
    }
  };

  const signUp = async () => {
    try {
      const authUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await authUser.user?.updateProfile({
        displayName: userName,
      });

      alert.success("アカウントを作成できました");
      Router.push("/mypage");
    } catch (error) {
      alert.error("アカウントを作成できませんでした");
    }
  };

  const switchSignIn = () => {
    setIsLogin(true);
  };

  const switchSignUp = () => {
    setIsLogin(false);
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham ログイン/新規登録</title>
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
            <h1 className="text-2xl ml-20 text-blue-400 font-bold">
              Phamへようこそ！
            </h1>
          </div>

          <div className="border my-7 ml-20 shadow-lg">
            <div className="grid grid-cols-2">
              <div>
                <button
                  onClick={switchSignIn}
                  className="font-bold my-5 hover:text-gray-500"
                >
                  <p className={isLogin ? "border-b-4 border-blue-400" : ""}>
                    ログイン
                  </p>
                </button>
              </div>
              <div>
                <button
                  onClick={switchSignUp}
                  className="font-bold my-5 hover:text-gray-500"
                >
                  <p className={isLogin ? "" : "border-b-4 border-blue-400"}>
                    新規登録
                  </p>
                </button>
              </div>
            </div>

            {!isLogin && (
              <>
                <div className="my-5">
                  <label>
                    <p>お名前</p>
                    <input
                      className="bg-blue-100 placeholder-blue-300 text-center rounded-full w-3/4 py-1 outline-none"
                      placeholder="姓 名"
                      name="name"
                      autoComplete="name"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </label>
                  <small className="text-gray-400">
                    <p>※あとで変更できません</p>
                  </small>
                </div>
              </>
            )}

            <div className="my-7">
              <label>
                <p>メールアドレス</p>
                <input
                  className="bg-blue-100 placeholder-blue-300 text-center rounded-full w-3/4 py-1 outline-none"
                  placeholder="email@example.com"
                  name="email"
                  autoComplete="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  placeholder="半角英数字 6文字以上"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            <div className="mt-10 mb-7">
              <div>
                <button
                  className="text-white bg-blue-400 hover:bg-blue-300 disabled:bg-blue-200 py-2 w-1/2 rounded-full shadow-lg font-bold"
                  // disabled={!isLogin && userName.trim() === "" ? true : false}
                  disabled={
                    isLogin
                      ? email.trim() === "" || password.trim().length+1 <= 6
                      : userName.trim() === "" ||
                        email.trim() === "" ||
                        password.trim().length+1 <= 6
                  }
                  onClick={
                    isLogin
                      ? () => {
                          signIn();
                        }
                      : () => {
                          signUp();
                        }
                  }
                >
                  {isLogin ? "ログイン" : "新規登録"}
                </button>
              </div>

              {isLogin && (
                <div className="mt-3">
                  <span
                    className="cursor-pointer text-sm text-blue-400 hover:text-blue-300"
                    onClick={() => setOpenReset(!openReset)}
                  >
                    パスワードをお忘れの方
                  </span>
                  {openReset && (
                    <div className="mt-2">
                      <input
                        className="bg-blue-100 placeholder-blue-300 text-center rounded-l w-3/5 py-1 outline-none"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                      />
                      <button
                        onClick={sendResetEmail}
                        className="text-white bg-blue-400 hover:bg-blue-300 py-1 px-2  rounded-r font-bold"
                      >
                        送信
                      </button>
                      <p className="text-xs text-blue-400 mt-1">
                        新しいパスワードを登録するページのURLを、
                        <br />
                        ご登録メールアドレス宛に送付致します
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <hr />

            <div>
              <div className="my-7">
                <button
                  className="text-white bg-blue-400 hover:bg-blue-300 py-2 w-1/2 rounded-full shadow-lg font-bold"
                  onClick={signInGoogle}
                >
                  Googleで続行
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Image
            src="/login_img.jpeg"
            alt="login_img"
            width={400}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
