import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Select, Option } from "@material-tailwind/react";
import { IoIosArrowDown, IoIosLink } from 'react-icons/io';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'90%',
  maxWidth: 804,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  
};





export default function AddSiteModal(props: { open: boolean; onClose: () => void; }) {
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
            <h2 className="font-bold text-[2.4rem] "> Nouveau site </h2>  
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>
        <form className="space-y-6">
            
            <div className='flex flex-wrap gap-10'>
                <div className="w-full md:w-1/2 lg:w-1/4">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >No Site <span className='text-[#F08130] '>*</span> </label>           
                    <input
                    type="text"
                    placeholder="Numero du site"
                    className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
                    />  
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >Nom du Site <span className='text-[#F08130] '>*</span> </label>           
                    <input
                    type="text"
                    placeholder="Nom du Site"
                    className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
                    />  
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Quartier <span className='text-[#F08130] '>*</span> </label>
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
          
          <div className='flex  flex-wrap gap-5 '>
            <div className='w-full md:w-1/2 lg:w-1/3'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Superficie m2<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder="Superfice"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
            />
          </div>

           <div className='w-full md:w-1/2 lg:w-1/3'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> H Pilone<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder="H Pilone"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
            />
          </div>
          </div>


            <div className='flex flex-wrap gap-5 '>
            <div className='w-full md:w-1/2 lg:w-1/3'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Latitude<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder="Latitude"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
            />
          </div>

           <div className='w-full md:w-1/2 lg:w-1/3'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Longitude<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder="Longitude"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
            />
          </div>
          </div>
         

         <div className='flex flex-wrap gap-5 '>
          <div className="w-full md:w-1/2 lg:w-1/3">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Type site <span className='text-[#F08130] '>*</span> </label>
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

           <div className='w-full md:w-1/2 lg:w-1/4'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Date mise en service <span className='text-[#F08130] '>*</span> </label>         
            <input
              type="date"
              placeholder="MM/JJ/AAAA"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
            />
          </div>
          </div>


           <div className='flex flex-wrap gap-5 '>

                    <div className="w-full md:w-1/2 lg:w-1/3">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Etat site <span className='text-[#F08130] '>*</span> </label>
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

            <div className='w-full md:w-1/2 lg:w-1/3'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Localisation<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="text"
              placeholder="Type Site"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
            />
          </div>

          
          </div>
         
          <div className="flex flex-wrap justify-end gap-4 mt-8">  
            <button
              type="button"
              className="bg-white text-[1.6rem] md:w-auto font-bold border-2 px-6 py-3 rounded hover:bg-gray-50"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="button"
              className=" font-bold text-[1.6rem] md:w-auto px-6 py-3 cursor-pointer rounded cursor-pointer bg-[#F08130]  text-black"
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