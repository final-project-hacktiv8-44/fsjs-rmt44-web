import Link from "next/link";
import ClientFlashComponent from "../Validation/ClientFlashComponent";
import Image from "next/image";
import logo from "@/assets/logo.png"
import { SubmitButton } from "./submitButton";

type LoginProps = {
  handleLogin: (formData: FormData) => void;
};

export function LoginForm({ handleLogin }: LoginProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-10 py-12 px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col items-center">
      <Image src={logo} alt="Logo" className="w-60 h-40 mb-4" />
    </div>
    <ClientFlashComponent />
    <div className="max-w-md w-full mx-auto bg-white shadow rounded-lg p-7 space-y-6">
      <form
        action={handleLogin}
        className="max-w-md w-full mx-auto bg-white shadow rounded-lg p-7 space-y-6">
        {/* Email Input */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-600 mb-1">
            Email
          </label>
          <input
            className="border rounded-md bg-white px-3 py-2 text-black"
            type="email"
            name="email"
            placeholder="Enter your Email Address"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-600 mb-1">
            Password
          </label>
          <input
            className="border rounded-md bg-white px-3 py-2 text-black"
            type="password"
            name="password"
            placeholder="Enter your Password"
          />
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2">
            <input
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              type="checkbox"
              name="remember"
              id="remember"
            />
            <label className="text-gray-600">Remember me</label>
          </div>
          <div>
            <a href="#" className="text-indigo-600">Forgot your Password?</a>
          </div>
        </div>
        <div>
          <SubmitButton/>
        </div>
      </form>
      <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h1>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or -&gt;
        <Link
          href="/register"
          className="font-medium text-indigo-600 border-b border-indigo-600">
           Register Your New Account
        </Link>
      </p>
    </div>
  </main>
  
  );
}