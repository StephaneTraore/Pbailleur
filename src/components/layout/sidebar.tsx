import React, { useState } from "react";
import { HiHome } from "react-icons/hi";
import { FaCreditCard } from "react-icons/fa6";
import { FiChevronDown } from 'react-icons/fi';
import { PiNotePencilFill, PiCardholderFill } from "react-icons/pi";
import { SlGraph } from "react-icons/sl";
import { CgFileDocument } from "react-icons/cg";
import { TbSettingsFilled } from "react-icons/tb";
import { Outlet, Link } from "react-router-dom";

 
export default function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
   
    
    <div className="bg-black w-[20%] min-w-[240px] max-w-[301px] h-screen fixed left-0 top-0 px-6 py-8">
      {/* Logo */}
      <div className="flex items-center gap-6 mb-12">
        <img src="/src/assets/images/orange3.png" alt="logo-orange" className="w-15" />
        <span className="text-white text-[3.4rem] font-bold">PBailleur</span>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-15">
        <SidebarItem icon={<HiHome size={24} />} label="Accueil " onClick={() => {}} dropdownOptions={[]} />
        <SidebarItem icon={<FaCreditCard size={24} />}  label="Paiement" onClick={() => {}} dropdownOptions={[]} />
        <SidebarItem icon={<PiNotePencilFill size={24} />} label="Editions" hasDropdown onClick={() => {}} dropdownOptions={[]} />
        <SidebarItem icon={<SlGraph size={24} />} label="Statistiques" hasDropdown onClick={() => {}} dropdownOptions={[]} />
        <SidebarItem icon={<PiCardholderFill size={24} />} label="Paiement Global" onClick={() => {}} dropdownOptions={[]} />
        <SidebarItem icon={<CgFileDocument size={24} />} label="Documents" hasDropdown onClick={() => {}} dropdownOptions={[]} />
        <SidebarItem
          icon={<TbSettingsFilled size={24} />}
          label="Codification"
          hasDropdown
          isButton
          isOpen={openDropdown === 'Codification'}
          onClick={() => handleDropdown('Codification')}
          dropdownOptions={[
            { label: 'Site' },
            { label: 'Propriétaires' },
            { label: 'Contrat' },
            { label: 'Quartiers' },
          ]}
        />
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, hasDropdown = false, isButton = false, isOpen = false, onClick = () => {}, dropdownOptions = [] as {label: string}[] }) {
  return (
    <div className="flex flex-col w-full">
      <div
        className={`flex justify-between items-center text-[1.6rem] text-white text-lg cursor-pointer py-2 px-1 rounded hover:bg-gray-800 transition-all duration-150 ${isOpen ? 'bg-gray-900' : ''}`}
        onClick={onClick}
      >
        <div className="flex items-center gap-4">
          {icon}
          {isButton ? (
            <button className="text-left text-[1.4rem] bg-transparent border-none outline-none text-white">{label}</button>
          ) : (
            <span>{label}</span>
          )}
        </div>
        {hasDropdown && <FiChevronDown size={20} className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />}
      </div>
      {hasDropdown && isOpen && dropdownOptions.length > 0 && (
        <div className="ml-8 mt-1 flex flex-col gap-1 bg-gray-900 rounded shadow-lg py-2 z-10">
          {dropdownOptions.map((opt) => (
            opt.label === 'Propriétaires' ? (
              <Link
                key={opt.label}
                to="/proprietaire"
                className="text-left text-white text-[1.4rem] px-2 py-1 hover:bg-[#F08130] rounded transition-all duration-100 block"
              >
                {opt.label}
              </Link>

              
            ) : opt.label === 'Site' ? (
              <Link
                key={opt.label}
                to="/"
                className="text-left text-white text-[1.4rem] px-2 py-1 hover:bg-[#F08130] rounded transition-all duration-100 block"
              >
                {opt.label}
              </Link>
            ) : opt.label === 'Contrat' ? (

              <Link
                key={opt.label}
                to="/contrat"
                className="text-left text-white text-[1.4rem] px-2 py-1 hover:bg-[#F08130] rounded transition-all duration-100 block"
              >
                {opt.label}
              </Link>

            ) : opt.label === 'Quartiers' ? (

              <Link
                key={opt.label}
                to="/quartier"
                className="text-left text-white text-[1.4rem] px-2 py-1 hover:bg-[#F08130] rounded transition-all duration-100 block"
              >
                {opt.label}
              </Link>

            ) : (
              <button
                key={opt.label}
                className="text-left text-white text-[1.4rem] px-2 py-1 hover:bg-[#F08130] rounded transition-all duration-100"
              >
                {opt.label}
              </button>
            )
          ))}
        </div>

        
      )}
      <Outlet />
    </div>
  );
}

