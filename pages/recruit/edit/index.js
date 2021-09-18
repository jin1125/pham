import React from 'react'
import Link from "next/link";

export default function edit() {
  return (
    <div className='text-center mt-10'>
      <div>
      <Link href="/recruit/edit/company/edit">
        <button>company edit</button>
      </Link>
      </div>

      <div>
      <Link href="/recruit/edit/pharmacy/edit">
        <button>pharmacy edit</button>
      </Link>
      </div>

      <div>
      <Link href="/recruit/edit/job/edit">
        <button>job edit</button>
      </Link>

      </div>
      
    </div>
  )
}
