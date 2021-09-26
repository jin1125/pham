import { Emoji } from "emoji-mart";
import React from "react";

export const EditDetails = ({
  profile,
  setProfile,
  hobby,
  dream,
  certification,
  strongArea,
  subjectArea,
  experiences,
  resumes,
}) => {

  /// 経験年数の各experienceの変更処理 ///
  const changeExperience = (e, index) => {
    const list = [...experiences];
    list[index] = {
      experience: e.target.value,
      years: list[index].years,
    };
    setProfile({ ...profile, experiences: list });
  };

  /// 経験年数の各yearsの変更処理 ///
  const changeYears = (e, index) => {
    const list = [...experiences];
    list[index] = {
      experience: list[index].experience,
      years: e.target.value,
    };
    setProfile({ ...profile, experiences: list });
  };

  /// 経験年数の欄追加処理 ///
  const addExperience = () => {
    if (experiences) {
      const list = [...experiences];
      list.push({ experience: "", years: "" });
      setProfile({ ...profile, experiences: list });
    } else {
      setProfile({ ...profile, experiences: [{ experience: "", years: "" }] });
    }
  };

  /// 経験年数の欄削除処理 ///
  const deleteExperience = (index) => {
    const list = [...experiences];
    list.splice(index, 1);
    setProfile({ ...profile, experiences: list });
  };

  const changeCompanyName = (e, index) => {
    const list = [...resumes];
    list[index] = {
      companyName: e.target.value,
      employmentStatus: list[index].employmentStatus,
      workStart: list[index].workStart,
      workEnd: list[index].workEnd,
    };

    setProfile({ ...profile, resumes: list });
  };

  const changeEmploymentStatus = (e, index) => {
    const list = [...resumes];
    list[index] = {
      companyName: list[index].companyName,
      employmentStatus: e.target.value,
      workStart: list[index].workStart,
      workEnd: list[index].workEnd,
    };

    setProfile({ ...profile, resumes: list });
  };

  const changeWorkStart = (e, index) => {
    const list = [...resumes];
    list[index] = {
      companyName: list[index].companyName,
      employmentStatus: list[index].employmentStatus,
      workStart: e.target.value,
      workEnd: list[index].workEnd,
    };

    setProfile({ ...profile, resumes: list });
  };

  const changeWorkEnd = (e, index) => {
    const list = [...resumes];
    list[index] = {
      companyName: list[index].companyName,
      employmentStatus: list[index].employmentStatus,
      workStart: list[index].workStart,
      workEnd: e.target.value,
    };

    setProfile({ ...profile, resumes: list });
  };

  const addResume = () => {
    if (resumes) {
      const list = [...resumes];
      list.push({
        companyName: "",
        employmentStatus: "",
        workStart: "",
        workEnd: "",
      });
      setProfile({ ...profile, resumes: list });
    } else {
      setProfile({
        ...profile,
        resumes: [
          { companyName: "", employmentStatus: "", workStart: "", workEnd: "" },
        ],
      });
    }
  };

  const deleteResume = (index) => {
    const list = [...resumes];
    list.splice(index, 1);
    setProfile({ ...profile, resumes: list });
  };

  return (
    <div className="px-5 md:px-0">
      <div className="my-10">
        <div className="flex flex-row flex-wrap gap-1 items-center">
          <Emoji emoji="camping" size={20} />
          <p className="text-base font-bold">趣味</p>
        </div>

        <input
          type="text"
          value={hobby}
          name="hobby"
          onChange={(e) =>
            setProfile({ ...profile, hobby: e.target.value.trim() })
          }
          maxLength="30"
          className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full"
        />
      </div>

      <div className="my-10">
        <div className="flex flex-row flex-wrap gap-1 items-center">
          <Emoji emoji="thought_balloon" size={20} />
          <p className="text-base font-bold">将来の夢</p>
        </div>

        <input
          type="text"
          value={dream}
          name="dream"
          maxLength="30"
          onChange={(e) =>
            setProfile({ ...profile, dream: e.target.value.trim() })
          }
          className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full"
        />
      </div>

      <div className="my-10">
        <div className="flex flex-row flex-wrap gap-1 items-center">
          <Emoji emoji="pencil2" size={20} />
          <p className="text-base font-bold">資格</p>
        </div>
        <input
          type="text"
          value={certification}
          name="certification"
          maxLength="30"
          onChange={(e) =>
            setProfile({
              ...profile,
              certification: e.target.value.trim(),
            })
          }
          className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full"
        />
      </div>

      <div className="my-10">
        <div className="flex flex-row flex-wrap gap-1 items-center">
          <Emoji emoji="muscle" size={20} />
          <p className="text-base font-bold">得意な業務</p>
        </div>
        <input
          type="text"
          value={strongArea}
          name="strongArea"
          maxLength="30"
          onChange={(e) =>
            setProfile({ ...profile, strongArea: e.target.value.trim() })
          }
          className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none "
        />
      </div>

      <div className="my-10">
        <div className="flex flex-row flex-wrap gap-1 items-center">
          <Emoji emoji="pill" size={20} />
          <p className="text-base font-bold">経験科目</p>
        </div>
        <input
          type="text"
          value={subjectArea}
          name="subjectArea"
          maxLength="30"
          onChange={(e) =>
            setProfile({ ...profile, subjectArea: e.target.value.trim() })
          }
          className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full"
        />
      </div>

      <div className="my-10">
        <div className="flex flex-row flex-wrap gap-1 items-center">
          <Emoji emoji="hourglass_flowing_sand" size={20} />
          <p className="text-base font-bold">経験年数</p>
          <button
            className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-1 px-2 ml-1 rounded-full shadow-lg text-xs"
            onClick={addExperience}
          >
            欄を追加
          </button>
        </div>
        {experiences &&
          experiences.map((ex, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-2 items-center my-5"
            >
              <div className="grid grid-cols-12 my-1 md:col-span-8 col-span-12 gap-1 items-center">
                <input
                  type="text"
                  value={ex.experience}
                  name="experience"
                  maxLength="15"
                  placeholder="一般薬剤師/管理薬剤師など"
                  onChange={(e) => changeExperience(e, index)}
                  className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full col-span-10"
                />
                <p className="text-base col-span-2">経験</p>
              </div>
              <div className="grid grid-cols-2 my-1 md:col-span-3 col-span-8 gap-1 items-center">
                <input
                  type="text"
                  value={ex.years}
                  name="years"
                  maxLength="15"
                  onChange={(e) => changeYears(e, index)}
                  className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none"
                />
                <p className="text-base">年程度</p>
              </div>
              <div className="md:col-span-1 col-span-4">
                <button
                  className="text-white bg-gray-400 transition duration-300 hover:bg-gray-300 py-1 px-2 rounded-full shadow-lg text-xs"
                  onClick={() => deleteExperience(index)}
                >
                  削除
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="my-10">
        <div className="flex flex-row flex-wrap gap-1 items-center">
          <Emoji emoji="page_facing_up" size={20} />
          <p className="text-base font-bold">経歴詳細</p>
          <button
            className="text-white bg-blue-400 transition duration-300 hover:bg-blue-300 py-1 px-2 ml-1 rounded-full shadow-lg text-xs"
            onClick={addResume}
          >
            欄を追加
          </button>
        </div>
        {resumes &&
          resumes.map((re, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-2 items-center my-5"
            >
              <input
                type="text"
                value={re.companyName}
                name="companyName"
                maxLength="15"
                placeholder="企業名"
                onChange={(e) => changeCompanyName(e, index)}
                className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full md:col-span-4 col-span-8 my-1"
              />

              <input
                type="text"
                value={re.employmentStatus}
                name="employmentStatus"
                maxLength="10"
                placeholder="雇用形態"
                onChange={(e) => changeEmploymentStatus(e, index)}
                className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full md:col-span-2 col-span-4 my-1"
              />

              <input
                type="text"
                value={re.workStart}
                name="workStart"
                maxLength="10"
                placeholder="いつから"
                onChange={(e) => changeWorkStart(e, index)}
                className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full md:col-span-2 col-span-4 my-1"
              />

              <p className="md:col-span-1 col-span-2 justify-self-center">~</p>

              <input
                type="text"
                value={re.workEnd}
                name="workEnd"
                maxLength="10"
                placeholder="いつまで"
                onChange={(e) => changeWorkEnd(e, index)}
                className="text-base bg-blue-100 placeholder-blue-300 text-left rounded-full py-1 pl-5 outline-none w-full md:col-span-2 col-span-4 my-1"
              />

              <div className="md:col-span-1 col-span-2">
                <button
                  className="text-white bg-gray-400 transition duration-300 hover:bg-gray-300 py-1 px-2 rounded-full shadow-lg text-xs"
                  onClick={() => deleteResume(index)}
                >
                  削除
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};