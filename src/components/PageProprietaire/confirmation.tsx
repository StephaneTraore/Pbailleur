import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FiEdit } from "react-icons/fi";
import { GoAlertFill } from "react-icons/go";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmationModal({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void; }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className='flex justify-between '>
        <div className='flex gap-5 items-center '> 
            <GoAlertFill color='grey' size={24} />
            <h2 className="font-bold text-[2.4rem] "> Confirmation</h2>  
        </div >
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>

          <div className='my-5 items-center '> 
          <p className='text-[1.4rem] '>
              Êtes vous sûr de vouloir supprimer ce propriétaire ?
          </p>
          </div>
         
         
          <div className="flex justify-end gap-2 mt-5">  
            <button
              type="button"
              className="bg-white text-[1.6rem] font-bold border-2 px-4 py-2 rounded"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="button"
              className=" font-bold text-[1.6rem] px-4 py-2 rounded bg-[#F08130]"
              onClick={onConfirm}
            >
              Supprimer
            </button>
          </div>
        
      </Box>
    </Modal>
  );
}