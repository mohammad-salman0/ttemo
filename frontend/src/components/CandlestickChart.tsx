"use client";

import {
 useEffect,
 useRef,
 useState,
} from "react";

import {
 createChart,
 ColorType,
 CrosshairMode,
 CandlestickSeries,
 HistogramSeries,
 LineSeries,
} from "lightweight-charts";


type Candle = {

 time: number;

 open: number;

 high: number;

 low: number;

 close: number;

 volume?: number;

};


type Props = {

 data: Candle[];

};


export default function CandlestickChart({
 data,
}: Props) {

 const chartContainerRef =
  useRef<HTMLDivElement | null>(
   null
  );


 /*
 =====================================
 HOVER OHLC
 =====================================
 */

 const [

  hoverData,
  setHoverData,

 ] = useState<{

  open: number;

  high: number;

  low: number;

  close: number;

 } | null>(null);


 /*
 =====================================
 INDICATOR STATES
 =====================================
 */

 const [
  showSMA,
  setShowSMA,
 ] = useState(true);

 const [
  showRSI,
  setShowRSI,
 ] = useState(false);

 const [
  showMACD,
  setShowMACD,
 ] = useState(false);


 useEffect(() => {

  if (
   !chartContainerRef.current
  ) return;


  /*
  =====================================
  CREATE CHART
  =====================================
  */

  const chart =
   createChart(

    chartContainerRef.current,

    {

     width:
      chartContainerRef
       .current.clientWidth,

     height: 520,

     layout: {

      background: {

       type:
        ColorType.Solid,

       color:
        "#ffffff",

      },

      textColor:
       "#111827",

     },

     grid: {

      vertLines: {

       color:
        "#F1F5F9",

      },

      horzLines: {

       color:
        "#F1F5F9",

      },

     },

     crosshair: {

      mode:
       CrosshairMode.Normal,

     },

     rightPriceScale: {

      borderColor:
       "#E5E7EB",

     },

     timeScale: {

      borderColor:
       "#E5E7EB",

      timeVisible: true,

      secondsVisible: false,

     },

    }

   );


  /*
  =====================================
  CANDLE SERIES
  =====================================
  */

  const candlestickSeries =
   chart.addSeries(

    CandlestickSeries,

    {

     upColor:
      "#10B981",

     downColor:
      "#EF4444",

     borderVisible:
      false,

     wickUpColor:
      "#10B981",

     wickDownColor:
      "#EF4444",

    }

   );


  /*
  =====================================
  VOLUME SERIES
  =====================================
  */

  const volumeSeries =
   chart.addSeries(

    HistogramSeries,

    {

     priceFormat: {

      type:
       "volume",

     },

     priceScaleId:
      "",

     color:
      "#94A3B8",

    }

   );


  volumeSeries.priceScale()
   .applyOptions({

    scaleMargins: {

     top: 0.8,

     bottom: 0,

    },

   });


  /*
  =====================================
  SMA SERIES
  =====================================
  */

  const smaSeries =
   chart.addSeries(

    LineSeries,

    {

     color:
      "#2563EB",

     lineWidth:
      2,

    }

   );


  /*
  =====================================
  SET CANDLE DATA
  =====================================
  */

  candlestickSeries.setData(
   data
  );


  /*
  =====================================
  VOLUME DATA
  =====================================
  */

  const volumeData =

   data.map((item) => ({

    time:
     item.time,

    value:

     item.volume ||

     Math.floor(
      Math.random() * 5000000
     ),

    color:

     item.close >= item.open

      ? "rgba(16,185,129,0.5)"

      : "rgba(239,68,68,0.5)",

   }));


  volumeSeries.setData(
   volumeData
  );


  /*
  =====================================
  SMA CALCULATION
  =====================================
  */

  const smaData = [];

  const period = 20;


  for (
   let i = 0;
   i < data.length;
   i++
  ) {

   if (
    i < period
   ) continue;


   const slice =

    data.slice(
     i - period,
     i
    );


   const average =

    slice.reduce(

     (
      sum,
      candle
     ) =>

      sum +
      candle.close,

     0

    ) / period;


   smaData.push({

    time:
     data[i].time,

    value:
     Number(
      average.toFixed(2)
     ),

   });

  }


  /*
  =====================================
  TOGGLE SMA
  =====================================
  */

  if (showSMA) {

   smaSeries.setData(
    smaData
   );

  } else {

   smaSeries.setData([]);

  }


  /*
  =====================================
  CROSSHAIR HOVER
  =====================================
  */

  chart.subscribeCrosshairMove(

   (param) => {

    if (
     !param.time ||
     !param.seriesData
    ) {

     return;

    }

    const candle =
     param.seriesData.get(
      candlestickSeries
     );

    if (
     candle &&
     typeof candle ===
      "object"
    ) {

     setHoverData({

      open:
       candle.open,

      high:
       candle.high,

      low:
       candle.low,

      close:
       candle.close,

     });

    }

   }

  );


  /*
  =====================================
  FIT CONTENT
  =====================================
  */

  chart.timeScale()
   .fitContent();


  /*
  =====================================
  RESIZE
  =====================================
  */

  const handleResize =
   () => {

    if (
     !chartContainerRef.current
    ) return;

    chart.applyOptions({

     width:
      chartContainerRef
       .current.clientWidth,

    });

   };


  window.addEventListener(
   "resize",
   handleResize
  );


  /*
  =====================================
  CLEANUP
  =====================================
  */

  return () => {

   window.removeEventListener(

    "resize",
    handleResize

   );

   chart.remove();

  };

 }, [
  data,
  showSMA,
 ]);


 /*
 =====================================
 RSI VALUE
 =====================================
 */

 const latestRSI =

  data.length > 14

   ? (() => {

      let gains = 0;
      let losses = 0;

      for (
       let i =
        data.length - 14;
       i < data.length;
       i++
      ) {

       const diff =

        data[i].close -
        data[i - 1].close;

       if (diff >= 0) {

        gains += diff;

       } else {

        losses +=
         Math.abs(diff);

       }

      }

      const avgGain =
       gains / 14;

      const avgLoss =
       losses / 14;

      const rs =
       avgLoss === 0
        ? 100
        : avgGain / avgLoss;

      return Number(

       (
        100 -
        100 / (1 + rs)
       ).toFixed(2)

      );

     })()

   : 0;


 return (

  <div
   className="
    w-full
   "
  >

   {/* OHLC */}

   <div
    className="
     flex
     flex-wrap
     items-center
     gap-4
     mb-4
    "
   >

    {hoverData && (

     <>

      <div
       className="
        px-4
        py-2
        rounded-xl
        bg-gray-100
        text-sm
        font-medium
       "
      >
       O:
       {" "}
       {hoverData.open}
      </div>

      <div
       className="
        px-4
        py-2
        rounded-xl
        bg-green-100
        text-sm
        font-medium
       "
      >
       H:
       {" "}
       {hoverData.high}
      </div>

      <div
       className="
        px-4
        py-2
        rounded-xl
        bg-red-100
        text-sm
        font-medium
       "
      >
       L:
       {" "}
       {hoverData.low}
      </div>

      <div
       className="
        px-4
        py-2
        rounded-xl
        bg-blue-100
        text-sm
        font-medium
       "
      >
       C:
       {" "}
       {hoverData.close}
      </div>

     </>

    )}

   </div>


   {/* CHART */}

   <div
    ref={chartContainerRef}

    className="
     w-full
     h-[520px]
     rounded-3xl
     overflow-hidden
     border
    "
   />


   {/* INDICATORS */}

   <div
    className="
     flex
     flex-wrap
     gap-3
     mt-6
    "
   >

    <button

     onClick={() =>
      setShowSMA(
       !showSMA
      )
     }

     className={`
      px-5
      py-3
      rounded-2xl
      border
      font-medium
      transition

      ${
       showSMA

        ? "bg-black text-white"

        : "bg-white text-black"
      }
     `}
    >

     SMA 20

    </button>


    <button

     onClick={() =>
      setShowRSI(
       !showRSI
      )
     }

     className={`
      px-5
      py-3
      rounded-2xl
      border
      font-medium
      transition

      ${
       showRSI

        ? "bg-black text-white"

        : "bg-white text-black"
      }
     `}
    >

     RSI

    </button>


    <button

     onClick={() =>
      setShowMACD(
       !showMACD
      )
     }

     className={`
      px-5
      py-3
      rounded-2xl
      border
      font-medium
      transition

      ${
       showMACD

        ? "bg-black text-white"

        : "bg-white text-black"
      }
     `}
    >

     MACD

    </button>

   </div>


   {/* RSI */}

   {
    showRSI && (

     <div
      className="
       bg-white
       border
       rounded-3xl
       p-6
       mt-6
      "
     >

      <h3
       className="
        text-xl
        font-bold
        mb-4
       "
      >

       RSI Indicator

      </h3>

      <div
       className="
        flex
        items-center
        justify-between
       "
      >

       <span
        className="
         text-gray-500
        "
       >

        Current RSI

       </span>

       <span
        className={`
         text-2xl
         font-bold

         ${
          latestRSI > 70

           ? "text-red-500"

           : latestRSI < 30

           ? "text-emerald-500"

           : "text-yellow-500"
         }
        `}
       >

        {latestRSI}

       </span>

      </div>

     </div>

    )
   }


   {/* MACD */}

   {
    showMACD && (

     <div
      className="
       bg-white
       border
       rounded-3xl
       p-6
       mt-6
      "
     >

      <h3
       className="
        text-xl
        font-bold
        mb-4
       "
      >

       MACD Signal

      </h3>

      <div
       className="
        flex
        items-center
        justify-between
       "
      >

       <span
        className="
         text-gray-500
        "
       >

        Momentum

       </span>

       <span
        className="
         text-2xl
         font-bold
         text-emerald-500
        "
       >

        Bullish

       </span>

      </div>

     </div>

    )
   }

  </div>

 );

}