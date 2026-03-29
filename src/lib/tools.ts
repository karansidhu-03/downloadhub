import { FileText, Image, FileVideo, Download, Scissors, Merge, SplitSquareHorizontal, FileOutput, Minimize2, Maximize2, RefreshCw } from "lucide-react";

export interface Tool {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  seoContent: string;
  icon: any;
  gradient: string;
  category: ToolCategory;
  acceptFile?: boolean;
  fileAccept?: string;
  placeholder?: string;
  faqs: { q: string; a: string }[];
}

export type ToolCategory = "pdf" | "image" | "video" | "downloader";

export const categories: Record<ToolCategory, { label: string; description: string; slug: string; icon: any; gradient: string }> = {
  pdf: { label: "PDF Tools", description: "Compress, merge, split, and convert PDF files online for free.", slug: "pdf-tools", icon: FileText, gradient: "from-red-500 to-rose-600" },
  image: { label: "Image Tools", description: "Compress, resize, and convert images in seconds.", slug: "image-tools", icon: Image, gradient: "from-violet-500 to-purple-600" },
  video: { label: "Video Tools", description: "Convert and compress video files to any format.", slug: "video-tools", icon: FileVideo, gradient: "from-amber-500 to-orange-500" },
  downloader: { label: "Downloaders", description: "Download videos from Instagram, TikTok, and YouTube.", slug: "downloaders", icon: Download, gradient: "from-cyan-500 to-teal-500" },
};

export const tools: Tool[] = [
  // PDF Tools
  {
    slug: "compress-pdf",
    title: "Compress PDF Online Free",
    shortTitle: "Compress",
    description: "Reduce PDF file size without losing quality. Optimize PDFs for email, web, and storage.",
    metaDescription: "Compress PDF files online for free. Reduce PDF size up to 90% without losing quality. Fast, secure, no registration required.",
    seoContent: "Our free online PDF compressor helps you reduce the size of your PDF files quickly and easily. Whether you need to email a large document, upload a PDF to a website, or simply save storage space, our tool can shrink your PDFs by up to 90% while maintaining visual quality.\n\nThe compression process is entirely browser-based — your files never leave your device. This ensures complete privacy and security. We use intelligent compression algorithms that analyze each page and optimize images, fonts, and metadata without affecting readability.\n\nToolHub's PDF compressor supports files up to 100MB and works on all devices including desktop, tablet, and mobile. No software installation or registration required — just upload, compress, and download.",
    icon: Minimize2,
    gradient: "bg-gradient-to-br from-red-500 via-rose-500 to-pink-500",
    category: "pdf",
    acceptFile: true,
    fileAccept: ".pdf",
    faqs: [
      { q: "How much can I compress a PDF?", a: "Our tool can reduce PDF size by up to 90% depending on the content. Image-heavy PDFs see the most reduction." },
      { q: "Does compression affect quality?", a: "We use smart compression that maintains visual quality while significantly reducing file size." },
      { q: "Is there a file size limit?", a: "You can compress PDFs up to 100MB for free." },
      { q: "Is my PDF safe during compression?", a: "Yes, all processing happens in your browser. Your files are never uploaded to our servers." },
    ],
  },
  {
    slug: "merge-pdf",
    title: "Merge PDF Files Online",
    shortTitle: "Merge",
    description: "Combine multiple PDF files into one document. Easy drag-and-drop interface.",
    metaDescription: "Merge PDF files online for free. Combine multiple PDFs into one document in seconds. No software needed.",
    seoContent: "Easily combine multiple PDF documents into a single file with ToolHub's free online PDF merger. Whether you're compiling reports, combining invoices, or assembling a portfolio, our tool makes it simple.\n\nJust drag and drop your PDF files, arrange them in your preferred order, and click merge. The entire process takes seconds and produces a high-quality combined document.\n\nOur PDF merger preserves all formatting, images, links, and bookmarks from the original files. It works entirely in your browser, so your documents remain private and secure.",
    icon: Merge,
    gradient: "bg-gradient-to-br from-rose-500 via-red-500 to-orange-500",
    category: "pdf",
    acceptFile: true,
    fileAccept: ".pdf",
    faqs: [
      { q: "How many PDFs can I merge?", a: "You can merge up to 20 PDF files at once." },
      { q: "Can I reorder pages?", a: "Yes, you can drag and drop to reorder files before merging." },
      { q: "Is the merged PDF quality preserved?", a: "Absolutely. Merging doesn't affect the quality of your documents." },
    ],
  },
  {
    slug: "split-pdf",
    title: "Split PDF Pages Online",
    shortTitle: "Split",
    description: "Split a PDF into multiple files. Extract specific pages from your document.",
    metaDescription: "Split PDF files online for free. Extract pages or split into multiple documents instantly.",
    seoContent: "Need to extract specific pages from a PDF? ToolHub's free PDF splitter lets you break any PDF into smaller files or pull out individual pages in seconds.\n\nPerfect for extracting chapters from ebooks, separating invoices, or pulling specific pages from a large report. Simply upload your PDF, select the pages you want, and download.\n\nThe tool preserves all formatting and quality from the original document. Works on any device with no software installation required.",
    icon: SplitSquareHorizontal,
    gradient: "bg-gradient-to-br from-orange-500 via-red-500 to-rose-500",
    category: "pdf",
    acceptFile: true,
    fileAccept: ".pdf",
    faqs: [
      { q: "Can I extract specific pages?", a: "Yes, you can select individual pages or page ranges to extract." },
      { q: "What happens to the original PDF?", a: "The original file is untouched. We create new files from the selected pages." },
      { q: "Can I split a password-protected PDF?", a: "You'll need to remove the password first before splitting." },
    ],
  },
  {
    slug: "pdf-to-word",
    title: "Convert PDF to Word Free",
    shortTitle: "To Word",
    description: "Convert PDF files to editable Word documents while preserving formatting.",
    metaDescription: "Convert PDF to Word (DOCX) online for free. Preserve formatting and layout. Fast and accurate conversion.",
    seoContent: "Convert your PDF documents to fully editable Microsoft Word (DOCX) files with ToolHub's free online converter. Our advanced conversion engine preserves the original formatting, fonts, images, and layout.\n\nWhether you need to edit a contract, update a report, or modify a brochure, our PDF to Word converter makes it easy. The output is compatible with Microsoft Word, Google Docs, and other word processors.\n\nSimply upload your PDF, wait a few seconds, and download your editable Word document. No registration or software installation needed.",
    icon: FileOutput,
    gradient: "bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500",
    category: "pdf",
    acceptFile: true,
    fileAccept: ".pdf",
    faqs: [
      { q: "Is the formatting preserved?", a: "Our converter preserves most formatting including fonts, images, and layout." },
      { q: "Can I edit the converted document?", a: "Yes, the output is a fully editable .docx file compatible with Microsoft Word and Google Docs." },
      { q: "Does it work with scanned PDFs?", a: "Scanned PDFs may require OCR. Our tool works best with text-based PDFs." },
    ],
  },
  // Image Tools
  {
    slug: "image-compressor",
    title: "Image Compressor Online",
    shortTitle: "Compress",
    description: "Compress JPEG, PNG, and WebP images without losing quality. Reduce file size up to 80%.",
    metaDescription: "Compress images online for free. Reduce JPEG, PNG, WebP size up to 80% without quality loss. Fast bulk compression.",
    seoContent: "Optimize your images for the web with ToolHub's free online image compressor. Reduce JPEG, PNG, and WebP file sizes by up to 80% while maintaining visual quality.\n\nPerfect for web developers, bloggers, and anyone who needs to optimize images for faster page loading. Our smart compression algorithms analyze each image and apply the optimal compression level.\n\nSupports batch compression — upload multiple images at once and download them all compressed. Works entirely in your browser for maximum privacy and speed.",
    icon: Minimize2,
    gradient: "bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500",
    category: "image",
    acceptFile: true,
    fileAccept: "image/*",
    faqs: [
      { q: "Which image formats are supported?", a: "We support JPEG, PNG, WebP, GIF, and BMP formats." },
      { q: "How much can I compress?", a: "Typically 50-80% file size reduction while maintaining visual quality." },
      { q: "Can I compress multiple images?", a: "Yes, you can upload and compress multiple images at once." },
      { q: "Will compressed images look different?", a: "Our smart compression maintains visual quality. Most users can't see any difference." },
    ],
  },
  {
    slug: "image-resizer",
    title: "Resize Images Online Free",
    shortTitle: "Resize",
    description: "Resize images to any dimension. Perfect for social media, web, and print.",
    metaDescription: "Resize images online for free. Change dimensions for social media, web, or print. Maintains aspect ratio.",
    seoContent: "Quickly resize your images to any dimension with ToolHub's free online image resizer. Whether you need to prepare images for social media, optimize photos for your website, or create print-ready files, our tool handles it all.\n\nChoose from preset sizes for popular social media platforms or enter custom dimensions. The tool automatically maintains aspect ratio to prevent distortion.\n\nSupports JPEG, PNG, and WebP output formats. No registration or software needed — resize your images directly in your browser.",
    icon: Maximize2,
    gradient: "bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500",
    category: "image",
    acceptFile: true,
    fileAccept: "image/*",
    faqs: [
      { q: "Can I maintain aspect ratio?", a: "Yes, aspect ratio is maintained by default. You can also set custom dimensions." },
      { q: "What output formats are available?", a: "You can export as JPEG, PNG, or WebP." },
      { q: "Can I resize for social media?", a: "Yes, we offer preset dimensions for Instagram, Facebook, Twitter, and more." },
    ],
  },
  {
    slug: "image-converter",
    title: "Image Format Converter",
    shortTitle: "Convert",
    description: "Convert images between formats: JPEG, PNG, WebP, GIF, and more.",
    metaDescription: "Convert images between formats online for free. Support JPEG, PNG, WebP, GIF, BMP. Instant conversion.",
    seoContent: "Convert images between all popular formats with ToolHub's free online image converter. Support for JPEG, PNG, WebP, GIF, and BMP means you can convert any image to the format you need.\n\nNeed to convert PNG to JPEG for smaller file sizes? Or convert JPEG to WebP for better web performance? Our tool handles all conversions instantly in your browser.\n\nBatch conversion is supported — convert multiple images at once. All processing happens locally in your browser for maximum speed and privacy.",
    icon: RefreshCw,
    gradient: "bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-500",
    category: "image",
    acceptFile: true,
    fileAccept: "image/*",
    faqs: [
      { q: "Which formats can I convert between?", a: "We support JPEG, PNG, WebP, GIF, and BMP conversions." },
      { q: "Does conversion affect quality?", a: "We use high-quality settings by default. You can adjust quality for lossy formats." },
      { q: "Can I convert WebP to PNG?", a: "Yes, you can convert between any supported formats including WebP to PNG." },
    ],
  },
  // Video Tools
  {
    slug: "video-converter",
    title: "Video to MP4 Converter Online",
    shortTitle: "To MP4",
    description: "Convert any video format to MP4 quickly and easily. Supports AVI, MOV, MKV, WebM and more.",
    metaDescription: "Convert video to MP4 online for free. Support AVI, MOV, MKV, WebM. Fast browser-based conversion.",
    seoContent: "Convert your videos to MP4 format with ToolHub's free online video converter. MP4 is the most widely supported video format, compatible with virtually all devices and platforms.\n\nOur converter supports input formats including AVI, MOV, MKV, WebM, FLV, and WMV. Simply upload your video, and we'll convert it to a high-quality MP4 file.\n\nThe conversion process happens directly in your browser using advanced WebAssembly technology. Your videos are never uploaded to external servers, ensuring complete privacy. Supports files up to 500MB.",
    icon: FileVideo,
    gradient: "bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-400",
    category: "video",
    acceptFile: true,
    fileAccept: "video/*",
    faqs: [
      { q: "Which video formats are supported?", a: "We support AVI, MOV, MKV, WebM, FLV, WMV, and many more." },
      { q: "Is there a file size limit?", a: "You can convert videos up to 500MB for free." },
      { q: "How long does conversion take?", a: "Most videos convert in under a minute, depending on file size." },
      { q: "Can I convert to formats other than MP4?", a: "Currently we focus on MP4 as the output format. More formats coming soon." },
    ],
  },
  {
    slug: "video-compressor",
    title: "Compress Video Online Free",
    shortTitle: "Compress",
    description: "Reduce video file size while maintaining quality. Perfect for sharing and uploading.",
    metaDescription: "Compress video files online for free. Reduce video size without quality loss. Fast and easy.",
    seoContent: "Reduce the size of your video files without sacrificing quality using ToolHub's free online video compressor. Perfect for sharing videos via email, messaging apps, or uploading to social media with file size limits.\n\nOur intelligent compression technology analyzes your video and applies optimal settings to achieve the best balance between file size and visual quality.\n\nWorks with MP4, AVI, MOV, MKV, and other popular video formats. All processing happens in your browser — your videos stay private and secure.",
    icon: Minimize2,
    gradient: "bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500",
    category: "video",
    acceptFile: true,
    fileAccept: "video/*",
    faqs: [
      { q: "How much can videos be compressed?", a: "Typically 40-70% reduction depending on the original video quality and settings." },
      { q: "Does it affect video quality?", a: "We use smart compression to maintain visual quality while reducing file size." },
      { q: "What video formats are supported?", a: "MP4, AVI, MOV, MKV, WebM, and more." },
    ],
  },
  // Downloader (single universal tool)
  {
    slug: "downloader",
    title: "Free Video Downloader Online",
    shortTitle: "Downloader",
    description: "Download videos from Instagram, YouTube, TikTok and more. Supports MP4 HD, SD, and MP3 audio.",
    metaDescription: "Free all-in-one video downloader. Download Instagram Reels, YouTube Shorts, TikTok videos without watermark in MP4 or MP3. No registration.",
    seoContent: "ToolHub's All-in-One Video Downloader lets you save videos from Instagram, YouTube, and TikTok in just a few clicks. Whether you want to download Instagram Reels, YouTube Shorts, or TikTok videos without watermark — we've got you covered.\n\nChoose from multiple format options including MP4 HD for the best quality, MP4 SD for smaller file sizes, or MP3 to extract audio only. Our downloader works on all devices — desktop, tablet, and mobile.\n\nNo registration, no software installation, completely free. Just paste your link and download. We support public content from all major social media platforms with fast, reliable downloads.",
    icon: Download,
    gradient: "bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500",
    category: "downloader",
    placeholder: "Paste Instagram, YouTube, or TikTok link here...",
    faqs: [
      { q: "Which platforms are supported?", a: "We support Instagram, YouTube, and TikTok. More platforms coming soon." },
      { q: "Can I download without watermark?", a: "Yes! TikTok videos are downloaded without watermark automatically." },
      { q: "Is it free?", a: "Completely free. No registration or sign-up required." },
      { q: "Can I download audio only?", a: "Yes, select the MP3 format option to extract audio from any video." },
      { q: "Is it legal to download videos?", a: "Downloading publicly available content for personal use is generally acceptable. Always respect copyright and the platform's terms of service." },
    ],
  },
];

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getRelatedTools(slug: string, limit = 4): Tool[] {
  const tool = getToolBySlug(slug);
  if (!tool) return tools.slice(0, limit);
  const sameCategory = tools.filter((t) => t.category === tool.category && t.slug !== slug);
  const others = tools.filter((t) => t.category !== tool.category);
  return [...sameCategory, ...others].slice(0, limit);
}

// SEO keyword redirect map — maps SEO-friendly slugs to actual tool slugs
export const seoRedirects: Record<string, string> = {
  "video-downloader": "/downloader",
  "instagram-video-downloader": "/downloader",
  "instagram-downloader": "/downloader",
  "instagram-reel-downloader": "/downloader",
  "youtube-to-mp3": "/downloader",
  "youtube-shorts-downloader": "/downloader",
  "youtube-downloader": "/downloader",
  "tiktok-video-downloader": "/downloader",
  "tiktok-downloader": "/downloader",
  "compress-pdf-online": "/compress-pdf",
  "pdf-compressor": "/compress-pdf",
  "convert-pdf-to-word": "/pdf-to-word",
  "pdf-to-docx": "/pdf-to-word",
  "compress-image": "/image-compressor",
  "resize-image": "/image-resizer",
  "convert-video-to-mp4": "/video-converter",
  "compress-video": "/video-compressor",
};
