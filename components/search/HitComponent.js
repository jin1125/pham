import Image from "next/image";
import { useContext } from "react";
import { Highlight } from "react-instantsearch-dom";
import { UserContext } from "../../UserContext";

export function hitComponent({ hit }) {
  const { demoImg, selectHomeAddress, setSelectProfile, selectProfile,userId } =
    useContext(UserContext);

  const click = () => {
    setSelectProfile(hit);
  };
    
  return (
    <>
      <div onClick={click} className={selectProfile.objectID === hit.objectID ? 'bg-blue-100 cursor-pointer':'cursor-pointer hover:bg-blue-100'}>
        {selectHomeAddress === "" && hit.objectID !== userId ? (
          <div className="grid grid-cols-12 px-3 py-2 border-b items-center">
            <div className="col-span-4 flex items-center">
              {hit.profileImageUrl ? (
                <Image
                  className="inline object-cover rounded-full"
                  width={50}
                  height={50}
                  src={hit.profileImageUrl}
                  alt="Profile image"
                />
              ) : (
                demoImg && (
                  <Image
                    className="inline object-cover rounded-full"
                    width={50}
                    height={50}
                    src={demoImg}
                    alt="Profile image"
                  />
                )
              )}
            </div>

            <div className="col-span-8 break-words">
              <div>
                <Highlight attribute="userName" tagName="mark" hit={hit} />
              </div>
              <div className="text-xs text-blue-300 ">
                <Highlight attribute="homeAddress" tagName="mark" hit={hit} />
              </div>
            </div>
          </div>
        ) : (
          hit.homeAddress === selectHomeAddress && hit.objectID !== userId  && (
            <div className="grid grid-cols-12 px-3 py-2 border-b items-center">
            <div className="col-span-4 flex items-center">
              {hit.profileImageUrl ? (
                <Image
                  className="inline object-cover rounded-full"
                  width={50}
                  height={50}
                  src={hit.profileImageUrl}
                  alt="Profile image"
                />
              ) : (
                demoImg && (
                  <Image
                    className="inline object-cover rounded-full"
                    width={50}
                    height={50}
                    src={demoImg}
                    alt="Profile image"
                  />
                )
              )}
            </div>

            <div className="col-span-8 break-words">
              <div>
                <Highlight attribute="userName" tagName="mark" hit={hit} />
              </div>
              <div className="text-xs text-blue-300 ">
                <Highlight attribute="homeAddress" tagName="mark" hit={hit} />
              </div>
            </div>
          </div>
          )
        )}
      </div>
    </>
  );
}

// export const hitComponent = ({ hit }) => (
//   <HitComponent hit={hit} onClick={() => null} />
// );
