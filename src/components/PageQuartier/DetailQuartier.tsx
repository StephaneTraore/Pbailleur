import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FiEdit } from 'react-icons/fi';
import { Quartiers } from '../../services/quartier';
import { useLocation } from 'react-router-dom';



interface DetailQuartierModalProps{
  open: boolean;
  onClose: () => void;
  quartier?: Quartiers | null
}






export default function DetailQuartierModal( {open, onClose, quartier }:DetailQuartierModalProps) {
  
   if(!quartier){
    return null;
  }

  
  return (
    <>
     <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
     >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[691px] bg-white shadow-xl p-6 rounded">
        <div className='flex  justify-between mb-5'>               
            <h2 className="font-bold text-[2.4rem] "> Consultation</h2>  
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>
        <form className="space-y-6">
            
            <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5'>
                <div className="w-full md:w-1/2">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >Nom du quartier  </label> 
                    <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                      <span>{quartier.nom} </span>
                    </div>          
                </div>
                <div className="w-full md:w-1/2">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >Region  </label>           
                    <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                      <span>{quartier.nomRegion}</span>
                    </div>  
                </div>              
            </div>
          
          <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 '>
            <div className='w-full md:w-1/2'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Préfecture </label>         
            <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
              <span>{quartier.nomPrefecture} </span>
            </div>
          </div>

           <div className='w-full md:w-1/2'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> CDR </label>         
            <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
              <span>{quartier.nomSousPrefecture} </span>
            </div>
          </div>
          </div>
       
          <div className="flex  justify-end gap-4 mt-8">  
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