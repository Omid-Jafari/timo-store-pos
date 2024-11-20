const TextAreaComp = ({
  className,
  label,
  name,
  value,
  onChange,
  onBlur,
  required = false,
  errors = undefined,
  touched = false,
  autoFocus = false,
}: {
  className?: string;
  label: string;
  required?: boolean;
  type?: string;
  name: string;
  value: string;
  onChange: any;
  onBlur: any;
  errors?: string | undefined;
  touched?: boolean;
  autoFocus?: boolean;
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="font-semibold text-sm">
        {label} {required ? <span className="text-red-400">*</span> : null}
      </label>
      <textarea
        rows={5}
        autoFocus={autoFocus}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="rounded-md outline-none border border-[#e9ecef] p-2 focus:border-red-500 transition-colors duration-300"
      />
      {required
        ? errors &&
          touched && (
            <div className="text-red-600 w-full text-sm animate__animated animate__headShake">
              {errors as string}
            </div>
          )
        : null}
    </div>
  );
};

export default TextAreaComp;
