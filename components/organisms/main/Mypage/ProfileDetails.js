import React from "react";
import { Emoji } from "emoji-mart";
import Skeleton from "react-loading-skeleton";

export const ProfileDetails = ({
  hobby,
  dream,
  certification,
  strongArea,
  subjectArea,
  experiences,
  resumes,
  loading
}) => {
  return (
    <div>
      {loading ? (
        <Skeleton width={200} />
      ) :hobby && (
        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="camping" size={20} />
            <p className="text-base font-bold">趣味</p>
          </div>
          <p className="text-base">{hobby}</p>
        </div>
      )}

      {loading ? (
        <Skeleton width={200} />
      ) :dream && (
        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="thought_balloon" size={20} />
            <p className="text-base font-bold">将来の夢</p>
          </div>
          <p className="text-base">{dream}</p>
        </div>
      )}

      {loading ? (
        <Skeleton width={200} />
      ) :certification && (
        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="pencil2" size={20} />
            <p className="text-base font-bold">資格</p>
          </div>
          <p className="text-base">{certification}</p>
        </div>
      )}

      {loading ? (
        <Skeleton width={200} />
      ) :strongArea && (
        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="muscle" size={20} />
            <p className="text-base font-bold">得意な業務</p>
          </div>
          <p className="text-base">{strongArea}</p>
        </div>
      )}

      {loading ? (
        <Skeleton width={200} />
      ) :subjectArea && (
        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="pill" size={20} />
            <p className="text-base font-bold">経験科目</p>
          </div>
          <p className="text-base">{subjectArea}</p>
        </div>
      )}

      {loading ? (
        <Skeleton width={200} />
      ) :experiences && experiences[0].experience && (
        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="hourglass_flowing_sand" size={20} />
            <p className="text-base font-bold">経験年数</p>
          </div>
          {experiences.map((ex, index) => (
            <div key={index} className="grid grid-cols-12 my-3">
              {ex.experience && (
                <div className="col-span-8 md:col-span-6 lg:col-span-5 2xl:col-span-3">
                  <p className="text-base">{`${ex.experience}経験`}</p>
                </div>
              )}
              {ex.years && (
                <div className="col-span-4 md:col-span-6 lg:col-span-5 2xl:col-span-3">
                  <p className="text-base">{`${ex.years}年程度`}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <Skeleton width={200} />
      ) :resumes && resumes[0].companyName && (
        <div className="my-10">
          <div className="flex flex-row flex-wrap gap-1 items-center">
            <Emoji emoji="page_facing_up" size={20} />
            <p className="text-base font-bold">経歴詳細</p>
          </div>
          {resumes.map((re, index) => (
            <div key={index} className="grid grid-cols-12 my-3">
              <div className="col-span-8 md:col-span-6 lg:col-span-5 2xl:col-span-4">
                <p className="text-base">{re.companyName}</p>
              </div>
              <div className="col-span-4 md:col-span-6 lg:col-span-2 2xl:col-span-1">
                <p className="text-base">{re.employmentStatus}</p>
              </div>
              {re.workStart && re.workEnd && (
                <div className="col-span-12 lg:col-span-5 2xl:col-span-3">
                  <p className="text-base">
                    {`${re.workStart} ~ ${re.workEnd}`}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
