import { Project } from "@/types";
import hajirKhataImage from "@/assets/images/hajirkhata.png";
import billingSystemImage from "@/assets/images/billing-system.png";
import workspaceImage from "@/assets/images/workspace-nepal.png";

export const categories = ["All", "Web Apps", "Websites", "Mobile Apps"];

export const projects: Project[] = [
  {
    id: 1,
    title: "Hajir Khata",
    description:
      "A comprehensive software solution designed to simplify payroll management for businesses of all sizes. Its primary goal is to help organizations effortlessly track daily employee attendance and manage payroll with ease.",
    fullDescription: `
      Hajir Khata is a comprehensive software solution designed to simplify payroll management for businesses of all sizes. Its primary goal is to help organizations effortlessly track daily employee attendance and manage payroll with ease.
      
      The application features a user-friendly interface that allows managers to monitor employee attendance in real-time, generate detailed reports, and automate payroll calculations based on attendance data. This significantly reduces the time and effort required for manual payroll processing.
      
      Key features include:
      - Real-time attendance tracking
      - Automated payroll calculation
      - Detailed reporting and analytics
      - Employee self-service portal
      - Integration with popular accounting software
    `,
    image: hajirKhataImage.src,
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/ui",
      "Rest APIs",
      "WebSocket",
    ],
    category: "Web Application",
    featured: true,
    slug: "hajir-khata",
    links: {
      live: "https://hajirkhata.com",
      github: "#",
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
        url: "/placeholder.svg?height=600&width=800",
        caption: "Dashboard view showing attendance overview",
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
    It features real-time inventory management with low-stock alerts, customizable invoice generation (including recurring billing),
    unified transaction tracking across multiple payment methods, and comprehensive reporting dashboards.

    Key features include:
    - Real-time stock adjustments and multi-warehouse support
    - Customizable invoice templates with PDF export and email delivery
    - Unified ledger for sales, purchases, payments, and refunds
    - Detailed analytics: sales trends, aging receivables/payables, cash flow forecasts
    - Role-based access controls and activity audit logs
    - Integrations with QuickBooks, Xero, e-commerce platforms via API/webhooks
  `,
    image: billingSystemImage.src,
    technologies: [
      "Next JS",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
      "React-pdf",
    ],
    category: "Web Application",
    featured: false,
    slug: "billing-system",
    links: {
      live: "#",
      github: "#",
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
        url: "/placeholder.svg?height=600&width=800",
        caption: "Inventory management dashboard with low-stock alerts",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Custom invoice template editor and PDF preview",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Transaction ledger with multiple payment methods",
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

    Key features include:
    - Room rental listings with availability, pricing, and photo galleries
    - Advanced search filters for location, budget, and amenities
    - Job board with categorization by sector and region
    - User dashboards for landlords and employers to manage listings and applications
    - In-app messaging between tenants & landlords, and applicants & employers
    - Secure authentication, profile verification, and payment integration
  `,
    image: workspaceImage.src,
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Socket.io",
    ],
    category: "Web Application",
    featured: false,
    slug: "workspace-nepal",
    links: {
      live: "#",
      github: "#",
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
];
