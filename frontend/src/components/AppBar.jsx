export const Appbar = () => {
    return (
        <div className="h-16 flex justify-between items-center px-6 bg-gray-950 shadow-md">
            <div className="text-xl font-semibold text-gray-200">PayTM App</div>
            <div className="flex items-center">
                <span className="text-gray-300 mr-4">Hello</span>
                <div className="h-10 w-10 bg-blue-600 text-white flex items-center justify-center rounded-full text-lg font-medium">U</div>
            </div>
        </div>
    );
};
