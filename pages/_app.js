import { useEffect, useState } from "react";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "tailwindcss/tailwind.css";
import { auth, db, storage } from "../firebase";
import "../styles/global.css";
import { UserContext } from "../UserContext";

function MyApp({ Component, pageProps }) {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profileImageSrc, setProfileImageSrc] = useState("");
  const [demoImg,setDemoImg] = useState('')
  const [nameTrigger, setNameTrigger] = useState("");

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if(user){
        // console.log(user.uid);
        // console.log(user.displayName);
        // console.log(user.email);
        setUserId(user.uid);
        setUserName(user.displayName);
        setUserEmail(user.email);
      }
    });
    return () => unSub();
  }, [nameTrigger]);

  useEffect(() => {
    if (userId) {
      const unSub = db
        .collection("userProfiles")
        .doc(userId)
        .onSnapshot((doc) => {
          if (doc.data() === undefined) {
            return;
          }
          setProfileImageSrc(doc.data().profileImageUrl);
        });
      return () => {
        unSub();
      };
    }
  }, [userId]);

  useEffect(() => {
    storage
    .ref()
    .child('demo_img.jpeg')
    .getDownloadURL()
    .then(function(url) {
      setDemoImg(url)
    })
   },[]);


  const options = {
    timeout: 2000,
    position: positions.TOP_CENTER,
  };

  return (
    <UserContext.Provider
      value={{ userId, userName, userEmail, profileImageSrc ,demoImg,setNameTrigger}}
    >
      <AlertProvider template={AlertTemplate} {...options}>
        <Component {...pageProps} />
      </AlertProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
