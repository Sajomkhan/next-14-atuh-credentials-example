"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [showPasswordText, setShowPasswordText] = useState("password");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    if (email || password) {
      setError("Must provide all the credentials.");
    }
    try {
      setPending(true);
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (res.error) {
        setError("Invalid Credentials");
        setPending(false);
        return;
      }
      router.replace("/dashboard");
    } catch (error) {
      console.log("Something went wrong", error.message);
      setPending(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl bg-gray-50  px-4 py-16 sm:px-6 lg:px-8 shadow-lg">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Sign in</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <div className="relative">
            <input
              type="email"
              name="email"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>

          <div className="relative">
            <input
              type={showPasswordText}
              name="password"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
            />

            <span
              onClick={() => {
                showPasswordText === "password"
                  ? setShowPasswordText("text")
                  : setShowPasswordText("password");
              }}
              className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  className={`${
                    showPasswordText === "text" ? "text-yellow-600 " : ""
                  }`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>
        {error && (
          <p className="font-light text-sm text-red-600 ml-4">{error}</p>
        )}

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?{" "}
            <a className="underline" href="/register">
              Sign up
            </a>
          </p>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            disabled={pending ? true : false}
          >
            {pending ? "Wait..." : "Sing in"}
          </button>
        </div>
      </form>
    </div>
  );
}