import algoliasearch from "algoliasearch/lite";
import React, { Dispatch, memo, useContext, VFC } from "react";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import { UserContext } from "../../../../UserContext";
import { Address } from "../../../atoms/Address";
import { hitComponentJob } from "../../../molecules/search/HitComponentJob";
import { CustomSearchBox } from "../../../molecules/search/SearchBox";

///////// 型定義エリア /////////
type Props = {
  setCoPassId: Dispatch<React.SetStateAction<string>>;
  setCoReceiveId: Dispatch<React.SetStateAction<string>>;
};

export const SearchJob_L: VFC<Props> = memo(
  ({ setCoPassId, setCoReceiveId }) => {
    ///////// ステートエリア /////////
    // グローバルなステート
    const {
      selectJobAddress,
      setSelectJobAddress,
      selectJobEmploymentStatus,
      setSelectJobEmploymentStatus,
    } = useContext(UserContext);

    // 定数定義
    const indexName = "pham_jobs";

    ///////// 関数エリア /////////
    //algolia情報
    const searchClient = algoliasearch(
      "0TMIYQ8E9N",
      "58e6e394abd7a5cfcc6fcae0d7b51ac5"
    );

    ///////// JSXエリア /////////
    return (
      <div 
        className="md:col-span-3 col-span-12 border-r-2 
        border-blue-400 relative"
      >
        <div className="md:absolute h-full flex flex-col w-full">
          <div className="text-center">
            <h4 className="text-white bg-blue-400 font-bold text-lg py-3">
              求人検索
            </h4>
          </div>

          <InstantSearch indexName={indexName} searchClient={searchClient}>
            <div className="border-b">
              <div className="mx-5">
                <div className="my-5">
                  <p>薬局名</p>
                  <div>
                    {/* 検索窓 */}
                    <CustomSearchBox />
                  </div>
                </div>

                <div className="my-5">
                  <label>
                    <p>雇用形態</p>
                    <select
                      className="bg-blue-100 rounded-full 
                      outline-none pl-3 w-full py-1"
                      name="selectJobEmploymentStatus"
                      value={selectJobEmploymentStatus}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setSelectJobEmploymentStatus(e.target.value)
                      }
                    >
                      <option value="">指定しない</option>
                      <option value="正社員">正社員</option>
                      <option value="パート">パート</option>
                      <option value="契約社員">契約社員</option>
                    </select>
                  </label>
                </div>

                <div className="my-5">
                  <label>
                    <p>勤務エリア</p>
                    <select
                      className="bg-blue-100 rounded-full 
                      outline-none pl-3 w-full py-1"
                      name="selectJobAddress"
                      value={selectJobAddress}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setSelectJobAddress(e.target.value)
                      }
                    >
                      {/* 都道府県 */}
                      <option value="">指定しない</option>
                      <Address />
                    </select>
                  </label>
                </div>
              </div>
            </div>
            
            <div
              className="overflow-y-auto md:max-h-screen max-h-60"
              onClick={() => {
                setCoPassId("");
                setCoReceiveId("");
              }}
            >
              {/* 検索結果 */}
              <Hits hitComponent={hitComponentJob} />
            </div>
          </InstantSearch>
        </div>
      </div>
    );
  }
);
