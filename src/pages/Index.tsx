import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Globe, Search, TrendingUp, Instagram, Youtube, Video, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { categories, tools, type ToolCategory } from "@/lib/tools";
import AdBanner from "@/components/AdBanner";

const popularSlugs = ["instagram-downloader", "tiktok-downloader", "youtube-downloader", "compress-pdf", "image-compressor", "video-converter"];
const popularTools = popularSlugs.map((s) => tools.find((t) => t.slug === s)!).filter(Boolean);

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Instant processing with no wait times" },
  { icon: Shield, title: "100% Free & Secure", desc: "No registration, no data stored on servers" },
  { icon: Globe, title: "Works Everywhere", desc: "Compatible with all devices and browsers" },
];

const homeFaqs = [
  { q: "Is ToolHub really free?", a: "Yes, all tools on ToolHub are 100% free to use. No registration, no hidden charges, and no limits on usage." },
  { q: "Do I need to install any software?", a: "No. All tools work directly in your web browser. No downloads, no extensions, no apps needed." },
  { q: "Is it safe to use ToolHub?", a: "Absolutely. Your files and links are processed securely. We don't store your data or downloaded content on our servers." },
  { q: "Can I download videos from Instagram, YouTube, and TikTok?", a: "Yes! ToolHub supports downloading videos from Instagram (Reels, Stories, Posts), YouTube (videos and Shorts), and TikTok (without watermark). You can save as MP4 or extract audio as MP3." },
  { q: "What file tools are available?", a: "We offer PDF tools (compress, merge, split, convert to Word), image tools (compress, resize, convert formats), and video tools (convert to MP4, compress videos)." },
  { q: "Does ToolHub work on mobile?", a: "Yes, ToolHub is fully responsive and works perfectly on iPhone, Android, tablets, and desktop browsers." },
];

const blogPreviews = [
  { slug: "how-to-download-instagram-reels", title: "How to Download Instagram Reels in 2026", category: "Instagram" },
  { slug: "tiktok-downloader-no-watermark", title: "Save TikTok Videos Without Watermark", category: "TikTok" },
  { slug: "youtube-to-mp3-guide", title: "Convert YouTube Videos to MP3", category: "YouTube" },
  { slug: "instagram-story-downloader-guide", title: "Instagram Story Downloader Guide", category: "Instagram" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filtered = searchQuery.trim()
    ? tools.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="absolute top-20 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Free Online Tools — No Sign Up Required
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Download <span className="gradient-text">Instagram, YouTube & TikTok</span> Videos in HD
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Save videos without watermark, convert to MP3, compress PDFs, optimize images — 15+ free tools for every file task. No registration required.
            </p>

            {/* Quick access buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <Link to="/instagram-downloader" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium text-sm hover:opacity-90 transition-opacity">
                <Instagram className="h-4 w-4" /> Instagram Downloader
              </Link>
              <Link to="/tiktok-downloader" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium text-sm hover:opacity-90 transition-opacity">
                <Video className="h-4 w-4" /> TikTok Downloader
              </Link>
              <Link to="/youtube-downloader" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium text-sm hover:opacity-90 transition-opacity">
                <Youtube className="h-4 w-4" /> YouTube Downloader
              </Link>
            </div>

            {/* Universal Search Box */}
            <div className="max-w-xl mx-auto relative">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tools: compress PDF, download TikTok..."
                    className="h-14 pl-12 text-base rounded-xl border-2 border-border focus:border-primary shadow-sm"
                  />
                </div>
                <Button
                  size="lg"
                  className="h-14 px-6 gradient-hero border-0 text-primary-foreground font-semibold rounded-xl"
                  onClick={() => {
                    if (filtered.length > 0) navigate(`/${filtered[0].slug}`);
                  }}
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>

              {searchQuery.trim() && filtered.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-card rounded-xl border border-border shadow-lg p-2 z-50"
                >
                  {filtered.slice(0, 5).map((tool) => (
                    <Link
                      key={tool.slug}
                      to={`/${tool.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-colors"
                    >
                      <tool.icon className="h-4 w-4 text-primary" />
                      <div>
                        <span className="text-sm font-medium">{tool.title}</span>
                        <span className="text-xs text-muted-foreground ml-2">{categories[tool.category].label}</span>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <AdBanner className="container mx-auto px-4 rounded-lg" />

      {/* Category Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Browse by Category</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Choose a category to explore all available tools.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {(Object.entries(categories) as [ToolCategory, typeof categories[ToolCategory]][]).map(([key, cat]) => {
            const Icon = cat.icon;
            const toolCount = tools.filter((t) => t.category === key).length;
            return (
              <Link key={key} to={`/${cat.slug}`} className="group block bg-card rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 border border-border hover:border-primary/30">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} text-primary-foreground mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-1">{cat.label}</h3>
                <p className="text-sm text-muted-foreground">{toolCount} tools available</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular Tools */}
      <section className="bg-card border-y border-border py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-8">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl md:text-3xl font-bold">Popular Tools</h2>
          </div>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {popularTools.map((tool) => (
              <motion.div key={tool.slug} variants={item}>
                <Link to={`/${tool.slug}`} className="group block bg-background rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 border border-border hover:border-primary/30">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${tool.gradient} text-primary-foreground mb-3 group-hover:scale-110 transition-transform`}>
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-semibold mb-1">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AdBanner className="container mx-auto px-4 rounded-lg" />

      {/* SEO Introduction */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border p-8">
          <h2 className="font-display text-xl font-bold mb-4">Your All-in-One Online File Toolkit</h2>
          <div className="text-sm text-muted-foreground space-y-3">
            <p>
              ToolHub is your go-to destination for free online tools. Download videos from <Link to="/instagram-downloader" className="text-primary hover:underline">Instagram</Link>, <Link to="/tiktok-downloader" className="text-primary hover:underline">TikTok (no watermark)</Link>, and <Link to="/youtube-downloader" className="text-primary hover:underline">YouTube</Link> in MP4 or MP3 format — or use our powerful file tools to <Link to="/compress-pdf" className="text-primary hover:underline">compress PDFs</Link>, <Link to="/image-compressor" className="text-primary hover:underline">optimize images</Link>, and <Link to="/video-converter" className="text-primary hover:underline">convert videos</Link>.
            </p>
            <p>
              All tools are 100% free, require no registration, and work directly in your browser. Your files never leave your device, ensuring complete privacy and security.
            </p>
            <p>
              From <Link to="/pdf-to-word" className="text-primary hover:underline">PDF to Word conversion</Link> to <Link to="/image-resizer" className="text-primary hover:underline">image resizing</Link> and <Link to="/video-compressor" className="text-primary hover:underline">video compression</Link> — ToolHub provides fast, reliable tools for all your file needs.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Previews */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">Latest from Our Blog</h2>
          <p className="text-muted-foreground">Guides and tips for downloading videos and managing files.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-6">
          {blogPreviews.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group block bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-all card-shadow">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{post.category}</span>
              <h3 className="font-display text-sm font-semibold mt-3 mb-1 group-hover:text-primary transition-colors">{post.title}</h3>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            View All Articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="font-display text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto space-y-3">
          {homeFaqs.map((faq, i) => (
            <Collapsible key={i}>
              <CollapsibleTrigger className="flex items-center justify-between w-full bg-card rounded-xl p-4 border border-border text-left hover:border-primary/30 transition-colors group">
                <span className="font-medium text-sm">{faq.q}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4 pt-2 text-sm text-muted-foreground">
                {faq.a}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </section>
    </>
  );
};

export default Index;
