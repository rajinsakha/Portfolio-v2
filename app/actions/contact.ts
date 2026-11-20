"use server";

import { Resend } from "resend";

export type ContactField = "name" | "email" | "subject" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  // Echoed back so a failed submit doesn't wipe what the visitor typed.
  values: Record<ContactField, string>;
};

const LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Header-bound fields must never carry line breaks (header injection).
const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const values = {
    name: singleLine(readField(formData, "name")),
    email: singleLine(readField(formData, "email")),
    subject: singleLine(readField(formData, "subject")),
    message: readField(formData, "message").trim(),
  };

  // Honeypot: real visitors never see or fill this field. Pretend success so
  // bots get no signal to adapt to.
  if (readField(formData, "website") !== "") {
    return {
      status: "success",
      message: "Thanks — your message is on its way.",
      values: { name: "", email: "", subject: "", message: "" },
    };
  }

  const fieldErrors: ContactState["fieldErrors"] = {};

  if (!values.name) fieldErrors.name = "Please enter your name.";
  else if (values.name.length > LIMITS.name)
    fieldErrors.name = `Keep your name under ${LIMITS.name} characters.`;

  if (!values.email) fieldErrors.email = "Please enter your email address.";
  else if (
    values.email.length > LIMITS.email ||
    !EMAIL_PATTERN.test(values.email)
  )
    fieldErrors.email = "That email address doesn't look right.";

  if (!values.subject) fieldErrors.subject = "Please add a subject.";
  else if (values.subject.length > LIMITS.subject)
    fieldErrors.subject = `Keep the subject under ${LIMITS.subject} characters.`;

  if (values.message.length < 10)
    fieldErrors.message = "Please write at least a sentence or two.";
  else if (values.message.length > LIMITS.message)
    fieldErrors.message = `Keep the message under ${LIMITS.message} characters.`;

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  // Resend's shared sender works without domain verification, but only
  // delivers to the account owner's own address — fine for a personal inbox.
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.error(
      "[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not configured."
    );
    return {
      status: "error",
      message:
        "The contact form isn't available right now. Please email me directly instead.",
      values,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${from}>`,
      to,
      replyTo: values.email,
      subject: `[Portfolio] ${values.subject}`,
      text: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error.name);
      return {
        status: "error",
        message:
          "Something went wrong sending your message. Please try again, or email me directly.",
        values,
      };
    }
  } catch (err) {
    console.error(
      "[contact] Failed to reach Resend:",
      err instanceof Error ? err.message : "unknown error"
    );
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try again, or email me directly.",
      values,
    };
  }

  return {
    status: "success",
    message: "Thanks — your message is on its way. I'll reply by email soon.",
    values: { name: "", email: "", subject: "", message: "" },
  };
}
