import cx from "clsx";
import { ToastContentProps } from "react-toastify";

type CustomNotificationProps = ToastContentProps<{
  title: string;
  content: string;
}>;

function CustomNotification({ data, toastProps }: CustomNotificationProps) {
  const isColored = toastProps.theme === "colored";

  return (
    <div className="flex flex-col w-full">
      <h3
        className={cx(
          "text-sm font-semibold",
          isColored ? "text-white" : "text-zinc-800"
        )}
      >
        {data.title}
      </h3>
      <div className="flex items-center justify-between">
        <p className="text-sm">{data.content}</p>
      </div>
    </div>
  );
}

export default CustomNotification;
