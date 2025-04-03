import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const SendMoney = () => { 
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name") || "Unknown";
    const id = searchParams.get("id");
    const [amount, setAmount] = useState("");

    const handleTransfer = async () => { 
        try { 
            await axios.post(
                "http://localhost:3000/api/v1/account/transfer", 
                { to: id, amount }, 
                { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
            );
            alert("Transfer Successful!");
        } catch (error) { 
            alert("Transfer Failed: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-6">
            <div className="relative w-full max-w-md bg-gray-800 shadow-xl rounded-3xl p-6 backdrop-blur-lg border border-gray-600 transform transition duration-500 hover:scale-105 hover:shadow-3xl">
                <h2 className="text-3xl font-bold text-center text-white">Send Money</h2>

                <div className="flex items-center space-x-4 mt-6">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-2xl text-white">{name?.charAt(0).toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-200">{name}</h3>
                </div>

                <div className="space-y-4 mt-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Amount (in Rs)</label>
                        <input 
                            type="number" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            className="w-full h-10 rounded-md border border-gray-500 bg-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter amount"
                        />
                    </div>

                    <button 
                        onClick={handleTransfer} 
                        className="w-full h-10 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 transition-all"
                    >
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </div>
    );
};
