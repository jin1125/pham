import { Emoji } from "emoji-mart";
import Image from "next/image";
import React, {
  Dispatch,
  memo,
  useContext,
  useEffect,
  useRef,
  VFC,
} from "react";
import Loader from "react-loader-spinner";
import { Feeds } from "../../types/feeds";
import { UserContext } from "../../UserContext";

///////// 型定義エリア /////////
type Props = {
  feeds: Feeds;
  demoImg: string;
  fileUrl: string;
  loading: boolean;
  length: number;
  isLastItem: boolean;
  uploadImage: any;
  sendMsg: any;
  msg: string;
  setMsg: Dispatch<React.SetStateAction<string>>;
  avatarImage: string;
  name: string;
};

export const SearchMsg_R_Ph: VFC<Props> = memo(
  ({
    feeds,
    demoImg,
    fileUrl,
    loading,
    length,
    isLastItem,
    uploadImage,
    sendMsg,
    msg,
    setMsg,
    avatarImage,
    name,
  }) => {
    const { selectMsg, userId } = useContext(UserContext);

    ///////// 関数エリア /////////
    // メッセージの最後にスクロール設定
    const ref = useRef(null);
    useEffect(() => {
      if (isLastItem && ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [isLastItem, ref.current, feeds]);

    ///////// JSXエリア /////////
    return (
      <div className="md:col-span-9 col-span-12">
        <div className="overflow-auto h-screen lg:pb-16 pb-12 md:px-10 px-5">
          {feeds.map((feed, index) => {
            isLastItem = length === index + 1;
            return (
              <div
                key={index}
                className="grid grid-cols-12 gap-5 my-12"
                ref={ref}
              >
                <div className="md:col-span-1 col-span-2">
                  {feed.id === userId && avatarImage ? (
                    <Image
                      className="inline object-cover  rounded-full"
                      width={50}
                      height={50}
                      src={avatarImage}
                      alt="avatarImage"
                    />
                  ) : feed.id === selectMsg.objectID &&
                    selectMsg.profileImageUrl ? (
                    <Image
                      className="inline object-cover  rounded-full"
                      width={50}
                      height={50}
                      src={selectMsg.profileImageUrl}
                      alt="avatarImage"
                    />
                  ) : (
                    demoImg && (
                      <Image
                        className="inline object-cover  rounded-full"
                        width={50}
                        height={50}
                        src={demoImg}
                        alt="avatarImage"
                      />
                    )
                  )}
                </div>

                <div className="md:col-span-11 col-span-10">
                  <div className="flex flex-row flex-wrap gap-3 items-end mb-1">
                    {feed.id === userId && <p className="font-bold">{name}</p>}
                    {feed.id === selectMsg.objectID && (
                      <p className="font-bold">{selectMsg.userName}</p>
                    )}
                    {feed.yyyy && (
                      <p className="text-xs text-blue-300">{`${feed.yyyy}/${feed.MM}/${feed.dd} ${feed.HH}:${feed.mm}`}</p>
                    )}
                  </div>
                  <p>{feed.text}</p>
                  {feed.image && (
                    <Image
                      className="inline object-cover  rounded-lg"
                      width={200}
                      height={200}
                      src={feed.image}
                      alt="uploadImg"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-12 gap-2 justify-items-center items-center leading-none fixed right-0 bottom-0 w-full p-4 bg-white border-t-2">
          <label className="col-span-1 cursor-pointer hover:opacity-60">
            {fileUrl ? (
              <Image
                className="inline object-cover  rounded-lg"
                width={50}
                height={50}
                src={fileUrl}
                alt="uploadImg"
              />
            ) : (
              <Emoji emoji="camera_with_flash" size={25} />
            )}
            <input
              className="hidden"
              accept="image/*"
              type="file"
              onChange={uploadImage}
            />
          </label>

          <textarea
            rows={1}
            autoFocus
            value={msg}
            name="msg"
            maxLength={200}
            className="bg-blue-100 rounded-lg p-2 w-full outline-none col-span-10"
            onChange={(e) => setMsg(e.target.value.trim())}
          />

          {loading ? (
            <div className="flex justify-center">
              <Loader type="Watch" color="#93C5FD" height={30} width={30} />
            </div>
          ) : (
            <button
              className="col-span-1 transform  duration-500 hover:scale-150 hover:-rotate-45 hover:-translate-y-6 disabled:opacity-60 disabled:hover:scale-100 disabled:hover:rotate-0 disabled:hover:-translate-y-0"
              onClick={sendMsg}
              disabled={!msg && !fileUrl}
            >
              <Emoji emoji="rocket" size={35} />
            </button>
          )}
        </div>
      </div>
    );
  }
);
