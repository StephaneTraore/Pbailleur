import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoIosLink, IoIosArrowDown } from 'react-icons/io';
import { Select, Option } from "@material-tailwind/react";
import { toast } from 'react-toastify';
import { Contrats } from '../../models/contrat';
import { ContratProprietaireResponseDto } from '../../models/contratProprietaire';
import { Proprietaire } from '../../models/proprietaires';
import { contratService, contratProprietaireService } from '../../services/api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 6,
};


interface ContratAjoutProps{
  nom:string;
  open: boolean;
  onClose: ()=> void;
  onSuccess: ()=> void;
  proprietaire: Proprietaire | null ;
  contratProprietaire?: ContratProprietaireResponseDto ;
}

export default function ContratModificationModal2({ open, nom, onSuccess, onClose, proprietaire, contratProprietaire}: ContratAjoutProps) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contrat, setContrat] = useState<Contrats[]>([]);



  useEffect(() => { 
    const fetchContrat = async () => {
      try {
                  const response = await contratService.getAll();
                  setContrat(response.data.data.content);
                } catch (error) {
                  console.error("Erreur lors du chargement des contrat :", error);
                }
              };
        
            fetchContrat();
          }, []);

          
  useEffect(()=>{
    if( contratProprietaire && open){
      setFormData({
       
        idContrat: contratProprietaire.contratId.toString() || '',
        idProprietaire: proprietaire?.id,
        idSite: contratProprietaire.siteId.toString(),
        partPourcent: contratProprietaire.partPourcent.toString(),

      })
    }
  }, [contratProprietaire, open]);



  useEffect(() => {
  if (proprietaire?.id) {
    setFormData((prev) => ({
      ...prev,
      idProprietaire: proprietaire.id,
    }));
  }
}, [proprietaire]); 



    const [formData, setFormData] = useState({

      idContrat:  '',
      idProprietaire: proprietaire?.id,
      idSite: '',
      partPourcent: '',
             
    });

    


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
  
        const contratData = {
          ...formData,
           idContrat:parseInt(formData.idContrat),
           idSite: parseInt(formData.idSite),
           partPourcent: parseFloat(formData.partPourcent),
     
        };   

        await contratProprietaireService.update(contratProprietaire?.id ?? 0, contratData);
        toast.success("Contrat mis à jour avec success", {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
                
          });
        onClose();
        onSuccess?.();
      }catch(error){
        setError('Erreur lors de la mise à jour du contrat');
        toast.error("Erreur lors de la mise à jour du contrat", {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
                
          });
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
        <div className='flex gap-5 items-center '>
            <IoIosLink size={18} color="#000" />
            <h2 className="font-bold text-[2.4rem] "> Liaison propriétaire-Contrat </h2>  
        </div >
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className='flex gap-10'>
                <div className="flex-1">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >Nom du proprietaire <span className='text-[#F08130] '>*</span> </label>           
                    <div className=" text-[1.4rem] bg-[#F6F6F6] font-bold  p-5 rounded" >                       
                    <span>{proprietaire?.nom} </span>
                    
                    </div> 
                </div>
                <div className="flex-1">
                    <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Site <span className='text-[#F08130] '>*</span> </label>
                    <div className="relative">
                      <Select
                        className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                        placeholder="Sélectionner un site"
                        onResize={() => {}}
                        //value={contratProprietaire?.siteNom}
                        value={formData.idSite ? contrat.find(c => c.siteId.toString() === formData.idSite)?.nomSite || '' : ''}
                        onChange={(value) => {
                        const selectedContrat = contrat.find( c => c.nomSite  === value);
                        console.log(selectedContrat);
                        if (selectedContrat) {
                          setFormData(prev => ({
                            ...prev,    
    
                            idContrat: selectedContrat.id as unknown as string ,
                            idSite: selectedContrat.siteId.toString(),                     
                          }                       
                        ));
                        }
                      
                      }}   

                      
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
                        {contrat.map(contrat => (
                            <Option className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]" 
                              key={contrat.id} value={contrat.nomSite}>
                              {contrat.nomSite}
                          </Option>
                            ))}
                      </Select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <IoIosArrowDown className="text-gray-500 text-xl" />
                      </div>
                    </div>
                </div>
                
            </div>
          
          <div>
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Part %<span className='text-[#F08130] '>*</span> </label>         
            <input
              type="number"
              placeholder="Part"
              className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
              value={formData.partPourcent}
              onChange={(e)=>handleInputChange('partPourcent', e.target.value)}
            />
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
              {nom}
            </button>
          </div>
        </form>
      </Box>
    </Modal>

    
    </>
  );
}