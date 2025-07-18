import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { GoAlertFill } from "react-icons/go";



export default function SupprimerModal({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void; }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] bg-white shadow-xl p-6 rounded">
        <div className='flex sm:gap-5 justify-between '>
        <div className='flex gap-5 items-center '> 
            <GoAlertFill color='grey' size={24} />
            <h2 className="font-bold text-[2.4rem] "> Confirmation</h2>  
        </div >
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>

          <div className='my-5 items-center '> 
          <p className='text-[1.4rem] '>
              Êtes vous sûr de vouloir supprimer ce site ?
          </p>
          </div>
         
         
          <div className="flex flex-wrap justify-end gap-2 mt-5">  
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