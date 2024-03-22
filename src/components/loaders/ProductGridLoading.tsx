function ProductGridLoading<ProductGridType>() {
  return (
    <div className="lg:col-span-4">
      <div className="grid gap-4 grid-cols-4">
        {new Array(4).fill(0).map((_, id) => (
          <div
            key={id}
            className="bg-gray-100 rounded-lg animate-pulse h-[300px]"
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ProductGridLoading;
