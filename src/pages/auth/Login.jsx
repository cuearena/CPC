import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import axios from "../../utils/axiosInstance";
import { setSession } from '../../features/authSlice';
import { setObject } from '../../utils/localStroage';

import compute from "../../assets/imgs/compute.jpg";

function Login(){
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({"type": "pwd"});
  const [errorForm, setErrorForm] = useState({});

  function handleChange(event){
    var { name, value } = event.target;
    var formData = { ...form };
    formData[name] = value;
    setForm(formData);
  }

  async function submit(form){
    setLoading(true);
    await axios
    .post("/auth/login", form)
    .then((res) => {
      var data = res.data;
      if (data.user_details) {
        var user_details = data.user_details;
        dispatch(setSession({ email: user_details.email, auth: "Y" }));
        setObject({ email: user_details.email, auth: "Y" });
        navigate("/");
      }else{
        throw new Error("user details not found");
      }
    })
    .catch((err) => {
      if(err.response){
        const { data } = err.response;
        if(data){
          if(data.code==="VALIDATION_ERROR"){
          }else if(data.code==="INVALID_LOGIN" || data.code==="INVALID_GOOGLE_OAUTH"){
            var message = data.message;
            setErrorForm({...errorForm, "form": message});
          }
        }
      }
      console.log(err);
    });
    setLoading(false);
  }

  function handleSubmit(event){
    event.preventDefault();
    submit(form);
  }

  function handleGSucess(credentialResponse){
    submit({...credentialResponse, "type": "g-oauth"});
  }

  function handleGError(){
    console.log("error");
  }

  return(
    <main className="mx-auto max-w-[403px] flex flex-col justify-center items-center">
      <form className="flex flex-col justify-center items-center w-full" onSubmit={(event) => {handleSubmit(event)}}>
        <img className="w-[60px] h-[60px] rounded-full mt-8 mb-8" src={compute} />
        <p className={`text-xs mb-2 text-red-600 text-left py-[4px] self-start ${errorForm.form ? '': 'invisible'}`}>{errorForm.form ? errorForm.form: "None"}</p>
        <div className="relative w-full max-w-[403px] group">
          <input onChange={(e) => handleChange(e)} className="text-white text-base h-[43px] w-full outline outline-1 outline-white focus:outline focus:outline-1 focus:outline-white focus:outline-offset-0 group-[.error]:outline-red-500 rounded-[4px] border-0 bg-[#05010B] pl-[10px] peer" type="text" name="email" placeholder="" autoComplete="off" />
          <label className="absolute top-1/2 left-[10px] font-medium text-white text-sm translate-y-[-50%] peer-[:not(:placeholder-shown)]:top-0 peer-focus:top-0 peer-[:not(:placeholder-shown)]:left-2 peer-focus:left-2 peer-[:not(:placeholder-shown)]:text-xs peer-focus:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-focus:px-1 bg-[#05010B] transition-all duration-300 pointer-events-none group-[.error]:text-red-500" htmlFor="email">Enter Email ID</label>
        </div>
        <p className="text-xs invisible text-red-600 text-left py-[4px]">Error</p>
        <div className="relative w-full max-w-[403px] group">
          <input onChange={(e) => handleChange(e)} className="text-white text-base h-[43px] w-full outline outline-1 outline-white focus:outline focus:outline-1 focus:outline-white focus:outline-offset-0 group-[.error]:outline-red-500 rounded-[4px] border-0 bg-[#05010B] pl-[10px] peer" type="password" name="password" placeholder="" autoComplete="off" />
          <label className="absolute top-1/2 left-[10px] font-medium text-white text-sm translate-y-[-50%] peer-[:not(:placeholder-shown)]:top-0 peer-focus:top-0 peer-[:not(:placeholder-shown)]:left-2 peer-focus:left-2 peer-[:not(:placeholder-shown)]:text-xs peer-focus:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-focus:px-1 bg-[#05010B] transition-all duration-300 pointer-events-none group-[.error]:text-red-500" htmlFor="password">Password</label>
        </div>
        <p className="text-xs invisible text-red-600 text-left py-[4px]">Error</p>
        <button className="w-full max-w-[403px] h-[43px] outline outline-1 outline-[#9747FF] text-white text-base font-semibold rounded-[4px] bg-[#9747FF] hover:bg-[#7a3bcc]" type="submit" >Login</button>
      </form>
      <div className="mt-6 mb-4 w-full flex items-center">
        <div className="h-[1px] basis-[45%] bg-[#E4E6EC]"></div>
        <p className="text-[#969AB8] text-base font-medium basis-[10%] text-center">or</p>
        <div className="h-[1px] basis-[45%] bg-[#E4E6EC]"></div>
      </div>
      <GoogleLogin
        text="continue_with"

        onSuccess={credentialResponse => {
          handleGSucess(credentialResponse);
        }}
      
        onError={() => {
          handleGError();
        }}
      />
      <p className="mt-4 text-base text-[#969AB8] self-start">Don't have an account? <Link className="text-[#0062FF] hover:underline" to="/sign-up">Sign Up</Link></p>
    </main>
  );
}

export default Login;