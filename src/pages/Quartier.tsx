import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Myheader from "../components/layout/myheader";
import Sidebar from "../components/layout/sidebar";
import MybuttonQuartier from "../components/PageQuartier/MybuttonQuartier";
import { IoEye, IoTrashOutline } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";
import { useState } from "react";
import AddQuartierModal from "../components/PageQuartier/AddQuartier";
import EditQuartierModal from "../components/PageQuartier/EditQuartier";
import DeleteQuartierModal from "../components/PageQuartier/DeleteQuartier";
import DetailQuartierModal from "../components/PageQuartier/DetailQuartier";

export default function Quartier(){

     const [isOpen, setIsOpen] = useState({
                  confirmation:false,
                  update:false,
                  add:false,
                  detail:false,
                  
                });

    const columns: GridColDef<(typeof rows)[number]>[] = [    
      
    {
        field: 'NomQuartier',
        headerName: 'Nom Quartier',
        width: 227,
        sortable: false,
        flex:1,
       
      },
      

      { field: 'NomCrd', headerName: 'Nom CRD ', width: 119, sortable: false, flex:1,  },

      { field: 'NomPrefecture', headerName: 'Nom Prefecture', width: 119, sortable: false, flex:1, },
      
  
      {
        field: 'region',
        headerName: 'Region',
        width: 176,
        sortable: false,
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
          icon={<IoEye size={18} color="#000000" />}
          label="Voir"
          onClick={()=>setIsOpen({...isOpen,detail:true})}
        />,
        <GridActionsCellItem
          icon={<TiPencil size={18} color="#000" />}
          label="Modifier"
          onClick={()=>setIsOpen({...isOpen,update:true})}
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
      {  id: 1, NomQuartier: 'Abattoir', NomCrd:'Mamou' , NomPrefecture: 'Cosa', region:'lorem', },

    ];

    return(
        <>
            <div>
                <Sidebar />
                <Myheader title="Quartiers" label="Nouveau quartier" total={20} onLabelClick={() =>setIsOpen({...isOpen,add:true})} />
                <MybuttonQuartier/>
            </div>

            <div>
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
            </div>

            <AddQuartierModal  open={isOpen.add} onClose={() => setIsOpen({...isOpen,add:false})} />
            <EditQuartierModal  open={isOpen.update} onClose={() => setIsOpen({...isOpen,update:false})} />
            <DetailQuartierModal  open={isOpen.detail} onClose={() => setIsOpen({...isOpen,detail:false})} />
            <DeleteQuartierModal  open={isOpen.confirmation} onClose={() => setIsOpen({...isOpen,confirmation:false})} />
        </>
    )
}