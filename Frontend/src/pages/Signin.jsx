import { Heading } from "../components/Heading";
import { Subheading } from "../components/Sub_Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtomWarning } from "../components/BottonWarning";
import axios from "axios";
import { useState } from "react";


export const Signin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlesignin = async() =>{
     const response = await axios.post("http://localhost:4000/user/signin",{
      email,
      password
    })
    console.log(response.data.Token);
    localStorage.setItem("Token", response.data.Token)
    
  }

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign in"} />
            <Subheading label={"Enter your credentials to access your account"} />
            <InputBox placeholder="Email" label={"Email"} onChange={(e)=>{
              setEmail(e.target.value)
            }} />
            <InputBox placeholder="Password" label={"Password"} onChange={(e)=>{
              setPassword(e.target.value)
            }}/>
            <div className="pt-4">
              <Button label={"Sign in"} onClick={handlesignin} />
            </div>
            <ButtomWarning 
            label={"Don't have an account? "}
             buttontext={"Sign up"} 
             to={"/signup"} />
          </div>
        </div>
      </div>
    )
}