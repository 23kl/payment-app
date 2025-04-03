export function InputBox({ label, placeholder, onChange}) {
    return (
      <div className="text-sm font-medium text-left py-2">
        <label className="block text-gray-700 mb-1">{label}</label>
        <input
          placeholder={placeholder}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gradient-to-r from-blue-50 to-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    );
  }