import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Select, Option } from "@material-tailwind/react";
import { IoIosArrowDown} from 'react-icons/io';
import { useEffect, useState } from 'react';
import {  QuartierService, Region, RegionService} from '../../services/quartier';
import React from 'react';
import { toast } from 'react-toastify';



interface AddQuartierModalProps{
  open: boolean;
  onClose: () => void;
  onSuccess?: ()=> void;
}

export default function AddQuartierModal({open, onClose, onSuccess }: AddQuartierModalProps) {

  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegionId, setSelectedRegionId] = useState<string>("");
  const [selectedPrefectureId, setSelectedPrefectureId] = useState<string | undefined>();
  const [selectedSousPrefectureId, setSelectedSousPrefectureId] = useState<string | undefined>();


  const [prefectures, setPrefectures] = useState<any[]>([]);
  const [sousPrefectures, setSousPrefectures] = useState<any[]>([]);

 useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await RegionService.getAll();
        setRegions(response.data.data);
      } catch (error) {
        console.error("Erreur lors du chargement des régions :", error);
      }
    };

    fetchRegions();
  }, []);


   // ➤ Charger les préfectures lorsqu'une région est sélectionnée
  useEffect(() => {
    if (selectedRegionId) {
      const region = regions.find(r => r.id.toString() === selectedRegionId);
      setPrefectures(region?.prefectures || []);
      setSelectedPrefectureId(undefined); // reset
      setSousPrefectures([]);
    }
  }, [selectedRegionId]);

  // ➤ Charger les sous-préfectures lorsqu'une préfecture est sélectionnée
  useEffect(() => {
    if (selectedPrefectureId) {
      const prefecture = prefectures.find(p => p.id.toString() === selectedPrefectureId);
      setSousPrefectures(prefecture?.sousPrefectures || []);
      setSelectedSousPrefectureId(undefined); // reset
    }
  }, [selectedPrefectureId]);
   const [formData, setFormData] = useState({
      nom: '',
      nomSousPrefecture: '',
      nomPrefecture: '',
      nomRegion: '',
      sousPrefectureId: ''    
    })

     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);

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
  
        const quartierData = {
          ...formData,

        };
  
        //console.log(quartierData);
        await QuartierService.create(quartierData);
        toast.success("Quartier créé avec success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            
          });
  
        
  
        setFormData({
            nom: '',
            nomSousPrefecture: '',
            nomPrefecture: '',
            nomRegion: '',
            sousPrefectureId: ''
            

        });
        onClose();
        onSuccess?.();
      }catch(error){
        setError('Erreur lors de la création du quartier');
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
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[691px] bg-white shadow-xl p-6 rounded">
        <div className='flex justify-between sm:gap-5 mb-5'>   
            <h2 className="font-bold text-[2.4rem] "> Nouveau quartier </h2>  
         <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className='flex flex-wrap md:flex-nowrap gap-5 lg:flex-nowrap'>
                <div className="w-full md:w-1/2">
                    <label  className='font-bold text-[1.6rem] mb-3 block' >Nom du quartier <span className='text-[#F08130] '>*</span> </label>           
                    <input
                    type="text"
                    placeholder="Numero du quartier"
                    className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
                    value={formData.nom}
                    onChange={(e)=>handleInputChange('nom', e.target.value)}
                    />  
                </div>

                <div className="w-full md:w-1/2">
                    <label  className='font-bold text-[1.6rem] mb-3 block'> Region <span className='text-[#F08130] '>*</span> </label>
                    <div className="relative">

                        <Select
                        className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                        placeholder="Sélectionner un site"
                        onResize={() => {}}
                        value={selectedRegionId}
                         onChange={(value) => {
                          setSelectedRegionId(value || '');
                          const selected = regions.find(r => r.id.toString() === value);
                          if (selected) {
                            handleInputChange('nomRegion', selected.nom);
                            console.log(selected.nom)
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
                         
                         {regions.map(region => (
                          <Option className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]" 
                          key={region.id} value={region.id.toString()}>
                            {region.nom}
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
            <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Prefecture<span className='text-[#F08130] '>*</span> </label>         
              <div className="relative">
                
                      <Select
                        className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                        placeholder="Sélectionner un site"
                        onResize={() => {}}
                        value={selectedPrefectureId}
                        onChange={(value) => {
                          setSelectedPrefectureId(value);
                          const selected = prefectures.find(p => p.id.toString() === value);
                          if (selected) {
                            handleInputChange('nomPrefecture', selected.nom);
                            console.log(selected.nom)
                          }
                        }}
                        disabled={!prefectures.length}
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
                            {prefectures.map(pref => (
                              <Option className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]" key={pref.id} value={pref.id.toString()}>
                                {pref.nom}
                              </Option>
                            ))}
                      </Select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <IoIosArrowDown className="text-gray-500 text-xl" />
                      </div>
                    </div>
          </div>

           <div className='w-full md:w-1/2'>
            <label  className='font-bold text-[1.6rem] mb-3 block'> Sous-prefecture <span className='text-[#F08130] '>*</span> </label>         
              <div className="relative">
                      <Select
                        className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                        placeholder="Sélectionner un site"
                        onResize={() => {}}
                        value={selectedSousPrefectureId}
                        onChange={(value) => {
                          setSelectedSousPrefectureId(value);
                          const selected = sousPrefectures.find(sp => sp.id.toString() === value);
                          if (selected) {
                            handleInputChange('nomSousPrefecture', selected.nomSousPrefecture);
                            handleInputChange('sousPrefectureId', selected.id.toString());

                            console.log(selected.nomSousPrefecture)
                            console.log(selected.id.toString())
                          }
                        }}
                        disabled={!sousPrefectures.length}
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

                         {sousPrefectures.map(sp => (
                          <Option className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]" key={sp.id} value={sp.id.toString()}>
                            {sp.nomSousPrefecture}
                          </Option>
                        ))}
                      </Select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <IoIosArrowDown className="text-gray-500 text-xl" />
                      </div>
                    </div>
          </div>
          </div>
         
          <div className="flex flex-wrap justify-end gap-4 mt-8">  
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



