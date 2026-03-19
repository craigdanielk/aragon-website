# ARAGON Agent Pages — Design Spec v1

**Date:** 2026-03-19
**BRIEF:** `BRIEF::aragon-agent-pages-design::2026-03-19`
**Status:** Design only — NOT implementation
**Scope:** 3D mascot system, inline commenting, inline auto-linking

---

## 1. Current State

Each agent already has `/agents/[slug]` pages with:
- Hero header with 2D SVG icon (circle + initial letter)
- Status badge (operational / beta / stub)
- Capabilities list
- Connections (calls / called_by with links)
- Soul quote
- Recent artifacts from Supabase `artifacts` table

**Missing from spec:** 3D mascot, enhanced blog feed, inline commenting, inline auto-linking.

---

## 2. Feature 1 — 3D Interactive Mascot

### Decision: Spline over Three.js

| | Spline | Three.js |
|---|---|---|
| Bundle size | ~180KB (Spline viewer) | 600KB+ (three + custom scenes) |
| Integration | `@splinetool/react-spline` — single component | Custom loader, scene management, animation loop |
| Art pipeline | Designer creates in Spline Studio, exports scene URL | Code-only, no visual editor |
| Per-agent customization | Colour/material overrides via `onLoad` + `spline.setVariable()` | Full control via materials/meshes |
| Performance on mobile | 60fps for small scenes | Depends on scene complexity |
| Verdict | **Use Spline** for v1 | Keep as backup if Spline scenes feel heavy |

### Data Requirements

Add to `Agent` interface in `src/lib/agents.ts`:
```typescript
interface Agent {
  // ... existing fields ...
  spline_url?: string;         // https://prod.spline.design/{scene-id}/scene.splinecode
  spline_bg_color?: string;    // fallback colour if Spline not loaded
}
```

Each agent needs a Spline scene designed (14 total). Scene requirements:
- **Shared template:** sci-fi orb / robot companion with floating circuit elements
- **Per-agent variation:** accent colour, personality motion (e.g. SOVEREIGN = slow majestic rotation, EXECUTOR = rapid pulse, LORE = book-flip idle)
- **Interactions:** hover → look at cursor (use Spline's "Follow Cursor" behaviour), click → wave/greeting animation

### Component Spec

```tsx
// src/components/agent-mascot.tsx
"use client";
import Spline from "@splinetool/react-spline";

export function AgentMascot({ splineUrl, fallbackColor, name }: Props) {
  if (!splineUrl) return <AgentIcon2D name={name} color={fallbackColor} />;
  return (
    <div className="relative w-[240px] h-[240px]">
      <Suspense fallback={<AgentIcon2D name={name} color={fallbackColor} />}>
        <Spline scene={splineUrl} className="w-full h-full" />
      </Suspense>
    </div>
  );
}
```

### Layout Change

Current header: `[2D SVG 72px] [name + role block]`
New header: `[Spline 240px wide, right-floated on md+]` behind hero content (parallax on scroll optional in v2)

---

## 3. Feature 2 — Agent-Filtered Blog Feed

### Current State
`RecentArtifacts` fetches from `artifacts` table where `agent = agentName`. This shows raw records, not styled blog cards.

### Requirement
A proper content feed showing:
- Blog posts AUTHORED by or ABOUT this agent
- Format: card with title, excerpt, date, pill tag (pillar)
- "See all" link to `/blog?agent={slug}`

### Data Model

The `artifacts` table already has `agent`, `title`, `created_at`, `brief_id`. Needs:
```sql
ALTER TABLE artifacts ADD COLUMN IF NOT EXISTS excerpt text;
ALTER TABLE artifacts ADD COLUMN IF NOT EXISTS pillar text;
ALTER TABLE artifacts ADD COLUMN IF NOT EXISTS url text;
```

Or use the blog content MDX files already in `content/blog/` with frontmatter:
```yaml
---
agents: [EXECUTOR, SOVEREIGN]
---
```

### Recommendation
Use MDX frontmatter for content sourcing (no DB query needed) + keep Supabase as supplement for dynamic artifacts.

Add to `src/lib/agents.ts`:
```typescript
// in generateStaticParams, read blog MDX frontmatter to find posts per agent
// OR: add a /api/agent-content?slug={slug} route that merges MDX + Supabase
```

### Component Spec
```tsx
// src/components/agent-blog-feed.tsx
export function AgentBlogFeed({ agentName }: { agentName: string }) {
  // 5 most recent posts where frontmatter.agents includes agentName
  // Rendered as: title, excerpt truncated to 2 lines, date, pillar badge
}
```

---

## 4. Feature 3 — Inline Commenting System

### Architecture

```
User reads agent page
→ hovers paragraph → anchor icon appears at right margin
→ clicks anchor → comment panel slides in (right-column)
→ types comment → stores to Supabase `comments` table
→ comment appears in panel with timestamp + author (anon by default)
```

### Supabase Schema

```sql
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,          -- e.g. "/agents/sovereign"
  anchor_id text NOT NULL,          -- e.g. "para-capabilities-0"
  content text NOT NULL,
  author text NOT NULL DEFAULT 'anon',
  created_at timestamptz DEFAULT now(),
  parent_id uuid REFERENCES comments(id)  -- for replies
);
CREATE INDEX ON comments(page_path, anchor_id);
```

### Anchor ID Convention

Every `<p>`, `<li>` block, `<blockquote>` in agent pages gets:
```tsx
id={`para-${sectionSlug}-${index}`}
```
Example: `para-capabilities-0`, `para-soul-0`, `para-connections-calls-2`

Sections to anchor: `capabilities` items, `soul` blockquote, `description` paragraphs, connection lists.

### Component Spec

```tsx
// src/components/commenting/anchored-paragraph.tsx
"use client";
// Wraps children. Shows anchor icon on hover.
// On anchor click: fires onOpen(anchorId)

// src/components/commenting/comment-panel.tsx
"use client";
// Fixed right-panel (w-80), slides in when activeAnchor is set
// Shows thread for that anchor. Has <textarea> for new comment.
// Calls POST /api/comments with { page_path, anchor_id, content }

// src/app/api/comments/route.ts
// GET: ?page_path=&anchor_id= → returns comment thread
// POST: { page_path, anchor_id, content } → inserts, returns new comment
```

### Comment Panel Layout
```
[×]  Comments on "capabilities → Sprint planning"
────────────────────────────────────────────────
[avatar] anon  2026-03-19 14:30
  This is the most important capability.
  [Reply]

[avatar] craig  2026-03-19 14:45
  Agreed — SOVEREIGN handles all prioritisation.
  [Reply]

────────────────────────────────────────────────
[                              ] [Post]
```

### Auth
v1: anonymous with session-id cookie as author token.
v2: Supabase Auth with GitHub/email for named authors.

---

## 5. Feature 4 — Inline Auto-Linking System

### Concept
A post-processing pass over rendered agent page text that detects known names and wraps them in links.

### Dictionaries (hardcoded + Supabase-synced)

```typescript
// src/lib/auto-linker.ts

const AGENT_NAMES = [
  "SOVEREIGN", "FORGE", "EXECUTOR", "SCRIBE", "PRISM", "COMPASS",
  "LORE", "RECON", "SAGE", "ARAGON", "VERIFY", "HEARTBEAT", "DELIVER", "KIRA"
];

const TOOL_NAMES = [
  "RAG", "Supabase", "Pinecone", "Vercel", "GitHub", "Telegram",
  "Next.js", "Tailwind", "Stripe"
];

const WORKFLOW_NAMES = [
  "BRIEF", "Sprint", "APQC", "DEFCON", "wave execution", "skill chain"
];

type LinkEntry = { display: string; href: string; tooltip?: string };
```

### Algorithm

```
renderContent(text: string, currentAgentSlug: string): ReactNode
  → tokenize text by whitespace/punctuation
  → for each token: check against dictionaries (case-insensitive)
  → if match AND not current page's agent → wrap in <AutoLink>
  → <AutoLink> = <a href={entry.href} title={entry.tooltip}>
```

### Exclusions
- Do NOT auto-link the current agent's own name (avoid self-referential links)
- Do NOT link inside code blocks or `<pre>` elements
- Limit to max 1 link per term per paragraph (first occurrence only)

### Component Spec
```tsx
// src/components/auto-linker.tsx
export function AutoLinkedText({ children, exclude }: { children: string; exclude?: string[] }) {
  // Post-process children string
  // Returns React fragment with text and <AutoLink> elements
}
```

Integration: wrap `agent.description`, `agent.soul`, `agent.capabilities` items in `<AutoLinkedText exclude={[agent.name]}>`.

---

## 6. Data Requirements Summary

### `src/lib/agents.ts` additions
```typescript
interface Agent {
  // new
  spline_url?: string;
  spline_bg_color?: string;
  blog_tags?: string[];   // filter tags for MDX blog posts
}
```

### New Supabase table
```sql
CREATE TABLE comments ( ... );  -- see §4 above
```

### `artifacts` table additions
```sql
ALTER TABLE artifacts ADD COLUMN excerpt text;
ALTER TABLE artifacts ADD COLUMN pillar text;
ALTER TABLE artifacts ADD COLUMN url text;
```

---

## 7. Implementation Plan

### Phase 1 — 3D Mascot (1–2 days)
1. Install `@splinetool/react-spline`
2. Create `AgentMascot` component with Spline + 2D fallback
3. Design 1 prototype scene in Spline Studio (use SOVEREIGN as model)
4. Add `spline_url` to agents.ts for SOVEREIGN, test render
5. Commission 13 remaining scenes or batch-design using Spline template system
6. Roll out to all 14 agents once scenes ready

### Phase 2 — Enhanced Blog Feed (0.5 days)
1. Add `agents` frontmatter to existing blog MDX posts
2. Create `getPostsForAgent(slug)` utility using gray-matter
3. Build `AgentBlogFeed` component
4. Wire into `AgentDetail` below the Soul section

### Phase 3 — Inline Commenting (1.5 days)
1. Run Supabase migration (comments table)
2. Create `/api/comments` route (GET + POST)
3. Build `AnchoredParagraph` wrapper component
4. Build `CommentPanel` slide-in component
5. Add anchor IDs to AgentDetail sections
6. Wire open/close state via `useState` in AgentDetail

### Phase 4 — Auto-Linking (0.5 days)
1. Build `auto-linker.ts` dictionary + tokenizer
2. Build `AutoLinkedText` component
3. Wrap description, soul, capabilities in AgentDetail

### Total Estimate: ~4 days for all features

---

## 8. Dependencies

| Feature | Install | Config |
|---|---|---|
| 3D Mascot | `npm install @splinetool/react-spline` | Spline Studio account for scene authoring |
| Blog Feed | None (MDX already set up) | Add `agents` frontmatter to existing posts |
| Commenting | None (Supabase already set up) | Run migration, add table |
| Auto-linking | None | Dictionary maintained in `src/lib/auto-linker.ts` |

---

## 9. Out of Scope

- Building the Spline 3D scenes themselves (requires design tool work)
- Full authentication for comments (v1 = anon only)
- Comment moderation UI
- Blog post creation from this spec
- Dependency graph visualisation (separate BRIEF)
