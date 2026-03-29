import { PDFDocument } from 'pdf-lib';
import imageCompression from 'browser-image-compression';

// 1. COMPRESS PDF (Simulated via re-saving, as true compression is complex in browser)
export const compressPDF = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
};

// 2. MERGE PDF
export const mergePDFs = async (files: File[]) => {
  const mergedPdf = await PDFDocument.create();
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  const pdfBytes = await mergedPdf.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
};

// 3. COMPRESS IMAGE
export const compressImageFile = async (file: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  return await imageCompression(file, options);
};
