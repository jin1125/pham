import Image from "next/image";
import React, { memo, VFC } from "react";
import { LoginForm } from "../../molecules/LoginForm";

export const LoginPage:VFC = memo(() => {
  return (
    <main className="grid lg:grid-cols-2 min-h-screen md:-mt-20 justify-items-center items-center">
      <div className="text-center md:w-3/4 w-11/12 mb-5">
        <div>
          <h1 className="text-2xl text-blue-400 font-bold">Phamへようこそ！</h1>
        </div>

        <div className="text-center my-5 block lg:hidden">
          <Image
            src="/login_img.png"
            alt="login_img"
            width={200}
            height={150}
          />
        </div>

        <LoginForm />
      </div>

      <div className="text-center hidden lg:block">
        <Image src="/login_img.png" alt="login_img" width={400} height={300} />
      </div>
    </main>
  );
});
