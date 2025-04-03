import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarming } from "../components/BottomWarming";
import { useState } from "react";
import axios from "axios"

export const Signin = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-6 relative">
            <div className="absolute inset-0 bg-[url('/path-to-your-pattern.svg')] opacity-10"></div>
            <div className="relative w-full max-w-md bg-gray-800 shadow-2xl rounded-3xl p-6 backdrop-blur-lg border border-gray-600 transform transition duration-500 hover:scale-105 hover:shadow-3xl">
                <h2 className="text-3xl font-bold text-center text-white">Signin</h2>
                <p className="text-sm text-gray-400 text-center">Enter your credentials to log in</p>

                <div className="space-y-4 mt-4">
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUserName(e.target.value)} 
                        className="w-full h-10 rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Username"
                    />

                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full h-10 rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Password"
                    />
                </div>

                <div className="mt-6">
                    <button 
                        onClick={() => {
                            axios.post("http://localhost:3000/api/v1/user/signin", {
                                username: username,
                                password: password
                            });
                        }}
                        className="w-full h-10 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 transition-all"
                    >
                        Signin
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-400">Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a></p>
                </div>
            </div>
        </div>
    );
};
