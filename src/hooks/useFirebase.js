import { useState, useEffect } from "react";
import {
  getAuth,
  getIdToken,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [redirectURL, setRedirectURL] = useState("");
  const [token, setToken] = useState("");
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const signInUsingGoogle = () => {
    return signInWithPopup(auth, googleProvider).finally(() => {
      setLoading(false);
    });
  };

  const signUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false);
    });
  };

  const setUserName = (name, history, redirect_url) => {
    setLoading(true);
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL:
        "https://github.com/tajbiul-hossain/dental-depot-images/blob/main/images/icon/avatar.png?raw=true",
    }).then((result) => {
      history.push(redirect_url);
      setLoading(false);
    });
  };

  const logInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .finally(() => setLoading(false));
  };

  const updateRedirectURL = (redirect_url) => {
    setRedirectURL(redirect_url);
  };

  const updateLoadingState = (loadingState) => {
    setLoading(loadingState);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getIdToken(user).then((idToken) => setToken(idToken));
        setUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, [auth]);

  return {
    user,
    loading,
    redirectURL,
    token,
    signInUsingGoogle,
    signUpWithEmailAndPassword,
    logInWithEmailAndPassword,
    logOut,
    setUserName,
    updateRedirectURL,
    updateLoadingState,
  };
};

export default useFirebase;
