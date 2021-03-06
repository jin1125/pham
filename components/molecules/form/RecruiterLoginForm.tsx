import Router from "next/router";
import React, { memo, useState, VFC } from "react";
import { useAlert } from "react-alert";
import { auth } from "../../../firebase";

export const RecruiterLoginForm: VFC = memo(() => {
  ///////// ステートエリア /////////
  const [companyEmail, setCompanyEmail] = useState<string>("");
  const [companyPassword, setCompanyPassword] = useState<string>("");

  // 定数定義
  const alert = useAlert();
  const recruiterEditPath = "/recruiter/edit";
  const loginSuccessMsg = "ログインしました";
  const loginErrorMsg = "ログインできませんでした";

  ///////// 関数エリア /////////
  //メールアドレスログイン
  const signIn = async (): Promise<void> => {
    try {
      await auth.signInWithEmailAndPassword(companyEmail, companyPassword);
      alert.success(loginSuccessMsg);
      Router.push(recruiterEditPath);
    } catch (error) {
      alert.error(loginErrorMsg);
    }
  };

  ///////// JSXエリア /////////
  return (
    <div className="border my-7 shadow-lg">
      <div className="my-7">
        <label>
          <p>メールアドレス</p>
          <input
            className="bg-blue-100 placeholder-blue-300 
            text-center rounded-full w-3/4 py-1 outline-none"
            placeholder="email@example.com"
            name="email"
            autoComplete="email"
            type="email"
            maxLength={256}
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
          />
        </label>
      </div>

      <div className="my-7">
        <label>
          <p>パスワード</p>
          <input
            className="bg-blue-100 placeholder-blue-300 
            text-center rounded-full w-3/4 py-1 outline-none"
            name="password"
            type="password"
            maxLength={20}
            placeholder="半角英数字 6文字以上"
            value={companyPassword}
            onChange={(e) => setCompanyPassword(e.target.value)}
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
  );
});
