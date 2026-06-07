"use client"

import Link from "next/link"

import { usePathname }
 from "next/navigation"


export default function Navbar() {

 const pathname =
  usePathname()

 const navLinks = [

  {
   name: "Home",
   href: "/",
  },

  {
   name: "About",
   href: "/about",
  },

  {
   name: "Support",
   href: "/support",
  },

 ]


 return (

  <nav
   className="
    sticky top-0 z-50
    backdrop-blur-xl
    bg-white/80
    border-b
   "
  >

   <div
    className="
     max-w-7xl mx-auto
     px-6 lg:px-10
     py-4
     flex items-center
     justify-between
    "
   >

    {/* LOGO */}
    <Link
     href="/"
     className="
      flex items-center
     "
    >

     <img
      src="/media/twintrade.jpg"
      alt="TwinTrade"
      className="
       h-14
       w-auto
       object-contain
      "
     />

    </Link>


    {/* NAV LINKS */}
    <div
     className="
      hidden md:flex
      items-center gap-8
     "
    >

     {
      navLinks.map((link) => (

       <Link

        key={link.href}

        href={link.href}

        className={`
         text-sm font-medium
         transition

         ${
          pathname === link.href

           ? "text-blue-600"

           : "text-gray-600 hover:text-black"
         }
        `}
       >

        {link.name}

       </Link>

      ))
     }

    </div>


    {/* AUTH BUTTONS */}
    <div className="flex gap-3">

     <Link href="/login">

      <button
       className="
        px-5 py-2.5
        rounded-xl
        border border-gray-300
        hover:bg-gray-100
        transition
        text-sm font-medium
       "
      >

       Login

      </button>

     </Link>


     <Link href="/signup">

      <button
       className="
        px-5 py-2.5
        rounded-xl
        bg-blue-600
        hover:bg-blue-700
        text-white
        transition
        text-sm font-medium
        shadow-sm
       "
      >

       Get Started

      </button>

     </Link>

    </div>

   </div>

  </nav>

 )
}