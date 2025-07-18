import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Site } from '../../services/api';

interface DetailSiteModalProps{
  open: boolean,
  onClose: ()=> void,
  site?: Site | null
}

export default function DetailSiteModal( { open, onClose, site }: DetailSiteModalProps) {
  
  if(!site){
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
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[843px] bg-white shadow-xl p-6 rounded">
        <div className='flex justify-between mb-5'> 
            <h2 className="font-bold text-[2.4rem] "> Consultation Site</h2>  
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>
        <form className="space-y-6">
            
            <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 '>
                <div className="w-full md:w-1/2 ">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >No Site  </label> 
                    <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                      <span>{site.numeroSite || 'non renseigné'} </span>
                    </div>          
                </div>
                <div className="w-full md:w-1/2 ">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >Nom du Site  </label>           
                    <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                      <span>{site.nomSite || 'non renseigné '} </span>
                    </div>  
                </div>
                <div className="w-full md:w-1/2 ">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Quartier  </label>
                    <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                      <span>{site.quartier || 'non renseigné'} </span>
                    </div>
                </div>               
            </div>
          
          <div className='flex flex-wrap md:flex-nowrap gap-5 lg:flex-nowrap '>
            <div className='w-full md:w-1/2'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Superficie m2 </label>         
            <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
              <span>{site.superficie || 'non rensigné'} </span>
            </div>
          </div>

           <div className='w-full md:w-1/2 '>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> H Pilone </label>         
            <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
              <span>{site.hPilone || 'non renseigné'} </span>
            </div>
          </div>

           <div className='w-full md:w-1/2 '>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Longitude </label>         
            <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
              <span>{site.longitude || 'non renseigné'}</span>
            </div>
          </div>

          </div>


            <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 '>
            <div className='w-full md:w-1/2 '>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Latitude </label>         
            <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
              <span>{site.latitude || 'non renseigné'}</span>
            </div>
          </div>

          
          <div className="w-full md:w-1/2 ">
              <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Type site  </label>
              <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                <span>{site.typeSite || 'non renseigné'}</span>
              </div>
          </div> 

           <div className='w-full md:w-1/2 '>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Date mise en service  </label>         
              <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                <span>{site.dateMiseEnService || 'non renseigné'}</span>
              </div>
          </div>
          </div>


           <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 '>

            <div className="w-full md:w-1/2 ">
              <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Etat site  </label>
              <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                <span>{site.etat || 'non renseigné'}</span>
              </div>
            </div>             

            <div className='w-full md:w-1/2'>
              <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Localisation </label>         
              <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold p-5  rounded" >                       
                <span >{site.localisation || 'non renseigné'}</span>
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