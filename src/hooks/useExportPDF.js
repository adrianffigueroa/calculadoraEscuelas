import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const useExportPDF = () => {
  const exportPDF = async (refs, fileName = 'resumen_programa.pdf') => {
    const pdf = new jsPDF('p', 'mm', 'a4');

    for (let i = 0; i < refs.length; i++) {
      const ref = refs[i];
      if (!ref?.current) continue;

      const canvas = await html2canvas(ref.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save(fileName);
  };

  return { exportPDF };
};
