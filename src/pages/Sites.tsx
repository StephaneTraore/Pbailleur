import Sidebar from "../components/layout/sidebar";
import Myheader from "../components/layout/myheader";
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { IoEye, IoTrashOutline } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";
import { useState } from "react";
import SupprimerModal from "../components/PageSite/supprimer";
import Mybuttons from "../components/PageSite/Mybuttons";
import AddSiteModal from "../components/PageSite/AddSite";
import EditSiteModal from "../components/PageSite/EditSite";
import DetailSiteModal from "../components/PageSite/detail";



export default function Sites(){

      const [isOpen, setIsOpen] = useState({
          confirmation:false,
          update:false,
          add:false,
          detail:false,
          
        });

    const columns: GridColDef<(typeof rows)[number]>[] = [    
      { field: 'Numero', 
        headerName: 'No',
        width: 51,
        sortable: false,
        flex:1,
        
        
      },
    
      { field: 'NoSite', headerName: 'No Site', width: 119, sortable: false,  },

      { field: 'NomSite', headerName: 'Non Site', width: 119, sortable: false,  },

      {
        field: 'quartier',
        headerName: 'Quartier',
        width: 227,
        sortable: false,
        flex:1,
       
      },
      {
        field: 'NomCrd',
        headerName: 'Nom CRD',
        flex:1, 
        width: 213,
        sortable: false,
        //editable: true,
      },
      {
        field: 'prefecture',
        headerName: 'Préfecture',
        
        width: 176,
        sortable: false,
        flex:1,
        
      },
     
      {
        field: 'sup',
        headerName: 'Sup.',
        sortable: false,
        width: 207,
        flex:1,
       // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      },

      {
        field: 'HPilone',
        headerName: 'H Pilone',
        sortable: false,
        width: 110,
        flex:1,
       // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      },

      {
        field: 'etat',
        headerName: 'Etat',
        sortable: false,
        width: 110,
        flex:1,
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
      { Numero: 1, id: 1, NoSite: 'Site001', NomSite:'Site1' , quartier: 'Cosa', NomCrd:'lorem ipsum',prefecture:'Conakry', sup:'lorem', HPilone:'Lorem ipsum', etat:'En service'  },
      { Numero: 2, id: 2, NoSite: 'Site002', NomSite:'Site2' , quartier: 'Bambeto', NomCrd:'lorem ipsum',prefecture:'Conakry', sup:'lorem', HPilone:'Lorem ipsum', etat:'Hors Service'  }, 
    ];



    return(
        <>
        <div>
            <Sidebar/>
            <Myheader title="Gestion des Sites"
            label="Nouveau Site" 
            total={100}
            onLabelClick={() =>setIsOpen({...isOpen,add:true})}
             />
            <Mybuttons />     
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

        <SupprimerModal 
                  open={isOpen.confirmation} 
                  onClose={() => setIsOpen({...isOpen,confirmation:false})}
                  onConfirm={() => setIsOpen({...isOpen,confirmation:false,})}
        />

        <AddSiteModal  open={isOpen.add} onClose={() => setIsOpen({...isOpen,add:false})} />
        <EditSiteModal open={isOpen.update} onClose={() => setIsOpen({...isOpen,update:false})}  /> 
         <DetailSiteModal open={isOpen.detail} onClose={() => setIsOpen({...isOpen,detail:false})}/>  
        
        </>
    )
}