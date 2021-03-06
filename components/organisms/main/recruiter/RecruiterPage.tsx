import Image from "next/image";
import Link from "next/link";
import React, { memo, useState, VFC } from "react";
import { RecruiterForm } from "../../../molecules/form/RecruiterForm";

export const RecruiterPage: VFC = memo(() => {
  ///////// ステートエリア /////////
  const [isContactUs, setIsContactUs] = useState<boolean>(false);

  ///////// JSXエリア /////////
  return (
    <main 
      className="grid lg:grid-cols-2 min-h-screen xl:-mt-20 
      justify-items-center items-center"
    >
      <div className="text-center md:w-3/4 w-11/12">
        <div>
          {isContactUs ? (
            <h1 className="text-2xl  text-blue-400 font-bold">
              お問い合わせ完了！
            </h1>
          ) : (
            <h1 className="text-2xl  text-blue-400 font-bold">
              Phamへようこそ！
            </h1>
          )}
        </div>

        <div className="text-center my-5 block lg:hidden">
          {isContactUs ? (
            <Image
              src="/contactus_img.png"
              alt="contactus_img"
              width={200}
              height={200}
            />
          ) : (
            <Image
              src="/recruiter_img.png"
              alt="recruiter_img"
              width={420}
              height={280}
            />
          )}
        </div>

        <div className="mt-5 text-left">
          {isContactUs ? (
            <>
              <p className="text-sm  my-3">
                お問い合わせ頂き、誠にありがとうございます。弊社スタッフより3営業日以内に、
                折返しヒアリングのご連絡をさせて頂きますので、今しばらくお待ち下さいませ。
              </p>
              <p className="text-sm my-3">
                また、記載頂きましたメールアドレス宛に到着確認のメールを送付させて頂きました。
                無事メールが届いておりますかご確認くださいませ。
              </p>
            </>
          ) : (
            <p className="text-sm">
              この度は、Phamにご興味をお持ち頂き、誠にありがとうございます。
              求人掲載をご検討の採用担当様は、下記フォームよりお問い合わせくださいませ。
              弊社スタッフより、折返しヒアリングのご連絡をさせて頂きます。
            </p>
          )}
        </div>

        {isContactUs ? (
          <div className="my-10">
            <Link href="/">
              <button 
                className="text-white bg-blue-400 transition duration-300 
                hover:bg-blue-300 py-3 px-14 rounded-full shadow-lg font-bold"
              >
                トップページへ
              </button>
            </Link>
          </div>
        ) : (
          <RecruiterForm 
            isContactUs={isContactUs} 
            setIsContactUs={setIsContactUs} 
          />
        )}
      </div>

      <div className="text-center hidden lg:block">
        {isContactUs ? (
          <Image
            src="/contactus_img.png"
            alt="contactus_img"
            width={350}
            height={350}
          />
        ) : (
          <Image
            src="/recruiter_img.png"
            alt="recruiter_img"
            width={420}
            height={280}
          />
        )}
      </div>
    </main>
  );
});
