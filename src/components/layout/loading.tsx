interface LoadingProps {
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-400 border-t-transparent"></div>
        {/* Loading Text */}
        <p className="text-lg font-medium text-gray-700">{text}</p>
      </div>
    </div>
  );
};
