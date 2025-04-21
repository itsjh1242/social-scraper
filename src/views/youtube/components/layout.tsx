interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className="flex h-full max-h-full w-full flex-col justify-between">
      {children}
    </section>
  );
};

interface ExpandProps {
  children: React.ReactNode;
}
export const Expand: React.FC<ExpandProps> = ({ children }) => {
  return (
    <div className="flex h-full w-full flex-1 flex-col gap-3">{children}</div>
  );
};
