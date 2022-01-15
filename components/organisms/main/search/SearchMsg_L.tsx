import algoliasearch from "algoliasearch/lite";
import { Emoji } from "emoji-mart";
import React, { Dispatch, memo, useContext, VFC } from "react";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import { CustomSearchBox } from "../../../molecules/search/SearchBox";
import { hitComponentCoMsg } from "../../../molecules/search/HitComponentCoMsg";
import { Feeds } from "../../../../types/feeds";
import { UserContext } from "../../../../UserContext";
import { hitComponentPhMsg } from "../../../molecules/search/HitComponentPhMsg";

///////// 型定義エリア /////////
type Props = {
  changeMsg: boolean;
  setChangeMsg: Dispatch<React.SetStateAction<boolean>>;
  setFeeds: Dispatch<React.SetStateAction<Feeds>>;
};

export const SearchMsg_L: VFC<Props> = memo(
  ({ changeMsg, setChangeMsg, setFeeds }) => {
    ///////// 関数エリア /////////
    //algolia情報
    const searchClient = algoliasearch(
      "0TMIYQ8E9N",
      "58e6e394abd7a5cfcc6fcae0d7b51ac5"
    );

    const indexName = "pham";
    const indexCoName = "pham_companies";
    
    // グローバルなステート
    const { setSelectMsg } = useContext(UserContext);

    ///////// JSXエリア /////////
    return (
      <div 
        className="md:col-span-3 col-span-12 
        border-r-2 border-blue-400 relative"
      >
        <div className="md:absolute h-full flex flex-col w-full">
          <div 
            className="flex flex-row  flex-wrap bg-blue-400 text-lg py-3 
            leading-none justify-center items-center gap-3"
          >
            <button
              onClick={() => {
                setChangeMsg(!changeMsg);
                setSelectMsg({});
                setFeeds([
                  {
                    avatarImage: "",
                    yyyy: "",
                    MM: "",
                    dd: "",
                    HH: "",
                    mm: "",
                    id: "",
                    image: "",
                    msgId: "",
                    name: "",
                    text: "",
                  },
                ]);
              }}
            >
              <Emoji emoji="repeat" size={25} />
            </button>
            <h4 className="font-bold text-white">
              {changeMsg ? " メッセージ(薬剤師)" : " メッセージ(企業)"}
            </h4>
          </div>

          <InstantSearch
            indexName={changeMsg ? indexName : indexCoName}
            searchClient={searchClient}
          >
            <div className="border-b">
              <div className="mx-5 my-7">
                <div className="my-5">
                  <p>{changeMsg ? "名前" : "企業名"}</p>
                  <div>
                    {/* 検索窓 */}
                    <CustomSearchBox />
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="overflow-y-auto md:max-h-screen max-h-60 lg:pb-20 pb-12"
            >
              {/* 検索結果 */}
              <Hits
                hitComponent={changeMsg ? hitComponentPhMsg : hitComponentCoMsg}
              />
            </div>
          </InstantSearch>
        </div>
      </div>
    );
  }
);
