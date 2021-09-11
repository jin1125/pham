import Image from "next/image";
import { useContext } from "react";
import { Highlight } from "react-instantsearch-dom";
import { UserContext } from "../../UserContext";

export function hitComponent({ hit }) {
  const { demoImg, selectHomeAddress, setSelectProfile } = useContext(UserContext);

  const click = ()=>{
    setSelectProfile(hit)
  }

  return (
    
    <div>
      {selectHomeAddress === "" ? (
        <button onClick={click}>
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
      ) : (
        hit.homeAddress === selectHomeAddress && (
         
          <button onClick={click} className='border text-red-500'>
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
      
        )
      )}
    </div>
  );
}

// export const hitComponent = ({ hit }) => (
//   <HitComponent hit={hit} onClick={() => null} />
// );
