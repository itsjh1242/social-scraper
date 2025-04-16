interface EmojiProps {
  size?: number;
}
export const Briefcase: React.FC<EmojiProps> = ({ size = 40 }) => {
  return (
    <img
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Objects/Briefcase.webp"
      alt="briefcase"
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export const BarChart: React.FC<EmojiProps> = ({ size = 40 }) => {
  return (
    <img
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Objects/Bar%20Chart.webp"
      alt="Bar Chart"
      style={{
        width: size,
        height: size,
      }}
    />
  );
};
