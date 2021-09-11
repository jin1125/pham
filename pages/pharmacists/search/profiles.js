import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import Layout from "../../../components/layout/Layout";

export default function search() {
  ////////////////// ステートエリア //////////////////
  const [searchName, setSearchName] = useState("");
  const [searchHomeAddress, setSearchHomeAddress] = useState("");

  ////////////////// JSXエリア //////////////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham 薬剤師検索</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="grid grid-cols-2 items-center mt-16">
          <div className="text-center">
            <div>
              <h1 className="text-2xl ml-20 text-blue-400 font-bold">
                薬剤師検索
              </h1>
            </div>

            <div className="border my-7 ml-20 shadow-lg">
              <div className="my-7">
                <label>
                  <p>名前</p>
                  <input
                    className="bg-blue-100 placeholder-blue-300 text-center rounded-full w-3/4 py-1 outline-none"
                    placeholder="phamを検索"
                    name="name"
                    type="text"
                    maxLength="20"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </label>
              </div>

              <div className="my-7">
                <label>
                  <p>居住地</p>
                  <select
                    className="bg-blue-100 rounded-full outline-none pl-6 py-1 w-3/4"
                    name="homeAddress"
                    value={searchHomeAddress}
                    onChange={(e) => setSearchHomeAddress(e.target.value)}
                  >
                    <option value="">指定しない</option>
                    <option value="北海道">北海道</option>
                    <option value="青森県">青森県</option>
                    <option value="岩手県">岩手県</option>
                    <option value="宮城県">宮城県</option>
                    <option value="秋田県">秋田県</option>
                    <option value="山形県">山形県</option>
                    <option value="福島県">福島県</option>
                    <option value="茨城県">茨城県</option>
                    <option value="栃木県">栃木県</option>
                    <option value="群馬県">群馬県</option>
                    <option value="埼玉県">埼玉県</option>
                    <option value="千葉県">千葉県</option>
                    <option value="東京都">東京都</option>
                    <option value="神奈川県">神奈川県</option>
                    <option value="新潟県">新潟県</option>
                    <option value="富山県">富山県</option>
                    <option value="石川県">石川県</option>
                    <option value="福井県">福井県</option>
                    <option value="山梨県">山梨県</option>
                    <option value="長野県">長野県</option>
                    <option value="岐阜県">岐阜県</option>
                    <option value="静岡県">静岡県</option>
                    <option value="愛知県">愛知県</option>
                    <option value="三重県">三重県</option>
                    <option value="滋賀県">滋賀県</option>
                    <option value="京都府">京都府</option>
                    <option value="大阪府">大阪府</option>
                    <option value="兵庫県">兵庫県</option>
                    <option value="奈良県">奈良県</option>
                    <option value="和歌山県">和歌山県</option>
                    <option value="鳥取県">鳥取県</option>
                    <option value="島根県">島根県</option>
                    <option value="岡山県">岡山県</option>
                    <option value="広島県">広島県</option>
                    <option value="山口県">山口県</option>
                    <option value="徳島県">徳島県</option>
                    <option value="香川県">香川県</option>
                    <option value="愛媛県">愛媛県</option>
                    <option value="高知県">高知県</option>
                    <option value="福岡県">福岡県</option>
                    <option value="佐賀県">佐賀県</option>
                    <option value="長崎県">長崎県</option>
                    <option value="熊本県">熊本県</option>
                    <option value="大分県">大分県</option>
                    <option value="宮崎県">宮崎県</option>
                    <option value="鹿児島県">鹿児島県</option>
                    <option value="沖縄県">沖縄県</option>
                  </select>
                </label>
              </div>

              <div className="mt-10 mb-7">
                <div>
                  <button className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-2 w-1/2 rounded-full shadow-lg font-bold">
                    検索
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Image
              src="/pharmacists_search_img.png"
              alt="login_img"
              width={400}
              height={300}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
}