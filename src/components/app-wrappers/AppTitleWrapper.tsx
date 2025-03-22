const AppTitleWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted-foreground/10 p-2 px-4 text-muted-foreground font-medium capitalize text-xl tracking-wider">
      {children}
    </div>
  );
};
export default AppTitleWrapper;
