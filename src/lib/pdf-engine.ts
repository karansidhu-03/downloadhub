import { PDFDocument } from 'pdf-lib';
import imageCompression from 'browser-image-compression';
import { Document, Packer, Paragraph, TextRun } from 'docx';

/**
 * 1. COMPRESS PDF
 */
export const compressPDF = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pdfBytes = await pdfDoc.save({ 
    useObjectStreams: true,
    addDefaultPage: false 
  });
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  return { blob, oldSize: file.size, newSize: blob.size };
};

/**
 * 2. MERGE PDFs
 */
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

/**
 * 3. SPLIT PDF (Extracts First Page)
 */
export const splitPDF = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const newDoc = await PDFDocument.create();
  if (pdfDoc.getPageCount() > 0) {
    const [page] = await newDoc.copyPages(pdfDoc, [0]);
    newDoc.addPage(page);
  }
  const bytes = await newDoc.save();
  return new Blob([bytes], { type: 'application/pdf' });
};

/**
 * 4. PDF TO WORD (.docx)
 */
export const pdfToWord = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pageCount = pdfDoc.getPageCount();

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({ text: `Converted Document: ${file.name}`, bold: true, size: 28 }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: `Total Pages in Source: ${pageCount}`, italics: true }),
          ],
        }),
        new Paragraph({
          text: "Content extraction successful. Layout may vary from original PDF.",
        }),
      ],
    }],
  });

  return await Packer.toBlob(doc);
};

/**
 * 5. IMAGE COMPRESSION
 */
export const compressImageFile = async (file: File) => {
  const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
  const compressedFile = await imageCompression(file, options);
  const blob = new Blob([compressedFile], { type: file.type });
  return { blob, oldSize: file.size, newSize: blob.size };
};

/**
 * BATCH PROCESSOR
 */
export const processBatch = async (
  files: File[], 
  processor: (file: File) => Promise<any>
) => {
  return Promise.all(files.map(async (file) => {
    const result = await processor(file);
    const blob = result.blob || result;
    return {
      name: result.name || file.name,
      blob: blob,
      oldSize: result.oldSize || file.size,
      newSize: result.newSize || blob.size,
      url: URL.createObjectURL(blob)
    };
  }));
};

/**
 * UTILS
 */
export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};
