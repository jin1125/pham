import React, { useContext } from 'react'
import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import { Address } from "../atoms/Address";
import { hitComponent } from "./HitComponent";
import { CustomSearchBox } from "./SearchBox";
import { UserContext } from '../../UserContext';

export const Search_L = ({setDisabledState,setPassId,setPassData,setReceiveId,setReceiveData}) => {
  const searchClient = algoliasearch(
    "0TMIYQ8E9N",
    "58e6e394abd7a5cfcc6fcae0d7b51ac5"
  );

  const indexName = "pham";

  const {
    selectHomeAddress,
    setSelectHomeAddress,
  } = useContext(UserContext);

  return (
    <div className="md:col-span-3 col-span-12 border-r-2 border-blue-400 relative">
          <div className="md:absolute h-full flex flex-col w-full">
            <div className="text-center">
              <h4 className="text-white bg-blue-400 font-bold text-lg py-3">
                薬剤師検索
              </h4>
            </div>
            <InstantSearch indexName={indexName} searchClient={searchClient}>
              <div className="border-b">
                <div className="mx-5 my-7">
                  <div className="my-5">
                    <p>名前</p>
                    <div>
                      <CustomSearchBox />
                    </div>
                  </div>

                  <div className="my-5">
                    <label>
                      <p>住所</p>
                      <select
                        className="bg-blue-100 rounded-full outline-none pl-3 w-full py-1"
                        name="selectHomeAddress"
                        value={selectHomeAddress}
                        onChange={(e) => setSelectHomeAddress(e.target.value)}
                      >
                        <option value="">指定しない</option>
                        <Address/>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
              <div
                className="overflow-y-auto md:max-h-screen  max-h-60"
                onClick={() => {
                  setDisabledState("");
                  setPassId("");
                  setPassData("");
                  setReceiveId("");
                  setReceiveData("");
                }}
              >
                <Hits hitComponent={hitComponent} />
              </div>
            </InstantSearch>
          </div>
        </div>
  )
}