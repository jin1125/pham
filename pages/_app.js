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
  const [demoImg, setDemoImg] = useState("");
  const [nameTrigger, setNameTrigger] = useState("");
  const [profileId, setProfileId] = useState("");
  const [profileImageSrc, setProfileImageSrc] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [dobYY, setDobYY] = useState("");
  const [dobMM, setDobMM] = useState("");
  const [dobDD, setDobDD] = useState("");
  const [school, setSchool] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [language, setLanguage] = useState("");
  const [comments, setComments] = useState("");
  const [hobby, setHobby] = useState("");
  const [dream, setDream] = useState("");
  const [certification, setCertification] = useState("");
  const [strongArea, setStrongArea] = useState("");
  const [subjectArea, setSubjectArea] = useState("");

  const [yearsOfExperience, setYearsOfExperience] = useState([]);
  const [resume, setResume] = useState([]);

  // console.log(jobTitle);
  // console.log(homeAddress);
  // console.log(dobYY);
  // console.log(dobMM);
  // console.log(dobDD);
  // console.log(school);
  // console.log(birthPlace);
  // console.log(language);
  // console.log(comments);
  // console.log(hobby);
  // console.log(dream);
  // console.log(certification);
  // console.log(strongArea);
  // console.log(subjectArea);

  // console.log(yearsOfExperience);
  // console.log(resume);


  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
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
      db.collection("userProfiles")
        .doc(userId)
        .onSnapshot((doc) => {
          if (doc.data() === undefined) {
            return;
          }
          setProfileId(doc.id);
          setProfileImageSrc(doc.data().profileImageUrl);
          setJobTitle(doc.data().jobTitle);
          setHomeAddress(doc.data().homeAddress);
          setDobYY(doc.data().dobYY);
          setDobMM(doc.data().dobMM);
          setDobDD(doc.data().dobDD);
          setSchool(doc.data().school);
          setBirthPlace(doc.data().birthPlace);
          setLanguage(doc.data().language);
          setComments(doc.data().comments);
          setHobby(doc.data().hobby);
          setDream(doc.data().dream);
          setCertification(doc.data().certification);
          setStrongArea(doc.data().strongArea);
          setSubjectArea(doc.data().subjectArea);
        });

      db.collection("userProfiles")
        .doc(userId)
        .collection("yearsOfExperience")
        .onSnapshot((snapshot) => {
          if (snapshot.docs === []) {
            return;
          }
          setYearsOfExperience(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              experience: doc.data().experience,
              years: doc.data().years,
            }))
          );
        });

      db.collection("userProfiles")
        .doc(userId)
        .collection("resume")
        .onSnapshot((snapshot) => {
          if (snapshot.docs === []) {
            return;
          }
          setResume(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              companyName: doc.data().companyName,
              employmentStatus: doc.data().employmentStatus,
              ewMM: doc.data().ewMM,
              ewYY: doc.data().ewYY,
              swMM: doc.data().swMM,
              swYY: doc.data().swYY,
            }))
          );
        });
    }
  }, [userId]);

  useEffect(() => {
    storage
      .ref()
      .child("demo_img.jpeg")
      .getDownloadURL()
      .then(function (url) {
        setDemoImg(url);
      });
  }, []);

  const options = {
    timeout: 2000,
    position: positions.TOP_CENTER,
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        userName,
        userEmail,
        profileImageSrc,
        demoImg,
        setNameTrigger,
        profileId,
        jobTitle,
        homeAddress,
        dobYY,
        dobMM,
        dobDD,
        school,
        birthPlace,
        language,
        comments,
        hobby,
        dream,
        certification,
        strongArea,
        subjectArea,
        yearsOfExperience,
        resume,
      }}
    >
      <AlertProvider template={AlertTemplate} {...options}>
        <Component {...pageProps} />
      </AlertProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
