"use client"

import Link
 from "next/link"

import {

 LayoutDashboard,
 LineChart,
 ShieldCheck,
 Wallet,
 Star,
 Bot,
 Settings,
 LogOut,

} from "lucide-react"

import {

 usePathname,
 useRouter,

} from "next/navigation"


export default function Sidebar() {

 const pathname =
  usePathname()

 const router =
  useRouter()


 /*
 ===================================
 LOGOUT
 ===================================
 */

 const handleLogout =
  () => {

   /*
   CLEAR TOKEN
   */

   localStorage.removeItem(
    "token"
   )


   /*
   FULL RELOAD
   */

   window.location.href =
    "/login"

  }


 const menu = [

  {
   name: "Dashboard",
   href: "/dashboard",
   icon: LayoutDashboard,
  },

  {
   name: "Stocks",
   href: "/stocks",
   icon: LineChart,
  },

  {
   name: "Orders",
   href: "/orders",
   icon: ShieldCheck,
  },

  {
   name: "Portfolio",
   href: "/portfolio",
   icon: Wallet,
  },

  {
   name: "Watchlist",
   href: "/watchlist",
   icon: Star,
  },

  {
   name: "AI Advisor",
   href: "/ai-advisor",
   icon: Bot,
  },

  {
   name: "Settings",
   href: "/settings",
   icon: Settings,
  },

 ]


 return (

  <aside
   className="
    w-[270px]
    h-screen
    bg-white
    border-r
    px-6
    py-8
    flex
    flex-col
    fixed
    left-0
    top-0
    z-50
   "
  >

   {/* LOGO */}

   <Link

    href="/dashboard"

    className="
     flex
     items-center
     justify-center
     mb-12
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


   {/* MENU */}

   <nav className="space-y-3 flex-1">

    {
     menu.map((item) => {

      const Icon =
       item.icon

      const active =
       pathname === item.href

      return (

       <Link

        key={item.name}

        href={item.href}

        className={`

         flex
         items-center
         gap-4

         px-5
         py-4

         rounded-2xl

         transition-all

         ${
          active

           ? "bg-blue-600 text-white shadow-lg shadow-blue-200"

           : "text-gray-600 hover:bg-gray-100"
         }

        `}
       >

        <Icon size={20} />

        <span className="font-medium">

         {item.name}

        </span>

       </Link>

      )

     })
    }

   </nav>


   {/* LOGOUT */}

   <button

    onClick={handleLogout}

    className="
     mt-6

     flex
     items-center
     justify-center
     gap-3

     bg-red-500
     hover:bg-red-600

     text-white

     py-4
     rounded-2xl

     font-medium

     transition-all
    "
   >

    <LogOut size={20} />

    Logout

   </button>

  </aside>

 )

}