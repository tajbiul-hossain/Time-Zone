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
  const [isLoading, setIsLoading] = useState(true);
  const [redirectURL, setRedirectURL] = useState("");
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const signInUsingGoogle = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() => {
      setIsLoading(false);
    });
  };

  const signUpWithEmailAndPassword = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() => {
      setIsLoading(false);
    });
  };

  const setUserName = (name, history, redirect_url) => {
    setIsLoading(true);
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL:
        "https://github.com/tajbiul-hossain/dental-depot-images/blob/main/images/icon/avatar.png?raw=true",
    }).then((result) => {
      history.push(redirect_url);
      setIsLoading(false);
    });
  };

  const logInWithEmailAndPassword = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() => {
      setIsLoading(false);
    });
  };

  const logOut = (history) => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
        history.push("/");
      })
      .finally(() => setIsLoading(false));
  };

  const saveUser = (email, displayName, method) => {
    const newUser = { email, displayName };
    fetch("https://still-woodland-16821.herokuapp.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then();
  };

  const updateRedirectURL = (redirect_url) => {
    setRedirectURL(redirect_url);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getIdToken(user).then((idToken) => setToken(idToken));
        setUser(user);
      } else {
        setUser({});
      }
      if (token) {
        setIsLoading(false);
      }
    });
    return () => unsubscribe;
  }, [auth, token]);

  useEffect(() => {
    fetch(`https://still-woodland-16821.herokuapp.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  return {
    user,
    admin,
    isLoading,
    redirectURL,
    token,
    signInUsingGoogle,
    signUpWithEmailAndPassword,
    logInWithEmailAndPassword,
    logOut,
    setUserName,
    saveUser,
    updateRedirectURL,
  };
};

export default useFirebase;
