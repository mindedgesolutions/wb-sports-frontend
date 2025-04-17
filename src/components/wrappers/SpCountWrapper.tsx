const SpCountWrapper = ({ total }: { total: number }) => {
  return (
    <div className="bg-success/15 p-2 md:p-1.5 md:px-4 text-success-foreground text-xs tracking-widest">
      Total <span className="font-semibold">{total}</span> records found
    </div>
  );
};
export default SpCountWrapper;
