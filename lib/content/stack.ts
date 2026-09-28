export type Tech = {
  name: string;
  /** Short qualifier shown on hover. */
  note?: string;
};

export type StackGroup = {
  id: string;
  title: string;
  blurb: string;
  items: Tech[];
};

/**
 * Drawn from what is actually in production, principally the Fundrev platform
 * (infrastructure, backend and web client) plus the Sushraj Ventures product line.
 * Technologies only. No internal service names, hostnames or architecture
 * detail from the private repositories.
 */
export const stackGroups: StackGroup[] = [
  {
    id: "languages",
    title: "Languages",
    blurb: "Typed where it earns its keep, and .NET still earning its place.",
    items: [
      { name: "TypeScript", note: "Strict, everywhere new" },
      { name: "JavaScript" },
      { name: "HCL", note: "Terraform" },
      { name: "SQL" },
      { name: "Python", note: "Sandboxed compute via Pyodide" },
      { name: "C#" },
      { name: "VB.NET" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Server components where the page is content, client state only where it is earned.",
    items: [
      { name: "Next.js", note: "App Router, React Server Components" },
      { name: "React 19" },
      { name: "Tailwind CSS", note: "v4" },
      { name: "React Hook Form" },
      { name: "Zod" },
      { name: "Plotly.js" },
      { name: "Glide Data Grid", note: "Virtualised million-row tables" },
      { name: "react-grid-layout" },
      { name: "Vue 3", note: "Composition API" },
      { name: "Vite" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "REST contracts a second team can pick up without a handover call.",
    items: [
      { name: "Node.js" },
      { name: "Express 5" },
      { name: "REST APIs" },
      { name: "Zod", note: "Schema validation at the boundary" },
      { name: "Koa" },
      { name: "ASP.NET" },
    ],
  },
  {
    id: "data",
    title: "Data",
    blurb: "Transactional, analytical and cached, each chosen for the job it actually does.",
    items: [
      { name: "PostgreSQL" },
      { name: "ClickHouse", note: "Columnar analytics" },
      { name: "Redis" },
      { name: "Cube", note: "Semantic layer" },
      { name: "Airbyte", note: "ELT" },
      { name: "MongoDB" },
      { name: "SQL Server" },
    ],
  },
  {
    id: "ai",
    title: "AI systems",
    blurb: "Agents that cite their sources, because an unsourced number is not an answer.",
    items: [
      { name: "LiteLLM", note: "Model gateway and cost routing" },
      { name: "Arize Phoenix", note: "LLM tracing and evaluation" },
      { name: "Claude Agent SDK" },
      { name: "RAG and retrieval" },
      { name: "AWS Textract", note: "Document OCR" },
      { name: "Agentic workflows" },
    ],
  },
  {
    id: "orchestration",
    title: "Orchestration",
    blurb: "Long-running work that survives a restart, a deploy and a bad afternoon.",
    items: [
      { name: "Temporal", note: "Durable workflow execution" },
      { name: "RabbitMQ" },
      { name: "Argo CD", note: "GitOps" },
      { name: "GitHub Actions", note: "Self-hosted ARC runners" },
    ],
  },
  {
    id: "infrastructure",
    title: "Cloud and infrastructure",
    blurb: "Everything reproducible from a repository, nothing clicked into existence.",
    items: [
      { name: "AWS" },
      { name: "Kubernetes", note: "EKS" },
      { name: "Terraform" },
      { name: "Docker" },
      { name: "Kustomize" },
      { name: "VPC and VPC endpoints" },
      { name: "S3" },
      { name: "ECR" },
      { name: "CloudFront" },
      { name: "HPA and PDBs" },
      { name: "Sealed Secrets" },
      { name: "Cloudflare" },
      { name: "Vercel" },
      { name: "Netlify" },
    ],
  },
  {
    id: "observability",
    title: "Observability",
    blurb: "Traces, logs and metrics from one story, including what the models cost.",
    items: [
      { name: "OpenTelemetry" },
      { name: "Grafana" },
      { name: "Loki", note: "Logs" },
      { name: "Tempo", note: "Traces" },
      { name: "Grafana Faro", note: "Real user monitoring" },
      { name: "Prometheus" },
    ],
  },
  {
    id: "security",
    title: "Security and identity",
    blurb: "Built for an audit, because in this domain there is always going to be one.",
    items: [
      { name: "WebAuthn", note: "Passkeys" },
      { name: "SAML SSO" },
      { name: "Argon2" },
      { name: "JWT" },
      { name: "TOTP" },
      { name: "IAM and IRSA" },
      { name: "Network policies" },
      { name: "Helmet and rate limiting" },
      { name: "CloudTrail" },
      { name: "SOC 2 controls" },
    ],
  },
  {
    id: "documents",
    title: "Document processing",
    blurb: "Finance runs on PDFs and spreadsheets, so the parser is a first-class concern.",
    items: [
      { name: "pdf.js and pdf-lib" },
      { name: "SheetJS" },
      { name: "ExcelJS" },
      { name: "officeparser" },
      { name: "Cheerio" },
      { name: "IMAP and MIME parsing" },
    ],
  },
  {
    id: "tooling",
    title: "Tooling",
    blurb: "The unglamorous half that decides whether anything ships twice.",
    items: [
      { name: "Git and GitHub" },
      { name: "Playwright" },
      { name: "ESLint" },
      { name: "Prettier" },
      { name: "Postman" },
      { name: "VS Code" },
      { name: "Visual Studio" },
      { name: "Atlassian" },
      { name: "Trello" },
      { name: "Slack" },
    ],
  },
];
