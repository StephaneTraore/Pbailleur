import React, { useState } from "react";
import Sidebar from "../layout/sidebar";
import { IoIosLink } from "react-icons/io";
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import {  IoTrashOutline } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";
import Box from "@mui/material/Box";
import ContratModal from "./contrat";
import ContratModalModification from "./contrat2";
import ConfirmationModal from "./confirmation";


export default function DetailProprietaire(){

    const [isOpen, setIsOpen] = useState({
          confirmation:false,
          contrat:false,
          contratModif:false
        });

    const columns: GridColDef<(typeof rows)[number]>[] = [
  
  { field: 'numero_site', 
    headerName: 'No Site',
    width: 100,
    sortable: false,
    flex:1,
    
    
  },


  {
    field: 'Nom_Site',
    headerName: 'Nom Site',
    width: 227,
    sortable: false,
    flex:1,
   
  },
  {
    field: 'Part',
    headerName: 'Part %',
    flex:1,
    width: 213,
    sortable: false,
    
  },
  {
    field: 'Quartier',
    headerName: 'Quartier',
    flex:1,
    width: 176,
    sortable: false,
    
  },
 
  {
    field: 'crd',
    headerName: 'CRD',
    sortable: false,
    width: 207,
    flex:1,
   
  },

  {
  field: "options",
  headerName: "Options",
  type: "actions",
  width: 154,
  flex:1,
  getActions: (params) => [
   
    <GridActionsCellItem
      icon={<TiPencil size={18} color="#000" />}
      label="Modifier"
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
  { numero_site: 1887, id: 1, Nom_Site: 'MACENTA_BATA',Part: 100.0, Quartier:'Macenta',crd:'Macenta'},
  
];

    return(
        <>
        <div>
            <Sidebar />
        </div>
        
        <div className=" py-[13px]   ml-[335px] mr-[30px] mt-[85px] bg-white ">
            <div className="  mx-[19px]  flex justify-between">
                <div className="flex gap-5">
                    <img src="/src/assets/images/profil.jpeg" className="w-[43px] rounded-full h-[43px] " alt="" />
                    <h1 className=" my-[] font-bold text-[32px] ">El hadj SANOUSSY BERETE</h1>
                </div>

                <div className=" flex items-center gap-5 bg-[#F08130] ">
                    <IoIosLink size={20} onClick={() =>setIsOpen({...isOpen,contratModif:true})} color="#000" className="my-[11.4px] ml-[30px] cursor-pointer  " />
                    <label htmlFor="" className=" mr-[30px] font-bold text-[1.4rem] cursor-pointer  " onClick={() =>setIsOpen({...isOpen,contratModif:true})}  >Lier un contrat </label>
                </div>

            </div>
        </div>


        <div className=" pt-[22px] pb-[19px] bg-[#000000]  ml-[335px] mr-[30px] mt-[6px]  ">
            <div className=" ml-[24px] mr-[154px] border-1  flex justify-between">
                <div>
                    <label htmlFor="" className="text-[#999999] text-[1.3rem] " >nom</label>
                    <h2 className="text-white font-bold text-[1.4rem] ">BERETE</h2>
                </div>

                 <div>
                    <label htmlFor="" className="text-[#999999] text-[1.3rem] " >Prenom</label>
                    <h2 className="text-white font-bold text-[1.4rem] ">Elhadj Sanoussy </h2>
                </div>

                <div>
                    <label htmlFor="" className="text-[#999999] text-[1.3rem] " >Telephone</label>
                    <h2 className="text-white font-bold text-[1.4rem] ">624432356</h2>
                </div>

                 <div>
                    <label htmlFor="" className="text-[#999999] text-[1.3rem] " >email</label>
                    <h2 className="text-white font-bold text-[1.4rem] ">sanoussy@gmail.com</h2>
                </div>

                 <div>
                    <label htmlFor="" className="text-[#999999] text-[1.3rem]" >Adresse</label>
                    <h2 className="text-white font-bold text-[1.4rem] ">Dinguiraye</h2>
                </div>
                
            </div>
        </div>

         <div className=" py-[23px]   ml-[335px] mr-[30px] mt-[57px] bg-white ">
            <div className="  ml-[19px] ">
                <h2 className="text-[2.5rem] font-bold ">Sites appartenant</h2>

            </div>
        </div>

      <Box  className=" ml-[337px] mt-[26px] mr-[28px]" >
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
     <ConfirmationModal 
          open={isOpen.confirmation} 
          onClose={() => setIsOpen({...isOpen,confirmation:false})}
          onConfirm={() => setIsOpen({...isOpen,confirmation:false,})}
        />   
      <ContratModal open={isOpen.contrat} onClose={() =>setIsOpen({...isOpen,contrat:false})} nom="Modifier" />
      <ContratModalModification open={isOpen.contratModif} onClose={() =>setIsOpen({...isOpen,contratModif:false})} nom="Enregistrer" />
               

        </>
    )
}