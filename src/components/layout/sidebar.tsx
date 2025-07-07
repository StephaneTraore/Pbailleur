import { HiHome } from "react-icons/hi";
import { FaCreditCard } from "react-icons/fa6";
import { FiChevronDown } from 'react-icons/fi';
import { PiNotePencilFill, PiCardholderFill } from "react-icons/pi";
import { SlGraph } from "react-icons/sl";
import { CgFileDocument } from "react-icons/cg";
import { TbSettingsFilled } from "react-icons/tb";
import { useState } from "react";

 
  

// function Sidebar(){

   
   

//     return(
//         <>
//             <div className=" bg-[#000000] w-[301px] border-2 ]">
//                 <div className="ml-[23px] mt-[50px] mr-[70px] W-[199px] h-[40px]  flex justifi-between items-center gap-[27px]">
//                     <img src="/src/assets/images/orange3.png" alt="logo-orange " className="w-[40px] "/>
//                     <span className=" text-white text-[3.2rem]">PBailleur</span>
//                 </div>

//                 <div className="w-[250px] h-[723px] mt-[40px] " >
//                     <div className="flex  items-center gap-[20px] mt-[25px] ml-[15px]">
//                         <HiHome size={24} color="#F6F6F6"/>
//                         <span className="text-white text-[2.0rem]">Accueil</span>
//                     </div>

//                      <div className="flex  items-center gap-[20px] mt-[25px] ml-[15px]">
//                         <FaCreditCard size={24} color="#F6F6F6"/>
//                         <span className="text-white text-[2.0rem]">Paiement</span>
//                     </div>

//                     <div className="flex justify-between items-center  mt-[25px] ml-[15px]">
//                         <div className="flex justify-between items-center gap-[20px]">
//                             <PiNotePencilFill size={24} color="#F6F6F6" />
//                              <span className="text-white text-[2.0rem]">Editions</span>
//                         </div>  
//                         <FiChevronDown size={24} color="#F6F6F6" className=""/>
//                     </div>

//                      <div className="flex justify-between items-center  mt-[25px] ml-[15px]">
//                         <div className="flex justify-between items-center gap-[20px]">
//                             <SlGraph size={24} color="#F6F6F6" />
//                              <span className="text-white text-[2.0rem]">Statistiques</span>
//                         </div>  
//                         <FiChevronDown size={24} color="#F6F6F6" className=""/>
//                     </div>

//                       <div className="flex  items-center gap-[20px] mt-[25px] ml-[15px]">
//                         <PiCardholderFill size={24} color="#F6F6F6"/>
//                         <span className="text-white text-[2.0rem]">Paiement Global</span>
//                     </div>

//                     <div className="flex justify-between items-center  mt-[25px] ml-[15px]">
//                         <div className="flex justify-between items-center gap-[20px]">
//                             <CgFileDocument size={24} color="#F6F6F6" />
//                              <span className="text-white text-[2.0rem]">Statistiques</span>
//                         </div>  
//                         <FiChevronDown size={24} color="#F6F6F6" className=""/>
//                     </div>

//                     <div className="flex justify-between items-center  mt-[25px] ml-[15px]">
//                         <div className="flex justify-between items-center gap-[20px]">
//                             <TbSettingsFilled size={24} color="#F6F6F6" />
//                              <button className="text-white text-[2.0rem]">Codification</button>
//                         </div>  
//                         <FiChevronDown size={24} color="#F6F6F6" className=""/>
//                     </div>

                    

//                 </div>

//             </div>
//         </>
        
//     )
// }




export default function Sidebar() {
  return (
    <div className="bg-black w-[20%] min-w-[240px] max-w-[301px] h-screen fixed left-0 top-0 px-6 py-8">
      {/* Logo */}
      <div className="flex items-center gap-6 mb-12">
        <img src="/src/assets/images/orange3.png" alt="logo-orange" className="w-10" />
        <span className="text-white text-3xl font-bold">PBailleur</span>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-15">
        <SidebarItem icon={<HiHome size={24} />} label="Accueil" />
        <SidebarItem icon={<FaCreditCard size={24} />} label="Paiement" />
        <SidebarItem icon={<PiNotePencilFill size={24} />} label="Editions" hasDropdown />
        <SidebarItem icon={<SlGraph size={24} />} label="Statistiques" hasDropdown />
        <SidebarItem icon={<PiCardholderFill size={24} />} label="Paiement Global" />
        <SidebarItem icon={<CgFileDocument size={24} />} label="Documents" hasDropdown />
        <SidebarItem icon={<TbSettingsFilled size={24} />} label="Codification" hasDropdown isButton />
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, hasDropdown = false, isButton = false }) {
  return (
    <div className="flex justify-between items-center text-white text-lg">
      <div className="flex items-center gap-4">
        {icon}
        {isButton ? (
          <button className="text-left">{label}</button>
        ) : (
          <span>{label}</span>
        )}
      </div>
      {hasDropdown && <FiChevronDown size={20} />}
    </div>
  );
}

