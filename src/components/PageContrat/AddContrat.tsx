import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Select, Option } from "@material-tailwind/react";
import { IoIosArrowDown } from 'react-icons/io';
import { IoDocumentTextOutline } from "react-icons/io5";
import { Site, siteService } from '../../services/api';
import { useEffect, useState } from 'react';
import { contratService } from '../../services/contrat';




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


interface AddContratsModalProps{
  open: boolean;
  onClose: () => void;
  onSuccess?: ()=> void;
  site?: Site | null;
}


export default function AddContratModal({open, onClose, onSuccess }: AddContratsModalProps) {

   const [sites, setSites] = useState<Site[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);


    const [formData, setFormData] = useState({
    nomSite: '',
    reference: '',
    dateDebut: '',
    dateFin: '',
    dateElaboration: '',
    montantMensuelInitial: '',
    montantMensuelActuel: '',
    tauxAugmentation: '',
    tauxCfu: '',
    typeContrat: '',
    siteId: '',

  })


     useEffect(() => {
        const fetchSites = async () => {
          try {
            const response = await siteService.getAll();
            setSites(response.data.data.content);
          } catch (error) {
            console.error("Erreur lors du chargement des sites :", error);
          }
        };
  
      fetchSites();
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
          montantMensuelInitial: parseFloat(formData.montantMensuelInitial),
          montantMensuelActuel: parseFloat(formData.montantMensuelActuel),
          tauxAugmentation: parseInt(formData.tauxAugmentation),
          tauxCfu: parseInt(formData.tauxCfu),
          siteId: parseInt(formData.siteId)
          
        };
  
        
        await contratService.create(siteData);
  
        console.log('donnée envoyé',siteData);
  
        setFormData({    
          nomSite: '',
          reference: '',
          dateDebut: '',
          dateFin: '',
          dateElaboration: '',
          montantMensuelInitial: '',
          montantMensuelActuel: '',
          tauxAugmentation: '',
          tauxCfu: '',
          typeContrat: '',
          siteId: '',
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
      <Box sx={style}>
        <div className='flex justify-between mb-5'>   
             <div className='flex items-center gap-10'>
                <IoDocumentTextOutline size={24} color='#D7D7D7'/>  
            <h2 className="font-bold text-[2.4rem] "> Nouveau Contrat</h2>  
            </div> 
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className='flex gap-10'>
                <div className="flex-1">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >Nom du Site <span className='text-[#F08130] '>*</span> </label>           
                    <div className="relative">
                      <Select
                        className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                        placeholder="Sélectionner un site"
                        value={formData.nomSite}
                        onChange={(value) => {
                        const selectedSite = sites.find(s => s.nomSite === value);
                        if (selectedSite) {
                          setFormData(prev => ({
                            ...prev,    
                            siteId: selectedSite.id as unknown as string,
                            nomSite: selectedSite.nomSite,
                           
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
                        {sites.map(site => (
                            <Option className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]" 
                              key={site.id} value={site.nomSite}>
                              {site.nomSite}
                          </Option>
                            ))}
                      </Select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <IoIosArrowDown className="text-gray-500 text-xl" />
                      </div>
                    </div>  
                </div>
                <div className="flex-1">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Réf.contrat <span className='text-[#F08130] '>*</span> </label>
                    <input
                    type="text"
                    placeholder=""
                    className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
                    value={formData.reference}
                    onChange={(e)=> handleInputChange('reference', e.target.value)}
                    />
                </div>
                
            </div>
          
          <div className='flex gap-5 '>
            <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Debut contrat<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="date"
              placeholder="date debut"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.dateDebut}
              onChange={(e)=> handleInputChange('dateDebut', e.target.value)}
            />
          </div>

           <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Fin contrat<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="date"
              placeholder="Date Fin"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.dateFin}
              onChange={(e)=> handleInputChange('dateFin', e.target.value)}
            />
          </div>
          </div>


            <div className='flex gap-5 '>
            <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Date d'élaboration<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="date"
              placeholder="Date elaboration"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.dateElaboration}
              onChange={(e)=> handleInputChange('dateElaboration', e.target.value)}
            />
          </div>

           <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Mt mensuel initial<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder=""
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.montantMensuelInitial }
              onChange={(e)=> handleInputChange('montantMensuelInitial', e.target.value)}             
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
                    value={formData.montantMensuelActuel}
                    onChange={(e)=> handleInputChange('montantMensuelActuel', e.target.value)}
                    />
                </div> 

           <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Taux d'augmentation <span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder=""
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.tauxAugmentation}
              onChange={(e)=> handleInputChange('tauxAugmentation', e.target.value)}
            />
          </div>
          </div>


           <div className='flex gap-5 '>

                    <div className="flex-1">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Taux CFU <span className='text-[#F08130] '>*</span> </label>
                    <input
                    type="number"
                    placeholder="Taux cfu"
                    className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
                    value={formData.tauxCfu}
                    onChange={(e)=> handleInputChange('tauxCfu', e.target.value)}
                    />
                   
            </div>             

            <div className='flex-1'>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'>Type de contrat<span className='text-[#F08130] '>*</span> </label>
             <div className="relative">
                      <Select
                        className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                        placeholder="Sélectionner un site"
                        onResize={() => {}}
                        value={formData.typeContrat}
                        onChange={(value)=> handleInputChange('typeContrat', value || '')}
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
                          value="LOCATION"
                          className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
                        >
                          Location
                        </Option>
                        <Option 
                          value="PROPRIETARY"
                          className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
                        >
                          proprietary
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
              type="submit"
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