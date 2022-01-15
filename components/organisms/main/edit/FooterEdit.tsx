import firebase from "firebase/app";
import Router from "next/router";
import React, { Dispatch, memo, useEffect, useState, VFC } from "react";
import { useAlert } from "react-alert";
import { auth, provider } from "../../../../firebase";

///////// 型定義エリア /////////
type Props = {
  userEmail: string;
  setUserEmail: Dispatch<React.SetStateAction<string>>;
};

export const FooterEdit: VFC<Props> = memo(({ userEmail, setUserEmail }) => {
  ///////// ステートエリア /////////
  const [openEditEmail, setOpenEditEmail] = useState<boolean>(false);
  const [openEditPassword, setOpenEditPassword] = useState<boolean>(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState<boolean>(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState<boolean>(false);
  const [resetEmailPassword, setResetEmailPassword] = useState<string>("");
  const [deleteAccountPassword, setDeleteAccountPassword] =
  useState<string>("");

  // 定数定義
  const alert = useAlert();
  const googleUrl = "google.com";
  const loginPath = "/login";
  const changeMailConfirmMsg = "メールアドレスを変更してもよろしいですか?";
  const changeMailSuccessMsg = "メールアドレスを変更しました";
  const changeMailErrorMsg = "メールアドレスを変更できませんでした";
  const changeMailCancelMsg = "変更をキャンセルしました";
  const changeMailDifferentMsg = "パスワードが異なっています";
  const accountDeletionConfirmMsg = "本当にアカウントを削除しますか?";
  const accountDeletionSuccessMsg = "アカウントを削除しました";
  const accountDeletionErrorMsg = "アカウントを削除できませんでした";
  const accountDeletionCancelMsg = "アカウント削除をキャンセルしました";
  const accountDeletionPreparingSuccessMsg = "アカウント削除の準備ができました";
  const accountDeletionPreparingErrorMsg = "googleログイン情報を取得できませんでした";
  const sendMailSuccessMsg = "メールを送信しました";
  const sendMailErrorMsg = "正しい内容を入力してください";
  const logoutConfirmMsg = "ログアウトしますか？";
  const logoutSuccessMsg = "ログアウトしました";
  const logoutErrorMsg = "ログアウトできませんでした";

  ///////// 関数エリア /////////
  // google認識でログインか判別処理
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.providerData[0].providerId === googleUrl) {
          setIsGoogleLogin(true);
        }
      }
    });
    return () => unSub();
  }, []);

  // メールアドレス変更処理
  const changeEmail = (): void => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user && resetEmailPassword) {
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          resetEmailPassword
        );

        // ログインしていれば通る
        user
          .reauthenticateWithCredential(credential)
          .then(() => {
            const result = confirm(changeMailConfirmMsg);

            if (result) {
              user
                .updateEmail(userEmail)
                .then(() => {
                  alert.success(changeMailSuccessMsg);
                })
                .catch((error) => {
                  alert.error(changeMailErrorMsg);
                });
            } else {
              alert.error(changeMailCancelMsg);
            }
          })
          .catch(() => {
            alert.error(changeMailDifferentMsg);
          });
      }
      // 登録解除
      return () => unSub();
    });
  };

  // アカウント削除
  const deleteAccount = (): void => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user && deleteAccountPassword) {
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          deleteAccountPassword
        );

        // ログインしていれば通る
        user
          .reauthenticateWithCredential(credential)
          .then(async () => {
            const result = confirm(accountDeletionConfirmMsg);

            if (result) {
              await user
                .delete()
                .then(() => {
                  alert.success(accountDeletionSuccessMsg);
                  Router.push(loginPath);
                })
                .catch(() => {
                  alert.error(accountDeletionErrorMsg);
                });
            } else {
              alert.error(accountDeletionCancelMsg);
            }
          })
          .catch(() => {
            alert.error(accountDeletionErrorMsg);
          });
      }
      // 登録解除
      unSub();
    });
  };

  // アカウント(google)削除処理
  //google認証
  const signInGoogle = (): void => {
    auth
      .signInWithPopup(provider)
      .then(() => {
        alert.success(accountDeletionPreparingSuccessMsg);
      })
      .catch(() => {
        alert.error(accountDeletionPreparingErrorMsg);
      });
  };

  // アカウント(google)削除
  const deleteGoogleAccount = (): void => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        const result = confirm(accountDeletionConfirmMsg);

        if (result) {
          user
            .delete()
            .then(() => {
              alert.success(accountDeletionSuccessMsg);
              Router.push(loginPath);
            })
            .catch(() => {
              alert.error(accountDeletionErrorMsg);
            });
        } else {
          alert.error(accountDeletionCancelMsg);
        }
      }
      // 登録解除
      return () => unSub();
    });
  };

  // パスワード変更処理
  const sendResetEmail = async (): Promise<void> => {
    await auth
      .sendPasswordResetEmail(userEmail)
      .then(() => {
        alert.success(sendMailSuccessMsg);
      })
      .catch(() => {
        alert.error(sendMailErrorMsg);
      });
  };

  // ログアウト処理
  const signOutUser = async (): Promise<void> => {
    const result = confirm(logoutConfirmMsg);
    if (result) {
      try {
        await auth.signOut();
        alert.success(logoutSuccessMsg);
        Router.push(loginPath);
      } catch (error) {
        alert.error(logoutErrorMsg);
      }
    }
  };

  ///////// JSXエリア /////////
  return (
    <div>
      {/* ////// メールアドレス＆パスワード変更 ////// */}
      <div className="grid grid-cols-12 justify-items-center">
        <div className="w-full text-center md:col-span-3 col-span-6 md:my-10 my-5">
          <button
            className="text-white bg-blue-400 transition duration-300 
            hover:bg-blue-300 py-1 px-5 rounded-full shadow-lg text-sm"
            onClick={() => setOpenEditEmail(!openEditEmail)}
          >
            メールアドレス変更
          </button>

          {openEditEmail && (
            <>
              {isGoogleLogin || (
                <>
                  <label>
                    <p className="mt-5 text-sm text-blue-300">
                      新しいメールアドレス
                    </p>
                    <input
                      className="text-base bg-blue-100 placeholder-blue-300 
                      rounded-full py-1 outline-none text-center w-11/12"
                      placeholder="email@example.com"
                      name="email"
                      autoComplete="email"
                      type="email"
                      maxLength={256}
                      value={userEmail}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserEmail(e.target.value)
                      }
                    />
                  </label>

                  <label>
                    <p className="mt-3 text-sm text-blue-300">パスワード</p>
                    <input
                      className="text-base bg-blue-100 placeholder-blue-300 
                      rounded-full py-1 outline-none text-center w-11/12"
                      name="password"
                      autoComplete="password"
                      type="password"
                      maxLength={20}
                      value={resetEmailPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setResetEmailPassword(e.target.value)
                      }
                    />
                  </label>

                  <div>
                    <button
                      className="text-white bg-blue-400 transition 
                      duration-300 hover:bg-blue-300 disabled:bg-blue-200 
                      py-1 px-5 rounded-full shadow-lg text-sm my-3"
                      onClick={changeEmail}
                      disabled={
                        userEmail.trim() === "" || resetEmailPassword.length < 6
                      }
                    >
                      変更
                    </button>
                  </div>
                </>
              )}

              {isGoogleLogin && (
                <p 
                  className="w-11/12 my-3 text-center mx-auto 
                  text-blue-300 text-sm"
                >
                  google認識でログインしたアカウントはメールアドレスの変更ができません
                </p>
              )}
            </>
          )}
        </div>

        <div 
          className="w-full text-center md:col-span-3 col-span-6 md:my-10 my-5"
        >
          <button
            className="text-white bg-blue-400 transition duration-300 
            hover:bg-blue-300 py-1 px-5 rounded-full shadow-lg text-sm"
            onClick={() => setOpenEditPassword(!openEditPassword)}
          >
            パスワード変更
          </button>

          {openEditPassword && (
            <>
              <p 
                className="w-11/12 my-3 text-center mx-auto 
                text-blue-300 text-sm"
              >
                現在登録されているメールアドレスにパスワード変更メールが送信されます
              </p>

              <div>
                <button
                  className="text-white bg-blue-400 transition duration-300 
                  hover:bg-blue-300 py-1 px-5 rounded-full shadow-lg text-sm"
                  onClick={sendResetEmail}
                >
                  変更
                </button>
              </div>
            </>
          )}
        </div>

        <div className="w-full text-center md:col-span-3 col-span-6 md:my-10 my-5">
          <button
            className="text-white bg-gray-400 transition duration-300 
            hover:bg-gray-300 py-1 px-5 rounded-full shadow-lg text-sm"
            onClick={signOutUser}
          >
            ログアウト
          </button>
        </div>

        <div 
          className="w-full text-center md:col-span-3 col-span-6 md:my-10 my-5"
        >
          <button
            className="text-white bg-gray-400 transition duration-300 
            hover:bg-gray-300 py-1 px-5 rounded-full shadow-lg text-sm"
            onClick={() => setOpenDeleteAccount(!openDeleteAccount)}
          >
            アカウント削除
          </button>

          {openDeleteAccount && (
            <>
              {isGoogleLogin || (
                <>
                  <label>
                    <p className="mt-3 text-sm text-blue-300">パスワード</p>
                    <input
                      className="text-base bg-blue-100 placeholder-blue-300 
                      rounded-full py-1 outline-none text-center w-11/12"
                      name="password"
                      autoComplete="password"
                      type="password"
                      maxLength={20}
                      value={deleteAccountPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDeleteAccountPassword(e.target.value)
                      }
                    />
                  </label>

                  <div>
                    <button
                      className="text-white bg-blue-400 transition 
                      duration-300 hover:bg-blue-300 disabled:bg-blue-200 
                      py-1 px-5 rounded-full shadow-lg text-sm my-3"
                      onClick={deleteAccount}
                      disabled={deleteAccountPassword.length < 6}
                    >
                      削除
                    </button>
                  </div>
                </>
              )}

              {isGoogleLogin && (
                <>
                  <p 
                    className="w-11/12 my-3 text-center 
                    mx-auto text-blue-300 text-sm"
                  >
                    「google認証」した後に「削除」をクリックしてください
                  </p>

                  <div>
                    <button
                      className="text-white bg-blue-400 transition 
                      duration-300 hover:bg-blue-300 disabled:bg-blue-200 
                      py-1 px-5 rounded-full shadow-lg text-sm my-3"
                      onClick={signInGoogle}
                    >
                      google認証
                    </button>
                  </div>
                  
                  <div>
                    <button
                      className="text-white bg-red-400 transition 
                      duration-300 hover:bg-red-300 disabled:bg-blue-200 
                      py-1 px-5 rounded-full shadow-lg text-sm my-3"
                      onClick={deleteGoogleAccount}
                    >
                      削除
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
});
