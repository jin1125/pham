import { Emoji } from "emoji-mart";
import React, { Dispatch, memo, VFC } from "react";
import Skeleton from "react-loading-skeleton";
import { AllProfile } from "../../../../types/allProfile";

///////// 型定義エリア /////////
type Props = {
  profile: AllProfile;
  setProfile: Dispatch<React.SetStateAction<AllProfile>>;
  scout: string;
  loadingProfile: boolean;
};

///////// JSXエリア /////////
export const EditStatus: VFC<Props> = memo(
  ({ profile, setProfile, scout, loadingProfile }) => {
    return (
      <div 
        className="flex flex-row flex-wrap my-10 
        justify-center gap-1 items-center"
      >
        {loadingProfile ? (
          <Skeleton width={200} />
        ) : (
          <>
            <Emoji emoji="female-detective" size={20} />
            <label>
              <select
                className="bg-blue-100 rounded-full 
                outline-none pl-3 py-1 w-11/12"
                name="scout"
                value={scout}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setProfile({ ...profile, scout: e.target.value })
                }
              >
                <option value="">スカウト設定</option>
                <option value="スカウトを受け取る">スカウトを受け取る</option>
                <option value="スカウトを受け取らない">
                  スカウトを受け取らない
                </option>
              </select>
              <span className="text-red-500 align-top">*</span>
            </label>
          </>
        )}
      </div>
    );
  }
);
