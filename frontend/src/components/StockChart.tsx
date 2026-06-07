"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

type ChartData = {
  time: string;
  price: number;
};

type Props = {
  symbol?: string;
  companyName?: string;
  currentPrice?: number;
  change?: number;
  halalStatus?: "Halal" | "Non-Halal" | "Review Needed";
  data?: ChartData[];
};

const timeframeOptions = [
  "1D",
  "1W",
  "1M",
  "1Y",
];

export default function StockChart({
  symbol = "N/A",
  companyName = "Unknown Company",
  currentPrice = 0,
  change = 0,
  halalStatus = "Review Needed",
  data = [],
}: Props) {

  const [selectedTimeframe, setSelectedTimeframe] =
    useState("1W");

  const [liveData, setLiveData] =
    useState<ChartData[]>(data);

  /*
    Sync incoming data
  */
  useEffect(() => {
    setLiveData(data);
  }, [data]);

  /*
    MOCK REALTIME UPDATES
    Replace later with Socket.IO
  */
  useEffect(() => {

    if (!liveData.length) return;

    const interval = setInterval(() => {

      setLiveData((prev) => {

        if (!prev.length) return prev;

        const updated = [...prev];

        const lastPoint =
          updated[updated.length - 1];

        const randomMovement =
          (Math.random() - 0.5) * 5;

        const nextPrice =
          Number(
            (
              lastPoint.price +
              randomMovement
            ).toFixed(2)
          );

        updated[updated.length - 1] = {
          ...lastPoint,
          price: nextPrice,
        };

        return updated;

      });

    }, 3000);

    return () =>
      clearInterval(interval);

  }, [liveData.length]);

  const safePrice =
    currentPrice ?? 0;

  const safeChange =
    change ?? 0;

  const isPositive = useMemo(
    () => safeChange >= 0,
    [safeChange]
  );

  const halalStyles = useMemo(() => {

    switch (halalStatus) {

      case "Halal":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
        };

      case "Non-Halal":
        return {
          bg: "bg-red-50",
          text: "text-red-600",
        };

      default:
        return {
          bg: "bg-yellow-50",
          text: "text-yellow-700",
        };

    }

  }, [halalStatus]);

  return (
    <div
      className="
        bg-white
        rounded-[28px]
        border
        border-gray-100
        shadow-[0px_4px_30px_rgba(0,0,0,0.04)]
        p-6
      "
    >

      {/* TOP SECTION */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-start
          lg:justify-between
          gap-6
          mb-5
        "
      >

        {/* LEFT */}

        <div>

          <div
            className="
              flex
              items-center
              gap-3
              flex-wrap
              mb-2
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                text-black
                tracking-tight
              "
            >
              {companyName}
            </h2>

            <span
              className={`
                px-4
                py-1.5
                rounded-full
                text-sm
                font-semibold
                ${halalStyles.bg}
                ${halalStyles.text}
              `}
            >
              {halalStatus}
            </span>

          </div>

          <p
            className="
              text-gray-500
              font-medium
            "
          >
            {symbol}
          </p>

        </div>

        {/* RIGHT */}

        <div
          className="
            flex
            flex-col
            items-start
            lg:items-end
          "
        >

          <div
            className="
              text-5xl
              font-bold
              tracking-tight
              text-black
            "
          >
            ₹ {safePrice.toFixed(2)}
          </div>

          <div
            className={`
              flex
              items-center
              gap-2
              mt-3
              font-semibold
              ${
                isPositive
                  ? "text-emerald-600"
                  : "text-red-500"
              }
            `}
          >

            <div
              className={`
                w-2.5
                h-2.5
                rounded-full
                animate-pulse
                ${
                  isPositive
                    ? "bg-emerald-500"
                    : "bg-red-500"
                }
              `}
            />

            {isPositive ? (
              <TrendingUp size={18} />
            ) : (
              <TrendingDown size={18} />
            )}

            <span>
              {isPositive ? "+" : ""}
              {safeChange.toFixed(2)}%
            </span>

          </div>

          {/* ACTION BUTTONS */}

          <div
            className="
              flex
              gap-3
              mt-5
            "
          >

            <button
              className="
                bg-emerald-500
                hover:bg-emerald-600
                text-white
                px-5
                py-2.5
                rounded-xl
                font-semibold
                transition-all
              "
            >
              Buy
            </button>

            <button
              className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-5
                py-2.5
                rounded-xl
                font-semibold
                transition-all
              "
            >
              Sell
            </button>

          </div>

        </div>

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

        {timeframeOptions.map((item) => (

          <button
            key={item}
            onClick={() =>
              setSelectedTimeframe(item)
            }
            className={`
              px-5
              py-2.5
              rounded-xl
              text-sm
              font-semibold
              transition-all
              border

              ${
                selectedTimeframe === item
                  ? `
                    bg-black
                    text-white
                    border-black
                  `
                  : `
                    bg-white
                    text-gray-700
                    border-gray-200
                    hover:border-black
                  `
              }
            `}
          >
            {item}
          </button>

        ))}

      </div>

      {/* CHART */}

      <div
        className="
          h-[300px]
          md:h-[360px]
          w-full
        "
      >

        {liveData.length > 0 ? (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={liveData}
              margin={{
                top: 10,
                right: 15,
                left: -20,
                bottom: 0,
              }}
            >

              {/* GRADIENT */}

              <defs>

                <linearGradient
                  id="stockGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#14B8A6"
                    stopOpacity={0.22}
                  />

                  <stop
                    offset="95%"
                    stopColor="#14B8A6"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              {/* GRID */}

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#F1F5F9"
                vertical={false}
              />

              {/* X AXIS */}

              <XAxis
                dataKey="time"
                tick={{
                  fontSize: 12,
                  fill: "#64748B",
                }}
                axisLine={false}
                tickLine={false}
              />

              {/* Y AXIS */}

              <YAxis
                domain={[
                  (dataMin: number) =>
                    dataMin * 0.995,

                  (dataMax: number) =>
                    dataMax * 1.005,
                ]}
                tick={{
                  fontSize: 12,
                  fill: "#64748B",
                }}
                axisLine={false}
                tickLine={false}
              />

              {/* TOOLTIP */}

              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "1px solid #E2E8F0",
                  boxShadow:
                    "0px 4px 20px rgba(0,0,0,0.08)",
                  backgroundColor: "#fff",
                }}
                formatter={(value: number) => [
                  `₹ ${value.toFixed(2)}`,
                  "Price",
                ]}
              />

              {/* AREA */}

              <Area
                type="monotone"
                dataKey="price"
                stroke="#14B8A6"
                strokeWidth={3}
                fill="url(#stockGradient)"
                dot={false}
                isAnimationActive={true}
                animationDuration={800}
                animationEasing="ease-out"
                activeDot={{
                  r: 7,
                  fill: "#14B8A6",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />

            </AreaChart>

          </ResponsiveContainer>

        ) : (

          <div
            className="
              h-full
              flex
              items-center
              justify-center
              text-gray-400
              text-sm
            "
          >
            No chart data available
          </div>

        )}

      </div>

      {/* BOTTOM METRICS */}

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-4
          mt-8
        "
      >

        <div
          className="
            bg-gray-50
            rounded-2xl
            p-4
          "
        >

          <p
            className="
              text-sm
              text-gray-500
              mb-1
            "
          >
            Market Cap
          </p>

          <h4
            className="
              text-lg
              font-bold
              text-black
            "
          >
            ₹ 6.2T
          </h4>

        </div>

        <div
          className="
            bg-gray-50
            rounded-2xl
            p-4
          "
        >

          <p
            className="
              text-sm
              text-gray-500
              mb-1
            "
          >
            PE Ratio
          </p>

          <h4
            className="
              text-lg
              font-bold
              text-black
            "
          >
            28.6
          </h4>

        </div>

        <div
          className="
            bg-gray-50
            rounded-2xl
            p-4
          "
        >

          <p
            className="
              text-sm
              text-gray-500
              mb-1
            "
          >
            52W High
          </p>

          <h4
            className="
              text-lg
              font-bold
              text-black
            "
          >
            ₹ 1680
          </h4>

        </div>

        <div
          className="
            bg-gray-50
            rounded-2xl
            p-4
          "
        >

          <p
            className="
              text-sm
              text-gray-500
              mb-1
            "
          >
            Volume
          </p>

          <h4
            className="
              text-lg
              font-bold
              text-black
            "
          >
            2.1M
          </h4>

        </div>

      </div>

    </div>
  );
}