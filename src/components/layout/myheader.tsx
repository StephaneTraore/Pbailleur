import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

interface HeaderProps{
    title: string;
    label:string;
    total:number;
    onLabelClick?: () => void;
       
}

export default function Myheader({title, label, total, onLabelClick}:HeaderProps){
    return(
        <>
                <div className="ml-[335px] w-[90%] max-w-[1147px] mr-[30px] mt-[85px] bg-white ">
                          
                          <div className='pt-[24px] pl-[40px] pb-[22px] pr-[15px]  flex  items-center  justify-between    '>
                          <div className='w-[483px] py-[2px]  '>
                              <h1 className=' text-[3.1rem] font-bold font-helvetica '>{title}</h1>
                               <span className='text-[1.3rem] font-bold'>Affichés : </span>
                               <span className='text-[1.3rem] font-bold'>{total} éléments</span>
                          </div>
                          <div className=" w-[90%] max-w-[492px] flex flex-wrap   gap-10 items-center  ">
                                <div className="max-w-[227px] w-[100%] flex justify-between items-center bg-[#F6F6F6]  ">
                                        <input placeholder="Rechercher"  className="text-[1.4rem] ml-[23px] mt-[13.5px] mb-[13.5px] font-bold w-full " />
                                        <CiSearch  size={24} color="#F08130" className="mr-[26.22px] mt-[13px] mb-[14.72px]" />
                                </div>
                                
                                <div className="max-w-[227px] w-[90%] flex gap-10 items-center bg-[#F08130]  ">
                                        <FaPlus onClick={onLabelClick} size={24} color="#000000" className="ml-[17px] cursor-pointer " />
                                        <span  className="text-[1.4rem] pt-[13.5px] pb-[13.5px] pr-[17px] font-bold cursor-pointer" onClick={onLabelClick}>
                                          {label}
                                        </span>
                                </div>
                                
                           </div>
                          </div>  
            
                    </div>
        </>
    )
}