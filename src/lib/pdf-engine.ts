import { PDFDocument } from 'pdf-lib';
import imageCompression from 'browser-image-compression';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as pdfjsLib from 'pdfjs-dist';

// Setting up the worker for PDF text extraction via CDN
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

/**
 * 1. COMPRESS PDF
 */
export const compressPDF = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  const pdfBytes = await pdfDoc.save({
    useObjectStreams: true
  });

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  return blob;
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
 * 4. PDF TO WORD (.docx) - FULL EXTRACTION VERSION
 */
export const pdfToWord = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  
  // Load PDF with PDF.js to "read" the text
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  const docChildren: Paragraph[] = [];

  // Add a simple Title/Header to the Word Doc
  docChildren.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Converted Document: ${file.name}`, bold: true, size: 32 }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `Total Pages Extracted: ${numPages}`, italics: true, size: 20 }),
      ],
    }),
    new Paragraph({ text: "" }) // Spacer
  );

  // Loop through pages to extract text content
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    
    // Join text items into a single string for the page
    const pageString = textContent.items
      .map((item: any) => item.str || "")
      .join(" ");

    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({ text: `--- Page ${i} ---`, color: "999999", size: 16 }),
        ],
      }),
      new Paragraph({
        children: [new TextRun({ text: pageString, size: 24 })],
      }),
      new Paragraph({ text: "" }) // Page spacer
    );
  }

  // Create the Word document structure
  const doc = new Document({
    sections: [{
      properties: {},
      children: docChildren,
    }],
  });

  // Pack the document into a real .docx blob
  return await Packer.toBlob(doc);
};

/**
 * 5. IMAGE COMPRESSION
 */
export const compressImageFile = async (file: File) => {
          const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
          const compressedFile = await imageCompression(file, options);
          const blob = new Blob([compressedFile], { type: file.type });
          return { 
                blob: compressedFile, 
                oldSize: file.size, 
                newSize: compressedFile.size 
              };
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
