import firebase from "firebase/app";
import React, { Dispatch, memo, useEffect, useState, VFC } from "react";
import { useAlert } from "react-alert";
import { db } from "../../../firebase";

///////// 型定義エリア /////////
type Props = {
  isContactUs: boolean;
  setIsContactUs: Dispatch<React.SetStateAction<boolean>>;
};

export const RecruiterForm: VFC<Props> = memo(
  ({ isContactUs, setIsContactUs }) => {
    ///////// ステートエリア /////////
    const [companyName, setCompanyName] = useState<string>("");
    const [clientName, setClientName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [tel, setTel] = useState<string>("");

    // 定数定義
    const alert = useAlert();
    const inquirysSuccessMsg = "お問い合わせしました";
    const inquirysErrorMsg = "お問い合わせに失敗しました";
    
    ///////// 関数エリア /////////
    // お問い合わせ処理
    const contactUs = async () => {
      const inquiry: {
        companyName: string;
        clientName: string;
        email: string;
        tel: string;
        datetime: firebase.firestore.Timestamp;
      } = {
        companyName: companyName,
        clientName: clientName,
        email: email,
        tel: tel,
        datetime: firebase.firestore.Timestamp.now(),
      };

      await db
        .collection("inquirys")
        .add(inquiry)
        .then(() => {
          alert.success(inquirysSuccessMsg);
          setIsContactUs(true);
        })
        .catch(() => {
          alert.error(inquirysErrorMsg);
          setCompanyName("");
          setClientName("");
          setEmail("");
          setTel("");
        });
    };

    useEffect(() => {
      let isMounted = true;
      if (isContactUs) {
        if (isMounted) {
          setCompanyName("");
          setClientName("");
          setEmail("");
          setTel("");
        }
      }
      
      return () => {
        isMounted = false;
      };
    }, [isContactUs]);

    ///////// JSXエリア /////////
    return (
      <div className="border my-7 shadow-lg">
        <div className="my-7">
          <label>
            <p>会社名</p>
            <input
              className="bg-blue-100 placeholder-blue-300 
              text-center rounded-full w-3/4 py-1 outline-none"
              type="text"
              name="organization"
              autoComplete="organization"
              autoFocus
              required
              maxLength={30}
              pattern=".*\S+.*"
              value={companyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCompanyName(e.target.value)
              }
            />
          </label>
        </div>

        <div className="my-7">
          <label>
            <p>名前</p>
            <input
              className="bg-blue-100 placeholder-blue-300 
              text-center rounded-full w-3/4 py-1 outline-none"
              type="text"
              name="name"
              autoComplete="name"
              required
              pattern=".*\S+.*"
              placeholder="姓 名"
              maxLength={20}
              value={clientName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClientName(e.target.value)
              }
            />
          </label>
        </div>

        <div className="my-7">
          <label>
            <p>メールアドレス</p>
            <input
              className="bg-blue-100 placeholder-blue-300 
              text-center rounded-full w-3/4 py-1 outline-none"
              placeholder="email@example.com"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              required
              maxLength={256}
              pattern=".*\S+.*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </label>
        </div>

        <div className="my-7">
          <label>
            <p>電話番号</p>
            <input
              className="bg-blue-100 placeholder-blue-300 
              text-center rounded-full w-3/4 py-1 outline-none"
              placeholder="xxx-xxxx-xxxx"
              name="tel"
              type="tel"
              autoComplete="tel"
              value={tel}
              required
              maxLength={20}
              pattern=".*\S+.*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTel(e.target.value)
              }
            />
          </label>
        </div>

        <div className="my-7">
          <button
            type="submit"
            className="text-white bg-blue-400 transition 
            duration-300 hover:bg-blue-300 disabled:bg-blue-200 
            py-2 w-1/2 rounded-full shadow-lg font-bold"
            onClick={contactUs}
            disabled={
              companyName.trim() === "" ||
              clientName.trim() === "" ||
              email.trim() === "" ||
              tel.trim() === ""
            }
          >
            お問い合わせ
          </button>
        </div>
      </div>
    );
  }
);
