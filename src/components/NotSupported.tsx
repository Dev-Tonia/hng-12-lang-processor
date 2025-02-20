export default function NotSupported() {
  return (
    <div className=" h-[60vh] flex items-center justify-center">
      <div className="text-center text-gray-100">
        <h2 className=" text-lg font-bold leading-tight tracking-[-0.015em] my-2">
          Oops!!!
        </h2>
        <p>This application is not supported on your browser.</p>
        <p>Please use a supported browser (Chrome browser).</p>
      </div>
    </div>
  );
}
