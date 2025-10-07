interface Props {
  className?: string;
  stamp: string;
}

const TimeFormatter: React.FC<Props> = ({ className, stamp }) => {
  const date = new Date(stamp);

  // Format the time to 12-hour format with AM/PM
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return <span className={className}>{formattedTime}</span>;
};

export default TimeFormatter;
