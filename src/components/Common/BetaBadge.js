export const BetaBadge = ({ size, message }) => {
  if (!size) size = 'lg';
  if (!message) message = 'Beta';
  return (
    <span
      className={`bg-red-100 text-red-800 text-${size} font-semibold mr-2 px-2.5 py-0.5 rounded`}
    >
      {message}
    </span>
  );
};
