import GiftDetailsForm from "../components/giftDetailForm"
export default function GiftDetails(){
    return(
     <div className="flex flex-col min-w-screen min-h-screen gap-5 bg-[#101010] justify-center items-center">
        <div className=" h-60 2xl:h-[400px] bg-gradient-to-r from-[#75C9FF] to-[#009BFF] w-full"></div>
        <div className="flex justify-center items-center gap-5">
            <div className="ml-10 text-xl 2xl:text-[50px] font-bold text-[#75C9FF] ">Win with Rockford⭐</div>
            <div className="2xl:text-2xl font-semibold">Fill up your Details here !</div>
        </div>
        <GiftDetailsForm/>
     </div>
    )
}