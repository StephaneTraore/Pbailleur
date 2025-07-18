
import { CiFilter } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuArrowUpRight } from "react-icons/lu";

export default function Mybuttons(){

    return(
        <>
                    <div className="max-w-[332px] w-[90%]  mt-[55px] ml-[335px] flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 items-center ">
                        <div className="flex justify-between max-w-[101px] w-[90%] items-center bg-white">
                            <CiFilter size={20} className="ml-[10px] mt-[10px] mb-[10px] "/>
                            <button className="mt-[13.5px] mb-[13.5px] mr-[17px] text-[13px] font-bold ">Filtrer</button>
                        </div>
            
                        <div className="flex justify-between max-w-[101px] w-[90%] items-center bg-white">
                            <LuArrowUpRight size={20} className="ml-[10px] mt-[10px] mb-[10px]" />
                            <button className="mt-[13.5px] mb-[13.5px] mr-[8.5px] text-[13px] font-bold " >Exporter</button>
                        </div>
                         <div className="flex justify-between max-w-[101px] w-[90%] items-center bg-white">
                            <IoDocumentTextOutline size={20} className="ml-[10px] mt-[10px] mb-[10px]" />
                            <button className="mt-[13.5px] mb-[13.5px] mr-[14.5px] text-[13px] font-bold " >Imprimer</button>
                        </div>
            
                    </div>
        </>
    )
}