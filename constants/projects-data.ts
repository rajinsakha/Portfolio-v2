import {
  hajirKhataImage,
  workspaceImage,
  billingSystemImage,
  hajirKhataAdminDashboardImage,
  generateBillPdfImage,
  invoiceBillingImage,
  productBillingImage,
  pimsLeadDashboardImage,
  pimsDocumentLibraryImage,
  pimsCalendarImage,
  pimsExperienceManagementImage,
  pimsShortlistedImage,
  pimsLeadsImage,
  pimsSettingsThemeImage,
  siteIqDashboardImage,
  siteIqEmployeeDetailsImage,
  siteIqMapViewImage,
  siteIqMarketingLandingImage,
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
      "A multi-tenant SaaS web application for payroll and workforce management: organizations subscribe to manage employees, attendance, leave, claims, and payroll—with role-based access, per-organization settings, and real-time updates.",
    fullDescription: `
      Hajir Khata is a comprehensive software solution designed to simplify payroll management for businesses of all sizes. Its primary goal is to help organizations effortlessly track daily employee attendance and manage payroll with ease.
      
      The application features a user-friendly interface that allows managers to monitor employee attendance in real-time, generate detailed reports, and automate payroll calculations based on attendance data. This significantly reduces the time and effort required for manual payroll processing.

      Detailed reporting and analytics are provided to give insights into workforce productivity and cost control.
    `,
    keyFeatures: [
      "Central dashboard to manage daily HR and payroll operations in one place",
      "Separate employee self-service dashboard for employees, distinct from admin-facing workflows",
      "Employee management with profiles, status tracking, and organization-wide visibility",
      "Attendance operations including employee attendance, self attendance, and attendance monitoring views",
      "Leave workflows for requests, approvals, allocations, and substitute leave handling",
      "Payroll operations with salary components, payroll processing, and payroll history views",
      "Claims management for advance, proposed, and overtime claims from submission to review",
      "Announcement and event modules to keep teams aligned on internal updates",
      "Device and geofence management for attendance control across office and field contexts",
      "User, role, and permission management for controlled access across modules",
      "Reporting and analytics across attendance, payroll, tax, leave, and other operational records",
    ],
    image: hajirKhataImage.src,
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Shadcn UI",
      "Redux Toolkit",
      "redux-persist",
      "React Router",
      "Axios",
      "REST APIs",
      "WebSocket",
      "React Hook Form",
      "Zod",
      "ApexCharts",
      "Recharts",

      "Motion",
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
  // {
  //   id: 3,
  //   title: "WorkSpace Nepal",
  //   description:
  //     "A platform where users can list rooms for rent and explore job opportunities across Nepal, connecting property owners with tenants and employers with job seekers.",
  //   fullDescription: `
  //   Workspace Nepal is a dual-purpose platform designed to simplify housing and employment in Nepal.
  //   Property owners can list rooms (or entire properties) for rent, set availability calendars, and manage bookings.
  //   Job seekers can browse opportunities by industry, location, and company, and apply directly through the portal.
  //   Employers can post job listings, review applications, and track candidate progress.
  //   `,
  //   keyFeatures: [
  //     "Room rental listings with availability, pricing, and photo galleries",
  //     "Advanced search filters for location, budget, and amenities",
  //     "Job board with categorization by sector and region",
  //     "User dashboards for landlords and employers to manage listings and applications",
  //     "In-app messaging between tenants & landlords, and applicants & employers",
  //   ],
  //   image: workspaceImage.src,
  //   technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux"],
  //   category: "Web Application",
  //   featured: false,
  //   slug: "workspace-nepal",
  //   links: {
  //     live: "https://workspacenepal.vercel.app/",
  //     github: "https://github.com/rajinsakha/quick-job",
  //   },
  //   challenges: `
  //   Balancing two distinct marketplaces (housing and jobs) within a single cohesive UI:
  //   We needed to ensure that navigation and discoverability work intuitively for both tenants and job seekers.

  //   Verifying user identities and preventing fraudulent listings:
  //   Trust and safety are critical when handling rentals and employment.

  //   Scaling search and filtering across geographic regions:
  //   Nepal’s diverse regions require performant queries and flexible filtering.
  // `,
  //   solutions: `
  //   Designed separate but unified dashboards for landlords and employers, with contextual navigation and shared components.
  //   Implemented email/SMS verification and document upload workflows to validate user identities and property ownership.
  //   Used PostgreSQL full-text search and indexed geographic data; added caching for popular queries and paginated results for large listings.
  // `,
  //   screenshots: [
  //     {
  //       url: "/placeholder.svg?height=600&width=800",
  //       caption: "Room listing page with map and filter panel",
  //     },
  //     {
  //       url: "/placeholder.svg?height=600&width=800",
  //       caption: "Job board view with sector filters",
  //     },
  //     {
  //       url: "/placeholder.svg?height=600&width=800",
  //       caption: "Landlord & employer dashboard overview",
  //     },
  //   ],
  // },

  {
    id: 3,
    title: "Project Information Management System",
    description:
      "A SaaS platform for business development and project operations teams to manage the full project lifecycle — from lead capture and proposal submission to shortlisting, contracts, delivery tracking, finance, assets, and documents — in one system.",
    fullDescription:
      "PIMS replaces fragmented spreadsheets and disconnected tools with one system for how opportunities become projects. Business development can capture and qualify leads, run proposals against checklists and deadlines, move work through shortlisting and contractual steps, and hand off cleanly into active delivery — with the same entities (clients, partners, vendors, experts) and documents visible end to end.\n\nProject and operations teams get calendars and project views tied to milestones and deadlines, while finance and admin see bills, payments, and expense structure alongside asset inventory, handover, repair, land, and vehicle tracking. Dashboards summarize lead health, project progress, finance, assets, expenses, and operations so leadership can spot risk early instead of reconciling reports manually.\n\nA configurable settings layer (themes, categories, fiscal year, master data for clients/partners/vendors, expenses, assets, and file types) keeps the product adaptable without one-off hardcoding. Together, the app is built as a long-lived internal platform: consistent navigation, role-aware access, and reusable patterns across dozens of screens.",
    keyFeatures: [
      "Six dashboards (Lead, Project, Finance, Assets, Expenses, Operations) plus a project management hub for calendars, milestones, deadlines, and at-a-glance delivery/financial risk",
      "End-to-end lead-to-award workflow with checklist-driven proposals, submissions/results, round-based shortlisting, contractual steps, and clean handoff into project creation",
      "Unified master roster for clients, organizations, partners, vendors, and experts so proposals, contracts, and project records stay consistent across modules",
      "Operational and financial control through expenses, bills, payments, and full asset lifecycle tracking (inventory, handover, repair, land, and vehicles)",
      "Role-based access with granular permissions, a productivity toolkit (documents, checklists, experience/letter tools, imports/exports), and deep configurable settings including Nepali date support",
    ],
    image: pimsLeadDashboardImage.src,
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Shadcn/ui",
      "Redux Toolkit",
      "React Router",
      "React Hook Form",
      "Zod",
      "Axios",
      "Recharts",
    ],
    category: "Web Application",
    featured: true,
    slug: "project-information-management-system",
    links: {
      live: "#",
    },
    challenges:
      "Shipping a single UX that stays understandable while the product spans dashboards, CRM-like pipeline, contracts, roster, finance, assets, and admin settings — without every screen feeling like a different app.\n\nModeling a lead lifecycle that is strict enough to be auditable (checklists, stages, documents) yet flexible enough for real-world variance — unsuccessful paths, multiple shortlist rounds, and different contract types.\n\nKeeping configuration powerful (many master-data dimensions) without letting inconsistent settings break downstream lists, filters, and reports — especially as tables and libraries grow.\n\nImplementing access control that matches how organizations actually delegate work: not just “logged in,” but read/write boundaries per module and action, aligned with backend rules.",
    solutions:
      "Defined a consistent app shell: grouped navigation, searchable command palette, and repeatable list/detail/form patterns so new modules plug into the same mental model instead of inventing new UX each time.\n\nImplemented a stage-based lead experience with clear status, checklist usage, and document touchpoints so the path from proposal to contract to project is visible in the UI — not only in spreadsheets.\n\nCentralized master data in Settings (grouped by domain: general, assets, expenses, file types) so categories, fiscal year, and document/expense semantics stay authoritative for the rest of the app.\n\nUsed a layered frontend architecture — service modules for REST integration, typed forms with validation, Redux for session and cross-cutting UI state, and route-level permission guards — so behavior stays predictable as the surface area grows.\n\nPrioritized heavy lists (documents, long tables) with patterns that stay performant and usable (infinite scroll, clear loading states) so operational users aren’t blocked at scale.",
    screenshots: [
      {
        url: pimsLeadDashboardImage.src,
        caption:
          "Lead Dashboard — summary cards and opportunity submitted status chart",
      },
      {
        url: pimsDocumentLibraryImage.src,
        caption:
          "Document Library — upload, create folder, and grid view of files",
      },
      {
        url: pimsExperienceManagementImage.src,
        caption:
          "Experience Management — generic experience table with assignments and contracts",
      },
      {
        url: pimsSettingsThemeImage.src,
        caption: "Settings — Theme management under General Settings",
      },
      {
        url: pimsCalendarImage.src,
        caption: "Calendar — project calendar with upcoming deadlines",
      },
      {
        url: pimsShortlistedImage.src,
        caption:
          "Lead detail — shortlisted phase with rounds and proposal workflow",
      },
      {
        url: pimsLeadsImage.src,
        caption:
          "Proposal step — choose checklist and multi-step proposal flow",
      },
    ],
  },

  {
    id: 4,
    title: "Site IQ",
    description:
      "A multi-tenant workforce platform for construction and field teams: attendance and HR in one place—employees, job sites, live map tracking, shifts, leave, claims, messaging, and admin reporting.",
    fullDescription:
      "Site IQ helps organizations run day-to-day workforce operations without juggling spreadsheets. Each company gets its own space: people sign in, complete onboarding, and land in a dashboard tailored to attendance, HR, and payroll-related workflows.\n\nThe product centers on a clear home dashboard (who’s present, who’s absent, department trends, pending leave, birthdays, and events), deep employee profiles (contact, site, shift, documents, bank details, attendance and leave history), job sites, and a map view so supervisors can see people and sites in context—with locations updating in real time. Teams also get leave, overtime claims, supervisors, shifts, and sub-contractors, plus notifications, messaging, and events.\n\nAdministrators manage users and roles, run payroll-related reports and archives, handle adjustments, and configure master data (departments, positions, leave types, tax settings, and more). A separate public marketing site, SiteIQPro, introduces the product to SMBs—demo CTAs and trust messaging—while the authenticated app is where daily operations happen.",
    keyFeatures: [
      "Multi-tenant: each organization works in its own environment with secure sign-in, onboarding, and session handling",
      "Operations dashboard: attendance snapshot, department view, pending leave, birthdays, and quick visibility into who’s unavailable",
      "Employee lifecycle: directory, rich profiles, documents and bank details, attendance and leave in one record",
      "Job sites and map view: see sites and field staff on a map with filters and live location updates",
      "Workforce tools: leave, shifts, supervisors, overtime claims, and sub-contractors",
      "Communication: notifications, one-way messages, and events or meetings",
      "Administration: users and roles, reports and archives, adjustments, and settings for HR and payroll-related master data",
      "Marketing site (SiteIQPro) for product positioning, demos, and lead-friendly content alongside the main app",
    ],
    image: siteIqDashboardImage.src,
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Shadcn UI",
      "Redux Toolkit",
      "React Router",
      "React Hook Form",
      "Zod",
      "Axios",
      "Recharts",
      "ApexCharts",
      "Google Maps ",
      "WebSocket",
      "Google OAuth",
    ],
    category: "Web Application",
    featured: true,
    slug: "site-iq",
    links: {
      live: "https://siteiqpro.com.au",
    },
    challenges:
      "Covering attendance, HR, maps, real-time location, messaging, and payroll-related settings in one product without the UI feeling fragmented or overwhelming.\n\nMulti-tenant safety: every request must target the correct organization, and authentication has to stay reliable when many actions run at once.\n\nPermissions: dozens of screens need to respect what each role can see and do—aligned with backend rules, not just hidden buttons.\n\nScale of data: long employee lists and heavy forms need to stay fast, validated, and pleasant to use day after day.",
    solutions:
      "A single app shell with grouped navigation (General, Communication, Administration) and route-level permission checks so capabilities match each role.\n\nCentral API client: each organization’s API base URL and auth headers applied consistently, with careful token refresh so parallel requests don’t corrupt session state.\n\nShared form and validation patterns for complex screens, plus searchable selects and pagination where lists get large.\n\nMaps and live location isolated to dedicated views with clear filters; cross-cutting state (auth, filters, refetch) kept predictable so the app stays maintainable as features grow.",
    screenshots: [
      {
        url: siteIqDashboardImage.src,
        caption:
          "Dashboard — attendance summary (present, absent, late, on leave), department bar chart, unavailable list, pending leave requests, and birthdays.",
      },
      {
        url: siteIqEmployeeDetailsImage.src,
        caption:
          "Employee details — profile, contact and work info, Summary / Insight / Attendance & Leave tabs, other details, timesheet, documents, and bank details with actions (change shift, assign site, archive, edit).",
      },
      {
        url: siteIqMapViewImage.src,
        caption:
          "Map view — live map of Kathmandu with employee and site filters, markers for people and sites, and status highlighting.",
      },
      {
        url: siteIqMarketingLandingImage.src,
        caption:
          "SiteIQPro marketing site — hero for Attendance, HR & Payroll, feature strip, demo CTAs, and trusted-by logos.",
      },
    ],
  },
];
