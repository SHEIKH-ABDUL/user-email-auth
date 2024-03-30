import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import auth from "../../fabd/fibas.config";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef= useRef(null);

  const handelLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    setRegisterError("");
    setSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if(result.user.
          emailVerified){
            setSuccess("User Logged in Successfully");
          }
          else{
            toast("please verify  your email")
          }
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      })
  }

  const handelForgetPassword = () =>{
  const email = emailRef.current.value;
  if(!email){
    console.log("reset email", emailRef.current.value)
    return;
  }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    {
      console.log('please right valid email')
      return;
    }
    sendPasswordResetEmail(auth,email)
    .then(() =>{
      toast("please check your email")
    })
    .catch(error =>{
      console.log(error)
    })
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handelLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                ref={emailRef}
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a onClick={handelForgetPassword} href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {registerError && <p className="text-red-600">{registerError}</p>}
          {success && <p className="text-blue-600">{success}</p>}
          <p>New website? here <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
