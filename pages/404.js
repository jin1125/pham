import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham 404</title>
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

      <div className="grid grid-cols-2 h-screen -mt-20 justify-items-center items-center">
        <div className="text-center">
          <h1 className="text-8xl text-blue-400">404</h1>
          <h4 className="text-2xl text-blue-400">page not found</h4>
          <div className="mt-8">
            <Link href="/">
              <button className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-1 w-full rounded-full shadow-lg font-bold">
                トップページへ
              </button>
            </Link>
          </div>
        </div>

        <div>
          <Image src="/404.png" alt="login_img" width={400} height={400} />
        </div>
      </div>
    </div>
  );
}
