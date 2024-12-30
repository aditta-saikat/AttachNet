"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "./components/Dropdown";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleChangeRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const handleSubmit = () => {
    if (role === "teacher" || role === "student") {
      router.push("/signup");
    }
  };

  return (
    <div className="relative min-h-screen  bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <main className="relative flex flex-col items-center justify-center min-h-screen p-8 overflow-hidden">
        <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl space-y-8">
          {/* Logo and Title Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to AttachNet
            </h1>
            <p className="text-gray-600 text-lg">
              Connect, Learn, and Grow Together
            </p>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Choose your role
              </label>
              <Dropdown
                value={role}
                onChange={handleChangeRole}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!role}
            >
              Get Started
            </button>
          </div>

          {/* Footer Section */}
          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Log in
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
