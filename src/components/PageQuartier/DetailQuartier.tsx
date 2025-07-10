import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FiEdit } from 'react-icons/fi';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 691,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};





export default function DetailQuartierModal(props: { open: boolean; onClose: () => void; }) {
  const { open, onClose,  } = props;
  
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
                <h2 className="font-bold text-[2.4rem] "> Consultation</h2>  
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>
        <form className="space-y-6">
            
            <div className='flex gap-10'>
                <div className="flex-1">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >Nom du quartier  </label> 
                    <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                      <span>Abattoir </span>
                    </div>          
                </div>
                <div className="flex-1">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >Region  </label>           
                    <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                      <span>MG01 </span>
                    </div>  
                </div>              
            </div>
          
          <div className='flex gap-5 '>
            <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Préfecture </label>         
            <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
              <span>Mamou </span>
            </div>
          </div>

           <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> CDR </label>         
            <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
              <span>Mamou</span>
            </div>
          </div>
          </div>
       
          <div className="flex justify-end gap-4 mt-8">  
            <button
              type="button"
              className="bg-white text-[1.6rem] font-bold border-2 px-6 py-3 rounded hover:bg-gray-50"
              onClick={onClose}
            >
              Fermer
            </button>
           
          </div>
        </form>
      </Box>
    </Modal>

    
    </>
  );
}