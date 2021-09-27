import Image from "next/image";
import React, { memo, useState } from "react";
import Skeleton from "react-loading-skeleton";

export const EditFreeImg = memo(
  ({
    setFreeImage0,
    setFreeImage1,
    setFreeImage2,
    freeImageUrl0,
    freeImageUrl1,
    freeImageUrl2,
    demoImgs,
    loadingProfile,
  }) => {
    const [fileUrls0, setFileUrls0] = useState("");
    const [fileUrls1, setFileUrls1] = useState("");
    const [fileUrls2, setFileUrls2] = useState("");

    const uploadFreeImage0 = (e) => {
      if (e.target.files[0]) {
        const imageFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setFileUrls0(imageUrl);
        setFreeImage0(e.target.files[0]);
        e.target.value = "";
      }
    };

    const uploadFreeImage1 = (e) => {
      if (e.target.files[0]) {
        const imageFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setFileUrls1(imageUrl);
        setFreeImage1(e.target.files[0]);
        e.target.value = "";
      }
    };

    const uploadFreeImage2 = (e) => {
      if (e.target.files[0]) {
        const imageFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setFileUrls2(imageUrl);
        setFreeImage2(e.target.files[0]);
        e.target.value = "";
      }
    };

    return (
      <div className="flex lg:flex-col flex-row justify-center md:gap-5">
        {/* /// フリー画像アップロード0 /// */}
        <div>
          {loadingProfile ? (
            <div className="md:block hidden">
              <Skeleton height={200} width={200} />
            </div>
          ) : (
            <label>
              {fileUrls0 ? (
                <Image
                  className="inline object-cover cursor-pointer transform hover:scale-150 transition duration-300"
                  width={200}
                  height={200}
                  src={fileUrls0}
                  alt="Free image0"
                />
              ) : freeImageUrl0 ? (
                <Image
                  className="inline object-cover cursor-pointer transform hover:scale-150 transition duration-300"
                  width={200}
                  height={200}
                  src={freeImageUrl0}
                  alt="Free image0"
                />
              ) : (
                demoImgs && (
                  <Image
                    className="inline object-cover cursor-pointer"
                    width={200}
                    height={200}
                    src={demoImgs}
                    alt="Free image0"
                  />
                )
              )}

              <input
                className="hidden"
                accept="image/*"
                type="file"
                onChange={uploadFreeImage0}
              />
            </label>
          )}
        </div>
        {/* /// フリー画像アップロード1 /// */}
        <div>
          {loadingProfile ? (
            <div className="md:block hidden">
              <Skeleton height={200} width={200} />
            </div>
          ) : (
            <label>
              {loadingProfile ? (
                <Skeleton height={200} width={200} />
              ) : fileUrls1 ? (
                <Image
                  className="inline object-cover cursor-pointer transform hover:scale-150 transition duration-300"
                  width={200}
                  height={200}
                  src={fileUrls1}
                  alt="Free image1"
                />
              ) : freeImageUrl1 ? (
                <Image
                  className="inline object-cover cursor-pointer transform hover:scale-150 transition duration-300"
                  width={200}
                  height={200}
                  src={freeImageUrl1}
                  alt="Free image1"
                />
              ) : (
                demoImgs && (
                  <Image
                    className="inline object-cover cursor-pointer"
                    width={200}
                    height={200}
                    src={demoImgs}
                    alt="Free image1"
                  />
                )
              )}

              <input
                className="hidden"
                accept="image/*"
                type="file"
                onChange={uploadFreeImage1}
              />
            </label>
          )}
        </div>
        {/* /// フリー画像アップロード2 /// */}
        <div>
          {loadingProfile ? (
            <div className="md:block hidden">
              <Skeleton height={200} width={200} />
            </div>
          ) : (
            <label>
              {fileUrls2 ? (
                <Image
                  className="inline object-cover cursor-pointer transform hover:scale-150 transition duration-300"
                  width={200}
                  height={200}
                  src={fileUrls2}
                  alt="Free image2"
                />
              ) : freeImageUrl2 ? (
                <Image
                  className="inline object-cover cursor-pointer transform hover:scale-150 transition duration-300"
                  width={200}
                  height={200}
                  src={freeImageUrl2}
                  alt="Free image2"
                />
              ) : (
                demoImgs && (
                  <Image
                    className="inline object-cover cursor-pointer"
                    width={200}
                    height={200}
                    src={demoImgs}
                    alt="Free image2"
                  />
                )
              )}

              <input
                className="hidden"
                accept="image/*"
                type="file"
                onChange={uploadFreeImage2}
              />
            </label>
          )}
        </div>
      </div>
    );
  }
);
