import {
  actualSaveImage,
  hajirKhataImage,
  workspaceImage,
  billingSystemImage,
  hajirKhataAdminDashboardImage,
  actualSaveLandingPageImage,
  generateBillPdfImage,
  invoiceBillingImage,
  productBillingImage,
} from "@/assets/images";
import { Project } from "@/types";

export const categories = [
  "All",
  "Web Application",
  "Website",
  "Mobile Application",
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Hajir Khata",
    description:
      "A comprehensive software solution designed to simplify payroll management for businesses of all sizes. Its primary goal is to help organizations effortlessly track daily employee attendance and manage payroll with ease.",
    fullDescription: `
      Hajir Khata is a comprehensive software solution designed to simplify payroll management for businesses of all sizes. Its primary goal is to help organizations effortlessly track daily employee attendance and manage payroll with ease.
      
      The application features a user-friendly interface that allows managers to monitor employee attendance in real-time, generate detailed reports, and automate payroll calculations based on attendance data. This significantly reduces the time and effort required for manual payroll processing.

      Detailed reporting and analytics are provided to give insights into workforce productivity and cost control.
    `,
    keyFeatures: [
      "Real-time attendance tracking",
      "Automated payroll calculation",
      "Detailed reporting and analytics",
      "Employee self-service portal",
      "Integration with popular accounting software",
    ],
    image: hajirKhataImage.src,
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/ui",
      "Rest APIs",
      "WebSocket",
      "Redux",
    ],
    category: "Web Application",
    featured: true,
    slug: "hajir-khata",
    links: {
      live: "https://hajirkhata.com",
    },
    challenges: `
      One of the main challenges in developing Hajir Khata was creating a system that could handle various attendance scenarios while maintaining accuracy in payroll calculations. We needed to account for different work schedules, overtime, leaves, and holidays.
      
      Another challenge was ensuring the application remained responsive and performant even with large datasets, as some businesses would need to track hundreds of employees simultaneously.
    `,
    solutions: `
      To address these challenges, we implemented a flexible rule-based system that allows businesses to define their own attendance and payroll policies. This made the application adaptable to different business needs.
      
      For performance optimization, we used efficient data structures and implemented pagination and lazy loading techniques to ensure the application remains responsive even with large datasets.
    `,
    screenshots: [
      {
        url: hajirKhataAdminDashboardImage.src,
        caption: "Admin Dashboard view showing attendance overview",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Employee management interface",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Payroll calculation screen",
      },
    ],
  },
  {
    id: 2,
    title: "Billing System",
    description:
      "A robust billing system to streamline inventory, invoicing, transaction tracking, and reporting for SMBs.",
    fullDescription: `
    The Billing System is an all-in-one financial management tool designed for small to medium-sized businesses.
    It features real-time inventory management, customizable invoice generation,
    unified transaction tracking across multiple payment methods, and comprehensive reporting dashboards.
    `,
    keyFeatures: [
      "Inventory Management",
      "Invoice generation with PDF export",
      "Detailed analytics: sales trends, aging receivables/payables, cash flow forecasts",
    ],
    image: billingSystemImage.src,
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
      "React-pdf",
      "Redux",
    ],
    category: "Web Application",
    featured: false,
    slug: "billing-system",
    links: {
      live: "https://billings-system.vercel.app/login/?email=rajinsakha07@gmail.com&password=billingdemo@7",
      github: "https://github.com/rajinsakha/Billing-System",
    },
    challenges: `
    Ensuring data consistency across inventory, invoicing, and transaction modules:
    We needed atomic updates so that stock levels, invoices, and ledger entries always remained in sync.

    Handling high volumes of daily transactions without performance degradation:
    Queries needed heavy optimization and caching to serve large datasets quickly.

    Supporting diverse tax jurisdictions and compliance reporting:
    The system must be flexible enough to model various tax rules and generate region-specific reports.
  `,
    solutions: `
    Implemented database transactions with strict referential integrity to guarantee consistency.
    Optimized tables with appropriate indexes, added caching layers for frequently used data, and paginated large result sets.
    Built a dynamic tax engine allowing admins to configure tax rules per product/region and generate compliance-ready exports.
  `,
    screenshots: [
      {
        url: productBillingImage.src,
        caption: "Products Section",
      },

      {
        url: invoiceBillingImage.src,
        caption: "Bill Creation Screen",
      },
      {
        url: generateBillPdfImage.src,
        caption: "Custom invoice template editor and PDF preview",
      },
    ],
  },
  {
    id: 3,
    title: "WorkSpace Nepal",
    description:
      "A platform where users can list rooms for rent and explore job opportunities across Nepal, connecting property owners with tenants and employers with job seekers.",
    fullDescription: `
    Workspace Nepal is a dual-purpose platform designed to simplify housing and employment in Nepal.
    Property owners can list rooms (or entire properties) for rent, set availability calendars, and manage bookings.
    Job seekers can browse opportunities by industry, location, and company, and apply directly through the portal.
    Employers can post job listings, review applications, and track candidate progress.
    `,
    keyFeatures: [
      "Room rental listings with availability, pricing, and photo galleries",
      "Advanced search filters for location, budget, and amenities",
      "Job board with categorization by sector and region",
      "User dashboards for landlords and employers to manage listings and applications",
      "In-app messaging between tenants & landlords, and applicants & employers",
    ],
    image: workspaceImage.src,
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux"],
    category: "Web Application",
    featured: false,
    slug: "workspace-nepal",
    links: {
      live: "https://workspacenepal.vercel.app/",
      github: "https://github.com/rajinsakha/quick-job",
    },
    challenges: `
    Balancing two distinct marketplaces (housing and jobs) within a single cohesive UI:
    We needed to ensure that navigation and discoverability work intuitively for both tenants and job seekers.

    Verifying user identities and preventing fraudulent listings:
    Trust and safety are critical when handling rentals and employment.

    Scaling search and filtering across geographic regions:
    Nepal’s diverse regions require performant queries and flexible filtering.
  `,
    solutions: `
    Designed separate but unified dashboards for landlords and employers, with contextual navigation and shared components.
    Implemented email/SMS verification and document upload workflows to validate user identities and property ownership.
    Used PostgreSQL full-text search and indexed geographic data; added caching for popular queries and paginated results for large listings.
  `,
    screenshots: [
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Room listing page with map and filter panel",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Job board view with sector filters",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Landlord & employer dashboard overview",
      },
    ],
  },

  {
    id: 4,
    title: "Actually Save",
    description:
      "A rewards and payments platform featuring a landing page and admin dashboard — designed to help users earn cashback and manage vendor operations efficiently.",
    fullDescription: `
    Actually Save is a digital rewards and payments ecosystem built to help customers earn points and cashback for purchases, while vendors manage transactions and visibility through a central admin dashboard.
    
    I contributed to developing the **landing page** and the **admin dashboard interface**. The landing page promotes app downloads, featured vendors, and reward workflows. The admin dashboard provides analytics, transaction summaries, and vendor/customer management tools.
  `,
    keyFeatures: [
      "Responsive and SEO-optimized landing page showcasing app features and CTAs",
      "Interactive admin dashboard with analytics and performance metrics",
      "Vendor and customer management modules",
      "Withdraw request and payment approval system",
      "Role-based access and intuitive navigation",
      "Real-time data visualization for earnings, receivables, and growth metrics",
    ],
    image: actualSaveImage.src,
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/ui",
      "Redux Toolkit",
    ],
    category: "Web Application",
    featured: true,
    slug: "actual-save",
    links: {
      live: "https://www.actualsave.com",
    },
    challenges: `
    Designing a scalable dashboard layout that can display analytics, tables, and vendor/customer data without clutter.
    Ensuring smooth performance for large datasets (transactions, vendors, users) while maintaining responsiveness and consistent UI.
    Creating an engaging and fast marketing page that clearly communicates the product value.
  `,
    solutions: `
    Built modular, reusable UI components with shadcn/ui and Tailwind CSS for clean, responsive design.
    Implemented lazy loading and pagination on data-heavy views to improve render performance.
    Structured landing page sections with optimized assets, CTA hierarchy, and SEO best practices for improved user engagement.
  `,
    screenshots: [
      {
        url: actualSaveImage.src,
        caption:
          "Admin Dashboard — overview of earnings, vendors, and top performers",
      },
      {
        url: actualSaveLandingPageImage.src,
        caption: "Landing Page — product overview and app download section",
      },
    ],
  },
];
