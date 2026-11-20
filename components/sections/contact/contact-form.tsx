"use client";

import { useActionState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, CircleAlert, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactItems } from "@/constants/contact-data";
import {
  sendContactMessage,
  type ContactField,
  type ContactState,
} from "@/app/actions/contact";

const CONTACT_EMAIL =
  contactItems.find((item) => item.title === "Email")?.content ??
  "rajinsakha07@gmail.com";

const initialState: ContactState = {
  status: "idle",
  values: { name: "", email: "", subject: "", message: "" },
};

const ContactForm = () => {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  // After a failed submit, move focus to the first field that needs fixing so
  // keyboard and screen-reader users land where the problem is.
  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    formRef.current
      ?.querySelector<HTMLElement>('[aria-invalid="true"]')
      ?.focus();
  }, [state]);

  const errorFor = (field: ContactField) => state.fieldErrors?.[field];
  const fieldProps = (field: ContactField) => ({
    id: field,
    name: field,
    defaultValue: state.values[field],
    "aria-invalid": errorFor(field) ? true : undefined,
    "aria-describedby": errorFor(field) ? `${field}-error` : undefined,
  });

  const fieldError = (field: ContactField) =>
    errorFor(field) ? (
      <p id={`${field}-error`} className="text-sm text-destructive">
        {errorFor(field)}
      </p>
    ) : null;

  return (
    <Card>
      <CardContent className="px-6">
        <h3 className="font-display text-2xl font-normal mb-6">Send Me a Message</h3>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Your Name
              </label>
              <Input
                {...fieldProps("name")}
                autoComplete="name"
                maxLength={100}
                placeholder="Jane Doe"
                required
              />
              {fieldError("name")}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Your Email
              </label>
              <Input
                {...fieldProps("email")}
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                maxLength={254}
                placeholder="jane@example.com"
                required
              />
              {fieldError("email")}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <Input
              {...fieldProps("subject")}
              autoComplete="off"
              maxLength={150}
              placeholder="How can I help you?"
              required
            />
            {fieldError("subject")}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              {...fieldProps("message")}
              maxLength={5000}
              placeholder="Your message here…"
              rows={5}
              required
            />
            {fieldError("message")}
          </div>

          {/* Honeypot — off-screen and skipped by keyboard and assistive tech.
              Bots that fill every field give themselves away. */}
          <div
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
          >
            <label htmlFor="website">Leave this field empty</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                Send Message <Send className="ml-2 h-4 w-4" aria-hidden="true" />
              </>
            )}
          </Button>

          {/* Always mounted so screen readers announce changes inside it. */}
          <div aria-live="polite" className="text-sm">
            {state.status === "success" && (
              <p className="flex items-start justify-center gap-2 text-muted-foreground">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {state.message}
              </p>
            )}
            {state.status === "error" && (
              <p
                role="alert"
                className="flex items-start justify-center gap-2 text-destructive"
              >
                <CircleAlert
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {state.message}{" "}
                  {!state.fieldErrors && (
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="underline underline-offset-2"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  )}
                </span>
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
