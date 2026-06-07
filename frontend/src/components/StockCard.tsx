type StockCardProps = {
  symbol: string;
  companyName: string;
  price: number;
  halalStatus: string;
  change: number;
};

export default function StockCard({
  symbol,
  companyName,
  price,
  halalStatus,
  change,
}: StockCardProps) {

  const isPositive = change >= 0;

  return (
    <div
      className="
        bg-white rounded-2xl
        p-5 border
        shadow-sm
        hover:shadow-md
        transition-all duration-300
      "
    >

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-lg font-bold">
            {symbol}
          </h2>

          <p className="text-gray-500 text-sm">
            {companyName}
          </p>

        </div>

        <div
          className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${
              halalStatus === "Halal"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {halalStatus}
        </div>

      </div>


      <div className="mt-6">

        <h3 className="text-3xl font-bold">
          ₹ {price.toFixed(2)}
        </h3>

        <p
          className={`
            mt-2 font-medium
            ${
              isPositive
                ? "text-emerald-600"
                : "text-red-600"
            }
          `}
        >
          {isPositive ? "+" : ""}
          {change.toFixed(2)}
        </p>

      </div>

    </div>
  );
}