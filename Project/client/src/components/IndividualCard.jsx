import { motion } from "framer-motion";

export default function IndividualCard({ contact, onClose }) {
  const isCashback = contact?.coupon?.type === "payment";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center w-[90%] gap-5 2xl:gap-7 2xl:w-[50%] rounded-4xl bg-[#000000dd] h-[60%] absolute flex flex-col justify-center items-center text-xl 2xl:text-4xl z-10"
    >
      <div className="flex justify-between items-center text-sm 2xl:text-2xl 2xl:w-[70%] w-[90%]">😎 Name - <span>{contact.name}</span></div>
      <div className="flex justify-between items-center text-[10px] 2xl:text-2xl 2xl:w-[70%] w-[90%]">📩 Email - <span>{contact.email}</span></div>
      <div className="flex justify-between items-center text-sm 2xl:text-2xl 2xl:w-[70%] w-[90%]">☎️ Contact - <span>{contact.contact}</span></div>
      <div className="flex justify-between items-center text-sm 2xl:text-2xl 2xl:w-[70%] w-[90%]">📍 State - <span>{contact.state}</span></div>
      <div className="flex justify-between items-center text-sm 2xl:text-2xl 2xl:w-[70%] w-[90%]">🎟️ Coupon Code - <span>{contact?.coupon?.code}</span></div>
      <div className="flex justify-between items-center text-sm 2xl:text-2xl 2xl:w-[70%] w-[90%]">🎁 Coupon Type - <span>{contact?.coupon?.type}</span></div>
      <div className="flex justify-between items-center text-sm 2xl:text-2xl 2xl:w-[70%] w-[90%]">💳 Payment Method - <span>{contact.paymentMethod}</span></div>

      {/* Conditional Details */}
      {isCashback && (
        <div className="text-sm 2xl:text-2xl mt-2">
          {contact.paymentMethod === "UPI" && (
            <div>🧾 UPI ID - <span>{contact.upiId}</span></div>
          )}
          {contact.paymentMethod === "NEFT/RTGS via Bank Account" && (
            <>
              <div>🏦 Bank - <span>{contact.bankName}</span></div>
              <div>🔢 Account Number - <span>{contact.accountNumber}</span></div>
              <div>📍 IFSC Code - <span>{contact.ifscCode}</span></div>
            </>
          )}
        </div>
      )}

      <button
        className="bg-red-100 mt-5 cursor-pointer w-[50%] 2xl:w-[10vw] rounded-xl bg-gradient-to-tl from-[#0B1E3C] via-[#123A60] via-[#245A8B] via-[#3A78B3] to-[#5A9BDA] text-xl h-[5vh]"
        onClick={onClose}
      >
        Close
      </button>
    </motion.div>
  );
}