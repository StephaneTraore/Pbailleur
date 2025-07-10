import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FiEdit } from "react-icons/fi";
import ConfirmationModal from '../PageProprietaire/confirmation';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function ModifierModal({ open, onClose }: { open: boolean; onClose: () => void }, ) {
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
            <FiEdit />
            <h2 className="font-bold text-[2.4rem] "> Modification</h2>  
        </div >
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>
        <form className="space-y-4">

          <div className='flex gap-10 mb-2'>
          <div className='flex inline-block ' >
            
            <label htmlFor="" className='font-bold text-[1.6rem] ' >Nom du proprietaire <span className='text-[#F08130] '>*</span> </label>
            
            <input
            type="text"
            placeholder="Nom"
            className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded mb-10"
          />
          
          
          <label htmlFor="" className='font-bold text-[1.6rem]'>Email <span className='text-[#F08130] '>*</span> </label> 
          
          <input
            type="email"
            placeholder="Email"
            className="border font-bold text-[1.4rem] border-gray-300 p-5 w-full rounded"
          />

          </div>

          <div className='flex inline-block'>
          
          <label htmlFor="" className='font-bold text-[1.6rem]'>Telephone <span className='text-[#F08130] '>*</span> </label> 
          
          <input
            type="tel"
            placeholder="Téléphone"
            className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full  mb-10 "
          />
          
          <label htmlFor="" className='font-bold text-[1.6rem]'>Adresse <span className='text-[#F08130] '>*</span> </label> 
          
          <input
            type="text"
            placeholder="Adresse"
            className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
          />
          </div>
          </div>
         
          <div className="flex justify-end gap-2 mt-4">  
            <button
              type="button"
              className="bg-white text-[1.6rem] font-bold border-2 px-4 py-2 rounded"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="button"
              
              className=" font-bold text-[1.6rem] px-4 cursor-pointer py-2 rounded bg-[#F08130]"
            >
              Modifier
            </button>
          </div>
        </form>
      </Box>
    </Modal>

 
    </>
  );
}