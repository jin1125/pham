import React from "react";
import { Emoji } from "emoji-mart";
import { Years } from "../../../atoms/Years";
import { Address } from "../../../atoms/Address";
import { Month } from "../../../atoms/Month";
import { Days } from "../../../atoms/Days";

export const EditSP2 = ({profile,setProfile,userId,homeAddress,dobYY,dobMM,dobDD,school,birthPlace,language,comments}) => {
  return (
    <div>
      <div className="flex flex-row flex-wrap items-center my-3 gap-1 leading-none justify-center">
        <Emoji emoji="id" size={20} />
        <p className="text-base">{userId}</p>
      </div>

      <div className="flex flex-row flex-wrap my-5 gap-6 leading-none justify-center">
        <div className="flex flex-row flex-wrap gap-1 items-center">
          <Emoji emoji="round_pushpin" size={20} />
          <label>
            <select
              className="bg-blue-100 rounded-full outline-none pl-3 pr-2 py-1"
              name="homeAddress"
              value={homeAddress}
              onChange={(e) =>
                setProfile({ ...profile, homeAddress: e.target.value })
              }
            >
              <option value="">住所</option>
              <Address/>
            </select>
            <span className="text-red-500 align-top">*</span>
          </label>
        </div>

        <div className="flex flex-row flex-wrap gap-1 items-center">
          <Emoji emoji="birthday" size={20} />
          <label>
            <select
              className="bg-blue-100 rounded-full outline-none pl-3 pr-2 py-1"
              name="dobYY"
              value={dobYY}
              onChange={(e) =>
                setProfile({ ...profile, dobYY: e.target.value })
              }
            >
              <option value="">生年</option>
              <Years/>
            </select>
            <span className="text-red-500 align-top">*</span>
          </label>
          <p>/</p>
          <label>
            <select
              className="bg-blue-100 rounded-full outline-none pl-3 pr-2 py-1"
              name="dobMM"
              value={dobMM}
              onChange={(e) =>
                setProfile({ ...profile, dobMM: e.target.value })
              }
            >
              <option value="">生月</option>
              <Month/>
            </select>
            <span className="text-red-500 align-top">*</span>
          </label>
          <p>/</p>
          <label>
            <select
              className="bg-blue-100 rounded-full outline-none pl-3 pr-2 py-1"
              name="dobDD"
              value={dobDD}
              onChange={(e) =>
                setProfile({ ...profile, dobDD: e.target.value })
              }
            >
              <option value="">生日</option>
              <Days/>
            </select>
            <span className="text-red-500 align-top">*</span>
          </label>
        </div>

        <div className="flex flex-row flex-wrap gap-1 items-center">
          <Emoji emoji="school" size={20} />
          <input
            type="text"
            value={school}
            onChange={(e) =>
              setProfile({ ...profile, school: e.target.value.trim() })
            }
            placeholder="出身校"
            name="school"
            maxLength="10"
            className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
          />
          <p className="text-base">卒業</p>
        </div>

        <div className="flex flex-row flex-wrap gap-1 items-center">
          <Emoji emoji="baby" size={20} />
          <input
            type="text"
            value={birthPlace}
            onChange={(e) =>
              setProfile({
                ...profile,
                birthPlace: e.target.value.trim(),
              })
            }
            placeholder="出身地"
            name="birthPlace"
            maxLength="10"
            className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
          />
          <p className="text-base">出身</p>
        </div>

        <div className="flex flex-row flex-wrap gap-1 items-center">
          <Emoji emoji="speaking_head_in_silhouette" size={20} />
          <input
            type="text"
            value={language}
            onChange={(e) =>
              setProfile({ ...profile, language: e.target.value.trim() })
            }
            placeholder="話せる言語"
            name="language"
            maxLength="15"
            className="text-base bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
          />
        </div>
      </div>

      <div className="my-12">
        <textarea
          rows="5"
          value={comments}
          placeholder="自己紹介"
          maxLength="200"
          className="bg-blue-100 rounded-lg p-5 w-full outline-none"
          onChange={(e) =>
            setProfile({ ...profile, comments: e.target.value.trim() })
          }
        />
      </div>
    </div>
  );
};
