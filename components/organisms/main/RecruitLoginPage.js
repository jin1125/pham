import React from 'react'
import Image from "next/image";
import { RecruitLoginForm } from '../../molecules/RecruitLoginForm';

export const RecruitLoginPage = () => {

  return (
    <main className="grid lg:grid-cols-2 min-h-screen md:-mt-20 justify-items-center items-center">
        <div className="text-center md:w-3/4 w-11/12 mb-5">
          <div>
            <h1 className="text-2xl text-blue-400 font-bold">
              企業ログイン
            </h1>
          </div>

          <div className="text-center block lg:hidden my-5">
          <Image
            src="/recruit_login_img.png"
            alt="login_img"
            width={200}
            height={200}
          />
        </div>

          <RecruitLoginForm/>
        </div>

        <div className="text-center hidden lg:block">
          <Image
            src="/recruit_login_img.png"
            alt="login_img"
            width={350}
            height={350}
          />
        </div>
      </main>
  )
}
