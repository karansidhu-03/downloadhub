import { PDFDocument } from 'pdf-lib';
import imageCompression from 'browser-image-compression';

export const compressPDF = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  // High-level compression: re-save with standard objects
  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  
  return {
    blob,
    oldSize: file.size,
    newSize: blob.size
  };
};

export const compressImageFile = async (file: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  const compressedFile = await imageCompression(file, options);
  const blob = new Blob([compressedFile], { type: file.type });
  
  return {
    blob,
    oldSize: file.size,
    newSize: blob.size
  };
};

// Helper to format bytes (e.g., 1.2 MB)
export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
