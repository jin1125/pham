import Image from "next/image";
import Router from "next/router";
import { memo, useContext, useEffect, useState, VFC } from "react";
import { auth } from "../../../../firebase";
import { UserContext } from "../../../../context/UserContext";
import ApplyModal from "../../modal/ApplyModal";
import { SearchJob_L } from "./SearchJob_L";
import { SearchJob_R } from "./SearchJob_R";

export const SearchJob: VFC = memo(() => {
  ///////// ステートエリア /////////
  const [coPassId, setCoPassId] = useState<string>("");
  const [coReceiveId, setCoReceiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // グローバルなステート
  const { selectJob, setUserId } = useContext(UserContext);
  
  // 定数定義
  const loginPath = "/login";

  ///////// 関数エリア /////////
  //ユーザーID取得＆ログインしてなければログインページへ
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        Router.push(loginPath);
      }
    });

    return () => unSub();
  }, []);

  ///////// JSXエリア /////////
  return (
    <div>
      <div className="grid grid-cols-12">
        {/* 薬局検索(ページ左) */}
        <SearchJob_L
          setCoPassId={setCoPassId}
          setCoReceiveId={setCoReceiveId}
        />

        {selectJob && Object.keys(selectJob).length ? (
          <>
            {/* 薬局検索描画(ページ右) */}
            <SearchJob_R
              setCoPassId={setCoPassId}
              setCoReceiveId={setCoReceiveId}
              coPassId={coPassId}
              coReceiveId={coReceiveId}
              setIsOpen={setIsOpen}
            />

            {/* 求人申し込み完了モーダル */}
            <ApplyModal isOpen={isOpen} setIsOpen={setIsOpen} />
          </>
        ) : (
          <div 
            className="h-screen md:col-span-9 col-span-12 
            justify-self-center self-center md:pt-24"
          >
            {/* 未選択時表示画像 */}
            <Image
              src="/job_search_img.png"
              alt="login_img"
              width={400}
              height={300}
            />
          </div>
        )}
      </div>
    </div>
  );
});
