import { useEffect, useState } from 'react';

function CountUp({ target ,title , heading = "Sample heading" , bgcolor="bg-[rgba(103,255,52,0.29)]" , ringcolor="ring-green-400"}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= target) clearInterval(interval);
    }, 30); // Adjust for speed

    return () => clearInterval(interval);
  }, [target]);
  return (
    <div className={` text-3xl font-bold text-gray-200  flex items-center h-full 2xl:w-[20vw] m-8 rounded-4xl ${bgcolor} ring-5 ${ringcolor} bg-opacity-0 flex-col justify-between p-10 `}>
        <div className='text-white text-center'>{heading}</div>
      {count}+ {title}
    </div>
  );
}

export default CountUp;