import React, { memo, VFC } from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
  userName:string;
  displayName:string;
  jobTitle:string;
  loading:boolean;
};

export const ProfileSP1:VFC<Props> = memo(({ userName, displayName, jobTitle, loading }) => {
  return (
    <div className="flex flex-row flex-wrap justify-center items-end my-5 gap-8 text-center">
      <div>
        {loading ? (
          <Skeleton width={150} height={30}/>
        ) : userName ? (
          <h2 className="text-4xl font-bold">{userName}</h2>
        ) : (
          <h2 className="text-4xl font-bold">{displayName}</h2>
        )}
      </div>

      {loading ? (
        <Skeleton width={150}  height={20}/>
      ) : (
        jobTitle && (
          <div>
            <p className="text-xl font-bold text-blue-400">{jobTitle}</p>
          </div>
        )
      )}
    </div>
  );
});
