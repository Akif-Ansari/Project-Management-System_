interface ButtonProps {
  className?: string;
  value: string;
  isLoading: boolean;
  handleClick: (e: any) => Promise<void>;
}
const ConfirmButton = ({
  className,
  value,
  isLoading,
  handleClick,
}: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={`${className} text-base font-bold outline-none border-none bg-blue-500 text-white w-full py-2 rounded-md`}
    >
      {isLoading ? <>Loading...</> : value}
    </button>
  );
};

export default ConfirmButton;
