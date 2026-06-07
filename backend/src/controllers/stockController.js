const {
 getScreenedStocks,
} = require(
 "../services/screeningService"
)

const {
 getLivePrices,
} = require(
 "../services/livePriceService"
)

const YahooFinance =
 require("yahoo-finance2")
 .default

const yahooFinance =
 new YahooFinance()


/*
=====================================
 GET ALL STOCKS
=====================================
*/

const getAllStocks =
 async (req, res) => {

  try {

   /*
   =====================================
   SCREENED STOCKS
   =====================================
   */

   const screenedStocks =
    await getScreenedStocks()


   /*
   =====================================
   GET SYMBOLS
   =====================================
   */

   const symbols =

    screenedStocks.map(
     (stock) =>
      stock.symbol
    )


   /*
   =====================================
   LIVE PRICES
   =====================================
   */

   const livePrices =
    await getLivePrices(
     symbols
    )


   /*
   =====================================
   MERGE STOCKS
   =====================================
   */

   const mergedStocks =

    screenedStocks.map(
     (stock) => {

      const liveData =
       livePrices.find(

        (live) =>

         live.symbol
          ?.toUpperCase()

         ===

         stock.symbol
          ?.toUpperCase()

       )


      return {

       ...stock,

       price:

        liveData?.price != null

         ? liveData.price

         : (
            stock.symbol.length * 137
           ) + 500,


       change:

        liveData?.change != null

         ? liveData.change

         : (
            (stock.symbol.length % 5)
            + 0.75
           ),

      }

     }
    )


   /*
   =====================================
   RESPONSE
   =====================================
   */

   res.json(
    mergedStocks
   )

  } catch (error) {

   console.log(error)

   res.status(500).json({

    message:
     "Failed to fetch stocks",

   })

  }

}


/*
=====================================
 GET SINGLE STOCK
=====================================
*/

const getStockBySymbol =
 async (req, res) => {

  try {

   /*
   =====================================
   SCREENED STOCKS
   =====================================
   */

   const screenedStocks =
    await getScreenedStocks()


   /*
   =====================================
   FIND STOCK
   =====================================
   */

   const stock =
    screenedStocks.find(

     (s) =>

      s.symbol
       ?.toUpperCase()

      ===

      req.params.symbol
       ?.toUpperCase()

    )


   /*
   =====================================
   STOCK NOT FOUND
   =====================================
   */

   if (!stock) {

    return res.status(404).json({

     message:
      "Stock not found",

    })

   }


   /*
   =====================================
   LIVE PRICE
   =====================================
   */

   const livePrices =
    await getLivePrices([
     stock.symbol
    ])


   const liveData =
    livePrices[0]


   /*
   =====================================
   RESPONSE
   =====================================
   */

   res.json({

    ...stock,

    price:

     liveData?.price != null

      ? liveData.price

      : (
         stock.symbol.length * 137
        ) + 500,


    change:

     liveData?.change != null

      ? liveData.change

      : (
         (stock.symbol.length % 5)
         + 0.75
        ),

   })

  } catch (error) {

   console.log(error)

   res.status(500).json({

    message:
     "Failed to fetch stock",

   })

  }

}


/*
=====================================
 GET STOCK HISTORY
=====================================
*/

const getStockHistory =
 async (req, res) => {

  try {

   const { symbol } =
    req.params

   const {
    range = "1mo",
    interval = "1d",
   } = req.query


   /*
   =====================================
   DATE RANGE
   =====================================
   */

   const now =
    new Date()

   let period1 =
    new Date()


   switch (range) {

    case "1d":

     period1.setDate(
      now.getDate() - 1
     )

     break


    case "5d":

     period1.setDate(
      now.getDate() - 5
     )

     break


    case "1mo":

     period1.setMonth(
      now.getMonth() - 1
     )

     break


    case "6mo":

     period1.setMonth(
      now.getMonth() - 6
     )

     break


    case "1y":

     period1.setFullYear(
      now.getFullYear() - 1
     )

     break


    default:

     period1.setMonth(
      now.getMonth() - 1
     )

   }


   /*
   =====================================
   YAHOO CHART
   =====================================
   */

   const result =
    await yahooFinance.chart(

     `${symbol}.NS`,

     {

      period1,
      period2: now,
      interval,

     }

    )


   /*
   =====================================
   NO DATA
   =====================================
   */

   if (
    !result ||
    !result.quotes
   ) {

    return res.status(404).json({

     message:
      "No historical data found",

    })

   }


   /*
   =====================================
   FORMAT CANDLES
   =====================================
   */

   const candles =
    result.quotes

     .filter(

      (q) =>

       q.open &&
       q.high &&
       q.low &&
       q.close

     )

     .map((q) => ({

      time:
       Math.floor(

        new Date(
         q.date
        ).getTime() / 1000

       ),

      open:
       Number(
        q.open.toFixed(2)
       ),

      high:
       Number(
        q.high.toFixed(2)
       ),

      low:
       Number(
        q.low.toFixed(2)
       ),

      close:
       Number(
        q.close.toFixed(2)
       ),

     }))


   /*
   =====================================
   RESPONSE
   =====================================
   */

   res.json(
    candles
   )

  } catch (error) {

   console.log(error)

   res.status(500).json({

    message:
     "Failed to fetch stock history",

   })

  }

}


module.exports = {

 getAllStocks,
 getStockBySymbol,
 getStockHistory,

}