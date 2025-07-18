import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Select, Option } from "@material-tailwind/react";
import { IoIosArrowDown } from 'react-icons/io';
import { IoDocumentTextOutline } from "react-icons/io5";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 691,
  bgcolor: 'background.paper',
  border: 'none !important',
  boxShadow: 24,
  p: 4,
};





export default function AddContratModal(props: { open: boolean; onClose: () => void; }) {
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
             <div className='flex items-center gap-10'>
                <IoDocumentTextOutline size={24} color='#D7D7D7'/>  
            <h2 className="font-bold text-[2.4rem] "> Nouveau Contrat</h2>  
            </div> 
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>
        <form className="space-y-6">
            
            <div className='flex gap-10'>
                <div className="flex-1">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >Nom du Site <span className='text-[#F08130] '>*</span> </label>           
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
                <div className="flex-1">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Réf.contrat <span className='text-[#F08130] '>*</span> </label>
                    <input
                    type="number"
                    placeholder=""
                    className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
                    />
                </div>
                
            </div>
          
          <div className='flex gap-5 '>
            <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Debut contrat<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="date"
              placeholder="Superfice"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
            />
          </div>

           <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Fin contrat<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="date"
              placeholder="H Pilone"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
            />
          </div>
          </div>


            <div className='flex gap-5 '>
            <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Date d'élaboration<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="date"
              placeholder="Latitude"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
            />
          </div>

           <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Mt mensuel initial<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder=""
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
            />
          </div>
          </div>
         

         <div className='flex gap-5 '>
          <div className="flex-1">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Mt mensuel actuel <span className='text-[#F08130] '>*</span> </label>
                    <input
                    type="number"
                    placeholder=""
                    className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
                    />
                </div> 

           <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Taux d'augmentation <span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder=""
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
            />
          </div>
          </div>


           <div className='flex gap-5 '>

                    <div className="flex-1">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Taux CFU <span className='text-[#F08130] '>*</span> </label>
                    <input
                    type="text"
                    placeholder=""
                    className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
                    />
                   
            </div>             

            <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'>Taux de contrat<span className='text-[#F08130] '>*</span> </label>
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
                          En service
                        </Option>
                        <Option 
                          value="site2"
                          className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
                        >
                          Hors service
                        </Option>
                       
                      </Select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <IoIosArrowDown className="text-gray-500 text-xl" />
                      </div>
                    </div>       
          </div>

          
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
              className=" font-bold text-[1.6rem] px-6 py-3  rounded cursor-pointer bg-[#F08130]  text-black"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </Box>
    </Modal>

    
    </>
  );
}