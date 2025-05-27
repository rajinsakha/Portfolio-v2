import Link from "next/link";
import { Github, Linkedin, Mail,  } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="font-bold text-xl">
              Rajin<span className="text-primary">.</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Front-end developer specializing in React.js and Next.js
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/rajinsakha"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/rajin-sakha-22003b229/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            {/* <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link> */}
            <Link
              href="mailto:rajinsakha07@gmail.com"
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Rajin Sakha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
