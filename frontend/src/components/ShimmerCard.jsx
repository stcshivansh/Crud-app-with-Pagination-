
const ShimmerCard = () => {
  return (
    <div className="animate-pulse max-w-md p-6 bg-[#0f172a] border border-gray-700 rounded-xl w-full">
      {/* Title */}
      <div className="h-5 bg-gray-700 rounded w-3/4 mb-4"></div>

      {/* Variants */}
      <div className="space-y-2">
        {Array(5)
          .fill("")
          .map((_, idx) => (
            <div
              key={idx}
              className="h-10 bg-gray-700 rounded w-full"
            ></div>
          ))}
      </div>

      {/* Metafields */}
      <div className="mt-4 h-4 bg-gray-700 rounded w-1/3"></div>
    </div>
  );
};
export default ShimmerCard;