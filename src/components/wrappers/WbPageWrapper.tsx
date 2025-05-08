const WbPageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen-xl md:max-w-screen-xl md:mx-auto grid grid-cols-1 md:grid-cols-12 md:grid-flow-row gap-4 mt-8">
      {children}
    </div>
  );
};
export default WbPageWrapper;
