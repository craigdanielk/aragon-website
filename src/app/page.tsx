import { getBlogPosts } from "@/lib/content";
import { workflows } from "@/lib/workflows";
import { agents } from "@/lib/agents";
import { HeroSection } from "@/components/sections/hero";
import { LiveStats } from "@/components/sections/live-stats";
import { Capabilities } from "@/components/sections/capabilities";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FeaturedWorkflows } from "@/components/sections/featured-workflows";
import { AgentFleet } from "@/components/sections/agent-fleet";
import { LatestBlog } from "@/components/sections/latest-blog";
import { CtaSection } from "@/components/sections/cta";

export default function Home() {
  const blogPosts = getBlogPosts()
    .slice(0, 3)
    .map((p) => p.meta);

  return (
    <div>
      <HeroSection />
      <LiveStats />
      <Capabilities />
      <HowItWorks />
      <FeaturedWorkflows workflows={workflows} />
      <AgentFleet agents={agents} />
      <LatestBlog posts={blogPosts} />
      <CtaSection />
    </div>
  );
}
