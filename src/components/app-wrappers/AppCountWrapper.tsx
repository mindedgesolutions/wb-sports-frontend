const AppCountWrapper = ({ total }: { total: number }) => {
  return (
    <div className="bg-sky/15 p-1.5 px-4 text-sky-foreground text-xs tracking-widest">
      Total <span className="font-semibold">{total}</span> records found
    </div>
  );
};
export default AppCountWrapper;
