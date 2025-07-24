import React, { use, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FiEdit } from "react-icons/fi";
import { Proprietaire, proprietaireService } from '../../services/proprietaire';
import { toast } from 'react-toastify';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface modifierModalProps{
  open: boolean;
  onClose: () => void;
  proprio? : Proprietaire | null;
  onSuccess?: () => void;
}


export default function ModifierModal({ open, onClose, onSuccess, proprio }: modifierModalProps ) {

  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    email: "",
    adresse:""
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(()=>{
    if(proprio && open){
      setFormData({
        nom:proprio.nom || '',
        telephone: proprio.telephone || '',
        email: proprio.email || '',
        adresse: proprio.adresse || ''
      })
    }
  }, [proprio, open]);

 

    const handleInputChange= (field: string, value: string) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };
  
    const handleSubmit = async(e:React.FormEvent)=>{
       e.preventDefault();
      
      if (!proprio?.id) {
        setError('Site non trouvé');
        return;
      }
  
      try{
        setLoading(true);
        setError(null);
  
        const proprioData = {
          ...formData,
         
        };
  
        await proprietaireService.update(proprio.id, proprioData);
        toast.success("proprietaire modifié avec success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        
      });
        
        onClose();
        onSuccess?.();
  
      }catch{
        setError('Erreur lors de la modification du proprietaire')
       toast.error("Erreur lors de la modification du proprietaire", {
        position: "top-right",
        autoClose: 5000,
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
      <Box sx={style}>
        <div className='flex justify-between mb-5'>
        <div className='flex gap-5 items-center '>
            <FiEdit />
            <h2 className="font-bold text-[2.4rem] "> Modification</h2>  
        </div >
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>

         {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className='flex gap-10 mb-2'>
          <div className='flex inline-block ' >
            
            <label htmlFor="" className='font-bold text-[1.6rem] ' >Nom du proprietaire <span className='text-[#F08130] '>*</span> </label>
            
            <input
            type="text"
            placeholder="Nom"
            className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded mb-10"
            value={formData.nom}
            onChange={(e)=> handleInputChange('nom', e.target.value)}
          />
          
          
          <label htmlFor="" className='font-bold text-[1.6rem]'>Email <span className='text-[#F08130] '>*</span> </label> 
          
          <input
            type="email"
            placeholder="Email"
            className="border font-bold text-[1.4rem] border-gray-300 p-5 w-full rounded"
            value={formData.email}
            onChange={(e)=> handleInputChange('email', e.target.value)}
          />

          </div>

          <div className='flex inline-block'>
          
          <label htmlFor="" className='font-bold text-[1.6rem]'>Telephone <span className='text-[#F08130] '>*</span> </label> 
          
          <input
            type="tel"
            placeholder="Téléphone"
            className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full  mb-10 "
            value={formData.telephone}
            onChange={(e)=> handleInputChange('telephone', e.target.value)}
          />
          
          <label htmlFor="" className='font-bold text-[1.6rem]'>Adresse <span className='text-[#F08130] '>*</span> </label> 
          
          <input
            type="text"
            placeholder="Adresse"
            className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
            value={formData.adresse}
            onChange={(e)=> handleInputChange('adresse', e.target.value)}
          />
          </div>
          </div>
         
          <div className="flex justify-end gap-2 mt-4">  
            <button
              type="button"
              className="bg-white text-[1.6rem] font-bold border-2 px-4 py-2 rounded"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              
              className=" font-bold text-[1.6rem] px-4 cursor-pointer py-2 rounded bg-[#F08130]"
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