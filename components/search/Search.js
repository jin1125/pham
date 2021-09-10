import algoliasearch from "algoliasearch/lite";
import { Emoji } from "emoji-mart";
import {
  Configure,
  Hits,
  InstantSearch,
  MenuSelect,
  SearchBox,
} from "react-instantsearch-dom";
import { hitComponent } from "./HitComponent";

export default function Search() {
  const searchClient = algoliasearch(
    "0TMIYQ8E9N",
    "58e6e394abd7a5cfcc6fcae0d7b51ac5"
  );
  const indexName = "pham";

  return (
    <div>
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <SearchBox
          autoFocus
          translations={{
            submitTitle: "送信",
            resetTitle: "リセット.",
            placeholder: "phamを検索する",
          }}
          submit={<Emoji emoji="mag" size={20} />}
        />

        <MenuSelect attribute="homeAddress" />
        <Hits hitComponent={hitComponent} />
        <Configure hitsPerPage={10} />
      </InstantSearch>
    </div>
  );
}
