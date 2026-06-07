"use client";

import { useState } from "react";

import { useRouter }
  from "next/navigation";

import api from "@/services/api";


export default function SignupPage() {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleSignup =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        await api.post(
          "/auth/signup",
          {
            name,
            email,
            password,
          }
        );

        alert(
          "Signup Successful"
        );

        router.push("/login");

      } catch (error) {

        console.log(error);

        alert(
          "Signup Failed"
        );

      } finally {

        setLoading(false);
      }
    };


  return (

    <div
      className="
        min-h-screen
        flex items-center
        justify-center
        bg-[#F8FAFC]
      "
    >

      <form

        onSubmit={handleSignup}

        className="
          bg-white
          p-10
          rounded-2xl
          shadow-sm
          border
          w-full
          max-w-md
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-8
          "
        >
          Create Account
        </h1>


        {/* NAME */}
        <div className="mb-5">

          <label
            className="
              block
              mb-2
              text-sm
              font-medium
            "
          >
            Name
          </label>

          <input

            type="text"

            value={name}

            onChange={(e) =>
              setName(
                e.target.value
              )
            }

            className="
              w-full
              border
              rounded-xl
              px-4 py-3
              outline-none
            "

            required
          />

        </div>


        {/* EMAIL */}
        <div className="mb-5">

          <label
            className="
              block
              mb-2
              text-sm
              font-medium
            "
          >
            Email
          </label>

          <input

            type="email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            className="
              w-full
              border
              rounded-xl
              px-4 py-3
              outline-none
            "

            required
          />

        </div>


        {/* PASSWORD */}
        <div className="mb-8">

          <label
            className="
              block
              mb-2
              text-sm
              font-medium
            "
          >
            Password
          </label>

          <input

            type="password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="
              w-full
              border
              rounded-xl
              px-4 py-3
              outline-none
            "

            required
          />

        </div>


        {/* BUTTON */}
        <button

          type="submit"

          disabled={loading}

          className="
            w-full
            bg-emerald-500
            hover:bg-emerald-600
            text-white
            py-3
            rounded-xl
            transition
          "
        >

          {
            loading
              ? "Creating..."
              : "Create Account"
          }

        </button>


        {/* LOGIN LINK */}
        <p
          className="
            text-sm
            text-center
            mt-6
            text-gray-500
          "
        >

          Already have an account?

          <span
            onClick={() =>
              router.push("/login")
            }

            className="
              text-emerald-600
              ml-2
              cursor-pointer
            "
          >
            Login
          </span>

        </p>

      </form>

    </div>
  );
}