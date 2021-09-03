import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'

export default function Lp() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="flex justify-between">
          <div className='m-5'>
            <h2 className='text-2xl text-blue-400 font-bold'>Pham</h2>
          </div>
          <div className='m-7'>
            <Link href="/recruit">
              <button className='text-blue-400 hover:text-blue-300'>採用担当者様はこちら</button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="text-center">
          <div>
            <h1 className='text-2xl text-blue-400 font-bold'>自分の中身を見つめ直す。薬局の中身を見つめ直す。</h1>
          </div>
          
            <Image
            src="/lp_img.jpeg"
            alt="lp_img"
            width={380}
            height={380}
            />

          <div>
            <h3 className='text-xl font-bold'>薬局薬剤師さんのお仕事SNS</h3>
          </div>

          <div className='mt-10'>
           <Link href="/login">
              <button className='text-white bg-blue-400 hover:bg-blue-300 py-3 px-14 rounded-full shadow-lg font-bold'>ログイン / 新規登録</button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
