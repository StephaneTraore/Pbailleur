import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Select, Option } from "@material-tailwind/react";
import { IoIosArrowDown, IoIosLink } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { siteService } from '../../services/api';
import { Quartiers, QuartierService } from '../../services/quartier';
import { toast } from 'react-toastify';




interface AddSiteModalProps{
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}


export default function AddSiteModal({ open, onClose, onSuccess }: AddSiteModalProps) {

   const [quartiers, setQuartier] = useState<Quartiers[]>([]);


  const [formData, setFormData] = useState({
    numeroSite: '',
    nomSite: '',
    quartierId: '',
    superficie:'',
    hpilone:'',
    latitude:'',
    longitude:'',
    typeSite:'',
    dateMiseEnService:'',
    etat:'',
    localisation:''

  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchQuartier = async () => {
        try {
          const response = await QuartierService.getAll();
          console.log(response.data.data)
          setQuartier(response.data.data);
        } catch (error) {
          console.error("Erreur lors du chargement des Quartiers :", error);
        }
      };

    fetchQuartier();
  }, []);


  const handleInputChange = (field: string, value:string) =>{
    setFormData(prev=>({
      ...prev,
      [field]:value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();

    try{
      setLoading(true);
      setError(null)

      const siteData = {
        ...formData,
        superficie: parseFloat(formData.superficie),
        hpilone: parseFloat(formData.hpilone),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        quartierId: parseInt(formData.quartierId)
        
      };

     // console.log(siteData);
      await siteService.create(siteData);
      toast.success("Site créé avec succès", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        
      });

      

      setFormData({

          
          numeroSite: '',
          nomSite: '',
          quartierId: '',
          superficie:'',
          hpilone:'',
          latitude:'',
          longitude:'',
          typeSite:'',
          dateMiseEnService:'',
          etat:'',
          localisation:''
      });
      onClose();
      onSuccess?.();
    }catch(error){
      setError('Erreur lors de la création du site');
      console.error(error);
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
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[843px] bg-white shadow-xl p-6 rounded">
        <div className='flex justify-between  mb-5  '>   
            <h2 className="font-bold text-[2.4rem] "> Nouveau site </h2>  
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>

          {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-10'>
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <label  className='font-bold text-[1.6rem] mb-3 block' >No Site <span className='text-[#F08130] '>*</span> </label>           
                    <input
                    type="text"
                    placeholder="Numero du site"
                    className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
                    value={formData.numeroSite}
                    onChange={(e) => handleInputChange('numeroSite', e.target.value)}
                    required
                    />  
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <label  className='font-bold text-[1.6rem] mb-3 block' >Nom du Site <span className='text-[#F08130] '>*</span> </label>           
                    <input
                    type="text"
                    placeholder="Nom du Site"
                    className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
                    value={formData.nomSite}
                    onChange={(e) => handleInputChange('nomSite', e.target.value)}
                    required
                    />  
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <label  className='font-bold text-[1.6rem] mb-3 block'> Quartier <span className='text-[#F08130] '>*</span> </label>
                    <div className="relative">
                      <Select
                        className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                        placeholder="Sélectionner un site"
                        label=''
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
            <div className=' w-full md:w-1/2   '>
            <label  className='font-bold text-[1.6rem] mb-3 block'> Superficie m2<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder="Superfice"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.superficie}
              onChange={(e)=> handleInputChange('superficie', e.target.value)}
              required
            />
          </div>

           <div className='w-full md:w-1/2  '>
            <label  className='font-bold text-[1.6rem] mb-3 block'> H Pilone<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder="H Pilone"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.hpilone}
              onChange={(e)=> handleInputChange('hpilone', e.target.value)}
              required
            />
          </div>
          </div>


            <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 '>
            <div className='w-full md:w-1/2 '>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Latitude<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder="Latitude"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.latitude}
              onChange={(e)=> handleInputChange('latitude', e.target.value)}
              required
            />
          </div>

           <div className='w-full md:w-1/2  '>
            <label  className='font-bold text-[1.6rem] mb-3 block'> Longitude<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder="Longitude"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.longitude}
              onChange={(e)=> handleInputChange('longitude', e.target.value)}
              required
            />
          </div>
          </div>
         

         <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 '>
          <div className="w-full md:w-1/2 ">
                    <label  className='font-bold text-[1.6rem] mb-3 block'> Type site <span className='text-[#F08130] '>*</span> </label>
                    <div className="relative">
                      <Select
                        className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                        placeholder="Sélectionner un site"
                        onResize={() => {}}
                        value={formData.typeSite}
                        onChange={(value)=>handleInputChange('typeSite', value || "")}
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

           <div className='w-full md:w-1/2 '>
            <label  className='font-bold text-[1.6rem] mb-3 block'> Date mise en service <span className='text-[#F08130] '>*</span> </label>         
            <input
              type="date"
              placeholder="MM/JJ/AAAA"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.dateMiseEnService}
              onChange={(e)=>handleInputChange('dateMiseEnService', e.target.value)}
              required
            />
          </div>
          </div>


           <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 '>

                    <div className="w-full md:w-1/2 ">
                    <label  className='font-bold text-[1.6rem] mb-3 block'> Etat site <span className='text-[#F08130] '>*</span> </label>
                    <div className="relative">
                      <Select
                        className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                        placeholder="Sélectionner un site"
                        value={formData.etat}
                        onChange={(value) => handleInputChange('etat', value || "")}
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

            <div className='w-full md:w-1/2 '>
            <label  className='font-bold text-[1.6rem] mb-3 block'> Localisation<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="text"
              placeholder="Type Site"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.localisation}
              onChange={(e) => handleInputChange('localisation', e.target.value)}
              required
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
              type="submit"
              className=" font-bold text-[1.6rem] md:w-auto px-6 py-3  rounded cursor-pointer bg-[#F08130]  text-black"
              disabled={loading}
            >
              {loading ? 'Chargement...':'Enregistrer'}
            </button>
          </div>
        </form>
      </Box>
    </Modal>

    
    </>
  );
}