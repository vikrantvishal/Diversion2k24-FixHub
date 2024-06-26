import React, { useState, useContext } from "react";
// import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";

const def = {
  email: "",
  password: "",
};

const Login = () => {
  const [loginstate, setLoginState] = useState(def);
  const { setUserName, setUserEmail, setIsLoggedIn, setUserType, setUserId } =
    useContext(LoginContext);
  const navigate = useNavigate();

  const inputChange = (e) => {
    setLoginState({ ...loginstate, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", loginstate.email);
    urlencoded.append("password", loginstate.password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/user/login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setIsLoggedIn(true);
        setUserName(result.name);
        setUserType(result.type);
        setUserId(result._id);
        setUserEmail(result.email);
        localStorage.setItem("token", result.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: result._id,
            name: result.name,
            isAuthed: true,
            type: result.type,
            email: result.email,
            address: result.address,
            pincode: result.pincode,
            lat: result.lat,
            lon: result.lon,
            messages:[],
            data:[],
          })
        );

        navigate("/profileUser");
      })
      .catch((error) => console.log("error", error));

    // setLoginState(def);
  };
  return (
    <>
        <div className="m-0 flex h-[550px] max-w-full items-center justify-center rounded-md bg-slate-200">
        <div className="md:h-[350px] ring-4 ring-lightGray  rounded-md shadow-2xl p-10 md:w-[350px] lg:h-[400px] lg:w-[400px]">
          <h2 className="mb-4 text-3xl font-semibold ">LOGIN</h2>

           <form>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="name@gmail.com"
                required
                onChange={(e) => inputChange(e)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
                onChange={(e) => inputChange(e)}
              />
            </div>
            <div className="mb-6"></div>
             <button
              type="submit"
              className="bg-[#EAB308] w-full text-[#000000]  py-[14px] px-[18px] rounded-md font-mullish font-bold
          hover:bg-lightBlue500 transition-all duration-200 focus:outline-none focus:ring-4  "
              onClick={(e) => handleSubmit(e)}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

