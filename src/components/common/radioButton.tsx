const RadioButton = ({
  getValue,
  checked,
  label,
  disable = false,
}: {
  getValue: () => void;
  checked: boolean;
  label: string;
  disable?: boolean | undefined;
}) => {
  return (
    <button
      type="button"
      className={`flex items-center ${
        disable ? "opacity-50 cursor-default" : ""
      }`}
      onClick={() => !disable && getValue()}
    >
      <span
        className={`rounded-full w-6 h-6 border-[2px] border-secondary p-[2px] flex justify-center items-center flex-grow-0 flex-shrink-0 box-border`}
        dir="ltr"
      >
        <span
          className={`w-3 h-3 rounded-full bg-secondary transition-all ${
            checked ? "scale-100" : "scale-0"
          }`}
        ></span>
      </span>
      <span className="px-2">{label}</span>
    </button>
  );
};

export default RadioButton;
