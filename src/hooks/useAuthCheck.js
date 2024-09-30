import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../features/auth/authSlice";

const useAuthCheck = () => {
  const dispacth = useDispatch();
  const [authCheck, setAuthChek] = useState(false);

  useEffect(() => {
    const localAuth = localStorage.getItem("session");
    console.log(localAuth);
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.token && auth?.user) {
        dispacth(userLogin(auth));
      }
      setAuthChek(true);
    }
    setAuthChek(true);
  }, [dispacth, setAuthChek]);
  return authCheck;
};

export default useAuthCheck;
