import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download, Loader2, AlertCircle, CheckCircle2,
  Instagram, Youtube, Video, Music, Film, ChevronDown, ChevronRight, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import AdBanner from "@/components/AdBanner";
import { getToolBySlug, getRelatedTools, type Tool } from "@/lib/tools";

type Format = "mp4-hd" | "mp4-sd" | "mp3";

const formats: { value: Format; label: string; icon: any; desc: string }[] = [
  { value: "mp4-hd", label: "MP4 (HD)", icon: Film, desc: "High quality video" },
  { value: "mp4-sd", label: "MP4 (SD)", icon: Film, desc: "Smaller file size" },
  { value: "mp3", label: "MP3", icon: Music, desc: "Audio only" },
];

const platformMeta: Record<string, {
  heroGradient: string;
  orbs: { color: string; position: string; size: string; blur: string; duration: string }[];
  subtitle: string;
  crossLinks: { slug: string; label: string; text: string }[];
  benefits: string[];
}> = {
  "instagram-downloader": {
    heroGradient: "from-[#833ab4] via-[#c13584] to-[#e1306c]",
    orbs: [
      { color: "bg-[#833ab4]/40", position: "top-[-20%] left-[-10%]", size: "w-[500px] h-[500px]", blur: "blur-[120px]", duration: "animate-[pulse_8s_ease-in-out_infinite]" },
      { color: "bg-[#e1306c]/30", position: "bottom-[-20%] right-[-10%]", size: "w-[400px] h-[400px]", blur: "blur-[100px]", duration: "animate-[pulse_10s_ease-in-out_infinite_1s]" },
      { color: "bg-[#fccc63]/15", position: "top-[30%] right-[15%]", size: "w-[300px] h-[300px]", blur: "blur-[90px]", duration: "animate-[pulse_12s_ease-in-out_infinite_2s]" },
    ],
    subtitle: "Instagram Downloader – Reels, Stories & Posts in HD",
    crossLinks: [
      { slug: "youtube-downloader", label: "YouTube Downloader", text: "Looking to download YouTube videos?" },
      { slug: "tiktok-downloader", label: "TikTok Downloader", text: "Want to save TikTok videos without watermark?" },
    ],
    benefits: [
      "Download Instagram Reels in full HD quality",
      "Save Stories before they disappear after 24 hours",
      "Download photo and video Posts easily",
      "Convert Instagram videos to MP3 audio",
      "No watermark on any downloads",
      "Works on all devices — mobile, tablet, desktop",
    ],
  },
  "tiktok-downloader": {
    heroGradient: "from-[#010101] via-[#25f4ee]/80 to-[#fe2c55]/80",
    orbs: [
      { color: "bg-[#25f4ee]/30", position: "top-[-15%] left-[-10%]", size: "w-[500px] h-[500px]", blur: "blur-[120px]", duration: "animate-[pulse_9s_ease-in-out_infinite]" },
      { color: "bg-[#fe2c55]/25", position: "bottom-[-15%] right-[-10%]", size: "w-[450px] h-[450px]", blur: "blur-[110px]", duration: "animate-[pulse_11s_ease-in-out_infinite_1s]" },
      { color: "bg-[#010101]/20", position: "top-[40%] left-[20%]", size: "w-[250px] h-[250px]", blur: "blur-[80px]", duration: "animate-[pulse_8s_ease-in-out_infinite_0.5s]" },
    ],
    subtitle: "Download TikTok Videos Without Watermark in HD or Convert to MP3",
    crossLinks: [
      { slug: "instagram-downloader", label: "Instagram Downloader", text: "Need to download Instagram Reels?" },
      { slug: "youtube-downloader", label: "YouTube Downloader", text: "Want to save YouTube videos or Shorts?" },
    ],
    benefits: [
      "Download TikTok videos without watermark",
      "HD quality video downloads",
      "Extract audio as MP3 from any TikTok",
      "Fast processing — instant downloads",
      "No app installation required",
      "Works on iPhone, Android, and desktop",
    ],
  },
  "youtube-downloader": {
    heroGradient: "from-[#cc0000] via-[#ff0000] to-[#ff4444]",
    orbs: [
      { color: "bg-[#ff0000]/30", position: "top-[-20%] left-[-10%]", size: "w-[500px] h-[500px]", blur: "blur-[120px]", duration: "animate-[pulse_8s_ease-in-out_infinite]" },
      { color: "bg-[#282828]/20", position: "bottom-[-15%] right-[-10%]", size: "w-[400px] h-[400px]", blur: "blur-[100px]", duration: "animate-[pulse_10s_ease-in-out_infinite_1s]" },
      { color: "bg-[#ff6666]/15", position: "top-[35%] right-[20%]", size: "w-[300px] h-[300px]", blur: "blur-[90px]", duration: "animate-[pulse_12s_ease-in-out_infinite_2s]" },
    ],
    subtitle: "Download YouTube Videos, Shorts & Extract Audio as MP3",
    crossLinks: [
      { slug: "instagram-downloader", label: "Instagram Downloader", text: "Want to download Instagram Reels and Stories?" },
      { slug: "tiktok-downloader", label: "TikTok Downloader", text: "Need to save TikTok videos without watermark?" },
    ],
    benefits: [
      "Download YouTube videos in HD up to 1080p",
      "Save YouTube Shorts easily",
      "Convert YouTube videos to MP3 audio",
      "No software or browser extension needed",
      "Fast and free — no registration required",
      "Compatible with all devices and browsers",
    ],
  },
};

const DownloaderPage = () => {
  const location = useLocation();
  const slug = location.pathname.replace("/", "");
  const tool = getToolBySlug(slug);
  const meta = platformMeta[slug];

  const [url, setUrl] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<Format>("mp4-hd");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const relatedTools = getRelatedTools(slug, 4);

  useEffect(() => {
    if (tool) {
      document.title = `${tool.title} — Free Online Tool | ToolHub`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", tool.metaDescription);
    }
  }, [tool]);

  useEffect(() => {
    if (status === "success" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  if (!tool || !meta) return null;

  const Icon = tool.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    if (!url.startsWith("http")) {
      setStatus("error");
      setErrorMsg("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const cleanUrl = url.split("?")[0].trim();
      const apiUrl = `https://downloadhubworker.karanvirsidhu03.workers.dev?url=${encodeURIComponent(cleanUrl)}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.success && data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
        setVideoTitle(data.title || "Video from " + tool.shortTitle);
        if (data.thumbnail) {
          const workerBase = "https://downloadhubworker.karanvirsidhu03.workers.dev";
          setThumbnail(`${workerBase}/proxy-image?img=${encodeURIComponent(data.thumbnail)}`);
        } else {
          setThumbnail("");
        }
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Failed to fetch download link. The content may be private or unavailable.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    url: `https://toolhub.app/${tool.slug}`,
    description: tool.metaDescription,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div className="min-h-[80vh]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
          <ChevronRight className="h-3 w-3" />
          <li><Link to="/downloaders" className="hover:text-primary transition-colors">Downloaders</Link></li>
          <ChevronRight className="h-3 w-3" />
          <li className="text-foreground font-medium">{tool.shortTitle}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className={`absolute inset-0 bg-gradient-to-br ${meta.heroGradient} opacity-90`} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

        {meta.orbs.map((orb, i) => (
          <div key={i} className={`absolute ${orb.position} ${orb.size} rounded-full ${orb.color} ${orb.blur} ${orb.duration}`} />
        ))}

        <div className="absolute inset-0 bg-black/10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm mb-6">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3">
              {tool.title}
            </h1>
            <p className="text-white/70 text-base mb-8">{meta.subtitle}</p>

            {/* Search Bar - prominent */}
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <Icon className="h-5 w-5 text-white/50" />
                  </div>
                  <Input
                    value={url}
                    onChange={(e) => { setUrl(e.target.value); setStatus("idle"); }}
                    placeholder={tool.placeholder}
                    className="h-16 pl-12 bg-white/20 backdrop-blur-md border-2 border-white/30 text-white placeholder:text-white/50 text-lg rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)] focus:border-white/60 focus:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!url.trim() || status === "loading"}
                  size="lg"
                  className="h-16 px-10 bg-white text-gray-900 hover:bg-white/90 font-bold text-lg rounded-2xl shadow-lg"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Download className="h-5 w-5 mr-2" />
                      Download
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Loading */}
            <AnimatePresence>
              {status === "loading" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 flex items-center justify-center gap-3 text-white/80">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm font-medium">Fetching video details...</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            {status === "error" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center justify-center gap-2 text-red-200">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{errorMsg}</span>
              </motion.div>
            )}

            {/* Success / Preview */}
            {status === "success" && (
              <motion.div
                ref={resultRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="flex flex-col items-center gap-5">
                  {thumbnail && (
                    <img src={thumbnail} alt="Video preview" className="w-full max-w-sm rounded-xl shadow-lg" referrerPolicy="no-referrer" crossOrigin="anonymous" />
                  )}
                  <div className="text-center">
                    <h3 className="text-white font-semibold text-lg mb-1">{videoTitle}</h3>
                    <span className="inline-flex items-center gap-1.5 text-white/70 text-sm">
                      <Icon className="h-4 w-4" />
                      {tool.shortTitle}
                    </span>
                  </div>

                  {/* Format selector */}
                  <div className="w-full max-w-sm">
                    <p className="text-white/70 text-sm mb-3 font-medium">Download as:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {formats.map((fmt) => {
                        const FmtIcon = fmt.icon;
                        const isActive = selectedFormat === fmt.value;
                        return (
                          <button
                            key={fmt.value}
                            onClick={() => setSelectedFormat(fmt.value)}
                            className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all text-sm ${
                              isActive
                                ? "bg-white/25 border-white/40 text-white"
                                : "bg-white/10 border-white/10 text-white/60 hover:bg-white/15"
                            }`}
                          >
                            <FmtIcon className="h-4 w-4" />
                            <span className="font-medium">{fmt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="w-full flex justify-center py-2">
                    <AdBanner />
                  </div>

                  <a
                    href={downloadUrl}
                    target="_self"
                    download={`download_${Date.now()}`}
                    className="inline-flex items-center justify-center w-full max-w-sm h-14 bg-white text-gray-900 hover:bg-white/90 font-bold text-lg rounded-xl shadow-lg no-underline transition-colors"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Now
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <AdBanner className="container mx-auto px-4 rounded-lg" />

      {/* How it works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { step: "1", title: "Paste Link", desc: `Copy the ${tool.shortTitle} URL and paste it above` },
            { step: "2", title: "Choose Format", desc: "Select MP4 HD, MP4 SD, or MP3 audio" },
            { step: "3", title: "Download", desc: "Click download and save to your device" },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                <span className="font-display font-bold text-primary-foreground">{s.step}</span>
              </div>
              <h3 className="font-display font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border p-8">
          <h2 className="font-display text-xl font-bold mb-4">Why Use Our {tool.shortTitle} Downloader?</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {meta.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SEO content */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border p-8">
          <h2 className="font-display text-xl font-bold mb-4">Free {tool.shortTitle} Video Downloader</h2>
          <div className="text-sm text-muted-foreground space-y-3">
            {tool.seoContent.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="font-display text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto space-y-3">
          {tool.faqs.map((faq, i) => (
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

      <AdBanner className="container mx-auto px-4 rounded-lg" />

      {/* Cross-links */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-center mb-8">Try Other Tools</h2>
          <div className="space-y-4 mb-8">
            {meta.crossLinks.map((cl) => (
              <div key={cl.slug} className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-sm text-muted-foreground">{cl.text}</p>
                <Link
                  to={`/${cl.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  {cl.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* Related tools grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((rt) => (
              <Link key={rt.slug} to={`/${rt.slug}`} className="group block bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-all card-shadow">
                <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${rt.gradient} text-primary-foreground mb-3 group-hover:scale-110 transition-transform`}>
                  <rt.icon className="h-4 w-4" />
                </div>
                <h3 className="font-display text-sm font-semibold mb-1">{rt.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{rt.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DownloaderPage;
