import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Select, Option } from "@material-tailwind/react";
import { IoIosArrowDown, IoIosLink } from 'react-icons/io';
import { FiEdit } from "react-icons/fi";
import { Site, siteService } from '../../services/api';
import { useEffect, useState } from 'react';



// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 804,
//   bgcolor: 'background.paper',
//   //border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

interface EditSiteModalProps{

  open:boolean;
  onClose: () => void;
  site?: Site | null;
  onSuccess?: () => void;
}




export default function EditSiteModal({ open, onClose,onSuccess, site }: EditSiteModalProps) {

  const [formData, setFormData] = useState({
     numeroSite: '',
    nomSite: '',
    quartier: '',
    nomCrd: '',
    prefecture: '',
    superficie:'',
    hPilone:'',
    latitude:'',
    longitude:'',
    typeSite:'',
    dateMiseEnService:'',
    etat:'',
    localisation:''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (site && open) {
      setFormData({
        numeroSite: site.numeroSite || '',
        nomSite: site.nomSite || '',
        quartier: site.quartier || '',
        nomCrd: site.nomCrd || '',
        prefecture: site.prefecture || '',
        superficie: site.superficie?.toString() || '',
        hPilone: site.hPilone?.toString() || '',
        latitude: site.latitude?.toString() || '',
        longitude: site.longitude?.toString() || '',
        typeSite: site.typeSite || '',
        dateMiseEnService: site.dateMiseEnService || '',
        etat: site.etat || '',
        localisation: site.localisation || '',
      });
    }
  }, [site, open]);

  const handleInputChange= (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async(e:React.FormEvent)=>{
     e.preventDefault();
    
    if (!site?.id) {
      setError('Site non trouvé');
      return;
    }

    try{
      setLoading(true);
      setError(null);

      const siteData = {
        ...formData,
        superficie: parseFloat(formData.superficie),
        hPilone: parseFloat(formData.hPilone),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      };

      await siteService.update(site.id, siteData);
      
      onClose();
      onSuccess?.();

    }catch{
      setError('Erreur lors de la modification du site')
    }finally{
      setLoading(false);
    }
  }
  
  return (
    <>
     <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[804px] bg-white shadow-xl p-6 rounded">
        <div className='flex justify-between mb-5'> 
          <div className='flex items-center gap-10'>
            <FiEdit size={24} color='#D7D7D7'/>  
            <h2 className="font-bold text-[2.4rem] "> Modification</h2>  
          </div>
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>

         {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5'>
                <div className="w-full md:w-1/2">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >No Site <span className='text-[#F08130] '>*</span> </label>           
                    <input
                    type="text"
                    placeholder="Numero du site"
                    className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
                    value={formData.numeroSite}
                    onChange={(e)=> handleInputChange('numeroSite', e.target.value)}
                    />  
                </div>
                <div className="w-full md:w-1/2">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >Nom du Site <span className='text-[#F08130] '>*</span> </label>           
                    <input
                    type="text"
                    placeholder="Nom du Site"
                    className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
                    value={formData.nomSite}
                    onChange={(e)=> handleInputChange('nomSite', e.target.value)}
                    />  
                </div>
                <div className="w-full md:w-1/2">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Quartier <span className='text-[#F08130] '>*</span> </label>
                    <div className="relative">
                      <Select
                        className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                        placeholder="Sélectionner un site"
                        value={formData.quartier}
                        onChange={(value)=> handleInputChange('quartier', value || '')}
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
          
          <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 '>
            <div className='w-full md:w-1/2'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Superficie m2<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder="Superfice"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.superficie}
              onChange={(e)=> handleInputChange('superficie', e.target.value)}
            />
          </div>

           <div className='w-full md:w-1/2'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> H Pilone<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder="H Pilone"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.hPilone}
              onChange={(e)=> handleInputChange('hPilone', e.target.value)}
            />
          </div>

           <div className='w-full md:w-1/2'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Longitude<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder="Longitude"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.longitude}
              onChange={(e)=> handleInputChange('longitude', e.target.value)}
            />
          </div>

          </div>


            <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 '>
            <div className='w-full md:w-1/2'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Latitude<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder="Latitude"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.latitude}
              onChange={(e)=> handleInputChange('latitude', e.target.value)}
            />
          </div>

          
          <div className="w-full md:w-1/2">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Type site <span className='text-[#F08130] '>*</span> </label>
                    <div className="relative">
                      <Select
                        className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                        placeholder="Sélectionner un site"
                        value={formData.typeSite}
                        onChange={(value)=> handleInputChange('typeSite', value || '')}
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

           <div className='w-full md:w-1/2'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Date mise en service <span className='text-[#F08130] '>*</span> </label>         
            <input
              type="date"
              placeholder="MM/JJ/AAAA"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.dateMiseEnService}
              onChange={(e)=>handleInputChange('dateMiseEnService', e.target.value)}
            />
          </div>
          </div>


           <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 '>

                    <div className="w-full md:w-1/2">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Etat site <span className='text-[#F08130] '>*</span> </label>
                    <div className="relative">
                      <Select
                        className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                        placeholder="Sélectionner un site"
                        value={formData.etat}
                        onChange={(value)=> handleInputChange('etat', value || '')}
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

            <div className='w-full md:w-1/2'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Localisation<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="text"
              placeholder="Type Site"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.localisation}
              onChange={(e)=>handleInputChange('localisation', e.target.value)}
            />
          </div>

          
          </div>
         
          <div className="flex flex-wrap  justify-end gap-4 mt-8">  
            <button
              type="button"
              className="bg-white text-[1.6rem] font-bold border-2 px-6 py-3 rounded hover:bg-gray-50"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className=" font-bold text-[1.6rem] px-6 py-3  rounded cursor-pointer bg-[#F08130]  text-black"
            >
              {loading ? 'Modification...' : 'Modifier'}
            </button>
          </div>
        </form>
      </Box>
    </Modal>

    
    </>
  );
}