"use client";

import {
 useState,
} from "react";

import {
 useRouter,
} from "next/navigation";

import api
 from "@/services/api";

import {
 Eye,
 EyeOff,
} from "lucide-react";


export default function LoginPage() {

 const router =
  useRouter();


 const [email,
  setEmail] =
   useState("");


 const [password,
  setPassword] =
   useState("");


 const [showPassword,
  setShowPassword] =
   useState(false);


 const [loading,
  setLoading] =
   useState(false);


 const [error,
  setError] =
   useState("");


 /*
 ====================================
 LOGIN
 ====================================
 */

 const handleLogin =
  async (
   e: React.FormEvent
  ) => {

   e.preventDefault();


   try {

    setLoading(true);

    setError("");


    /*
    ====================================
    CLEAR OLD TOKEN
    ====================================
    */

    localStorage.removeItem(
     "token"
    );


    /*
    ====================================
    LOGIN REQUEST
    ====================================
    */

    const response =
     await api.post(

      "/auth/login",

      {

       email:
        email
         .trim()
         .toLowerCase(),

       password:
        password.trim(),

      }

     );


    /*
    ====================================
    SAVE NEW TOKEN
    ====================================
    */

    localStorage.setItem(

     "token",

     response.data.token

    );


    /*
    ====================================
    SUCCESS
    ====================================
    */

    alert(
     "Login Successful"
    );


    /*
    ====================================
    FULL APP RELOAD
    ====================================
    */

    window.location.href =
     "/dashboard";

   } catch (error: any) {

    console.log(error);


    setError(

     error?.response?.data
      ?.message ||

     "Login failed"

    );

   } finally {

    setLoading(false);

   }

  };


 return (

  <div
   className="
    min-h-screen
    flex
    items-center
    justify-center
    bg-[#F8FAFC]
    px-4
   "
  >

   <form

    onSubmit={handleLogin}

    className="
     bg-white
     p-10
     rounded-3xl
     shadow-sm
     border
     w-full
     max-w-md
    "
   >

    {/* HEADER */}

    <div className="mb-8">

     <h1
      className="
       text-4xl
       font-bold
       text-gray-900
      "
     >

      Welcome Back

     </h1>


     <p
      className="
       text-gray-500
       mt-3
      "
     >

      Login to continue your
      halal investing journey.

     </p>

    </div>


    {/* ERROR */}

    {
     error && (

      <div
       className="
        bg-red-50
        border
        border-red-200
        text-red-600
        px-4
        py-3
        rounded-2xl
        mb-6
        text-sm
       "
      >

       {error}

      </div>

     )
    }


    {/* EMAIL */}

    <div className="mb-5">

     <label
      className="
       block
       mb-2
       text-sm
       font-medium
       text-gray-700
      "
     >

      Email Address

     </label>


     <input

      type="email"

      value={email}

      onChange={(e) =>

       setEmail(
        e.target.value
       )

      }

      placeholder="example@email.com"

      className="
       w-full
       border
       rounded-2xl
       px-4
       py-3
       outline-none
       focus:ring-2
       focus:ring-emerald-500
       transition
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
       text-gray-700
      "
     >

      Password

     </label>


     <div className="relative">

      <input

       type={
        showPassword
         ? "text"
         : "password"
       }

       value={password}

       onChange={(e) =>

        setPassword(
         e.target.value
        )

       }

       placeholder="Enter password"

       className="
        w-full
        border
        rounded-2xl
        px-4
        py-3
        pr-12
        outline-none
        focus:ring-2
        focus:ring-emerald-500
        transition
       "

       required

      />


      <button

       type="button"

       onClick={() =>

        setShowPassword(
         !showPassword
        )

       }

       className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-gray-500
       "
      >

       {
        showPassword

         ? <EyeOff size={20} />

         : <Eye size={20} />
       }

      </button>

     </div>

    </div>


    {/* BUTTON */}

    <button

     type="submit"

     disabled={loading}

     className="
      w-full
      bg-emerald-500
      hover:bg-emerald-600
      disabled:bg-emerald-300
      text-white
      py-3
      rounded-2xl
      font-semibold
      transition
     "
    >

     {
      loading

       ? "Logging in..."

       : "Login"
     }

    </button>


    {/* SIGNUP */}

    <p
     className="
      text-sm
      text-center
      mt-6
      text-gray-500
     "
    >

     Don’t have an account?

     <span

      onClick={() =>
       router.push("/signup")
      }

      className="
       text-emerald-600
       ml-2
       cursor-pointer
       font-medium
      "
     >

      Signup

     </span>

    </p>

   </form>

  </div>

 );

}