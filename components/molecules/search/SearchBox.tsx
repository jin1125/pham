import { connectSearchBox } from "react-instantsearch-dom";
import Loader from "react-loader-spinner";

// 検索窓
const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <form onSubmit={(e) => e.preventDefault()} noValidate role="search">
    <inputk
      className="bg-blue-100 rounded-full pl-3 py-1 w-full outline-none"
      type="search"
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
    />
    {/* ローディング設定 */}
    {isSearchStalled ? (
      <div className="flex items-center justify-center my-3">
        <Loader type="Watch" color="#93C5FD" height={30} width={30} />
      </div>
    ) : (
      ""
    )}
  </form>
);

export const CustomSearchBox = connectSearchBox(SearchBox);
