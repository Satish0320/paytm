import { Heading } from "../components/Heading";
import { Subheading } from "../components/Sub_Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtomWarning } from "../components/BottonWarning";
import { useState } from "react";
import axios from "axios"

export const Signup = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const handelSignup = async () => {
       const response = await axios.post("http://localhost:4000/user/signup" , {
            mail,
            password,
            name,
            username
        })
        console.log("Signup successful:", response.data);
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading lable={"Sign up"} />
          <Subheading lable={"Enter your infromation to create an account"} />
          <InputBox
            placeholder="mail"
            lable={"Email"}
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
          <InputBox
            placeholder="Password"
            lable={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputBox
            placeholder="Full Name"
            lable={"Name"}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputBox
            placeholder="Username"
            lable={"Username"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button lable={"Sign Up"} onClick={handelSignup} />
          </div>
          <ButtomWarning
            lable={"Already have an account? "}
            buttontext={"sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
