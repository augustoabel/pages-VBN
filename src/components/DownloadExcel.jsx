// src/components/DownloadExcel.jsx
import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FaFileExcel } from 'react-icons/fa'; 

function parseBoothInfo(boothString) {
  if (!boothString) {
    return { Booth_Name: '', Booth_Number: '' };
  }

  const regex = /^(.*?)\s*[—\-]\s*([^\s—\-]+)$/;
  const match = boothString.match(regex);

  if (match) {
    return {
      Booth_Name: match[1].trim(),
      Booth_Number: match[2].trim()
    };
  } else {
    return {
      Booth_Name: boothString.trim(),
      Booth_Number: ''
    };
  }
}


const DownloadExcel = ({ data, fileName = 'expositores_data' }) => {


  const handleDownload = () => {
    if (!data || data.length === 0) {
      alert("There is no data to export.");
      return;
    }

    // --- AJUSTE PRINCIPAL AQUI ---
    const wsData = data.map(expositor => {
      // 1. Chamamos a função para separar o nome e o número do booth
      
      const { Booth_Name, Booth_Number } = parseBoothInfo(expositor.booth_name);

      // 2. Retornamos o objeto com os campos corretos para o Excel
      return {
        'Name': expositor.Company || '',
        'Category': expositor.categoria || 'Not categorized',
        'Site': expositor.site || '',
        'Address': Array.isArray(expositor.Address) ? expositor.Address.join(', ') : (expositor.Address || ''),
        'Phone': expositor.Phone || '',
        'Cultivate link': expositor.link || '',
        //'About': expositor.about || '',
        'Booth Name': expositor.booth_name,     // Campo corrigido
        'Booth Number': Booth_Number, // Campo corrigido
        'Latitude': expositor.lat || '',
        'Longitude': expositor.lng || '',
      };
    });
    // --- FIM DO AJUSTE ---
    
    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Exhibitors");

    // Auto-ajustar a largura das colunas (opcional, mas melhora a visualização)
    const colWidths = Object.keys(wsData[0]).map(key => ({
        wch: Math.max(key.length, ...wsData.map(row => (row[key] || '').toString().length)) + 2
    }));
    ws['!cols'] = colWidths;

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center space-x-2" // Adicionado flexbox e espaçamento
    >
      <FaFileExcel className="text-xl" />
      <span className='text-sm align-middle'>Download Exhibitors Sheet</span>
    </button>
  );
};

export default DownloadExcel;