
import { AnimatePresence, motion } from "framer-motion";

export default function Card({ contact, onClick }) {
  const cashback = ['UPI', 'Amazon Pay', 'NEFT/RTGS via Bank Account'];

  return (
    <motion.div
      initial={{ x: -150, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 5,
        delay: 0.8,
      }}
      className="bg-[#00000027] gap-5 2xl:gap-10 w-[90%] h-[12vh] 2xl:w-[95%] rounded-xl shadow-xl 2xl:p-5 p-2 flex items-center 2xl:justify-between 2xl:text-2xl"
    >
      <div className="w-[30%] text-gray-100 text-sm 2xl:text-2xl 2xl:w-[20%]">
        {contact.name || 'Giveaway User'}
      </div>
      <div className="w-[30%] text-gray-100 text-sm 2xl:text-2xl 2xl:w-auto text-center">
        {cashback.includes(contact.paymentMethod) ? 'Cashback💵' : 'Tangible Gift🎁'}
      </div>
      <button
        className="bg-[#ffffff2c] 2xl:w-[15%] w-[40%] h-[70%] 2xl:h-[100%] text-sm 2xl:text-xl rounded-full ring-1 ring-green-300 cursor-pointer"
        onClick={onClick}
      >
        View Full Details
      </button>
    </motion.div>
  );
}