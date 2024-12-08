import { Heading } from "../components/Heading";
import { Subheading } from "../components/Sub_Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtomWarning } from "../components/BottonWarning";


export const Signin = () => {
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign in"} />
            <Subheading label={"Enter your credentials to access your account"} />
            <InputBox placeholder="mail" label={"Email"} />
            <InputBox placeholder="Password" label={"Password"} />
            <div className="pt-4">
              <Button label={"Sign in"} />
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