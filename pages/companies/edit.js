import React, { useEffect } from 'react'
import { auth } from '../../firebase';

export default function edit() {
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
      }
    });
    return () => unSub();
  }, []);

  return (
    <div>
     company edit
    </div>
  )
}
