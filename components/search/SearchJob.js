import Image from "next/image";
import Router from "next/router";
import { memo, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { UserContext } from "../../UserContext";
import ApplyModal from "../organisms/modal/ApplyModal";
import { SearchJob_L } from "./SearchJob_L";
import { SearchJob_R } from "./SearchJob_R";

export const SearchJob = memo(() => {
  const [coPassId, setCoPassId] = useState("");
  const [coReceiveId, setCoReceiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { selectJob, setUserId } = useContext(UserContext);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        Router.push("/login");
      }
    });

    return () => unSub();
  }, []);


  return (
    <div>
      <div className="grid grid-cols-12">
        {/* ////// 薬局検索(ページ左) ////// */}
        <SearchJob_L
          setCoPassId={setCoPassId}
          setCoReceiveId={setCoReceiveId}
        />

        {/* ////// 薬局検索描画(ページ右) ////// */}
        {selectJob ? (
          <>
            <SearchJob_R
              setCoPassId={setCoPassId}
              setCoReceiveId={setCoReceiveId}
              coPassId={coPassId}
              coReceiveId={coReceiveId}
              setIsOpen={setIsOpen}
            />
            <ApplyModal isOpen={isOpen} setIsOpen={setIsOpen} />
          </>
        ) : (
          <div className="h-screen md:col-span-9 col-span-12 justify-self-center self-center md:pt-24">
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
