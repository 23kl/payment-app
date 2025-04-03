import { useEffect, useState } from "react";
import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export function Dashboard() {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: { Authorization: "Bearer " + token },
        }).then((response) => {
            setBalance(response.data.balance);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Appbar />
            <div className="max-w-5xl mx-auto p-6">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    );
}