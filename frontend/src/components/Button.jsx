export function Button({ label, onClick }) {
    return (
      <button
        onClick={onClick}
        type="button"
        className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
        {label}
      </button>
    );
  }