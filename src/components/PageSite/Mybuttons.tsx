
import { CiFilter } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuArrowUpRight } from "react-icons/lu";
import { SiteResponseDto, siteService } from "../../services/api";
import { useEffect, useRef, useState } from "react";
import * as XLSX from 'xlsx';

export default function Mybuttons(){

      const [sites, setSite] = useState<SiteResponseDto[]>([]);

       const loadSite = async () => {
              try{  
                  const response = await siteService.getAll();
                  setSite(response.data.data.content);      
              }catch(error){    
              }finally{  
              }
            }
    
             useEffect(()=>{
              loadSite();
            }, [])


                //imprimer
                const printRef = useRef<HTMLDivElement>(null);
                const handlePrintTable = () => {
                  const printWindow = window.open('', '', 'width=900,height=650');
                
                  if (printWindow) {
                    const htmlContent = `
                      <html>
                        <head>
                          <title>Liste des Sites</title>
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
                              padding: 8px;
                              text-align: left;
                            }
                            th {
                              background-color: #f0f0f0;
                            }
                          </style>
                        </head>
                        <body>
                          <h1>Liste des sites</h1>
                          <table>
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>momSite</th>
                                <th>nomPrefecture</th>
                                <th>nomRegion</th>
                                <th>nomSousPrefecture</th>
                                <th>longitude</th>
                                <th>latitude</th>
                                <th>hpilone</th>
                                <th>etat</th>
                                <th>dateMiseEnService</th>
                                <th>localisation</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${sites.map(s => `
                                <tr>
                                  <td>${s.id}</td>
                                  <td>${s.nomSite}</td>
                                  <td>${s.nomPrefecture}</td>
                                  <td>${s.nomRegion}</td>
                                  <td>${s.nomSousPrefecture}</td>
                                  <td>${s.longitude}</td>
                                  <td>${s.latitude}</td>
                                  <td>${s.hpilone}</td>
                                  <td>${s.etat}</td>
                                  <td>${s.dateMiseEnService}</td>
                                  <td>${s.localisation}</td>
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
                  const data = sites.map(s => ({
                    ID: s.id,
                    nomSite: s.nomSite,
                    nomPrefecture: s.nomPrefecture,
                    nomRegion: s.nomRegion,
                    nomSousPrefecture: s.nomSousPrefecture,
                    longitude: s.longitude,
                    latitude: s.latitude,
                    hpilone: s.hpilone,
                    etat: s.etat,
                    dateDeMiseEnService: s.dateMiseEnService,
                    localisation: s.localisation
                  }));
                
                  const worksheet = XLSX.utils.json_to_sheet(data);
                  const workbook = XLSX.utils.book_new();
                  XLSX.utils.book_append_sheet(workbook, worksheet, "Sites");
                
                  XLSX.writeFile(workbook, "sites.xlsx");
                };

    return(
        <>
                    <div className="max-w-[332px] w-[90%]  mt-[55px] ml-[335px] flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 items-center ">
                        <div className="flex justify-between max-w-[101px] w-[90%] items-center bg-white">
                            <CiFilter size={20} className="ml-[10px] mt-[10px] mb-[10px] "/>
                            <button className="mt-[13.5px] mb-[13.5px] mr-[17px] text-[13px] font-bold ">Filtrer</button>
                        </div>
            
                        <div className="flex justify-between max-w-[101px] w-[90%] items-center bg-white">
                            <LuArrowUpRight size={20} className="ml-[10px] mt-[10px] mb-[10px]" />
                            <button className="mt-[13.5px] mb-[13.5px] mr-[8.5px] text-[13px] font-bold cursor-pointer" onClick={exportToExcel} >Exporter</button>
                        </div>
                         <div className="flex justify-between max-w-[101px] w-[90%] items-center bg-white">
                            <IoDocumentTextOutline size={20} className="ml-[10px] mt-[10px] mb-[10px]" />
                            <button className="mt-[13.5px] mb-[13.5px] mr-[14.5px] text-[13px] font-bold cursor-pointer " onClick={handlePrintTable} >Imprimer</button>
                        </div>
            
                    </div>
        </>
    )
}