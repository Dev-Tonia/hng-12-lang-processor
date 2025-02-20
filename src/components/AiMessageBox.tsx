import { GetMessage } from "../providers/DataProvider";
type UserMessageBoxProps = {
  message: GetMessage; // Use the GetMessage type
};
export default function AiMessageBox({ message }: UserMessageBoxProps) {
  return (
    <div className=" mr-25 ">
      <div className=" text-gray-100 text-base bg-[#10141E] p-6 rounded-lg mr-auto w-fit my-5 ">
        {message.data}
      </div>
    </div>
  );
}
