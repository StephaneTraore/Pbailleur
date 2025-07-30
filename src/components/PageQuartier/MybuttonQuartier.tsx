
import { useEffect, useRef, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuArrowUpRight } from "react-icons/lu";
import {  QuartierService } from "../../services/api";
import * as XLSX from 'xlsx';
import { Quartiers } from "../../models/quartier";



export default function MybuttonQuartier(){

  const [quartier, setQuartier] = useState<Quartiers[]>([]);

    const loadQuartier = async () => {
          try{  
              const response = await QuartierService.getAll();
              setQuartier(response.data.data);      
          }catch(error){    
          }finally{  
          }
        }

         useEffect(()=>{
          loadQuartier();
        }, [])

  

    //imprimer
    const printRef = useRef<HTMLDivElement>(null);
    const handlePrintTable = () => {
      const printWindow = window.open('', '', 'width=900,height=650');
    
      if (printWindow) {
        const htmlContent = `
          <html>
            <head>
              <title>Liste des Quartiers</title>
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
                  padding: 10px;
                  text-align: left;
                }
                th {
                  background-color: #f0f0f0;
                }
              </style>
            </head>
            <body>
              <h1>Liste des quartiers</h1>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>nomPrefecture</th>
                    <th>nomRegion</th>
                    <th>nomSousPrefecture</th>
                  </tr>
                </thead>
                <tbody>
                  ${quartier.map(q => `
                    <tr>
                      <td>${q.id}</td>
                      <td>${q.nom}</td>
                      <td>${q.nomPrefecture}</td>
                      <td>${q.nomRegion}</td>
                      <td>${q.nomSousPrefecture}</td>
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
  const data = quartier.map(q => ({
    ID: q.id,
    Nom: q.nom,
    nomPrefecture: q.nomPrefecture,
    nomRegion: q.nomRegion,
    nomSousPrefecture: q.nomSousPrefecture
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Quartier");

  XLSX.writeFile(workbook, "quartier.xlsx");
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
                            <button className="mt-[13.5px] mb-[13.5px] mr-[14.5px] text-[13px] font-bold cursor-pointer " onClick={handlePrintTable} >Imprimer</button>
                        </div>
            
                    </div>
        </>
    )
}