import  React, {useState} from 'react';
import { CiSearch, CiFilter } from "react-icons/ci";
import { FaPlus,} from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import Sidebar from "../components/layout/sidebar";
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { IoEye, IoTrashOutline } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";
import { IoIosLink } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AddProprioModal from '../components/PageProprietaire/addProprio';
import ConfirmationModal from '../components/PageProprietaire/confirmation';
import ContratModal from '../components/PageProprietaire/contrat';
import ModifierModal from '../components/PageProprietaire/Modifier';





export default function Header(){
    const [isOpen, setIsOpen] = useState({
      confirmation:false,
      update:false,
      add:false,
      contrat:false
    });

    const navigate = useNavigate();

    const columns: GridColDef<(typeof rows)[number]>[] = [
  
  { field: 'numero', 
    headerName: 'No',
    width: 51,
    sortable: false,
    flex:1
    
    
  },

  { field: 'id', headerName: 'ID', width: 119, sortable: false,  },
  {
    field: 'NomPrenom',
    headerName: 'Nom du proprietaire',
    width: 227,
    sortable: false,
    flex:1
   // editable: true,
  },
  {
    field: 'Telephone',
    headerName: 'Téléphone',
    flex:1,
    width: 213,
    sortable: false,
    //editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex:1,
    width: 176,
    sortable: false,
    //editable: true,
  },
 
  {
    field: 'address',
    headerName: 'Adresse',
    sortable: false,
    width: 207,
    flex:1
   // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },

  {
  field: "options",
  headerName: "Options",
  type: "actions",
  width: 154,
  flex:1,
  getActions: (params) => [
    <GridActionsCellItem
      icon={<IoEye size={18} color="#000000" />}
      label="Voir"
      onClick={() => navigate("/detailproprio")} 
    />,
    <GridActionsCellItem
      icon={<TiPencil size={18} color="#000" />}
      label="Modifier"
      onClick={()=>setIsOpen({...isOpen,update:true})}
    />,
    <GridActionsCellItem
      icon={<IoIosLink size={18} color="#000" />}
      label="Lien"
      onClick={()=>setIsOpen({...isOpen,contrat:true})}
    />,
    <GridActionsCellItem
      icon={<IoTrashOutline size={18} color="red" />}
      label="Supprimer"
      onClick={()=>setIsOpen({...isOpen,confirmation:true})}
      showInMenu={false}
    />,
  ],
}
];

const rows = [
  { numero: 1, id: 1, NomPrenom: 'Snow',Telephone: 621206186,email:'dansteph02@gmail.com',address:'Ratoma', age: 14 },
  { numero: 2, id: 2, NomPrenom: 'Lannister',  age: 31 },
  { numero: 3, id: 3, NomPrenom: 'Lannister',  age: 31 },
  { numero: 4, id: 4, NomPrenom: 'Stark',  age: 11 },
  { numero: 5, id: 5, NomPrenom: 'Targaryen',  age: null },
  { numero: 6, id: 6, NomPrenom: 'Melisandre',  age: 150 },
  { numero: 7, id: 7, NomPrenom: 'Clifford',  age: 44 },
  { numero: 8, id: 8, NomPrenom: 'Frances',  age: 36 },
  { numero: 0, id: 9, NomPrenom: 'Roxie',  age: 65 },
];
    
    return(
       
         <>

        <div className='flex flex-row'>   
        <div>
          <Sidebar />
        </div>
         </div> 
         <div className="ml-[335px] mr-[30px] mt-[85px] bg-white ">
              
              <div className='pt-[24px] pl-[40px] pb-[22px] pr-[15px]  flex  items-center flex justify-between items-center   '>
              <div className='w-[483px] py-[2px]  '>
                  <h1 className=' text-[3.1rem] font-bold font-helvetica '>Propriétaires</h1>
                   <span className='text-[1.3rem] font-bold'>Affichés:</span>
                   <span className='text-[1.3rem] font-bold'>20 éléments</span>
              </div>
              <div className=" w-[492px] flex justify-between items-center gap-[37px] ">
                    <div className="w-[253px] flex justify-between items-center bg-[#F6F6F6]  ">
                            <h2   className="text-[1.4rem] ml-[23px] mt-[13.5px] mb-[13.5px] font-bold w-[85px]">Rechercher</h2>
                            <CiSearch  size={24} color="#F08130" className="mr-[26.22px] mt-[13px] mb-[14.72px]" />
                    </div>
                    
                    <div className="w-[227px] flex justify-between items-center bg-[#F08130]  ">
                            <FaPlus  onClick={()=>setIsOpen({...isOpen,add:true})} size={24} color="#000000" className="ml-[17px] cursor-pointer " />
                            <span  className="text-[1.4rem] pt-[13.5px] pb-[13.5px] pr-[17px] font-bold cursor-pointer" onClick={() =>setIsOpen({...isOpen,add:true})}>
                              Nouveau Propriétaire
                            </span>
                    </div>
                    
               </div>
              </div>  

        </div>
        <div className="w-[332px]  mt-[55px] ml-[335px] flex justify-between items-center ">
            <div className="flex justify-between w-[101px] items-center bg-white">
                <CiFilter size={20} className="ml-[10px] mt-[10px] mb-[10px] "/>
                <button className="mt-[13.5px] mb-[13.5px] mr-[17px] text-[13px] font-bold ">Filtrer</button>
            </div>

            <div className="flex justify-between w-[101px] items-center bg-white">
                <LuArrowUpRight size={20} className="ml-[10px] mt-[10px] mb-[10px]" />
                <button className="mt-[13.5px] mb-[13.5px] mr-[8.5px] text-[13px] font-bold " >Exporter</button>
            </div>
             <div className="flex justify-between w-[116px] items-center bg-white">
                <IoDocumentTextOutline size={20} className="ml-[10px] mt-[10px] mb-[10px]" />
                <button className="mt-[13.5px] mb-[13.5px] mr-[14.5px] text-[13px] font-bold " >Imprimer</button>
            </div>

        </div>

      <Box  className=" ml-[337px] mt-[26px] mr-[28px] " >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
         sx={{
             
          border:'none',
          '& .MuiDataGrid-cell': {  
            fontSize: '1.4rem',
            backgroundColor:'none',
              
          },
          '& .MuiDataGrid-columnHeader': {
            fontSize: '1.4rem',
            backgroundColor:'#FAFAFA !important',    
          },'& .MuiDataGrid-columnHeaderTitle':{
            fontWeight: 'bold'
          }, '& .MuiTablePagination-displayedRows':{
            fontSize:'14px'
          },'& .MuiPaginationItem-root': {
            fontSize: '1.5rem',
           },
          '& .MuiPaginationItem-icon': {
            fontSize: '2rem', 
           },
           
        }}
        pageSizeOptions={[5]}
      />
    </Box>
    
    <ModifierModal open={isOpen.update} onClose={() => setIsOpen({...isOpen,update:false})}  />  
    <ConfirmationModal 
      open={isOpen.confirmation} 
      onClose={() => setIsOpen({...isOpen,confirmation:false})}
      onConfirm={() => setIsOpen({...isOpen,confirmation:false,update:false})}
    />  
    <AddProprioModal open={isOpen.add} onClose={() =>setIsOpen({...isOpen,add:false})} />  
    <ContratModal open={isOpen.contrat} onClose={() =>setIsOpen({...isOpen,contrat:false})} nom='Enregister' />  
     
    </>
    )
}



