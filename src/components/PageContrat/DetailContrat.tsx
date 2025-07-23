import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FiEdit } from 'react-icons/fi';
import { IoIosArrowDown, IoIosLink } from 'react-icons/io';
import { Contrats } from '../../services/contrat';



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

interface DetailContratModalProps{
  open:boolean,
  onClose: () => void,
  contrat?: Contrats | null
}




export default function DetailContratModal({ open, onClose, contrat }:DetailContratModalProps) {

    if(!contrat){
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
      <Box sx={style}>
        <div className='flex justify-between mb-5'> 
             <div className='flex items-center gap-10'>
                <FiEdit size={24} color='#D7D7D7'/>  
                <h2 className="font-bold text-[2.4rem] "> Consultation</h2>  
               </div> 
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>
        <form className="space-y-6">
            
            <div className='flex gap-10'>
                <div className="flex-1">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >Nom du Site  </label> 
                    <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                      <span>{contrat.nomSite} </span>
                    </div>          
                </div>
                <div className="flex-1">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >Ref.contrat  </label>           
                    <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                      <span>{contrat.reference}</span>
                    </div>  
                </div>              
            </div>
          
          <div className='flex gap-5 '>
            <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Debut contrat </label>         
            <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
              <span>{contrat.dateDebut} </span>
            </div>
          </div>

           <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Fin contrat </label>         
            <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
              <span>{contrat.dateFin} </span>
            </div>
          </div>
          </div>

            <div className='flex gap-5 '>
            <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Date d'élaboration </label>         
            <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
              <span> {contrat.dateElaboration} </span>
            </div>
          </div>

          
          <div className="flex-1">
              <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Mt mensuel initial  </label>
              <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                <span>{contrat.montantMensuelInitial}</span>
              </div>
          </div> 
          </div>


           <div className='flex gap-5 '>
            <div className="flex-1">
              <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Mt mensuel actuel  </label>
              <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                <span>{contrat.montantMensuelActuel || 'non renseigné'}</span>
              </div>
            </div>             

            <div className='flex-1'>
              <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Taux augmentation </label>         
              <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold p-5  rounded" >                       
                <span >{contrat.tauxAugmentation}</span>
              </div>
          </div>   
          </div>


             <div className='flex gap-5 '>
            <div className="flex-1">
              <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Taux CFU  </label>
              <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                <span>{contrat.tauxCfu}</span>
              </div>
            </div>             

            <div className='flex-1'>
              <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Type de contrat </label>         
              <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold p-5  rounded" >                       
                <span >{contrat.typeContrat}</span>
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