export const Balance = ({ value }) => {
    return (
        <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-300">Current Balance</h2>
            <p className="text-3xl font-bold text-blue-400 mt-2">₹{value}</p>
        </div>
    );
};