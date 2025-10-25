export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rajin Sakha",
    url: "https://rajinsakha.com.np", // Replace with your actual domain
    image: "https://rajinsakha.com/profile-image.jpg", // Replace with your actual image path
    jobTitle: "Front-end Developer",
    worksFor: {
      "@type": "Organization",
      name: "Hunchha Digital Pvt. Ltd.", // Replace with your current company
    },
    sameAs: [
      "https://github.com/rajinsakha", // Replace with your actual profiles
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
      "Web Development",
    ],
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rajin Sakha's Portfolio",
    url: "https://rajinsakha.com.np",
    description:
      "Portfolio website of Rajin Sakha, a Front-end Developer specializing in React.js and Next.js.",
    author: {
      "@type": "Person",
      name: "Rajin Sakha",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
    </>
  );
}
