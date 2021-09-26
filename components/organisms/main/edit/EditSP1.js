import React from "react";

export const EditSP1 = ({profile,setProfile,userName,jobTitle}) => {
  return (
    <div className="flex flex-row flex-wrap items-end my-10 gap-8 justify-center">
      <label>
        <input
          type="text"
          value={userName}
          onChange={(e) =>
            setProfile({ ...profile, userName: e.target.value.trim() })
          }
          placeholder="姓 名"
          name="name"
          maxLength="12"
          className="lg:text-4xl text-3xl font-bold bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
        />
        <span className="text-red-500 align-top">*</span>
      </label>

      <input
        type="text"
        value={jobTitle}
        onChange={(e) =>
          setProfile({ ...profile, jobTitle: e.target.value.trim() })
        }
        placeholder="役職"
        name="jobTitle"
        maxLength="15"
        className="text-xl font-bold text-blue-400 bg-blue-100 placeholder-blue-300 text-center rounded-full py-1 outline-none"
      />
    </div>
  );
};
