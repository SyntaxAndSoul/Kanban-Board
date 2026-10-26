import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { addUser } from "../state/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
const useAuthHook = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registeredUsers, setregisteredUsers] = useState(
    JSON.parse(localStorage.getItem("registeredUsers")) || [],
  );
  const loginUser = (data) => {
    try {
      const user = registeredUsers.find(
        (val) => val.email === data.email && val.password === data.password,
      );
      if (!user) {
        toast.error("invalid something..");
        return;
      }
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      dispatch(addUser(user));
      toast.success("user Logged in");
      reset();
      navigate("/projects");
    } catch (err) {
      console.log(err);
    }
  };

  const registerUser = (data) => {
    try {
      const arr = [...registeredUsers, data];
      setregisteredUsers(arr);
      localStorage.setItem("registeredUsers", JSON.stringify(arr));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    register,
    reset,
    errors,
    handleSubmit,
    navigate,
    loginUser,
    registerUser,
  };
};
export default useAuthHook;
