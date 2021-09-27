import Head from "next/head";
import {FirstHeader} from '../components/header/FirstHeader'
import {FirstPage} from '../components/organisms/main/FirstPage'

export default function Lp() {
  
  ////////////////////////// JSXエリア //////////////////////////
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pham トップページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FirstHeader/>

      <FirstPage/>
    </div>
  );
}
