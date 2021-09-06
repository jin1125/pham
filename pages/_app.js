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
  const [connection, setConnection] = useState("");
  const [scout, setScout] = useState("");

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
            const profileInformation = {
              profileImageUrl: "",
              jobTitle: "",
              homeAddress: "",
              dobYY: "",
              dobMM: "",
              dobDD: "",
              school: "",
              birthPlace: "",
              language: "",
              comments: "",
              hobby: "",
              dream: "",
              certification: "",
              strongArea: "",
              subjectArea: "",
              connection: 0,
              scout: "スカウトを受け取る",
            };

            const experienceInformation = {
              id:'0',
              experience: "",
              years: "",
            };

            const resumeInformation = {
              companyName: "",
              employmentStatus: "",
              workStart: "",
              workEnd: "",
            };

            db.collection("userProfiles")
              .doc(userId)
              .set(profileInformation)
              .then((docRef) => {
                console.log("profileInformation");
              })
              .catch((error) => {
                console.log("error");
              });

            db.collection("userProfiles")
              .doc(userId)
              .collection("yearsOfExperience")
              .doc('0')
              .set(experienceInformation)
              .then((docRef) => {
                console.log("experienceInformation");
              })
              .catch((error) => {
                console.log("error");
              });

            db.collection("userProfiles")
              .doc(userId)
              .collection("resume")
              .add(resumeInformation)
              .then((docRef) => {
                console.log("resumeInformation");
              })
              .catch((error) => {
                console.log("error");
              });
          }
        });
    }
  }, [userId]);


  useEffect(() => {
    if (userId) {
      db.collection("userProfiles")
        .doc(userId)
        .onSnapshot((doc) => {
          // console.log(doc.data());
          if (doc.data()) {
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
            setConnection(doc.data().connection);
            setScout(doc.data().scout);
          }
        });

      db.collection("userProfiles")
        .doc(userId)
        .collection("yearsOfExperience")
        .onSnapshot((snapshot) => {
          // console.log(snapshot.docs);
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
          // console.log(snapshot.docs);
          if (snapshot.docs === []) {
            return;
          }

          setResume(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              companyName: doc.data().companyName,
              employmentStatus: doc.data().employmentStatus,
              workStart: doc.data().workStart,
              workEnd: doc.data().workEnd,
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
    timeout: 1000,
    position: positions.TOP_CENTER,
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        demoImg,
        setDemoImg,
        nameTrigger,
        setNameTrigger,
        profileId,
        setProfileId,
        profileImageSrc,
        setProfileImageSrc,
        jobTitle,
        setJobTitle,
        homeAddress,
        setHomeAddress,
        dobYY,
        setDobYY,
        dobMM,
        setDobMM,
        dobDD,
        setDobDD,
        school,
        setSchool,
        birthPlace,
        setBirthPlace,
        language,
        setLanguage,
        comments,
        setComments,
        hobby,
        setHobby,
        dream,
        setDream,
        certification,
        setCertification,
        strongArea,
        setStrongArea,
        subjectArea,
        setSubjectArea,
        connection,
        setConnection,
        scout,
        setScout,
        yearsOfExperience,
        setYearsOfExperience,
        resume,
        setResume,
      }}
    >
      <AlertProvider template={AlertTemplate} {...options}>
        <Component {...pageProps} />
      </AlertProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
