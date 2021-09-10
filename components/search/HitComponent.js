import Link from 'next/link';
import { Hit } from 'react-instantsearch-core';

function HitComponent({ hit }) {
  return (
    <div>
        <a className="hover:text-[#06bbbc]">{hit.userName}</a>
        <a className="hover:text-[#06bbbc]">{hit.homeAddress}</a>
    </div>
  );
}

export const hitComponent = ({ hit }) => (
  <HitComponent hit={hit} onClick={() => null} />
);