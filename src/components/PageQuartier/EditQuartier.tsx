// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import { Select, Option } from "@material-tailwind/react";
// import { IoIosArrowDown, IoIosLink } from 'react-icons/io';
// import { FiEdit } from 'react-icons/fi';
// import { Quartiers, QuartierService } from '../../services/quartier';
// import { useEffect, useState } from 'react';



// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 691,
//   bgcolor: 'background.paper',
//   //border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// interface EditQuartierModalProps{
//   open: boolean;
//   onClose: ()=> void;
//   quartier?: Quartiers | null;
//   onSuccess: () => void;
// }



// export default function EditQuartierModal( { open, onClose, quartier, onSuccess}: EditQuartierModalProps) {
  
//     const [formData, setFormData] = useState({

//       nom: '',
//       nomRegion: '',
//       nomPrefecture: '',
//       nomSousPrefecture: '',
//       sousPrefectureId: ''
      
     
//     });

//      const [loading, setLoading] = useState(false);
//      const [error, setError] = useState<string | null>(null);

//        useEffect(() => {
//          if (quartier && open) {
//            setFormData({
//              nom: quartier.nom || '',
//              nomRegion: quartier.nomRegion|| '',
//              nomPrefecture: quartier.nomPrefecture || '',
//              nomSousPrefecture: quartier.nomSousPrefecture || '',
//              sousPrefectureId: quartier.sousPrefectureId || ''
             
             
//            });
//          }
//        }, [quartier, open]);

//        console.log(quartier?.nom)


//          const handleInputChange= (field: string, value: string) => {
//            setFormData(prev => ({
//              ...prev,
//              [field]: value
//            }));
//          };
       
//          const handleSubmit = async(e:React.FormEvent)=>{
//             e.preventDefault();
           
//            if (!quartier?.id) {
//              setError('Site non trouvé');
//              return;
//            }
       
//            try{
//              setLoading(true);
//              setError(null);
       
//              const quartierData = {
//                ...formData,
               
//              };
       
//              await QuartierService.update(quartier.id, quartierData);
             
//              onClose();
//              onSuccess?.();
       
//            }catch{
//              setError('Erreur lors de la modification du quartier')
//            }finally{
//              setLoading(false);
//            }
//          }
  
//   return (
//     <>
//      <Modal
//       open={open}
//       onClose={onClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={style}>
//         <div className='flex justify-between mb-5'>   
//             <div className='flex items-center gap-10'>
//                 <FiEdit size={24} color='#D7D7D7'/>  
//                 <h2 className="font-bold text-[2.4rem] "> Modification</h2>  
//              </div> 
//          <button onClick={onClose} className=' text-[20px] gap-10 cursor-pointer '>x</button>
//         </div>
//           {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}
//         <form className="space-y-6">
            
//             <div className='flex gap-10'>
//                 <div className="flex-1">
//                     <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block' >Nom du quartier <span className='text-[#F08130] '>*</span> </label>           
//                     <input
//                     type="text"
//                     placeholder=""
//                     className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
//                     value={formData.nom}
//                     onChange={(e)=> handleInputChange('nom', e.target.value)}
//                     />  
//                 </div>

//                 <div className="flex-1">
//                     <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Region <span className='text-[#F08130] '>*</span> </label>
//                     <div className="relative">
//                       <Select
//                         className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
//                         placeholder="Sélectionner un site"
//                         value={formData.nomRegion}
//                         onChange={(value)=>handleInputChange('nomRegion', value || '')}
//                         onResize={() => {}}
//                         onResizeCapture={() => {}}
//                         onPointerEnterCapture={() => {}}
//                         onPointerLeaveCapture={() => {}}
//                         labelProps={{
//                           className: "hidden",
//                         }}
//                         menuProps={{
//                           className: "bg-white border border-gray-200 rounded-lg shadow-lg",
//                         }}
//                       >
//                         <Option 
//                           value="site1"
//                           className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
//                         >
//                           Site 1
//                         </Option>
//                         <Option 
//                           value="site2"
//                           className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
//                         >
//                           Site 2
//                         </Option>
//                         <Option 
//                           value="site3"
//                           className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
//                         >
//                           Site 3
//                         </Option>
//                       </Select>
//                       <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                         <IoIosArrowDown className="text-gray-500 text-xl" />
//                       </div>
//                     </div>
//                 </div>
                
//             </div>
          
//           <div className='flex gap-5 '>
//             <div className='flex-1'>
//             <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> Prefecture<span className='text-[#F08130] '>*</span> </label>         
//               <div className="relative">
//                       <Select
//                         className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
//                         placeholder="Sélectionner un site"
//                         onResize={() => {}}
//                         value={formData.nomPrefecture}
//                         onChange={(value)=>handleInputChange('nomPrefecture', value || '')}
//                         onResizeCapture={() => {}}
//                         onPointerEnterCapture={() => {}}
//                         onPointerLeaveCapture={() => {}}
//                         labelProps={{
//                           className: "hidden",
//                         }}
//                         menuProps={{
//                           className: "bg-white border border-gray-200 rounded-lg shadow-lg",
//                         }}
//                       >
//                         <Option 
//                           value="site1"
//                           className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
//                         >
//                           Site 1
//                         </Option>
//                         <Option 
//                           value="site2"
//                           className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
//                         >
//                           Site 2
//                         </Option>
//                         <Option 
//                           value="site3"
//                           className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
//                         >
//                           Site 3
//                         </Option>
//                       </Select>
//                       <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                         <IoIosArrowDown className="text-gray-500 text-xl" />
//                       </div>
//                     </div>
//           </div>

//            <div className='flex-1'>
//             <label htmlFor="" className='font-bold text-[1.6rem] mb-3 block'> CDR <span className='text-[#F08130] '>*</span> </label>         
//               <div className="relative">
//                       <Select
//                         className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
//                         placeholder="Sélectionner un site"
//                         onResize={() => {}}
//                         value={formData.nomSousPrefecture}
//                         onChange={(value)=>handleInputChange('nomSousPrefecture', value || '')}
//                         onResizeCapture={() => {}}
//                         onPointerEnterCapture={() => {}}
//                         onPointerLeaveCapture={() => {}}
//                         labelProps={{
//                           className: "hidden",
//                         }}
//                         menuProps={{
//                           className: "bg-white border border-gray-200 rounded-lg shadow-lg",
//                         }}
//                       >
//                         <Option 
//                           value="site1"
//                           className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
//                         >
//                           Site 1
//                         </Option>
//                         <Option 
//                           value="site2"
//                           className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
//                         >
//                           Site 2
//                         </Option>
//                         <Option 
//                           value="site3"
//                           className="hover:bg-orange-50 font-bold  py-3 text-[1.4rem]"
//                         >
//                           Site 3
//                         </Option>
//                       </Select>
//                       <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                         <IoIosArrowDown className="text-gray-500 text-xl" />
//                       </div>
//                     </div>
//           </div>
//           </div>
         
//           <div className="flex justify-end gap-4 mt-8">  
//             <button
//               type="button"
//               className="bg-white text-[1.6rem] font-bold border-2 px-6 py-3 rounded hover:bg-gray-50"
//               onClick={onClose}
//             >
//               Annuler
//             </button>
//             <button
//               type="submit"
//               className=" font-bold text-[1.6rem] px-6 py-3 rounded cursor-pointer bg-[#F08130]  text-black"
//             >
//               Enregistrer
//             </button>
//           </div>
//         </form>
//       </Box>
//     </Modal>

    
//     </>
//   );
// }


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Select, Option } from "@material-tailwind/react";
import { IoIosArrowDown } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import { QuartierService,  RegionService } from '../../services/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Quartiers } from '../../models/quartier';
import { Region } from '../../models/region';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 691,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface EditQuartierModalProps {
  open: boolean;
  onClose: () => void;
  quartier?: Quartiers | null;
  onSuccess: () => void;
}

export default function EditQuartierModal({ open, onClose, quartier, onSuccess }: EditQuartierModalProps) {
  const [formData, setFormData] = useState({
    nom: '',
    nomRegion: '',
    nomPrefecture: '',
    nomSousPrefecture: '',
    sousPrefectureId: ''
  });

  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegionId, setSelectedRegionId] = useState<string>('');
  const [prefectures, setPrefectures] = useState<any[]>([]);
  const [selectedPrefectureId, setSelectedPrefectureId] = useState<string>('');
  const [sousPrefectures, setSousPrefectures] = useState<any[]>([]);
  const [selectedSousPrefectureId, setSelectedSousPrefectureId] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (quartier && open && regions.length > 0) {
      setFormData({
        nom: quartier.nom,
        nomRegion: quartier.nomRegion,
        nomPrefecture: quartier.nomPrefecture,
        nomSousPrefecture: quartier.nomSousPrefecture,
        sousPrefectureId: quartier.sousPrefectureId
      });

      const region = regions.find(r => r.nom === quartier.nomRegion);
      if (region) {
        setSelectedRegionId(region.id.toString());
        setPrefectures(region.prefectures || []);

        const prefecture = region.prefectures.find(p => p.nom === quartier.nomPrefecture);
        if (prefecture) {
          setSelectedPrefectureId(prefecture.id.toString());

          const sousPrefs = prefecture.sousPrefectures || [];
          setSousPrefectures(sousPrefs);

          const sousPref = sousPrefs.find(sp => sp.id.toString() === quartier.sousPrefectureId);
          if (sousPref) {
            setSelectedSousPrefectureId(sousPref.id.toString());
          }
        }
      }
    }
  }, [quartier, open, regions]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quartier?.id) {
      setError('Quartier non trouvé');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      // console.log(formData)
      // console.log("Données envoyées :", quartier.id, formData);
      await QuartierService.update(quartier.id, formData);
        toast.success("Quartier mis à jour avec success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            
          });
      onClose();
      onSuccess();
    } catch {
      setError('Erreur lors de la modification du quartier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div className='flex justify-between mb-5'>
          <div className='flex items-center gap-10'>
            <FiEdit size={24} color='#D7D7D7' />
            <h2 className="font-bold text-[2.4rem]">Modification</h2>
          </div>
          <button onClick={onClose} className='text-[20px] cursor-pointer'>x</button>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className='flex gap-10'>
            <div className="flex-1">
              <label className='font-bold text-[1.6rem] mb-3 block'>Nom du quartier <span className='text-[#F08130]'>*</span></label>
              <input
                type="text"
                className="border text-[1.4rem] font-bold border-gray-300 p-5 w-full rounded"
                value={formData.nom}
                onChange={(e) => handleInputChange('nom', e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label className='font-bold text-[1.6rem] mb-3 block'>Région <span className='text-[#F08130]'>*</span></label>
              <div className="relative">
                <Select
                  value={selectedRegionId}
                  onChange={(value) => {
                    setSelectedRegionId(value || '');
                    const selected = regions.find(r => r.id.toString() === value);
                    if (selected) {
                      handleInputChange('nomRegion', selected.nom);
                      setPrefectures(selected.prefectures || []);
                      setSelectedPrefectureId('');
                      setSousPrefectures([]);
                      setSelectedSousPrefectureId('');
                    }
                  }}
                  placeholder=""
                  onResizeCapture={() => {}}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  onResize={() => {}}
                  className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                  labelProps={{ className: "hidden" }}
                  menuProps={{ className: "bg-white border border-gray-200 rounded-lg shadow-lg" }}
                >
                  {regions.map(r => (
                    <Option key={r.id} value={r.id.toString()}>{r.nom}</Option>
                  ))}
                </Select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <IoIosArrowDown className="text-gray-500 text-xl" />
                </div>
              </div>
            </div>
          </div>

          <div className='flex gap-5'>
            <div className='flex-1'>
              <label className='font-bold text-[1.6rem] mb-3 block'>Préfecture <span className='text-[#F08130]'>*</span></label>
              <div className="relative">
                <Select
                  value={selectedPrefectureId}
                  onChange={(value) => {
                    setSelectedPrefectureId(value || '');
                    const selected = prefectures.find(p => p.id.toString() === value);
                    if (selected) {
                      handleInputChange('nomPrefecture', selected.nom);
                      setSousPrefectures(selected.sousPrefectures || []);
                      setSelectedSousPrefectureId('');
                    }
                  }}
                  placeholder=""
                  onResizeCapture={() => {}}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  onResize={() => {}}
                  className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                  labelProps={{ className: "hidden" }}
                  menuProps={{ className: "bg-white border border-gray-200 rounded-lg shadow-lg" }}
                >
                  {prefectures.map(p => (
                    <Option key={p.id} value={p.id.toString()}>{p.nom}</Option>
                  ))}
                </Select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <IoIosArrowDown className="text-gray-500 text-xl" />
                </div>
              </div>
            </div>

            <div className='flex-1'>
              <label className='font-bold text-[1.6rem] mb-3 block'>Sous-préfecture <span className='text-[#F08130]'>*</span></label>
              <div className="relative">
                <Select
                  value={selectedSousPrefectureId}
                  onChange={(value) => {
                    setSelectedSousPrefectureId(value || '');
                    const selected = sousPrefectures.find(sp => sp.id.toString() === value);
                    if (selected) {
                      handleInputChange('nomSousPrefecture', selected.nomSousPrefecture);
                      handleInputChange('sousPrefectureId', selected.id.toString());
                    }
                  }}
                  placeholder={{}}
                  onResizeCapture={() => {}}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  onResize={() => {}}
                  className="min-h-[47px] border border-gray-300 font-bold text-[1.4rem]"
                  labelProps={{ className: "hidden" }}
                  menuProps={{ className: "bg-white border border-gray-200 rounded-lg shadow-lg" }}
                >
                  {sousPrefectures.map(sp => (
                    <Option key={sp.id} value={sp.id.toString()}>{sp.nomSousPrefecture}</Option>
                  ))}
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
              className="font-bold text-[1.6rem] px-6 py-3 rounded cursor-pointer bg-[#F08130] text-black"
            >
              Modifier
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}