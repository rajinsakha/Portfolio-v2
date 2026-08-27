import { SITE_URL } from "@/lib/site";

export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Rajin Sakha",
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    jobTitle: "Full-stack Developer",
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
      "Full-stack Developer building web and mobile products end to end with React, Next.js, React Native, Nest.js, PostgreSQL and Redis.",
    knowsAbout: [
      "React.js",
      "Next.js",
      "React Native",
      "Nest.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "REST APIs",
      "Docker",
      "Tailwind CSS",
      "Redux Toolkit",
      "Full-stack Development",
      "Web Performance",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Rajin Sakha's Portfolio",
    url: SITE_URL,
    description:
      "Portfolio website of Rajin Sakha, a Full-stack Developer working across React, Next.js, React Native and Nest.js.",
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
