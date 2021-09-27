import Link from "next/link";
import React, { memo } from "react";

export const FirstHeader = memo(() => {
  return (
    <header>
      <div className="flex justify-between">
        <div className="m-5">
          <h2 className="text-2xl text-blue-400 font-bold">Pham</h2>
        </div>
        <div className="m-7">
          <Link href="/recruit">
            <button className="text-blue-400 hover:text-blue-300 transition duration-300">
              採用担当者様はこちら
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
});
