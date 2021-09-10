import Image from "next/image";
import { useContext } from "react";
import { Highlight } from "react-instantsearch-dom";
import { UserContext } from "../../UserContext";

export function hitComponent({ hit }) {
  const { demoImg } = useContext(UserContext);

  const selectProfile = () => {
    console.log(hit.userName);
  };

  return (
    <div>
      {hit.homeAddress === "山形県" && (
        <button onClick={selectProfile}>
          {hit.profileImageUrl ? (
            <Image
              className="inline object-cover mr-2 rounded-full"
              width={50}
              height={50}
              src={hit.profileImageUrl}
              alt="Profile image"
            />
          ) : (
            demoImg && (
              <Image
                className="inline object-cover mr-2 rounded-full"
                width={50}
                height={50}
                src={demoImg}
                alt="Profile image"
              />
            )
          )}

          <Highlight attribute="userName" tagName="mark" hit={hit} />
          <Highlight attribute="homeAddress" tagName="mark" hit={hit} />
        </button>
      )}
    </div>
  );
}

// export const hitComponent = ({ hit }) => (
//   <HitComponent hit={hit} onClick={() => null} />
// );
