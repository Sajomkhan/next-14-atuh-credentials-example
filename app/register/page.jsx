"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPasswordText, setShowPasswordText] = useState("password");
  const [info, setInfo] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const handleInput = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!info.username || !info.email || !info.password)
      setError("Must provide all the credentials.");
    try {
      setPending(true);
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });
      if (res.ok) {
        setPending(false);
        const form = e.target;
        form.reset();
        router.push("/login");
        console.log("user registered");
      } else {
        console.log("Something went wrong");
        const errorData = await res.json();
        setError(errorData.message);
        setPending(false);
      }
    } catch (error) {
      console.log("Something went wrong", error.message);
      setPending(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl bg-gray-50  px-4 py-16 sm:px-6 lg:px-8 shadow-lg">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Register
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>

          <div className="relative">
            <input
              type="username"
              name="username"
              onChange={(e) => handleInput(e)}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter username"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <div className="relative">
            <input
              type="email"
              name="email"
              onChange={(e) => handleInput(e)}
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
              onChange={(e) => handleInput(e)}
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
          <p className="flex gap-2 text-sm text-gray-500 ml-4 mr-6">
            Already register? {""}
            <a className="underline" href="/login">
              Sign in
            </a>
          </p>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            disabled={pending ? true : false}
          >
            {pending ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}