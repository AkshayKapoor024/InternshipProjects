import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function FinalPage() {
  const location = useLocation();
  const [cardVisible, setCardVisible] = useState(false);
  const [typingText, setTypingText] = useState("");

  const fullMessage = " Congratulations to our lucky winners. Let's celebrate this moment! 😉😉";

 useEffect(() => {
  setCardVisible(true);

  let index = 0;
  const delay = 45;

  const startTyping = () => {
    const typingInterval = setInterval(() => {
      setTypingText((prev) => prev + fullMessage.charAt(index));
      index++;
      if (index >= fullMessage.length) clearInterval(typingInterval);
    }, delay);
  };

  const delayBeforeTyping = setTimeout(startTyping, 1200);

  return () => {
    clearTimeout(delayBeforeTyping);
  };
}, []);;

  return (
    <div className="bg-gradient-to-br from-[#0088FF] via-[#00AEEF] via-[#4DC5FF] via-[#8BE2FF] to-[#C9F1FF] min-h-screen min-w-screen flex justify-center items-center overflow-hidden">
      <div
        className={`bg-[#1212121d] w-84 2xl:w-[75vw] rounded-4xl text-white transition-all duration-[1200ms] ease-out
          ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[100vh]'}
        `}
      >
        <div className="h-20 2xl:h-36 flex justify-center items-center text-[22px] 2xl:text-[60px] font-bold text-white">🎉 Congratulations User 🎊</div>
        <div className="h-20 flex justify-center items-start text-[18px] 2xl:text-[40px] font-bold text-rose-500">🍾 Coupon Code Redeemed 🎁</div>
        <div className="h-50 flex justify-center items-center text-center text-xl 2xl:text-[30px] font-bold p-10">
          You will be provided with your Cashback💵 or Gift⭐ based on your coupon code shortly.
        </div>
        <div className="h-26 text-center text-base 2xl:text-3xl font-semibold flex justify-center items-center 2xl:text-gray-300 min-h-[4rem]">
          {typingText}
        </div>
      </div>
    </div>
  );
}