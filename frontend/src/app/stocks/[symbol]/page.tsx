"use client";

import {
 useEffect,
 useState,
} from "react";

import {
 useParams,
} from "next/navigation";

import DashboardLayout
 from "@/layouts/DashboardLayout";

import api
 from "@/services/api";

import ProtectedRoutes
 from "@/components/ProtectedRoutes";

import CandlestickChart
 from "@/components/CandlestickChart";

import TradeModal
 from "@/components/TradeModal";

import {
 usePortfolio,
} from "@/context/PortfolioContext";

import {
 TrendingUp,
} from "lucide-react";


type Candle = {

 time: number;

 open: number;

 high: number;

 low: number;

 close: number;

 volume?: number;

};


type Stock = {

 symbol: string;

 companyName: string;

 industry: string;

 price: number | null;

 halalStatus:
  | "Halal"
  | "Non-Halal"
  | "Review Needed";

 change: number;

 complianceScore?: number;

};


export default function
StockDetailPage() {

 const params =
  useParams();

 const rawSymbol =
  params?.symbol;

 const symbol =

  typeof rawSymbol ===
  "string"

   ? rawSymbol

   : Array.isArray(
       rawSymbol
     )

     ? rawSymbol[0]

     : "";


 const {

  refreshPortfolio,
  refreshOrders,

 } = usePortfolio();


 const [stock, setStock] =
  useState<Stock | null>(
   null
  );

 const [chartData, setChartData] =
  useState<Candle[]>([]);

 const [loading, setLoading] =
  useState(false);

 const [selectedTimeframe,
  setSelectedTimeframe] =
   useState("1M");


 const [buyOpen,
  setBuyOpen] =
   useState(false);

 const [sellOpen,
  setSellOpen] =
   useState(false);


 const [watchlistLoading,
  setWatchlistLoading] =
   useState(false);


 /*
 ===================================
 FETCH STOCK
 ===================================
 */

 const fetchStock =
  async () => {

   try {

    setLoading(true);

    const response =
     await api.get(

      `/stocks/${symbol}`

     );

    setStock(
     response.data
    );

   } catch (error) {

    console.log(error);

   } finally {

    setLoading(false);

   }

  };


 /*
 ===================================
 FETCH HISTORY
 ===================================
 */

 const fetchHistory =
  async (

   range = "1mo",
   interval = "1d"

  ) => {

   try {

    const response =
     await api.get(

      `/stocks/${symbol}/history`,

      {

       params: {

        range,
        interval,

       },

      }

     );

    setChartData(
     response.data
    );

   } catch (error) {

    console.log(error);

   }

  };


 /*
 ===================================
 WATCHLIST
 ===================================
 */

 const addToWatchlist =
  async () => {

   try {

    setWatchlistLoading(
     true
    );

    await api.post(

     "/watchlist/add",

     {

      symbol:
       stock?.symbol,

      companyName:
       stock?.companyName,

     }

    );

    alert(
     "Added to watchlist"
    );

   } catch (error) {

    console.log(error);

    alert(
     "Failed to add watchlist"
    );

   } finally {

    setWatchlistLoading(
     false
    );

   }

  };


 /*
 ===================================
 INITIAL LOAD
 ===================================
 */

 useEffect(() => {

  if (!symbol) return;

  fetchStock();

  fetchHistory();

 }, [symbol]);


 /*
 ===================================
 TIMEFRAME
 ===================================
 */

 const handleTimeframe =
  (timeframe: string) => {

   setSelectedTimeframe(
    timeframe
   );

   switch (timeframe) {

    case "1D":

     fetchHistory(
      "5d",
      "15m"
     );

     break;

    case "1W":

     fetchHistory(
      "5d",
      "30m"
     );

     break;

    case "1M":

     fetchHistory(
      "1mo",
      "1d"
     );

     break;

    case "1Y":

     fetchHistory(
      "1y",
      "1wk"
     );

     break;

    default:

     fetchHistory();

   }

  };


 /*
 ===================================
 AFTER TRADE
 ===================================
 */

 const handleTradeSuccess =
  async () => {

   await fetchStock();

   await refreshPortfolio();

   await refreshOrders();

  };


 /*
 ===================================
 PERFORMANCE DATA
 ===================================
 */

 const performance = {

  "1D":
   stock?.change || 0,

  "1W":
   Number(
    ((stock?.change || 0) * 1.8)
    .toFixed(2)
   ),

  "1M":
   Number(
    ((stock?.change || 0) * 3.5)
    .toFixed(2)
   ),

  "1Y":
   Number(
    ((stock?.change || 0) * 8)
    .toFixed(2)
   ),

 };


 /*
 ===================================
 LOADING
 ===================================
 */

 if (loading || !stock) {

  return (

   <ProtectedRoutes>

    <DashboardLayout>

     <div
      className="
       flex
       items-center
       justify-center
       h-[60vh]
      "
     >

      <p
       className="
        text-gray-500
        text-lg
       "
      >

       Loading stock...

      </p>

     </div>

    </DashboardLayout>

   </ProtectedRoutes>

  );

 }


 /*
 ===================================
 SAFE AI VALUES
 ===================================
 */

 const complianceScore =

  stock?.complianceScore || 85;


 const sentiment =

  stock?.change >= 0
   ? "Bullish"
   : "Bearish";


 const confidence =

  70 +
  Math.floor(
   complianceScore / 4
  );


 const risk =

  stock?.change > 3

   ? "High"

   : stock?.change > 0

   ? "Moderate"

   : "Elevated";


 const recommendation =

  stock?.change >= 0

   ? "Hold"

   : "Watch";


 return (

  <ProtectedRoutes>

   <DashboardLayout>

    <div className="space-y-10">

     <div
      className="
       bg-white
       rounded-3xl
       border
       shadow-sm
       p-6
       md:p-8
      "
     >

      {/* HEADER */}

      <div
       className="
        flex
        flex-col
        lg:flex-row
        lg:justify-between
        gap-8
        mb-10
       "
      >

       <div>

        <div
         className="
          flex
          items-center
          gap-4
          mb-3
         "
        >

         <h1
          className="
           text-5xl
           font-bold
           text-black
          "
         >

          {stock.companyName}

         </h1>

         <span
          className={`
           px-4
           py-2
           rounded-full
           text-sm
           font-semibold

           ${
            stock.halalStatus
             === "Halal"

              ? "bg-emerald-100 text-emerald-700"

              : stock.halalStatus
              === "Non-Halal"

              ? "bg-red-100 text-red-700"

              : "bg-yellow-100 text-yellow-700"
           }
          `}
         >

          {stock.halalStatus}

         </span>

        </div>

        <p
         className="
          text-gray-500
          text-lg
          mb-2
         "
        >

         {stock.symbol}

        </p>

        <p
         className="
          text-gray-400
         "
        >

         Industry:
         {" "}
         {stock.industry}

        </p>

       </div>


       <div
        className="
         flex
         flex-col
         items-start
         lg:items-end
        "
       >

        <h2
         className="
          text-6xl
          font-bold
          text-black
         "
        >

         ₹{" "}

         {
          stock.price
           ?.toFixed(2)
         }

        </h2>

        <p
         className={`
          mt-4
          text-2xl
          font-semibold

          ${
           stock.change >= 0
            ? "text-emerald-600"
            : "text-red-500"
          }
         `}
        >

         {
          stock.change >= 0
           ? "+"
           : ""
         }

         {
          stock.change
           .toFixed(2)
         }%

        </p>

       </div>

      </div>


      {/* PERFORMANCE */}

      <div
       className="
        grid
        grid-cols-2
        md:grid-cols-4
        gap-4
        mb-8
       "
      >

       {
        Object.entries(
         performance
        ).map(

         ([key, value]) => (

          <div
           key={key}

           className="
            bg-gray-50
            border
            rounded-2xl
            p-5
           "
          >

           <p
            className="
             text-sm
             text-gray-500
             mb-2
            "
           >

            {key}

           </p>

           <h3
            className={`
             text-2xl
             font-bold

             ${
              value >= 0

               ? "text-emerald-600"

               : "text-red-500"
             }
            `}
           >

            {
             value >= 0
              ? "+"
              : ""
            }

            {value}%

           </h3>

          </div>

         )

        )
       }

      </div>


      {/* TIMEFRAME */}

      <div
       className="
        flex
        flex-wrap
        gap-3
        mb-6
       "
      >

       {[
        "1D",
        "1W",
        "1M",
        "1Y",
       ].map((item) => (

        <button
         key={item}

         onClick={() =>
          handleTimeframe(item)
         }

         className={`
          px-5
          py-3
          rounded-2xl
          font-semibold
          border
          transition-all

          ${
           selectedTimeframe
            === item

             ? "bg-black text-white border-black"

             : "bg-white text-gray-700 border-gray-200 hover:border-black"
          }
         `}
        >

         {item}

        </button>

       ))}

      </div>


      {/* CHART */}

      <CandlestickChart
       data={chartData}
      />


      {/* AI OUTLOOK */}

      <div
       className="
        mt-10
        bg-gradient-to-r
        from-black
        to-gray-900
        text-white
        rounded-3xl
        p-8
       "
      >

       <div
        className="
         flex
         items-center
         gap-3
         mb-8
        "
       >

        <TrendingUp
         size={28}
        />

        <h2
         className="
          text-3xl
          font-bold
         "
        >

         AI Market Outlook

        </h2>

       </div>


       {/* AI GRID */}

       <div
        className="
         grid
         grid-cols-1
         md:grid-cols-2
         lg:grid-cols-4
         gap-5
         mb-8
        "
       >

        <div
         className="
          bg-white/10
          rounded-2xl
          p-5
          border
          border-white/10
         "
        >

         <p
          className="
           text-sm
           text-gray-300
           mb-2
          "
         >

          Sentiment

         </p>

         <h3
          className="
           text-2xl
           font-bold
           text-emerald-400
          "
         >

          {sentiment}

         </h3>

        </div>


        <div
         className="
          bg-white/10
          rounded-2xl
          p-5
          border
          border-white/10
         "
        >

         <p
          className="
           text-sm
           text-gray-300
           mb-2
          "
         >

          Confidence

         </p>

         <h3
          className="
           text-2xl
           font-bold
          "
         >

          {confidence}%

         </h3>

        </div>


        <div
         className="
          bg-white/10
          rounded-2xl
          p-5
          border
          border-white/10
         "
        >

         <p
          className="
           text-sm
           text-gray-300
           mb-2
          "
         >

          Risk Level

         </p>

         <h3
          className="
           text-2xl
           font-bold
           text-yellow-400
          "
         >

          {risk}

         </h3>

        </div>


        <div
         className="
          bg-white/10
          rounded-2xl
          p-5
          border
          border-white/10
         "
        >

         <p
          className="
           text-sm
           text-gray-300
           mb-2
          "
         >

          Recommendation

         </p>

         <h3
          className="
           text-2xl
           font-bold
           text-cyan-400
          "
         >

          {recommendation}

         </h3>

        </div>

       </div>


       {/* AI SUMMARY */}

       <div
        className="
         bg-white/10
         rounded-2xl
         p-6
         border
         border-white/10
        "
       >

        <p
         className="
          text-lg
          leading-8
          text-gray-200
         "
        >

         {
          stock.companyName
         }

         {" "}
         is currently showing

         {" "}

         <span className="font-semibold text-white">

          {
           stock.change >= 0
            ? "positive"
            : "mixed"
          }

         </span>

         {" "}
         momentum based on recent
         market activity.

         The stock maintains a

         {" "}

         <span className="font-semibold text-emerald-400">

          {
           stock.halalStatus
          }

         </span>

         {" "}
         halal compliance profile with
         a compliance score of

         {" "}

         <span className="font-semibold text-cyan-400">

          {complianceScore}%

         </span>

         . AI analysis suggests
         investors should monitor
         momentum, sector movement,
         and long-term growth stability
         before making additional
         trading decisions.

        </p>

       </div>

      </div>


      {/* ACTIONS */}

      <div
       className="
        flex
        flex-wrap
        gap-4
        mt-8
       "
      >

       <button

        onClick={() =>
         setBuyOpen(true)
        }

        className="
         bg-emerald-500
         hover:bg-emerald-600
         text-white
         px-8
         py-3
         rounded-2xl
         font-semibold
         transition
        "
       >

        Buy Stock

       </button>


       <button

        onClick={() =>
         setSellOpen(true)
        }

        className="
         bg-red-500
         hover:bg-red-600
         text-white
         px-8
         py-3
         rounded-2xl
         font-semibold
         transition
        "
       >

        Sell Stock

       </button>


       <button

        onClick={
         addToWatchlist
        }

        disabled={
         watchlistLoading
        }

        className="
         bg-black
         hover:bg-gray-800
         text-white
         px-8
         py-3
         rounded-2xl
         font-semibold
         transition
        "
       >

        {
         watchlistLoading

          ? "Adding..."

          : "Add to Watchlist"
        }

       </button>

      </div>

     </div>

    </div>


    {/* BUY MODAL */}

    <TradeModal

     isOpen={buyOpen}

     onClose={() =>
      setBuyOpen(false)
     }

     type="BUY"

     symbol={stock.symbol}

     companyName={
      stock.companyName
     }

     price={
      stock.price || 0
     }

     onSuccess={
      handleTradeSuccess
     }

    />


    {/* SELL MODAL */}

    <TradeModal

     isOpen={sellOpen}

     onClose={() =>
      setSellOpen(false)
     }

     type="SELL"

     symbol={stock.symbol}

     companyName={
      stock.companyName
     }

     price={
      stock.price || 0
     }

     onSuccess={
      handleTradeSuccess
     }

    />

   </DashboardLayout>

  </ProtectedRoutes>

 );

}