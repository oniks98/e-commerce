const CartSkeleton = () => {
  return (
    <div className="w-full max-w-[520px] rounded-lg bg-white p-[30px] shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
      </div>

      <ul className="flex flex-col gap-y-5">
        {[1, 2].map((index) => (
          <li
            key={index}
            className="border-grey-light flex gap-x-5 border-b pb-5"
          >
            <div className="h-[100px] w-[120px] animate-pulse rounded-lg bg-gray-200" />
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-6 w-8 animate-pulse rounded bg-gray-200" />
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                </div>
                <div className="h-7 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-grey-light mt-5 border-t-2 pt-5">
        <div className="mb-3 h-8 w-28 animate-pulse rounded bg-gray-200" />
        <ul className="flex flex-col gap-y-2">
          {[1, 2, 3].map((index) => (
            <li key={index} className="flex items-end justify-between">
              <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
              <div className="border-grey-light mx-2 flex-1 border-b-2 border-dashed" />
              <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-center gap-x-2">
        <div className="h-6 w-6 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="mt-5 h-14 w-full animate-pulse rounded-lg bg-gray-200" />
      <div className="mx-auto mt-3 h-4 w-4/5 animate-pulse rounded bg-gray-200" />
    </div>
  );
};

export default CartSkeleton;
