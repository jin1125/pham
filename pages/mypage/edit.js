import React, { useContext, useState } from "react";
import { useAlert } from "react-alert";
import Layout from "../../components/layout/Layout";
import { db, storage } from "../../firebase";
import { UserContext } from "../../UserContext";

export default function edit() {
  const [profileImage, setProfileImage] = useState(null);
  const { userId } = useContext(UserContext);
  const alert = useAlert();

  const uploadImage = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  const editHandler = async () => {
    let url = "";
    if (profileImage) {
      //画像をストレージにアップロード
      await storage.ref(`profileImages/${userId}`).put(profileImage);
      //画像がクラウド上のどこにあるかURLで取得
      url = await storage.ref("profileImages").child(userId).getDownloadURL();
    }

    const ProfileInformation = {
      url: url,
    };

    await db
      .collection("userProfiles")
      .doc(userId)
      .set(ProfileInformation)
      .then((docRef) => {
        alert.success("プロフィールを変更しました");
      })
      .catch((error) => {
        alert.error("プロフィールを変更できませんでした");
      });
  };

  return (
    <Layout>
      <label>
        <input type="file" onChange={uploadImage} />
      </label>

      <div>
        <div className="my-7">
          <button
            className="text-white bg-blue-400 hover:bg-blue-300 py-2 w-1/2 rounded-full shadow-lg font-bold"
            onClick={editHandler}
          >
            変更を保存する
          </button>
        </div>
      </div>
    </Layout>
  );
}
