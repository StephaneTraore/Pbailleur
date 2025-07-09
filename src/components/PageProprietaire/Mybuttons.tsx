import React from "react";
import { CiFilter } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuArrowUpRight } from "react-icons/lu";

export default function Mybuttons(){

    return(
        <>
                    <div className="w-[332px]  mt-[55px] ml-[320px] flex justify-between items-center ">
                        <div className="flex justify-between w-[101px] items-center bg-white">
                            <CiFilter size={20} className="ml-[10px] mt-[10px] mb-[10px] "/>
                            <button className="mt-[13.5px] mb-[13.5px] mr-[17px] text-[13px] font-bold ">Filtrer</button>
                        </div>
            
                        <div className="flex justify-between w-[101px] items-center bg-white">
                            <LuArrowUpRight size={20} className="ml-[10px] mt-[10px] mb-[10px]" />
                            <button className="mt-[13.5px] mb-[13.5px] mr-[8.5px] text-[13px] font-bold " >Exporter</button>
                        </div>
                         <div className="flex justify-between w-[116px] items-center bg-white">
                            <IoDocumentTextOutline size={20} className="ml-[10px] mt-[10px] mb-[10px]" />
                            <button className="mt-[13.5px] mb-[13.5px] mr-[14.5px] text-[13px] font-bold " >Imprimer</button>
                        </div>
            
                    </div>
        </>
    )
}