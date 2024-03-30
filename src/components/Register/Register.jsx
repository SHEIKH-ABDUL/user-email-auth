import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../fabd/fibas.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const name =  e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted= e.target.terms.checked;
    console.log(name,email, password,accepted);

    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError("password should be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "your password should have at least one upper case characters."
      );
      return;
    }
    else if(!accepted){
      setRegisterError('please our  accept terms and conditions')
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("User Created Successfully")

        updateProfile(result.user,{
          displayName:name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(() => console.log("profile updated"))
        .catch()

        sendEmailVerification(result.user)
        .then( () =>{
          toast("please check your email and verify your account")
        })

      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.massage);
      });
  };
  return (
    <div>
      <div className="mx-auto md:w-1/2">
        <h2 className="text-3xl mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="rounded-md py-2 px-4 mb-5 w-full"
            type="text"
            name="name"
            id=""
            required
            placeholder="Your name"
          />
          <br />
          <input
            className="rounded-md py-2 px-4 mb-5 w-full"
            type="email"
            name="email"
            id=""
            required
            placeholder="Email Address"
          />
          <br />
          <div className="mb-5 relative">
            <input
              className="rounded-md py-2 px-4  w-full"
              type={show ? "text" : "password"}
              name="password"
              id=""
              required
              placeholder="Password"
            />
            <span className=" absolute top-3 right-2" onClick={() => setShow(!show)}>
              {show ? <FaEyeSlash className="w-10 h-5"></FaEyeSlash> : <FaEye className="w-10 h-5"></FaEye>}
            </span>
          </div>
          <br />
          <div className="mb-2">
          <input type="checkbox" name="terms" id="terms" />
          <label htmlFor="terms">Accept our <a href="">Terms and Conditions</a> </label>
          </div>
          <br />
          {/* <input className=' btn btn-secondary mb-5 w-3/4' type="button" value="Register" /> */}
          <button className=" btn btn-secondary mb-5 w-full" type="submit">
            Register
          </button>
        </form>
        {registerError && <p className="text-red-600">{registerError}</p>}
        {success && <p className="text-blue-600">{success}</p>}
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
