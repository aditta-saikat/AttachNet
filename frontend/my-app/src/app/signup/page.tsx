"use client";

import FormField from "../components/Formfield";
import { UserPlus } from "lucide-react";

export default function Signup() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 mb-2">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-600">Join our community today</p>
        </div>

        <form className="space-y-4">
          <FormField
            label="Username"
            type="text"
            name="username"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <FormField
            label="Email"
            type="email"
            name="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <FormField
            label="Password"
            type="password"
            name="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <FormField
            label="Phone"
            type="tel"
            name="phone"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />

          <button
            type="submit"
            className="w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Create Account
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
