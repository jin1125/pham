import React, { memo, useContext, VFC } from 'react'
import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import { Address } from "../atoms/Address";
import { hitComponentPh } from "./HitComponentPh";
import { CustomSearchBox } from "./SearchBox";
import { UserContext } from '../../UserContext';

export const SearchPh_L:VFC = memo(() => {
  const searchClient = algoliasearch(
    "0TMIYQ8E9N",
    "58e6e394abd7a5cfcc6fcae0d7b51ac5"
  );

  const indexName = "pham_pharmacies";

  const {
    selectPharmacyAddress,
    setSelectPharmacyAddress,
  } = useContext(UserContext);

  return (
    <div className="md:col-span-3 col-span-12 border-r-2 border-blue-400 relative">
          <div className="md:absolute h-full flex flex-col w-full">
            <div className="text-center">
              <h4 className="text-white bg-blue-400 font-bold text-lg py-3">
                薬局検索
              </h4>
            </div>
            <InstantSearch indexName={indexName} searchClient={searchClient}>
              <div className="border-b">
                <div className="mx-5 my-7">
                  <div className="my-5">
                    <p>薬局名</p>
                    <div>
                      <CustomSearchBox />
                    </div>
                  </div>

                  <div className="my-5">
                    <label>
                      <p>所在地</p>
                      <select
                        className="bg-blue-100 rounded-full outline-none pl-3 w-full py-1"
                        name="selectPharmacyAddress"
                        value={selectPharmacyAddress}
                        onChange={(e) =>
                          setSelectPharmacyAddress(e.target.value)
                        }
                      >
                        <option value="">指定しない</option>
                        <Address/>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
              <div className="overflow-y-auto md:max-h-screen max-h-60">
                <Hits hitComponent={hitComponentPh} />
              </div>
            </InstantSearch>
          </div>
        </div>
  )
})
