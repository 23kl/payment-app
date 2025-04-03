import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarming } from "../components/BottomWarming";
import { useState } from "react";
import axios from "axios";

export function Signup() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 relative">
        <div className="absolute inset-0 bg-[url('/path-to-your-pattern.svg')] opacity-10"></div>
        <div className="relative w-full max-w-md bg-white bg-opacity-90 shadow-2xl rounded-3xl p-6 backdrop-blur-lg border border-white border-opacity-40 transform transition duration-500 hover:scale-105 hover:shadow-3xl">
          <Heading label="Signup" />
          <SubHeading label="Enter your credentials to sign up" />
  
          <div className="space-y-4 mt-4">
            <InputBox
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              label="User Name"
              placeholder="Alex"
            />
  
            <InputBox
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="Password"
              placeholder="*****"
              type="password"
            />
  
            <InputBox
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              label="First Name"
              placeholder="Shubham"
            />
  
            <InputBox
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              label="Second Name"
              placeholder="Singh"
            />
          </div>
  
          <div className="mt-6">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username: userName,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                  }
                );
                localStorage.setItem("token", response.data.token); // to store the token in local browser
              }}
              label="Signup"
              className="w-full"
            />
          </div>
  
          <div className="mt-4 text-center">
            <BottomWarming
              label="Having an account?"
              buttonText="Sign in"
              to="/signin"
            />
          </div>
        </div>
      </div>
    );
  }