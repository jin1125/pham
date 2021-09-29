import React, { memo, VFC } from 'react'
import Link from "next/link";

export const SecondHeader:VFC = memo(() => {
  ///////// JSXエリア /////////
  return (
    <header>
        <div className="m-5">
          <Link href="/">
            <button>
              <h2 className="text-2xl text-blue-400 font-bold">Pham</h2>
            </button>
          </Link>
        </div>
      </header>
  )
});
