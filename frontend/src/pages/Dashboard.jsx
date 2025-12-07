import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Welcome to Your Dashboard
        </h2>

        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">Name:</span> {user?.name}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Phone:</span> {user?.phone}
          </p>
        </div>

        <button
          onClick={() => {
            logoutUser();
            navigate("/login");
          }}
          className="cursor-pointer w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
