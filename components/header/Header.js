import { Emoji } from "emoji-mart";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header>
      <div className="grid grid-cols-6 gap-3 bg-blue-300 py-4 justify-items-center items-center leading-none">
        <Link href="/mypage">
          <button>
            <h2 className="text-2xl text-white font-bold">Pham</h2>
          </button>
        </Link>

        <Link href="/mypage/message">
          <button className="font-bold text-center text-blue-400 transition duration-300 hover:text-white bg-white hover:bg-blue-300 py-2 rounded-full w-full">
            メッセージ
          </button>
        </Link>

        <Link href="/pharmacists/search">
          <button className="font-bold text-center text-blue-400 transition duration-300 hover:text-white bg-white hover:bg-blue-300 py-2 rounded-full w-full">
            薬剤師検索
          </button>
        </Link>

        <Link href="/companys/search">
          <button className="font-bold text-center text-blue-400 transition duration-300 hover:text-white bg-white hover:bg-blue-300 py-2 rounded-full w-full">
            企業検索
          </button>
        </Link>

        <Link href="/jobs/search">
          <button className="font-bold text-center text-blue-400 transition duration-300 hover:text-white bg-white hover:bg-blue-300 py-2 rounded-full w-full">
            求人検索
          </button>
        </Link>

        <Link href="/mypage/edit">
          <button>
            <Emoji emoji="gear" size={30} />
          </button>
        </Link>
      </div>
    </header>
  );
}
