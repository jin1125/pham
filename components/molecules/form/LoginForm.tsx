import Router from "next/router";
import React, { memo, useState, VFC } from "react";
import { useAlert } from "react-alert";
import { auth, db, provider } from "../../../firebase";

export const LoginForm: VFC = memo(() => {
  const alert = useAlert();
  ///////// ステートエリア /////////
  const [name, setName] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resetEmail, setResetEmail] = useState<string>("");
  const [openReset, setOpenReset] = useState<boolean>(false);

  ///////// 関数エリア /////////
  //Google新規登録＆ログイン
  const signInGoogle = async (): Promise<void> => {
    await auth
      .signInWithPopup(provider)
      .then(() => {
        console.log("google");
        alert.success("Googleで続行しました");
        Router.push("/mypage");
      })
      .catch((error) => {
        console.log(error);
        alert.error("Googleで続行できませんでした");
      });
  };

  //メールアドレスログイン
  const signIn = async (): Promise<void> => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      alert.success("ログインしました");
      Router.push("/mypage");
    } catch (error) {
      alert.error("ログインできませんでした");
    }
  };

  //メールアドレス新規登録
  const signUp = async (): Promise<void> => {
    if (name) {
      try {
        await auth.signOut();
        const user = await auth.createUserWithEmailAndPassword(email, password);

        await db
          .collection("userProfiles")
          .doc(user.user.uid)
          .set({ userName: name })
          .then(() => {
            console.log("OK");
            Router.push("/mypage");
          })
          .catch(() => {
            console.log("NG");
          });

        alert.success("アカウントを作成できました");
      } catch (error) {
        alert.error("アカウントを作成できませんでした");
      }
    }
  };

  //アドレスリセットメール送信
  const sendResetEmail = async (): Promise<void> => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenReset(false);
        alert.success("メールを送信しました");
        setResetEmail("");
      })
      .catch(() => {
        alert.error("正しい内容を入力してください");
        setResetEmail("");
      });
  };

  //テストログイン
  const testLogin = async ():Promise<void> => {
    try {
      await auth.signInWithEmailAndPassword("testuser@gmail.com", "123456");
      alert.success("ログインしました");
      Router.push("/mypage");
    } catch (error) {
      alert.error("ログインできませんでした");
    }
  };

  ///////// JSXエリア /////////
  return (
    <div className="border my-7 shadow-lg ">
      {/* ログインと新規登録表示の切り替えボタン */}
      <div className="grid grid-cols-2">
        <div>
          <button
            onClick={() => setIsLogin(true)}
            className="font-bold my-5 hover:text-gray-500 
            transition duration-300"
          >
            <p className={isLogin ? "border-b-4 border-blue-400" : ""}>
              ログイン
            </p>
          </button>
        </div>
        <div>
          <button
            onClick={() => setIsLogin(false)}
            className="font-bold my-5 hover:text-gray-500 
            transition duration-300"
          >
            <p className={isLogin ? "" : "border-b-4 border-blue-400"}>
              新規登録
            </p>
          </button>
        </div>
      </div>

      {/* 新規登録の時だけ表示 */}
      {!isLogin && (
        <>
          <div className="my-5">
            <label>
              <p>お名前</p>
              <input
                className="bg-blue-100 placeholder-blue-300 
                text-center rounded-full w-3/4 py-1 outline-none"
                placeholder="姓 名"
                name="name"
                autoComplete="name"
                type="text"
                maxLength={20}
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </label>
          </div>
        </>
      )}

      <div className="my-7">
        {isLogin && (
          <button
            className="text-xs text-blue-400 bg-white border-2 
            border-blue-400 transition duration-300 hover:bg-blue-100 
            py-1 w-1/3 my-3 rounded-full shadow-lg font-bold"
            onClick={testLogin}
          >
            テストログイン
          </button>
        )}

        <label>
          <p>メールアドレス</p>
          <input
            className="bg-blue-100 placeholder-blue-300 text-center 
            rounded-full w-3/4 py-1 outline-none"
            placeholder="email@example.com"
            name="email"
            autoComplete="email"
            type="email"
            maxLength={256}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </label>
      </div>

      <div className="my-7">
        <label>
          <p>パスワード</p>
          <input
            className="bg-blue-100 placeholder-blue-300 text-center 
            rounded-full w-3/4 py-1 outline-none"
            name="password"
            type="password"
            maxLength={20}
            value={password}
            placeholder="半角英数字 6文字以上"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </label>
      </div>

      <div className="mt-10 mb-7">
        <div>
          <button
            className="text-white bg-blue-400 transition 
            duration-300 hover:bg-blue-300 disabled:bg-blue-200 
            py-2 w-1/2 rounded-full shadow-lg font-bold"
            disabled={
              isLogin
                ? email.trim() === "" || password.trim().length + 1 <= 6
                : name.trim() === "" ||
                  email.trim() === "" ||
                  password.trim().length + 1 <= 6
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

        {/* ログインの時だけ表示 */}
        {isLogin && (
          <div className="mt-3">
            <span
              className="cursor-pointer text-sm text-blue-400 transition 
              duration-300 hover:text-blue-300"
              onClick={() => setOpenReset(!openReset)}
            >
              パスワードをお忘れの方
            </span>
            {openReset && (
              <div className="mt-2">
                <input
                  className="bg-blue-100 placeholder-blue-300 
                  text-center rounded-l w-3/5 py-1 outline-none"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  value={resetEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setResetEmail(e.target.value)
                  }
                />
                <button
                  onClick={sendResetEmail}
                  className="text-white bg-blue-400 
                  transition duration-300 hover:bg-blue-300 
                  py-1 px-2  rounded-r font-bold"
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
            className="text-white bg-blue-400 transition duration-300 
            hover:bg-blue-300 py-2 w-1/2 rounded-full shadow-lg font-bold"
            onClick={signInGoogle}
          >
            Googleで続行
          </button>
        </div>
      </div>
    </div>
  );
});
