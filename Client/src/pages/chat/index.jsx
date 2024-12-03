import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ChatContainer from "./chat-container";
import ContactsContainer from "./contacts-container";
import EmptyChatContainer from "./empty-chat-container";

const Chat = () => {

  const {
    userInfo , 
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProcess,
    fileDownloadProcess,
      } = useAppStore();

  const navigate = useNavigate();
  useEffect(()=>{

    if(!userInfo.profileSetup){
      toast("Please Setup Profile to continue.");
      navigate("/profile")
    }

  },[userInfo,navigate])

  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      {
        isUploading && (
          <div className=" h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
            <h5 className="text-5xl animate-pulse">Uploading File</h5>
            {fileUploadProcess}%
          </div>
        )
      }
    {isDownloading && (
      <div className=" h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
        <h5 className="text-5xl animate-pulse">Downloading File</h5>
        {fileDownloadProcess}%
      </div>
    )}



      <ContactsContainer/>
      {
        selectedChatType === undefined ? (
          <EmptyChatContainer/>
        ) : (
          <ChatContainer/>
        )
      }
      {/*<EmptyChatContainer/>*/}
     {/* <ChatContainer/>*/}
    </div>
  )
}

export default Chat