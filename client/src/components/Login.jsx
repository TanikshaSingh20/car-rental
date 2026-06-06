import React from 'react';
import { useAppContext } from '../context/AppContext';
import toast from "react-hot-toast";

const Login = () => {

  const { setShowLogin, axios, setToken, navigate } = useAppContext()
  const [state, setState] = React.useState("login");

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(
        `/api/user/${state}`,
        { name, email, password }
      );
      if (data.success) {
        navigate('/')
        setToken(data.token)
        localStorage.setItem('token', data.token)
        setShowLogin(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-[100] flex items-center justify-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl text-sm text-gray-500 border border-gray-200 p-8 py-12 w-80 sm:w-[352px]"
      >
        <p className="text-2xl font-medium text-center">
          {state === "login" ? (
            <>
              <span className="text-primary">User</span> Login
            </>
          ) : (
            <>
              <span className="text-primary">Create</span> Account
            </>
          )}
        </p>

        {state === "register" && (
          <div className="mt-4">
            <label className="block">Name</label>
            <input
              type="text"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            />
          </div>
        )}

        <div className="mt-4">
          <label className="block">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
          />
        </div>

        <div className="mt-4">
          <label className="block">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
          />
        </div>

        {state === "login" ? (
          <p className="mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              Create one
            </span>
          </p>
        ) : (
          <p className="mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              Sign in
            </span>
          </p>
        )}

        <button
          type="submit"
          className="bg-primary hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md mt-4 cursor-pointer"
        >
          {state === "login" ? "Login" : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default Login;