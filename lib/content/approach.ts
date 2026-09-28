export type Principle = {
  index: string;
  title: string;
  body: string;
  /** Short proof drawn from real work, shown as a footnote on the card. */
  evidence: string;
};

export const principles: Principle[] = [
  {
    index: "01",
    title: "Model the business, not the screens",
    body: "A system built screen-by-screen needs a new table for every requirement by year two. I start from the domain, what owns what, which boundaries are real, and let the interface follow. Modules expose contracts to each other instead of reaching into each other's data.",
    evidence: "D-ERP: inventory, payroll and finance reconcile against one ledger.",
  },
  {
    index: "02",
    title: "AI has to show its work",
    body: "A generated number nobody can trace is worse than no number, because someone will act on it. Extraction ties back to the source document, and the lineage is part of the data model rather than a citation stapled to the output.",
    evidence: "Fundrev: every figure tied to its source before it reaches an IC.",
  },
  {
    index: "03",
    title: "Access control is a migration, not a middleware",
    body: "Role-based access added late is a filter over data the caller already fetched. Designed in, it is a property of the query. I put roles in the schema on day one, when it is the cheapest it will ever be.",
    evidence: "Single-tenant isolation with RBAC across the portfolio systems.",
  },
  {
    index: "04",
    title: "Ship to the edge, cache honestly",
    body: "Most pages are content and should cost nothing to serve. Static where static works, edge where latency is the product, dynamic only where the data genuinely changes per request, with the security headers set rather than assumed.",
    evidence: "Tunegram on Cloudflare's edge; this site static-exported with a real CSP.",
  },
  {
    index: "05",
    title: "Build it to be handed over",
    body: "The measure of a system is how well it runs when I am not the one running it. Typed contracts, modular structure, and documentation written for the person who inherits it, which across four ventures is usually someone I hired.",
    evidence: "Six systems shipped and maintained since 2018, now under Sushraj Ventures.",
  },
];
