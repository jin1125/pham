import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import { hitComponent } from './HitComponent';

export default function Search() {
  const searchClient = algoliasearch('0TMIYQ8E9N', '58e6e394abd7a5cfcc6fcae0d7b51ac5');
  const indexName = 'pham';

  return (
    <div>
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <SearchBox />
        <Hits hitComponent={hitComponent} />
      </InstantSearch>
    </div>
  );
}