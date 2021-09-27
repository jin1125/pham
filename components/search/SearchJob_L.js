import React, { memo, useContext } from 'react'
import algoliasearch from "algoliasearch/lite";
import { Address } from "../atoms/Address";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import { hitComponentJob } from "./HitComponentJob";
import { CustomSearchBox } from "./SearchBox";
import { UserContext } from '../../UserContext';

export const SearchJob_L = memo(({setCoPassId,setCoReceiveId}) => {
  const searchClient = algoliasearch(
    "0TMIYQ8E9N",
    "58e6e394abd7a5cfcc6fcae0d7b51ac5"
  );

  const indexName = "pham_jobs";

  const {
    selectJobAddress,
    setSelectJobAddress,
    selectJobEmploymentStatus,
    setSelectJobEmploymentStatus,
  } = useContext(UserContext);

  return (
    <div className="md:col-span-3 col-span-12 border-r-2 border-blue-400 relative">
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
                      <CustomSearchBox />
                    </div>
                  </div>

                  <div className="my-5">
                    <label>
                      <p>雇用形態</p>
                      <select
                        className="bg-blue-100 rounded-full outline-none pl-3 w-full py-1"
                        name="selectJobEmploymentStatus"
                        value={selectJobEmploymentStatus}
                        onChange={(e) =>
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
                        className="bg-blue-100 rounded-full outline-none pl-3 w-full py-1"
                        name="selectJobAddress"
                        value={selectJobAddress}
                        onChange={(e) => setSelectJobAddress(e.target.value)}
                      >
                        <option value="">指定しない</option>
                        <Address/>
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
                <Hits hitComponent={hitComponentJob} />
              </div>
            </InstantSearch>
          </div>
        </div>
  )
})
