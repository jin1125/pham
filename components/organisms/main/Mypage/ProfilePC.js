import { Emoji } from "emoji-mart";
import React from "react";

export const ProfilePC = ({
  userName,
  displayName,
  jobTitle,
  userId,
  homeAddress,
  dobYY,
  dobMM,
  dobDD,
  school,
  birthPlace,
  language,
  comments,
}) => {
  return (
    <div>
      <div className="flex flex-row flex-wrap items-end my-10 gap-8">
        <div>
          {userName ? (
            <h2 className="text-4xl font-bold">{userName}</h2>
          ) : (
            <h2 className="text-4xl font-bold">{displayName}</h2>
          )}
        </div>

        {jobTitle && (
          <div>
            <p className="text-xl font-bold text-blue-400">{jobTitle}</p>
          </div>
        )}
      </div>

      <div className="flex flex-row flex-wrap items-center my-3 gap-1 leading-none">
        <Emoji emoji="id" size={20} />
        <p className="text-base">{userId}</p>
      </div>

      <div className="flex flex-row flex-wrap my-5 gap-6 leading-none">
        {homeAddress ? (
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="round_pushpin" size={20} />
            <p className="text-base">{homeAddress.slice(3)}</p>
          </div>
        ) : (
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <p className="text-2xl font-bold text-blue-400">
              まずは、画面上部の <Emoji emoji="gear" size={30} />{" "}
              からプロフィール情報を入力
              <Emoji emoji="male_mage" size={50} />
            </p>
          </div>
        )}

        {dobYY && dobMM && dobDD && (
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="birthday" size={20} />
            <p className="text-base">{`${dobYY}/${dobMM}/${dobDD}`}</p>
          </div>
        )}

        {school && (
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="school" size={20} />
            <p className="text-base">{`${school} 卒業`}</p>
          </div>
        )}

        {birthPlace && (
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="baby" size={20} />
            <p className="text-base">{`${birthPlace} 出身`}</p>
          </div>
        )}

        {language && (
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="speaking_head_in_silhouette" size={20} />
            <p className="text-base">{language}</p>
          </div>
        )}
      </div>

      {comments && (
        <div className="my-12 whitespace-pre-wrap">
          <p className="text-base">{comments}</p>
        </div>
      )}
    </div>
  );
};
