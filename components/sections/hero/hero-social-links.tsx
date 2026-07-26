import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://github.com/rajinsakha",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/rajin-sakha-22003b229/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "mailto:rajinsakha07@gmail.com",
    label: "Email",
    icon: Mail,
  },
];

export default function HeroSocialLinks() {
  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      {socialLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className="rounded-full bg-muted p-2 transition-colors hover:bg-muted/80"
        >
          <Icon className="h-5 w-5" />
          <span className="sr-only">{label}</span>
        </Link>
      ))}
    </div>
  );
}
