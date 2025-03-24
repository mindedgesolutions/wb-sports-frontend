const WbPageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-transparent fixed inset-0 z-50">
      <div className="fixed inset-0 w-screen h-screen bg-black opacity-50"></div>
      <div className="relative z-10 text-white text-2xl font-bold opacity-100 animate-bounce">
        Loading ...
      </div>
    </div>
  );
};
export default WbPageLoader;
