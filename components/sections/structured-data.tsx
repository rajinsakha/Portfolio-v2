import { SITE_URL } from "@/app/sitemap";

export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Rajin Sakha",
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    jobTitle: "Front-end Developer",
    email: "mailto:rajinsakha07@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bhaktapur",
      addressCountry: "NP",
    },
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    sameAs: [
      "https://github.com/rajinsakha",
      "https://www.linkedin.com/in/rajin-sakha-22003b229/",
      "https://twitter.com/rajinsakha",
    ],
    description:
      "Front-end Developer specializing in React.js and Next.js, creating responsive and user-friendly web applications.",
    knowsAbout: [
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Web Development",
      "Web Performance",
      "Responsive Design",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Rajin Sakha's Portfolio",
    url: SITE_URL,
    description:
      "Portfolio website of Rajin Sakha, a Front-end Developer specializing in React.js and Next.js.",
    inLanguage: "en",
    author: {
      "@id": `${SITE_URL}/#person`,
    },
    publisher: {
      "@id": `${SITE_URL}/#person`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
