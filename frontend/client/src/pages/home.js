import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">TaskFlow</h1>
        <div>
          <Link to="/login" className="mr-4 hover:text-blue-400">Login</Link>
          <Link to="/register" className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-1 flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl font-bold mb-4">
          Manage Your Tasks <span className="text-blue-400">Smartly</span>
        </h1>
        <p className="text-gray-300 max-w-xl mb-6">
          A simple and powerful task manager to organize your daily work and boost productivity.
        </p>

        <div>
          <Link to="/register">
            <button className="bg-blue-500 px-6 py-3 rounded-lg mr-4 hover:bg-blue-600">
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center p-4 text-gray-400">
        © 2026 TaskFlow. Built by Sachin Kumar 🚀
      </footer>
    </div>
  );
}