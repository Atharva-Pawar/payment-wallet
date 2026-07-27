import React from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <div>
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter Your Information to Create an Account"} />
          <InputBox placeholder="John" label={"First Name"} />
          <InputBox placeholder="Doe" label={"Last Name"} />
          <InputBox placeholder="atharva@gmail.com" label={"Email"} />
          <InputBox placeholder="12346" label={"Password"} />
          <div className="pt-4">
            <Button label={"Sign up"} />
          </div>
          <BottomWarning
            label={"Already have an account"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;