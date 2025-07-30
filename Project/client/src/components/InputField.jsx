export default function InputField({ type = "text", label = 'Name', placeholder = " Enter your name here", handleInputChange, name, value, required }) {
    return (
        <div className=" min-h-30 flex flex-col gap-2 2xl:w-[1200px] ">
            <label htmlFor={name} className=" min-h-12 text-xl md:text-xl lg:text-3xl 2xl:text-3xl font-semibold flex items-center p-2">{label}</label>
            {required === true ? <div className="h-full w-88 md:w-[690px] lg:w-[900px] xl:w-[1150px] 2xl:w-full bg-[#d9d9d913] ">
                <input type={type} className="h-full w-88 md:w-[690px] md:text-xl lg:text-2xl lg:w-[900px] xl:w-[1150px] 2xl:w-full opacity-100 text-white ring-1 ring-[#75caffb3] font-base text-lg 2xl:text-2xl p-2 " name={name} value={value} placeholder={placeholder} onChange={handleInputChange} required />
            </div> : <div className="h-full w-88 md:w-[690px] lg:w-[900px] xl:w-[1150px] 2xl:w-full bg-[#d9d9d913] ">
                <input type={type} className="h-full w-88 md:w-[690px] md:text-xl lg:text-2xl lg:w-[900px] xl:w-[1150px] 2xl:w-full opacity-100 text-white ring-1 ring-[#75caffb3] font-base text-lg 2xl:text-2xl p-2 " name={name} value={value} placeholder={placeholder} onChange={handleInputChange} required />
            </div>}

        </div>
    )
}