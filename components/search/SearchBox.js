import { connectSearchBox } from "react-instantsearch-dom";

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <form onSubmit={(e)=>e.preventDefault()} noValidate role="search">
    <input
      className="bg-blue-100 rounded-full pl-3 py-1 w-full outline-none"
      type="search"
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
    />
    {isSearchStalled ? (
      <div className="flex items-center justify-center my-3">
        <div className="w-7 h-7 border-b-4 border-blue-300 rounded-full animate-spin"></div>
      </div>
    ) : (
      ""
    )}
  </form>
);

export const CustomSearchBox = connectSearchBox(SearchBox);
