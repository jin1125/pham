import React, { useContext } from 'react'
import { Emoji } from "emoji-mart";
import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import { hitComponentCoMsg } from "./hitComponentCoMsg";
import { hitComponentMsg } from "./HitComponentMsg";
import { CustomSearchBox } from "./SearchBox";
import { UserContext } from '../../UserContext';

export const SearchMsg_L = ({changeMsg,setChangeMsg,setFeeds}) => {
  const searchClient = algoliasearch(
    "0TMIYQ8E9N",
    "58e6e394abd7a5cfcc6fcae0d7b51ac5"
  );

  const indexName = "pham";
  const indexCoName = "pham_companies";

  const { setSelectMsg} =
    useContext(UserContext);

  return (
    <div className="md:col-span-3 col-span-12 border-r-2 border-blue-400 relative ">
          <div className="md:absolute h-full flex flex-col w-full">
            <div className="flex flex-row  flex-wrap bg-blue-400 text-lg py-3 leading-none justify-center items-center gap-3">
              <button
                onClick={() => {
                  setChangeMsg(!changeMsg);
                  setSelectMsg("");
                  setFeeds([
                    {
                      avatarImage: "",
                      datetime: "",
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
                      <CustomSearchBox />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="overflow-y-auto md:max-h-screen max-h-60 lg:pb-20 pb-12"
                // onClick={() =>
                //   setFeeds([
                //     {
                //       avatarImage: "",
                //       datetime: "",
                //       id: "",
                //       image: "",
                //       msgId: "",
                //       name: "",
                //       text: "",
                //     },
                //   ])
                // }
              >
                <Hits
                  hitComponent={changeMsg ? hitComponentMsg : hitComponentCoMsg}
                />
              </div>
            </InstantSearch>
          </div>
        </div>
  )
}
