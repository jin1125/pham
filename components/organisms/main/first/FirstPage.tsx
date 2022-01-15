import Image from "next/image";
import Link from "next/link";
import React, { memo, VFC } from "react";

export const FirstPage: VFC = memo(() => {
  ///////// JSXエリア /////////
  return (
    <main>
      <div 
        className="min-h-screen grid justify-items-center items-center 
        content-center md:-mt-20 -mt-10"
      >
        <div>
          <h1 className="text-2xl text-blue-400 font-bold">
            自分の中身を見つめ直す。
            <br className="md:hidden" />
            薬局の中身を見つめ直す。
          </h1>
        </div>

        <Image src="/lp_img.png" alt="lp_img" width={380} height={380} />

        <div>
          <h3 className="text-xl font-bold">薬局薬剤師さんのお仕事SNS</h3>
        </div>

        <div className="mt-10">
          <Link href="/login">
            <button 
              className="text-white bg-blue-400 
              hover:bg-blue-300  transition duration-300 
              py-3 px-14 rounded-full shadow-lg font-bold"
            >
              ログイン / 新規登録
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
});
