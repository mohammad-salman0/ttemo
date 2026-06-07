const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const stockRoutes = require("./routes/stockRoutes");
const portfolioRoutes =
 require("./routes/portfolioRoutes");
const app = express();
const watchlistRoutes =
  require("./routes/watchlistRoutes");
  const orderRoutes =
 require("./routes/orderRoutes");
 const walletRoutes =
 require(
  "./routes/walletRoutes"
 );
 const aiAdvisorRoutes =
 require("./routes/aiAdvisorRoutes")
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Twin Trade API Running");
});


// AUTH ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/stocks", stockRoutes);
app.use(
 "/api/portfolio",
 portfolioRoutes
);
app.use(
  "/api/watchlist",
  watchlistRoutes
);
app.use(
 "/api/orders",
 orderRoutes
);
app.use(

 "/api/wallet",

 walletRoutes

);
app.use(
 "/api/ai-advisor",
 aiAdvisorRoutes
)
module.exports = app;