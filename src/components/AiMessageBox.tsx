import { Messages } from "../providers/DataProvider";
type UserMessageBoxProps = {
  message: Messages; // Use the GetMessage type
};
export default function AiMessageBox({ message }: UserMessageBoxProps) {
  return (
    <div className=" mr-25 ">
      <div className=" text-gray-100 text-base bg-[#10141E] p-6 rounded-lg mr-auto w-fit my-5 ">
        <div>{message.data}</div>
        <p className=" bg-[#35265F]/50 px-3 rounded-full inline-block my-3">
          language: <span className=" font-bold"> {message.lang} </span>
        </p>
      </div>
    </div>
  );
}
