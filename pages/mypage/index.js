import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { auth } from "../../firebase";
import { UserContext } from "../../UserContext";


export default function mypage() {
  const { userName } = useContext(UserContext);
  let email = "";
  let photoURL = "";
  let emailVerified = "";
  const [uid,setUid] = useState('');
  const [mail,setMail] = useState('');
  const [displayName,setDisplayName] = useState('');


  //   auth.onAuthStateChanged((user1) => {
  //   if (user1) {
  //     const user = firebase.auth().currentUser;
     
  //       displayName = user.displayName;
  //       email = user.email;
  //       photoURL = user.photoURL;
  //       emailVerified = user.emailVerified;
  //       uid = user.uid;
      
  //   } else {
  //     console.log("user none");
  //   }
  // });

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
    console.log(user.uid);
     setMail(user.email)
     setUid(user.uid)
     setDisplayName(user.displayName)
    });
    return () => unSub();
  }, []);

  return (
    <>
      <Layout>
        mypage
        {/* {userName} */}
        {/* {photoURL} */}
        {displayName}
        {mail}
        {uid}
      </Layout>
    </>
  );
}
