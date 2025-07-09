import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoIosLink, IoIosArrowDown } from 'react-icons/io';
import { Select, Option } from "@material-tailwind/react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 6,
};


interface ContratProps{
  nom:string;
}

export default function ContratModal(props: { open: boolean; onClose: () => void; nom?: string }) {
  const { open, onClose, nom } = props;
  const [showContrat, setShowContrat] = useState(false);
  return (
    <>
     <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className='flex justify-between mb-5'>
        <div className='flex gap-5 items-center '>
            <IoIosLink size={18} color="#000" />
            <h2 className="font-bold text-[2.4rem] "> Liaison propriétaire-Contrat </h2>  
        </div >
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>
        <form className="space-y-6">
            
            <div className='flex gap-10'>
                <div className="flex-1">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >Nom du proprietaire <span className='text-[#F08130] '>*</span> </label>           
                    <input
                    type="text"
                    placeholder="Nom"
                    className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
                    />  
                </div>
                <div className="flex-1">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Site <span className='text-[#F08130] '>*</span> </label>
                    <div className="relative">
                      <Select
                        className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                        placeholder="Sélectionner un site"
                        onResize={() => {}}
                        onResizeCapture={() => {}}
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        labelProps={{
                          className: "hidden",
                        }}
                        menuProps={{
                          className: "bg-white border border-gray-200 rounded-lg shadow-lg",
                        }}
                      >
                        <Option 
                          value="site1"
                          className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
                        >
                          Site 1
                        </Option>
                        <Option 
                          value="site2"
                          className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
                        >
                          Site 2
                        </Option>
                        <Option 
                          value="site3"
                          className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
                        >
                          Site 3
                        </Option>
                      </Select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <IoIosArrowDown className="text-gray-500 text-xl" />
                      </div>
                    </div>
                </div>
                
            </div>
          
          <div>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Part %<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder="Part"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
            />
          </div>
          
         
          <div className="flex justify-end gap-4 mt-8">  
            <button
              type="button"
              className="bg-white text-[1.6rem] font-bold border-2 px-6 py-3 rounded hover:bg-gray-50"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowContrat(true);
              }}
              className=" font-bold text-[1.6rem] px-6 py-3 cursor-pointer rounded cursor-pointer bg-[#F08130]  text-black"
            >
              {nom}
            </button>
          </div>
        </form>
      </Box>
    </Modal>

    
    </>
  );
}