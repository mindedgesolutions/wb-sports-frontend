const AppTitleWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted-foreground/10 p-2 md:px-4 text-muted-foreground font-medium capitalize text-base md:text-xl tracking-normal md:tracking-wider">
      {children}
    </div>
  );
};
export default AppTitleWrapper;
