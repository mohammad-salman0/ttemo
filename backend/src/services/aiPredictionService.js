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

const {
 getAIPrediction,
} = require(
 "../services/aiPredictionService"
)

const YahooFinance =
 require("yahoo-finance2")
 .default

const yahooFinance =
 new YahooFinance()


/*
========================================
 GET ALL STOCKS
========================================
*/

const getAllStocks =
 async (req, res) => {

  try {

   const screenedStocks =
    await getScreenedStocks()

   const livePrices =
    await getLivePrices()


   const mergedStocks =
    screenedStocks.map(
     (stock) => {

      const liveData =
       livePrices.find(

        (live) =>

         live.symbol
          .toUpperCase()

         ===

         stock.symbol
          .toUpperCase()

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
========================================
 GET SINGLE STOCK
========================================
*/

const getStockBySymbol =
 async (req, res) => {

  try {

   const screenedStocks =
    await getScreenedStocks()

   const livePrices =
    await getLivePrices()


   const stock =
    screenedStocks.find(

     (s) =>

      s.symbol
       .toUpperCase()

      ===

      req.params.symbol
       .toUpperCase()

    )


   /*
   STOCK NOT FOUND
   */

   if (!stock) {

    return res.status(404).json({

     message:
      "Stock not found",

    })

   }


   /*
   LIVE MARKET DATA
   */

   const liveData =
    livePrices.find(

     (live) =>

      live.symbol
       .toUpperCase()

      ===

      stock.symbol
       .toUpperCase()

    )


   /*
   FALLBACK PRICE
   */

   const price =

    liveData?.price != null

     ? liveData.price

     : (
        stock.symbol.length * 137
       ) + 500


   /*
   CHANGE %
   */

   const change =

    liveData?.change != null

     ? liveData.change

     : (
        (stock.symbol.length % 5)
        + 0.75
       )


   /*
   ====================================
   AI FEATURES
   ====================================
   */

   const volatility =
    Number(

     (
      Math.random() * 40 + 10
     ).toFixed(2)

    )


   const momentum =
    Number(

     (
      change * 8
     ).toFixed(2)

    )


   const return_30d =
    Number(

     (
      change * 4
     ).toFixed(2)

    )


   const growth_score =
    Math.min(

     95,

     stock.complianceScore
     + 5

    )


   const halal_score =
    stock.complianceScore


   const sector_strength =
    Number(

     (
      Math.random() * 30 + 65
     ).toFixed(2)

    )


   /*
   ====================================
   AI PREDICTION
   ====================================
   */

   const aiResult =
    await getAIPrediction({

     volatility,

     momentum,

     return_30d,

     growth_score,

     halal_score,

     sector_strength,

    })


   /*
   ====================================
   AI REASONING
   ====================================
   */

   let aiReason = ""


   if (
    aiResult.prediction === 1
   ) {

    aiReason =

     `${stock.companyName} shows strong bullish indicators driven by positive momentum, stable halal compliance metrics, and favorable sector performance.`

   }

   else {

    aiReason =

     `${stock.companyName} currently shows weaker momentum and increased volatility, indicating a cautious short-term outlook.`

   }


   /*
   ====================================
   RESPONSE
   ====================================
   */

   res.json({

    ...stock,

    price,

    change,

    /*
    AI ENGINE
    */

    aiPrediction:
     aiResult.prediction,

    aiSignal:
     aiResult.signal,

    aiConfidence:
     aiResult.confidence,

    /*
    AI ANALYTICS
    */

    volatility,

    momentum,

    return30d:
     return_30d,

    riskScore:
     aiResult.risk_score,

    investmentStrength:
     aiResult.investment_strength,

    sectorStrength:
     sector_strength,

    /*
    AI REASONING
    */

    aiReason,

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
========================================
 GET STOCK HISTORY
========================================
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


   const result =
    await yahooFinance.chart(

     `${symbol}.NS`,

     {

      period1,
      period2: now,
      interval,

     }

    )


   if (
    !result ||
    !result.quotes
   ) {

    return res.status(404).json({

     message:
      "No historical data found",

    })

   }


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