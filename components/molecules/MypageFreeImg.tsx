import Image from "next/image";
import React, { memo, VFC } from "react";
import Skeleton from "react-loading-skeleton";

///////// 型定義エリア /////////
type Props = {
  demoImgs: string;
  freeImageUrl0: string;
  freeImageUrl1: string;
  freeImageUrl2: string;
  loading: boolean;
};

export const MypageFreeImg: VFC<Props> = memo(
  ({ demoImgs, freeImageUrl0, freeImageUrl1, freeImageUrl2, loading }) => {
    ///////// JSXエリア /////////
    return (
      <div className="flex lg:flex-col flex-row md:gap-5">
        {loading ? (
          <div className="md:block hidden">
            <Skeleton height={200} width={200} />
          </div>
        ) : freeImageUrl0 ? (
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

        {loading ? (
          <div className="md:block hidden">
            <Skeleton height={200} width={200} />
          </div>
        ) : freeImageUrl1 ? (
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

        {loading ? (
          <div className="md:block hidden">
            <Skeleton height={200} width={200} />
          </div>
        ) : freeImageUrl2 ? (
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
  }
);
