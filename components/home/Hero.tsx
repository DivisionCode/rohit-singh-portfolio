import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Counter } from "@/components/ui/Counter";
import { HeroLattice } from "@/components/visual/HeroLattice";
import { Monogram } from "@/components/visual/Monogram";
import { metrics, profile, socials } from "@/lib/content/site";
import { owned } from "@/lib/content/work";

export function Hero() {
  const [years, ventures, products, tech] = metrics;

  return (
    <section className="relative isolate overflow-clip pt-24 pb-[calc(var(--section-y)*0.75)] md:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-field absolute inset-0" />
        <div className="wash absolute inset-0" />
      </div>

      <div className="container-page">
        {/* Masthead strip: the page states where it is before it states who. */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line pb-4">
          <span className="group/mark flex items-center gap-2.5">
            <Monogram className="size-5 text-ink" />
            <span className="label-mono text-ink-muted">{profile.group}</span>
          </span>
          <span aria-hidden className="hidden h-2.5 w-px bg-line-strong sm:block" />
          <span className="label-mono">
            {profile.location.region}, {profile.location.country}
          </span>
          <span aria-hidden className="hidden h-2.5 w-px bg-line-strong sm:block" />
          <span className="label-mono">{profile.location.timezone}</span>

          <span className="label-mono ml-auto flex items-center gap-2 text-ink-muted">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full rounded-full bg-live opacity-70 [animation:pulse-ring_2.8s_ease-out_infinite]" />
              <span className="relative inline-flex size-1.5 rounded-full bg-live" />
            </span>
            Available
          </span>
        </div>

        {/*
          The lattice bleeds past the right edge of the container rather than
          sitting in its own column. Cropping the artifact is what stops the
          hero reading as two boxes side by side.
        */}
        <div className="relative">
          <div className="relative z-10 max-w-2xl pt-14 lg:pt-20" data-reveal>
            <h1 className="text-[clamp(3.25rem,8.5vw,6.25rem)] leading-[0.86]">
              Rohit Singh
            </h1>

            <p className="mt-8 text-[clamp(1.125rem,2.2vw,1.4375rem)] leading-[1.3] tracking-[-0.02em] text-ink-muted">
              Senior software engineer.{" "}
              <span className="text-ink">Founder of {profile.group}.</span>
            </p>

            <p className="mt-6 max-w-lg text-[0.9375rem] leading-[1.75] text-ink-faint">
              {profile.bio}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-2">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.875rem] font-medium text-canvas transition-opacity duration-200 hover:opacity-90"
              >
                Start a conversation
                <Icon
                  name="arrowRight"
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[0.875rem] text-ink-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
              >
                <Icon name="download" size={14} />
                CV
              </a>

              <ul className="ml-2 flex items-center gap-1">
                {socials.slice(0, 3).map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${social.label} · ${social.handle}`}
                      className="flex size-9 items-center justify-center rounded-full text-ink-ghost transition-colors duration-200 hover:text-ink"
                    >
                      <Icon name={social.icon} size={16} />
                      <span className="sr-only">{social.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative mx-auto mt-16 aspect-square w-full max-w-[21rem] lg:absolute lg:top-[54%] lg:-right-[16%] lg:mt-0 lg:w-[40rem] lg:max-w-none lg:-translate-y-1/2">
            <HeroLattice
              labels={owned.map((venture) => venture.name.toUpperCase())}
              className="animate-drift absolute inset-0 size-full"
            />
            <Image
              src="/media/profile.jpg"
              alt={`${profile.name}, ${profile.role}`}
              width={800}
              height={800}
              priority
              sizes="(max-width: 1024px) 80px, 160px"
              className="absolute top-1/2 left-1/2 size-[23%] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
            />
          </div>
        </div>

        {/*
          The numbers as a sentence, not a counter grid. A grid of four boxes
          asserts figures; a line of prose with the figures set large reads as
          something a person wrote.
        */}
        <p
          data-reveal
          className="relative z-10 mt-20 max-w-4xl border-t border-line pt-8 text-[clamp(1rem,2vw,1.1875rem)] leading-[2.1] text-ink-faint"
        >
          <Figure value={years.value} suffix={years.suffix} /> years building enterprise
          systems in production.{" "}
          <Figure value={ventures.value} suffix={ventures.suffix} /> companies of my own,{" "}
          <Figure value={products.value} suffix={products.suffix} /> products shipped under{" "}
          {profile.brand}, and{" "}
          <Figure value={tech.value} suffix={tech.suffix} /> technologies I have actually
          put my hands on.
        </p>
      </div>
    </section>
  );
}

/** A numeral set large and in mono, sitting inline in the sentence. */
function Figure({ value, suffix }: { value: number; suffix: string }) {
  return (
    <Counter
      value={value}
      suffix={suffix}
      className="inline-block h-[0.9em] align-baseline text-[1.75em] leading-[0.9] tracking-[-0.04em] text-ink tabular-nums"
    />
  );
}
