import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightGroup } from "@/components/ui/Spotlight";
import { products } from "@/lib/content/work";

/** So the heading cannot drift from the number of products actually listed. */
const NUMERALS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];

/**
 * A tiled grid rather than a table.
 *
 * This was a single card with eight rows in it, which read as a spreadsheet:
 * every product the same height, the same weight, nothing to look at. Tiles
 * separated by hairlines give each system its own space and let the stack sit
 * at the foot of the tile instead of in a cramped column.
 *
 * The hairlines are the 1px grid gap showing the container's background, so
 * there is one border rather than a border per cell, and no double lines where
 * tiles meet.
 */
export function Products() {
  return (
    <section id="products" className="container-page scroll-mt-24 pt-[var(--section-y)]">
      <SectionHeading
        index="03"
        eyebrow="Product line"
        title={
          <>
            {NUMERALS[products.length]} systems shipped under{" "}
            <span className="text-ink-faint">Sushraj Ventures.</span>
          </>
        }
        lead="ERP, CRM, pharmacy management, commerce and the tooling around them. Each built to the standard a business would need to actually run on it: authentication, role-based access, modular services and a deployment path that does not depend on me."
        aside={`${products.length} products`}
      />

      <SpotlightGroup className="grid gap-px overflow-clip rounded-xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <Link
            key={product.slug}
            href={`/work/${product.slug}/`}
            data-spotlight
            data-reveal
            className="spotlight group relative flex flex-col bg-raised p-6 transition-colors duration-300 hover:bg-overlay/40 md:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="label-mono">{String(index + 1).padStart(2, "0")}</span>
              <Icon
                name="arrowUpRight"
                size={15}
                className="text-ink-ghost transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </div>

            <h3 className="mt-7 text-[1.3125rem] tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent">
              {product.name}
            </h3>

            <p className="mt-2.5 text-[0.9375rem] leading-snug text-ink-muted">
              {product.tagline}
            </p>

            <p className="meta mt-auto pt-8 leading-relaxed">
              {product.stack.join("  ·  ")}
            </p>
          </Link>
        ))}
      </SpotlightGroup>
    </section>
  );
}
