import clsx from "clsx";

export default function Card(props: {
  active: boolean;
  disabled?: boolean;
  eaten: boolean;
  number: number;
  onClick?: () => void;
}): React.JSX.Element {
  return (
    <div
      className={clsx(
        "cursor-pointer",
        {
          "bg-slate-700 text-white": props.number !== 8,
          "bg-pink-300": props.number === 8,
        },
        {
          "relative z-1": !props.active,
          "ring-4 ring-emerald-500 ring-offset-0 static z-100":
            props.active && !props.eaten,
        },
        {
          "ring-4 ring-gray-400 opacity-50": props.eaten,
        },
        [
          "w-16",
          "h-16",
          "text-center",
          "flex",
          "justify-center",
          "items-center",
          "text-2xl",
        ],
        {
          "pointer-events-none": props.disabled,
        }
      )}
      onClick={props.onClick}
    >
      {props.number}
    </div>
  );
}
