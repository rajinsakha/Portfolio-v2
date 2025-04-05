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
      name: "Tech Solutions Inc.", // Replace with your current company
    },
    sameAs: [
      "https://github.com/rajinsakha", // Replace with your actual profiles
      "https://linkedin.com/in/rajinsakha",
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
      "UI/UX Design",
    ],
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rajin Sakha Portfolio",
    url: "https://rajinsakha.com", // Replace with your actual domain
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
