import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`).then((response) => {
            setUsers(response.data.users);
        });
    }, [filter]);

    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-300">Users</h2>
            <input 
                onChange={(e) => setFilter(e.target.value)}
                type="text" 
                placeholder="Search users..." 
                className="w-full px-3 py-2 mt-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-4 space-y-4">
                {users.map((user) => <User key={user._id} user={user} />)}
            </div>
        </div>
    );
};

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
            <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-blue-600 text-white flex items-center justify-center rounded-full text-lg font-medium">
                    {user.firstName[0]}
                </div>
                <div className="text-gray-300">{user.firstName} {user.lastName}</div>
            </div>
            <button 
                onClick={() => navigate(`/send?id=${user._id}&name=${user.username}`)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
                Send Money
            </button>
        </div>
    );
}
