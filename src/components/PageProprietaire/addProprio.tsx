import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {proprietaireService} from '../../services/api'


interface AddProprioModalProps{
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddProprioModal({ open, onClose, onSuccess }: AddProprioModalProps) {
  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    email: "",
    adresse:""
  });

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null >(null)

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

      const proprioData = {
        ...formData,
        
      };

      //console.log(proprioData);
      await proprietaireService.create(proprioData);
      toast.success("proprietaire créé avec succès", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        
      });

      setFormData({
          nom: '',
          telephone: '',
          email: '',
          adresse: '',
          
      });
      onClose();
      onSuccess?.();
    }catch(error){
      setError('Erreur lors de la création du propriétaire');
      toast.error("Erreur lors de la création du propriétaire", {
       position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
                              
     });
      //console.error(error);
    }finally{
      setLoading(false);
    }
  }
  
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[600px] bg-white shadow-xl p-6 rounded">
        <div className='flex justify-between mb-5'>
        <div className='flex gap-5 items-center '>
            <img src="/src/assets/images/avatar.jpg"  className='w-[40px] h-[40px] ' alt="" />
            <h2 className="font-bold text-[2.4rem] "> Nouveau propriétaire</h2>  
        </div >
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className='flex gap-10 mb-2'>
          <div className='flex inline-block ' >
            
            <label htmlFor="" className='font-bold text-[1.6rem] ' >Nom du proprietaire <span className='text-[#F08130] '>*</span> </label>
            
            <input
            type="text"
            placeholder="Nom du proprietaire"
            className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded mb-10"
            value={formData.nom}
            onChange={(e)=>handleInputChange('nom', e.target.value)}
            required
          />
          
          
          <label htmlFor="" className='font-bold text-[1.6rem]'>Email <span className='text-[#F08130] '>*</span> </label> 
          
          <input
            type="email"
            placeholder="Email"
            className="border font-bold text-[1.4rem] border-gray-300 p-5 w-full rounded"
            value={formData.email}
            onChange={(e)=> handleInputChange('email', e.target.value)}
            required
          />

          </div>

          <div className='flex inline-block'>
          
          <label htmlFor="" className='font-bold text-[1.6rem]'>Telephone <span className='text-[#F08130] '>*</span> </label> 
          
          <input
            type="tel"
            placeholder="Téléphone"
            className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full  mb-10 "
            value={formData.telephone}
            onChange={(e)=>handleInputChange('telephone', e.target.value)}
          />
          
          <label htmlFor="" className='font-bold text-[1.6rem]'>Adresse <span className='text-[#F08130] '>*</span> </label> 
          
          <input
            type="text"
            placeholder="Adresse"
            className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
            value={formData.adresse}
            onChange={(e)=>handleInputChange('adresse', e.target.value)}
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
              className=" font-bold text-[1.6rem] px-4 py-2 rounded bg-[#F08130]"
              disabled={loading}
            >
              Enregistrer
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}