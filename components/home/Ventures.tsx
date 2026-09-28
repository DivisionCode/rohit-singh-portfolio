import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightGroup } from "@/components/ui/Spotlight";
import { StatusPill } from "@/components/ui/Tag";
import { profile } from "@/lib/content/site";
import { owned, led, type WorkItem } from "@/lib/content/work";

/**
 * Two groups, deliberately.
 *
 * The page used to present four companies as though they were all his, with
 * Fundrev given the most weight of the lot. Two of them sit outside his group,
 * and not in the same way as each other: he co-founded Tunegram and leads its
 * engineering, while Fundrev belongs to its founders and he is the senior
 * engineer on it. Flattening that would misrepresent everyone involved.
 *
 * So Sushraj Ventures leads, at full size, and the platforms outside it follow
 * in their own clearly labelled group.
 *
 * The three are one tiled object rather than three floating cards, with the
 * hairlines drawn by a 1px grid gap over the container background.
 *
 * All three tiles are the same size. Giving the newest one a wide two-column
 * panel made the section one big slab with nothing lining up across the
 * divide, and it put the other two businesses in its shadow, which is the
 * thing this section exists to stop. The deep detail lives on each case study
 * page, where there is room to align it.
 *
 * At lg the tiles are subgrids of the container's rows, so the name, the role,
 * the tagline, the summary and the footer each sit on a line shared by all
 * three. Equal-width tiles alone still read as ragged when the summaries are
 * different lengths; sharing the row tracks is what makes them line up.
 */
export function Ventures() {
  return (
    <section id="ventures" className="container-page scroll-mt-24 pt-[var(--section-y)]">
      <SectionHeading
        index="01"
        eyebrow={profile.group}
        title={
          <>
            Two companies of my own,{" "}
            <span className="text-ink-faint">and two platforms I build outside them.</span>
          </>
        }
        lead={
          <>
            <a
              href={profile.groupUrl}
              className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
            >
              {profile.group}
            </a>{" "}
            is my technology company: AI and data engineering, custom software, websites and its own
            products. Arthmala is my craft studio. Both run on one standard: find where the process
            loses money, build the system that closes the gap, then run it.
          </>
        }
        aside={`${owned.length} owned · ${led.length} outside`}
      />

      <SpotlightGroup className="grid gap-px overflow-clip rounded-xl border border-line bg-line lg:grid-cols-2 lg:gap-y-0 lg:[grid-template-rows:auto_auto_auto_auto_auto_1fr_auto_auto]">
        {owned.map((venture, position) => (
          <VentureCard key={venture.slug} venture={venture} index={position + 1} />
        ))}
      </SpotlightGroup>

      {/* Platforms outside the group, kept visibly separate from the above. */}
      <div className="mt-14 md:mt-18">
        <div data-reveal className="flex items-baseline justify-between gap-6">
          <span className="label-mono">Outside the group</span>
          <span className="label-mono shrink-0">{led.length} platforms</span>
        </div>

        <p
          data-reveal
          className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.7] text-ink-faint"
        >
          Two platforms that do not sit under {profile.group}. I co-founded Tunegram
          and lead its engineering. At Fundrev I am the senior software engineer, and
          the company belongs to its founders.
        </p>

        <SpotlightGroup className="mt-8">
          {led.map((venture, position) => {
            const site = venture.links.find((link) => link.kind === "site");
            return (
              <Link
                key={venture.slug}
                href={`/work/${venture.slug}/`}
                data-spotlight
                data-reveal
                className="spotlight group relative grid gap-y-3 border-t border-line py-7 last:border-b md:grid-cols-[2.5rem_13rem_1fr_auto] md:items-baseline md:gap-x-8"
              >
                <span className="label-mono hidden text-ink-ghost md:block">
                  {String(position + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-[1.375rem] tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent">
                    {venture.name}
                  </h3>
                  <p className="meta mt-1.5">{venture.role}</p>
                </div>

                <div>
                  <p className="text-[0.9375rem] leading-snug text-ink-muted">
                    {venture.tagline}
                  </p>
                  <p className="meta mt-2 leading-relaxed">
                    {venture.stack.slice(0, 6).join("  ·  ")}
                  </p>
                </div>

                <div className="flex items-center gap-5 md:justify-end">
                  {site ? <span className="meta">{site.label}</span> : null}
                  <Icon
                    name="arrowUpRight"
                    size={15}
                    className="text-ink-ghost transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>
              </Link>
            );
          })}
        </SpotlightGroup>
      </div>
    </section>
  );
}

function VentureCard({ venture, index }: { venture: WorkItem; index: number }) {
  const site = venture.links.find((link) => link.kind === "site");

  return (
    <Link
      href={`/work/${venture.slug}/`}
      data-spotlight
      data-reveal
      className="spotlight group flex flex-col bg-raised p-6 transition-colors duration-300 hover:bg-overlay/40 md:p-7 lg:row-span-8 lg:grid lg:[grid-template-rows:subgrid]"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="label-mono">{String(index).padStart(2, "0")}</span>
        <StatusPill status={venture.status} />
      </div>

      <h3 className="mt-7 text-[1.625rem] leading-none tracking-[-0.035em]">
        {venture.wordmark ?? venture.name}
      </h3>

      <p className="meta mt-3">
        {venture.role} · {venture.domains[0]}
      </p>

      <p className="mt-6 text-[1.0625rem] leading-snug text-ink">{venture.tagline}</p>

      <p className="mt-3 text-[0.875rem] leading-[1.7] text-ink-faint">{venture.summary}</p>

      {/* Hairline rows rather than a floating bullet list, so the card has a base. */}
      <ul className="mt-6">
        {venture.highlights.slice(0, 3).map((highlight) => (
          <li
            key={highlight.title}
            className="border-t border-line py-2.5 text-[0.8125rem] text-ink-muted"
          >
            {highlight.title}
          </li>
        ))}
      </ul>

      {/*
        The stack gets a row of its own, always rendered. A business with no
        shipped platform yet has no stack to claim, but the empty row keeps the
        rule below it on the same line as the other two tiles.
      */}
      <p className="meta mt-auto pt-7 leading-relaxed lg:mt-0">
        {venture.stack.slice(0, 4).join("  ·  ")}
      </p>

      <div>
        <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
          <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium transition-colors group-hover:text-accent">
            Case study
            <Icon
              name="arrowRight"
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
          {site ? <span className="meta">{site.label}</span> : null}
        </div>
      </div>
    </Link>
  );
}
