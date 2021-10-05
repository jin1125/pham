import { Emoji } from "emoji-mart";
import React, { memo, VFC } from "react";
import Skeleton from "react-loading-skeleton";

///////// 型定義エリア /////////
type Props = {
  userId: string;
  homeAddress: string;
  dobYY: string;
  dobMM: string;
  dobDD: string;
  school: string;
  birthPlace: string;
  language: string;
  comments: string;
  loading: boolean;
};

export const ProfileSP2: VFC<Props> = memo(
  ({
    userId,
    homeAddress,
    dobYY,
    dobMM,
    dobDD,
    school,
    birthPlace,
    language,
    comments,
    loading,
  }) => {
    ///////// JSXエリア /////////
    return (
      <div>

        <div className="flex flex-row flex-wrap justify-center my-5 gap-6 leading-none">
          {loading ? (
            <Skeleton width={150} />
          ) : homeAddress ? (
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <Emoji emoji="round_pushpin" size={20} />
              <p className="text-base">{homeAddress.slice(3)}</p>
            </div>
          ) : (
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <p className="text-xl font-bold text-blue-400">
                まずは、画面上部の <Emoji emoji="gear" size={30} /> から
                <br />
                プロフィール情報を入力
                <Emoji emoji="male_mage" size={40} />
              </p>
            </div>
          )}

          {loading ? (
            <Skeleton width={150} />
          ) : (
            dobYY &&
            dobMM &&
            dobDD && (
              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="birthday" size={20} />
                <p className="text-base">{`${dobYY}/${dobMM}/${dobDD}`}</p>
              </div>
            )
          )}

          {loading ? (
            <Skeleton width={150} />
          ) : (
            school && (
              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="school" size={20} />
                <p className="text-base">{`${school} 卒業`}</p>
              </div>
            )
          )}

          {loading ? (
            <Skeleton width={150} />
          ) : (
            birthPlace && (
              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="baby" size={20} />
                <p className="text-base">{`${birthPlace} 出身`}</p>
              </div>
            )
          )}

          {loading ? (
            <Skeleton width={150} />
          ) : (
            language && (
              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Emoji emoji="speaking_head_in_silhouette" size={20} />
                <p className="text-base">{language}</p>
              </div>
            )
          )}
        </div>

        {loading ? (
          <Skeleton width={150} />
        ) : (
          comments && (
            <div className="my-12 whitespace-pre-wrap">
              <p className="text-base">{comments}</p>
            </div>
          )
        )}
      </div>
    );
  }
);
