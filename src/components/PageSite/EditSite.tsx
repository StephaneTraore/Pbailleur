import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Select, Option } from "@material-tailwind/react";
import { IoIosArrowDown, } from 'react-icons/io';
import { FiEdit } from "react-icons/fi";
import { SiteRequestDto, siteService } from '../../services/api';
import { useEffect, useState } from 'react';
import { Quartiers, QuartierService } from '../../services/quartier';
import { toast } from 'react-toastify';





interface EditSiteModalProps{

  open:boolean;
  onClose: () => void;
  site?: SiteRequestDto | null;
  onSuccess?: () => void;
}


export default function EditSiteModal({ open, onClose,onSuccess, site }: EditSiteModalProps) {

  const [formData, setFormData] = useState({
    id: site?.id,
    numeroSite: '',
    nomSite: '',
    quartierId: '',
    superficie:'',
    hpilone: '',
    latitude:'',
    longitude:'',
    typeSite:'',
    dateMiseEnService:'',
    etat:'',
    localisation:''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [quartiers, setQuartier] = useState<Quartiers[]>([]);

     useEffect(() => {
        const fetchQuartier = async () => {
          try {
            const response = await QuartierService.getAll();
            setQuartier(response.data.data);
          } catch (error) {
            console.error("Erreur lors du chargement des Quartiers :", error);
          }
        };
  
      fetchQuartier();
    }, []);

   
useEffect(() => {
  if (site && open && quartiers.length > 0) {
    const matchedQuartier = quartiers.find(q => q.nom === (site as any).nomQuartier);
    const quartierId = matchedQuartier?.id?.toString() || '';

    setFormData({
      id: site.id,
      numeroSite: site.numeroSite || '',
      nomSite: site.nomSite || '',
      superficie: site.superficie?.toString() || '',
      quartierId: quartierId,
      hpilone: site.hpilone?.toString() || '',
      latitude: site.latitude?.toString() || '',
      longitude: site.longitude?.toString() || '',
      typeSite: site.typeSite || '',
      dateMiseEnService: site.dateMiseEnService || '',
      etat: site.etat || '',
      localisation: site.localisation || '',
    });
  }
}, [site, open, quartiers]);

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
        hpilone: parseFloat(formData.hpilone),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        quartierId: parseInt(formData.quartierId)
      };

     

      await siteService.update(site.id, siteData);
       toast.success("Site mis à jour avec succès", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              
      });
      
      onClose();
      onSuccess?.();

    }catch{
      setError('Erreur lors de la modification du site')
             toast.error("Erreur lors de la modification du site", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              
      });
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
                        value = {formData.quartierId} 
                        onChange={(value) => {
                        const selectedQuartier = quartiers.find(q => q.id.toString() === value);
                        if (selectedQuartier) {
                          setFormData(prev => ({
                            ...prev,
                           
                            quartierId: selectedQuartier.id.toString(),
                            
                          }));
                        }
                      }}  
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
                    
                        {quartiers.map(quartier => (
                            <Option className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]" 
                              key={quartier.id} value={quartier.id.toString()}>
                              {quartier.nom}
                          </Option>
                            ))}
                        
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
              value={formData.hpilone}
              onChange={(e)=> handleInputChange('hpilone', e.target.value)}
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
                         <Option value="HAUBANE"
                          className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
                        >
                          Haubane
                        </Option>
                        <Option 
                          value="AUTO_STABLE"
                          className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
                        >
                          Auto_Stable
                        </Option>
                        <Option 
                          value="PILONET"
                          className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
                        >
                          Pilonet
                        </Option>

                         <Option 
                          value="INCONNU"
                          className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
                        >
                          Inconnu
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
                          value="EN_SERVICE"
                          className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
                        >
                          En service
                        </Option>
                        <Option 
                          value="HORS_SERVICE"
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