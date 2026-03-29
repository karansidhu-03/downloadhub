import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import AdBanner from "@/components/AdBanner";

const blogPosts: Record<string, { title: string; metaDescription: string; date: string; category: string; content: string; relatedTools: { slug: string; label: string }[] }> = {
  "how-to-compress-pdf": {
    title: "How to Compress PDF Files Without Losing Quality",
    metaDescription: "Learn how to compress PDF files online for free without losing quality. Step-by-step guide with tips for reducing PDF file size.",
    date: "Mar 25, 2026",
    category: "PDF",
    content: `Large PDF files can be a headache when you need to email them, upload them to a website, or store them efficiently. Fortunately, compressing PDFs doesn't have to mean sacrificing quality.

## Why Compress PDFs?

PDF files can grow surprisingly large, especially when they contain high-resolution images, embedded fonts, or complex graphics. Here are common reasons to compress:

- **Email attachments**: Most email providers limit attachment sizes to 25MB
- **Website uploads**: Smaller files load faster, improving user experience
- **Storage savings**: Reduce cloud storage costs
- **Faster sharing**: Compressed files transfer more quickly

## How to Compress PDF Online

Using ToolHub's free PDF compressor is simple:

1. **Upload your PDF** — Click the upload button or drag and drop your file
2. **Wait for processing** — Our tool analyzes and compresses your file automatically
3. **Download** — Get your compressed PDF with a single click

## Tips for Maximum Compression

- **Remove unnecessary images**: If images aren't essential, remove them before compressing
- **Use web-optimized settings**: Choose "web-ready" compression for the smallest file sizes
- **Compress before merging**: If combining multiple PDFs, compress each one first
- **Check the output**: Always review the compressed PDF to ensure quality meets your needs

## How Much Can You Compress?

Results vary depending on content. Image-heavy PDFs can be reduced by up to 90%, while text-only documents might see 20-40% reduction. Our smart compression algorithms ensure the best balance between size and quality.

Try our free PDF compressor today — no registration required, works on all devices.`,
    relatedTools: [
      { slug: "compress-pdf", label: "Compress PDF" },
      { slug: "merge-pdf", label: "Merge PDF" },
      { slug: "pdf-to-word", label: "PDF to Word" },
    ],
  },
  "best-image-compression-tips": {
    title: "5 Tips to Compress Images Without Losing Quality",
    metaDescription: "Discover the best image compression tips to reduce file size without losing quality. Optimize images for web and social media.",
    date: "Mar 22, 2026",
    category: "Images",
    content: `Image optimization is crucial for website performance, SEO, and user experience. Here are five proven tips to compress images effectively.

## 1. Choose the Right Format

Different image formats serve different purposes:

- **JPEG**: Best for photographs and complex images with many colors
- **PNG**: Ideal for graphics with transparency or sharp edges
- **WebP**: Modern format offering 25-35% smaller files than JPEG at equivalent quality

## 2. Resize Before Compressing

Don't compress a 4000x3000 image if you're displaying it at 800x600. Resize first, then compress for maximum savings.

## 3. Use Smart Compression

Tools like ToolHub's Image Compressor use intelligent algorithms that analyze each image and apply optimal compression settings. This maintains visual quality while achieving 50-80% file size reduction.

## 4. Batch Process Your Images

If you have multiple images, compress them all at once to save time. Our tool supports bulk compression — upload multiple files and download them all optimized.

## 5. Test Different Quality Levels

Sometimes reducing quality from 100% to 85% produces a visually identical image at half the file size. Experiment to find the sweet spot for your needs.

## Why Image Compression Matters for SEO

Google considers page speed as a ranking factor. Large, unoptimized images are one of the biggest causes of slow websites. Compressing your images can:

- Improve page load speed by 40-60%
- Reduce bounce rates
- Boost search engine rankings
- Save bandwidth costs

Start optimizing your images today with our free online image compressor.`,
    relatedTools: [
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "image-converter", label: "Image Converter" },
    ],
  },
  "how-to-download-instagram-reels": {
    title: "How to Download Instagram Reels in 2026",
    metaDescription: "Learn how to download Instagram Reels videos for free. Step-by-step guide to saving Instagram content to your device.",
    date: "Mar 18, 2026",
    category: "Instagram",
    content: `Instagram Reels have become one of the most popular content formats on social media. Whether you want to save a recipe, a workout routine, or a funny clip, here's how to download Instagram Reels easily.

## Method: Use ToolHub's Video Downloader

The simplest way to download Instagram Reels is with a free online downloader:

1. **Open Instagram** and find the Reel you want to download
2. **Copy the link** — Tap the three dots (⋯) and select "Copy Link"
3. **Paste the link** into ToolHub's All-in-One Video Downloader
4. **Choose your format** — Select MP4 HD, MP4 SD, or MP3 (audio only)
5. **Click Download** — Save the video to your device

## Can I Download Instagram Stories?

Currently, our tool supports Reels and public video posts. Stories from public accounts may also work.

## Is It Legal?

Downloading publicly available content for personal use is generally acceptable. However, always:

- Respect the original creator's copyright
- Don't redistribute content without permission
- Follow Instagram's Terms of Service
- Give credit when sharing content

## Tips for Best Quality

- Download in **MP4 HD** for the highest quality
- Ensure the Reel is **publicly visible** (private accounts can't be downloaded)
- Use a stable internet connection for faster downloads

Try our free video downloader — no registration, no software installation needed.`,
    relatedTools: [
      { slug: "downloader", label: "Video Downloader" },
      { slug: "video-converter", label: "Video Converter" },
      { slug: "video-compressor", label: "Video Compressor" },
    ],
  },
  "tiktok-downloader-no-watermark": {
    title: "TikTok Downloader: Save Videos Without Watermark",
    metaDescription: "Download TikTok videos without watermark for free. Step-by-step guide to saving TikTok content in high quality.",
    date: "Mar 14, 2026",
    category: "TikTok",
    content: `Want to save TikTok videos without the watermark? Our free TikTok downloader removes the watermark automatically, giving you clean, high-quality video files.

## How to Download TikTok Videos Without Watermark

1. **Open TikTok** and find the video you want to save
2. **Copy the link** — Tap "Share" then "Copy Link"
3. **Paste into ToolHub** — Go to our All-in-One Video Downloader
4. **Download** — The tool automatically removes the watermark

## Why Remove the Watermark?

- **Cleaner look** when sharing on other platforms
- **Professional presentations** without branding
- **Content creation** — use clips in compilations (with permission)

## Available Formats

Our TikTok downloader supports multiple formats:

- **MP4 HD** — Highest quality video
- **MP4 SD** — Smaller file size, good for messaging apps
- **MP3** — Extract audio only (great for music and sounds)

## Important Notes

- Only **public** TikTok videos can be downloaded
- Always respect content creators and their rights
- Don't claim others' content as your own
- Give proper credit when reposting

## Why ToolHub?

Unlike many TikTok downloaders that are filled with ads and pop-ups, ToolHub offers a clean, fast, and ad-minimal experience. No registration, no software — just paste and download.

Start downloading TikTok videos without watermark today!`,
    relatedTools: [
      { slug: "downloader", label: "Video Downloader" },
      { slug: "video-converter", label: "Video Converter" },
      { slug: "image-compressor", label: "Image Compressor" },
    ],
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug] : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | ToolHub Blog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", post.metaDescription);
    }
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-[80vh]">
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{post.category}</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-3">{post.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Calendar className="h-4 w-4" />
            {post.date}
          </div>

          <AdBanner className="mb-8 rounded-lg" />

          <div className="prose prose-sm max-w-none text-muted-foreground">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return <h2 key={i} className="font-display text-xl font-bold text-foreground mt-8 mb-4">{block.replace("## ", "")}</h2>;
              }
              if (block.startsWith("- ")) {
                return (
                  <ul key={i} className="list-disc pl-6 space-y-1 mb-4">
                    {block.split("\n").map((li, j) => (
                      <li key={j}>{li.replace(/^- \*\*(.*?)\*\*(.*)/, (_, bold, rest) => bold + rest).replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              if (/^\d\./.test(block)) {
                return (
                  <ol key={i} className="list-decimal pl-6 space-y-1 mb-4">
                    {block.split("\n").map((li, j) => (
                      <li key={j}>{li.replace(/^\d+\.\s*\*\*(.*?)\*\*\s*(.*)/, (_, bold, rest) => bold + " " + rest).replace(/^\d+\.\s*/, "")}</li>
                    ))}
                  </ol>
                );
              }
              return <p key={i} className="mb-4">{block}</p>;
            })}
          </div>

          <AdBanner className="my-8 rounded-lg" />

          {/* Related tools CTA */}
          <div className="bg-card rounded-2xl border border-border p-6 mt-8">
            <h3 className="font-display font-semibold mb-4">Try These Tools</h3>
            <div className="flex flex-wrap gap-3">
              {post.relatedTools.map((rt) => (
                <Link
                  key={rt.slug}
                  to={`/${rt.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  {rt.label} →
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;
