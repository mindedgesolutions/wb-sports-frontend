const WbPageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:max-w-screen-xl md:mx-auto grid grid-cols-12 grid-flow-row gap-4 mt-8">
      {children}
    </div>
  );
};
export default WbPageWrapper;
