import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import AdBanner from "@/components/AdBanner";

const posts = [
  {
    slug: "how-to-download-instagram-reels",
    title: "How to Download Instagram Reels Without Watermark",
    excerpt: "The fastest and easiest way to save Instagram Reels to your phone or computer in HD quality.",
    date: "Mar 18, 2026",
    category: "Instagram",
  },
  {
    slug: "tiktok-downloader-no-watermark",
    title: "How to Save TikTok Videos Without Watermark",
    excerpt: "Step-by-step guide to downloading TikTok videos without any watermark in HD MP4 or MP3.",
    date: "Mar 14, 2026",
    category: "TikTok",
  },
  {
    slug: "youtube-to-mp3-guide",
    title: "Best YouTube to MP3 Converters (2026 Guide)",
    excerpt: "The easiest way to extract audio from YouTube videos and Shorts as MP3 files.",
    date: "Mar 20, 2026",
    category: "YouTube",
  },
  {
    slug: "instagram-story-downloader-guide",
    title: "Instagram Story Downloader Guide — Save Before They Expire",
    excerpt: "Learn how to save Instagram Stories from public accounts before they disappear after 24 hours.",
    date: "Mar 26, 2026",
    category: "Instagram",
  },
  {
    slug: "mp4-vs-mp3-format-guide",
    title: "MP4 vs MP3: Which Format Should You Choose?",
    excerpt: "Understand the differences between MP4 and MP3 formats and when to use each one.",
    date: "Mar 24, 2026",
    category: "Guide",
  },
  {
    slug: "best-ways-download-social-media-videos",
    title: "Best Ways to Download Social Media Videos Safely",
    excerpt: "A comprehensive guide to safely downloading videos from Instagram, YouTube, and TikTok.",
    date: "Mar 22, 2026",
    category: "Guide",
  },
  {
    slug: "top-tools-download-youtube-shorts",
    title: "Top Tools to Download YouTube Shorts in 2026",
    excerpt: "Discover the best free tools for saving YouTube Shorts to your device.",
    date: "Mar 21, 2026",
    category: "YouTube",
  },
  {
    slug: "how-to-convert-video-to-mp3",
    title: "How to Convert Videos to Audio (MP3) Online",
    excerpt: "Extract audio from any video file and save it as MP3 — free and online.",
    date: "Mar 19, 2026",
    category: "Guide",
  },
  {
    slug: "free-instagram-downloader-tools-compared",
    title: "Free Instagram Downloader Tools Compared (2026)",
    excerpt: "We compare the top free Instagram downloaders to help you choose the best one.",
    date: "Mar 17, 2026",
    category: "Instagram",
  },
  {
    slug: "why-people-use-online-video-downloaders",
    title: "Why People Use Online Video Downloaders in 2026",
    excerpt: "Explore the reasons millions of people use online video downloaders every day.",
    date: "Mar 15, 2026",
    category: "Guide",
  },
  {
    slug: "how-to-compress-pdf",
    title: "How to Compress PDF Files Without Losing Quality",
    excerpt: "Learn the best techniques to reduce PDF file size while maintaining document quality.",
    date: "Mar 25, 2026",
    category: "PDF",
  },
  {
    slug: "best-image-compression-tips",
    title: "5 Tips to Compress Images Without Losing Quality",
    excerpt: "Optimize your images for the web with these proven compression techniques.",
    date: "Mar 22, 2026",
    category: "Images",
  },
];

const Blog = () => {
  useEffect(() => {
    document.title = "Blog — Tips & Guides for Video Downloading & File Tools | ToolHub";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Read tips, guides, and tutorials about downloading Instagram Reels, TikTok videos without watermark, YouTube to MP3, PDF compression, and more.");
  }, []);

  return (
    <div className="min-h-[80vh]">
      <section className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">ToolHub Blog</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Tips, guides, and tutorials for downloading videos and using our free online tools.</p>
        </motion.div>

        <AdBanner className="mb-8 rounded-lg max-w-3xl mx-auto" />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {posts.map((post, i) => (
            <motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl p-6 card-shadow border border-border hover:border-primary/30 transition-all group">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{post.category}</span>
              <h2 className="font-display text-lg font-semibold mt-3 mb-2 group-hover:text-primary transition-colors">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="h-3 w-3" /> {post.date}</span>
                <Link to={`/blog/${post.slug}`} className="text-primary text-sm font-medium flex items-center gap-1">Read More <ArrowRight className="h-3 w-3" /></Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
