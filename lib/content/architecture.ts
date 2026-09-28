export type Layer = {
  id: string;
  index: string;
  title: string;
  caption: string;
  tech: string[];
  /** The systems this layer is actually running in, so nothing here is theory. */
  provenIn: string[];
};

/**
 * The reference architecture Rohit builds to, layer by layer.
 *
 * This used to be the Fundrev platform and nothing else, which was a holdover
 * from when the whole site was built around Fundrev. That made the one section
 * about engineering depth into an advert for a company he does not own. It is
 * now his own shape, and each layer names the systems it is in production in,
 * so the breadth is evidenced rather than asserted.
 *
 * Technologies and layer names only. Nothing here names an internal service,
 * a hostname, or anything else that is not already public.
 */
export const layers: Layer[] = [
  {
    id: "client",
    index: "01",
    title: "Client",
    caption:
      "Rendered on the server wherever it can be, hydrated only where the page is genuinely interactive.",
    tech: [
      "Next.js App Router",
      "React 19",
      "Vue 3",
      "TypeScript",
      "Tailwind CSS",
      "Glide Data Grid",
      "Plotly",
    ],
    provenIn: ["Fundrev", "Tunegram", "Sushraj Ventures"],
  },
  {
    id: "edge",
    index: "02",
    title: "Edge and ingress",
    caption:
      "TLS, caching and the first authorisation decision, before anything reaches a service.",
    tech: [
      "CloudFront",
      "Cloudflare edge",
      "AWS Load Balancer Controller",
      "Ingress",
      "Network policies",
      "Rate limiting",
    ],
    provenIn: ["Fundrev", "Tunegram"],
  },
  {
    id: "api",
    index: "03",
    title: "API",
    caption: "One typed boundary. Every request is schema-validated and traced end to end.",
    tech: [
      "Node.js",
      "Express 5",
      ".NET",
      "Zod",
      "WebAuthn",
      "SAML SSO",
      "Argon2",
      "OpenTelemetry",
    ],
    provenIn: ["Fundrev", "Sushraj Ventures"],
  },
  {
    id: "orchestration",
    index: "04",
    title: "Orchestration",
    caption:
      "Long jobs outlive the process that started them, so a deploy mid-run is survivable.",
    tech: ["Temporal", "RabbitMQ", "Workflow workers"],
    provenIn: ["Fundrev"],
  },
  {
    id: "intelligence",
    index: "05",
    title: "Intelligence",
    caption:
      "Model calls routed and costed through one gateway, every trace captured for evaluation.",
    tech: [
      "LiteLLM",
      "Claude Agent SDK",
      "Arize Phoenix",
      "AWS Textract",
      "Retrieval",
      "Pyodide sandbox",
    ],
    provenIn: ["Fundrev", "Tunegram"],
  },
  {
    id: "data",
    index: "06",
    title: "Data",
    caption:
      "Transactional and analytical stores kept apart, with a semantic layer over the top.",
    tech: [
      "PostgreSQL",
      "ClickHouse",
      "MongoDB",
      "SQL Server",
      "Redis",
      "Cube",
      "Airbyte",
      "S3",
    ],
    provenIn: ["Fundrev", "Sushraj Ventures"],
  },
  {
    id: "platform",
    index: "07",
    title: "Platform",
    caption:
      "Defined in a repository and reconciled continuously. Nothing is clicked into existence.",
    tech: [
      "Terraform",
      "Amazon EKS",
      "Argo CD",
      "Kustomize",
      "Sealed Secrets",
      "HPA and PDBs",
    ],
    provenIn: ["Fundrev"],
  },
  {
    id: "observability",
    index: "08",
    title: "Observability",
    caption:
      "Traces, logs, metrics and model spend on one pane, so an incident has one timeline.",
    tech: ["Grafana", "Loki", "Tempo", "Prometheus", "Grafana Faro", "CloudTrail"],
    provenIn: ["Fundrev"],
  },
];
