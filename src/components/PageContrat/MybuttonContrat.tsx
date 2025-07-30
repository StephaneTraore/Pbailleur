import { useEffect, useRef, useState } from "react";
import * as XLSX from 'xlsx';
import { CiFilter } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuArrowUpRight } from "react-icons/lu";
import { Contrats } from "../../models/contrat";
import { contratService } from "../../services/api";


export default function MybuttonContrat(){

    const [contrats, setContrats] = useState<Contrats[]>([]);
    
           const loadContrat = async () => {
                  try{  
                    const response = await contratService.getAll();
                      setContrats(response.data.data.content);      
                  }catch(error){    
                  }finally{  
                  }
                }
        
                 useEffect(()=>{
                  loadContrat();
                }, [])


                  //imprimer
                const printRef = useRef<HTMLDivElement>(null);
                const handlePrintTable = () => {
                  const printWindow = window.open('', '', 'width=900,height=650');
                
                  if (printWindow) {
                    const htmlContent = `
                      <html>
                        <head>
                          <title>Liste des Contrats</title>
                          <style>
                            body {
                              font-family: Arial, sans-serif;
                              padding: 20px;
                            }
                            h1 {
                              text-align: center;
                              margin-bottom: 30px;
                            }
                            table {
                              width: 100%;
                              border-collapse: collapse;
                              font-size: 14px;
                            }
                            th, td {
                              border: 1px solid #ccc;
                              padding: 6px;
                              text-align: left;
                            }
                            th {
                              background-color: #f0f0f0;
                            }
                          </style>
                        </head>
                        <body>
                          <h1>Liste des Contrats</h1>
                          <table>
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>siteId</th>
                                <th>nomSite</th>
                                <th>reference</th>
                                <th>dateDebut</th>
                                <th>dateFin</th>
                                <th>dateElaboration</th>
                                <th>MntMensuelInitial</th>
                                <th>MntMensuelActuel</th>
                                <th>tauxAug</th>
                                <th>tauxCfu</th>
                                <th>typeContrat</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${contrats.map(c => `
                                <tr>
                                  <td>${c.id}</td>
                                  <td>${c.siteId}</td>
                                  <td>${c.nomSite}</td>
                                  <td>${c.reference}</td>
                                  <td>${c.dateDebut}</td>
                                  <td>${c.dateFin}</td>
                                  <td>${c.dateElaboration}</td>
                                  <td>${c.montantMensuelInitial}</td>
                                  <td>${c.montantMensuelActuel}</td>
                                  <td>${c.tauxAugmentation}</td>
                                  <td>${c.tauxCfu}</td>
                                  <td>${c.typeContrat}</td>
                               
                                </tr>
                              `).join('')}
                            </tbody>
                          </table>
                        </body>
                      </html>
                    `;
                
                    printWindow.document.write(htmlContent);
                    printWindow.document.close();
                    printWindow.focus();
                    printWindow.print();
                    printWindow.close();
                  }
                };



                                    //exporter les données 
                                const exportToExcel = () => {
                                  const data = contrats.map(c => ({
                                    ID: c.id,
                                    siteId: c.siteId,
                                    nomSite: c.nomSite,
                                    reference: c.reference,
                                    dateDebut: c.dateDebut,
                                    dateFin: c.dateFin,
                                    dateElaboration: c.dateElaboration,
                                    montantmensuelInitial: c.montantMensuelInitial,
                                    montantMensuelActuel: c.montantMensuelActuel,
                                    tauxAugmentation: c.tauxAugmentation,
                                    tauxCfu: c.tauxCfu,
                                    typeContrat: c.typeContrat
                               
                                  }));
                                
                                  const worksheet = XLSX.utils.json_to_sheet(data);
                                  const workbook = XLSX.utils.book_new();
                                  XLSX.utils.book_append_sheet(workbook, worksheet, "Contrats");
                                
                                  XLSX.writeFile(workbook, "contrats.xlsx");
                                };


    return(
        <>
                    <div className="w-[332px]  mt-[55px] ml-[335px] flex justify-between items-center ">
                        <div className="flex justify-between w-[101px] items-center bg-white">
                            <CiFilter size={20} className="ml-[10px] mt-[10px] mb-[10px] "/>
                            <button className="mt-[13.5px] mb-[13.5px] mr-[17px] text-[13px] font-bold ">Filtrer</button>
                        </div>
            
                        <div className="flex justify-between w-[101px] items-center bg-white">
                            <LuArrowUpRight size={20} className="ml-[10px] mt-[10px] mb-[10px]" />
                            <button className="mt-[13.5px] mb-[13.5px] mr-[8.5px] text-[13px] font-bold cursor-pointer " onClick={exportToExcel} >Exporter</button>
                        </div>
                         <div className="flex justify-between w-[116px] items-center bg-white">
                            <IoDocumentTextOutline size={20} className="ml-[10px] mt-[10px] mb-[10px]" />
                            <button className="mt-[13.5px] mb-[13.5px] mr-[14.5px] text-[13px] font-bold cursor-pointer" onClick={handlePrintTable} >Imprimer</button>
                        </div>
            
                    </div>
        </>
    )
}