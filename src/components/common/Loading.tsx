const Loading = ({
  className = "w-12 h-10 ",
  bg = "bg-primary",
}: {
  className?: string;
  bg?: string;
}) => {
  return (
    <div
      className={`lds-ellipsis flex items-center overflow-hidden ${className}`}
    >
      <div className={`${bg}`}></div>
      <div className={`${bg}`}></div>
      <div className={`${bg}`}></div>
      <div className={`${bg}`}></div>
    </div>
  );
};

export default Loading;
