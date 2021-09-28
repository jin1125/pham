import React, { Dispatch, memo, VFC } from "react";
import Skeleton from "react-loading-skeleton";
import { AllProfile } from "../../../../types/allProfile";

type Props = {
  profile:AllProfile;
  setProfile:Dispatch<React.SetStateAction<AllProfile>>;
  userName:string;
  jobTitle:string;
  loadingProfile:boolean;
};

export const EditSP1: VFC<Props> = memo(
  ({ profile, setProfile, userName, jobTitle, loadingProfile }) => {
    return (
      <div className="flex flex-row flex-wrap items-end my-10 gap-8 justify-center">
        {loadingProfile ? (
          <Skeleton height={30} width={150} />
        ) : (
          <label>
            <input
              type="text"
              value={userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProfile({ ...profile, userName: e.target.value.trim() })
              }
              placeholder="姓 名"
              name="name"
              maxLength={12}
              className="lg:text-4xl text-3xl font-bold bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
            />
            <span className="text-red-500 align-top">*</span>
          </label>
        )}

        {loadingProfile ? (
          <Skeleton height={30} width={150} />
        ) : (
          <input
            type="text"
            value={jobTitle}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
              setProfile({ ...profile, jobTitle: e.target.value.trim() })
            }
            placeholder="役職"
            name="jobTitle"
            maxLength={15}
            className="text-xl font-bold text-blue-400 bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
          />
        )}
      </div>
    );
  }
);
