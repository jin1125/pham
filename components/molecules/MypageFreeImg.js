import Image from "next/image";
import React from "react";

export const MypageFreeImg = ({
  demoImgs,
  freeImageUrl0,
  freeImageUrl1,
  freeImageUrl2,
}) => {
  return (
    <div className="flex lg:flex-col flex-row md:gap-5">
      {freeImageUrl0 ? (
        <div>
          <Image
            className="inline object-cover transform hover:scale-150 transition duration-300"
            width={200}
            height={200}
            src={freeImageUrl0}
            alt="Free image0"
          />
        </div>
      ) : (
        demoImgs && (
          <div>
            <Image
              className="inline object-cover"
              width={200}
              height={200}
              src={demoImgs}
              alt="Free image0"
            />
          </div>
        )
      )}
      {freeImageUrl1 ? (
        <div>
          <Image
            className="inline object-cover transform hover:scale-150 transition duration-300"
            width={200}
            height={200}
            src={freeImageUrl1}
            alt="Free image1"
          />
        </div>
      ) : (
        demoImgs && (
          <div>
            <Image
              className="inline object-cover"
              width={200}
              height={200}
              src={demoImgs}
              alt="Free image1"
            />
          </div>
        )
      )}
      {freeImageUrl2 ? (
        <div>
          <Image
            className="inline object-cover transform hover:scale-150 transition duration-300"
            width={200}
            height={200}
            src={freeImageUrl2}
            alt="Free image2"
          />
        </div>
      ) : (
        demoImgs && (
          <div>
            <Image
              className="inline object-cover"
              width={200}
              height={200}
              src={demoImgs}
              alt="Free image2"
            />
          </div>
        )
      )}
    </div>
  );
};
