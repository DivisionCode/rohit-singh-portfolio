"use client";

import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { CONTACT_FORM_ENDPOINT, profile } from "@/lib/content/site";

/** Non-AJAX fallback so the form still submits with JavaScript disabled. */
const FALLBACK_ACTION = CONTACT_FORM_ENDPOINT.replace("/ajax/", "/");

type Status = "idle" | "sending" | "sent" | "error";

/*
  Underlines, not boxes.

  The form used to sit in a card full of filled input boxes, which made it the
  one place on the page that looked like a default form rather than part of
  this site. Everything else here is built from hairlines, so the fields are
  too: a rule under each one that brightens on focus, and no container at all.
*/
const FIELD =
  "w-full border-b border-line bg-transparent py-2.5 text-[0.9375rem] transition-colors outline-none placeholder:text-ink-ghost hover:border-line-strong focus:border-ink disabled:opacity-50";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: real people never fill a hidden field.
    if (data._honey) return;

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`The form service returned ${response.status}.`);
      }

      const result: { success?: string; message?: string } = await response.json();
      if (result.success === "false") {
        throw new Error(result.message ?? "The form service rejected the message.");
      }

      form.reset();
      setStatus("sent");
    } catch (cause) {
      setStatus("error");
      setError(
        cause instanceof Error ? cause.message : "Something went wrong sending that.",
      );
    }
  }

  const disabled = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      action={FALLBACK_ACTION}
      method="POST"
      className="flex flex-col gap-7"
    >
      <input type="hidden" name="_subject" value="New message from labs.sushraj.in" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div className="grid gap-7 sm:grid-cols-2">
        <Field
          label="Your name"
          name="name"
          autoComplete="name"
          required
          disabled={disabled}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          disabled={disabled}
        />
      </div>

      <Field
        label="Company or context"
        name="company"
        optional
        placeholder="Fund, studio, team, or nothing at all"
        disabled={disabled}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[0.8125rem] text-ink-faint">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          disabled={disabled}
          placeholder="What are you building, and where is it stuck?"
          className={cn(FIELD, "resize-y leading-relaxed")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <button
          type="submit"
          disabled={disabled}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.875rem] font-medium transition-opacity",
            status === "sent"
              ? "bg-live text-canvas"
              : "bg-ink text-canvas hover:opacity-90",
            disabled && "cursor-wait opacity-70",
          )}
        >
          {status === "sending" ? (
            <>
              <Icon name="spinner" size={15} className="animate-spin" />
              Sending
            </>
          ) : status === "sent" ? (
            <>
              <Icon name="check" size={15} />
              Message sent
            </>
          ) : (
            <>
              Send message
              <Icon name="arrowRight" size={15} />
            </>
          )}
        </button>

        <p role="status" aria-live="polite" className="text-[0.8125rem] text-ink-faint">
          {status === "sent"
            ? "Thanks. I read everything that comes through here."
            : status === "idle"
              ? "Replies usually within a couple of days."
              : null}
        </p>
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="border-l-2 border-red-500/60 pl-4 text-[0.8125rem] leading-relaxed text-ink-muted"
        >
          {error} You can reach me directly at{" "}
          <a className="underline underline-offset-2" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  optional,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  optional?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="flex items-baseline gap-2 text-[0.8125rem] text-ink-faint"
      >
        {label}
        {optional ? <span className="text-ink-ghost">optional</span> : null}
      </label>
      <input id={name} name={name} type={type} className={FIELD} {...rest} />
    </div>
  );
}
