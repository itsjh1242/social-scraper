interface TipProps {
  children: React.ReactNode;
}

export const Tip: React.FC<TipProps> = ({ children }) => {
  return (
    <div className="bg-accent rounded-md px-4 py-2 text-sm text-gray-600">
      {children}
    </div>
  );
};
