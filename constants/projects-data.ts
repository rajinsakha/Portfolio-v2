import {
  hajirKhataImage,
  // workspaceImage,
  // billingSystemImage,
  hajirKhataAdminDashboardImage,
  hajirKhataMarketingImage,
  hajirKhataAttendanceImage,
  hajirKhataAppLoginImage,
  // generateBillPdfImage,
  // invoiceBillingImage,
  // productBillingImage,
  // pimsLeadDashboardImage,
  // pimsDocumentLibraryImage,
  // pimsCalendarImage,
  // pimsExperienceManagementImage,
  // pimsShortlistedImage,
  // pimsLeadsImage,
  // pimsSettingsThemeImage,
  siteIqDashboardImage,
  siteIqEmployeeDetailsImage,
  siteIqMapViewImage,
  siteIqMarketingLandingImage,
  mithoImage,
  mithoHomeImage,
  mithoRecommendImage,
  mithoDetailImage,
  mithoNotificationsImage,
  mithoHomeDarkImage,
  kennedyImage,
  kennedyProductPreviewImage,
  kennedyHowItWorksImage,
  kennedyComparisonImage,
  kennedyLoginImage,
  kennedyLandingLightImage,
  kennedyHowItWorksLightImage,
  kennedyComparisonLightImage,
  kennedyOnboardingBrandImage,
  kennedyOnboardingAssetsImage,
  kennedyPerformanceEstimateImage,
  kennedyAdminDashboardImage,
  kennedyAdminCustomersImage,
  kennedyAdminCampaignsImage,
  fiveOneImage,
  fiveOneRoundsImage,
  fiveOneWildcardImage,
  vaanyardImage,
  vaanyardCollectionImage,
  vaanyardProductImage,
  vaanyardAboutImage,
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
    id: 8,
    title: "VAANYARD®",
    description:
      "Shopify storefront for a Sydney luxury eyewear label — a monochrome editorial shop front over a deep catalogue of sunglasses and optical frames, with faceted filtering by colour, lens, shape and material.",
    fullDescription:
      "VAANYARD® is an Australian eyewear label whose product is as much about restraint as it is about optics, and the storefront had to carry that. The design language is deliberately severe: black and white campaign photography running edge to edge, monospaced type, full stops after every nav item, and almost no chrome competing with the frames themselves.\n\nUnderneath the editorial surface it is a working commerce catalogue. Every model — Covenant, Dom-Ino, Ego, Faction, Gravity, Idol, Illicit, Informer, Monolith, Prime Time, Sedition, Sonar, Static, Ultrasonic, Underworld, Vapor, Velocity — exists as both a sunglasses and an optical line, each with its own collection and multiple colourway and lens variants. That combinatorial depth is the real problem: a shopper arrives wanting a shape, not a model name.\n\nSo collection pages are built around faceted filtering on colour, lens colour, shape and material, letting someone narrow by what they can actually picture. Product pages carry the full spec a considered purchase needs — SKU, acetate origin, hinge hardware, lens category and coating, measurements — behind progressive-disclosure accordions rather than a wall of text, with variant swatches switching imagery in place.\n\nThe wider store covers the rest of a real retail operation: brand story, collaborations and signature editions, a store locator for stockists, wholesale enquiries, and the shipping, warranty, returns and policy pages a physical-goods business needs.",
    keyFeatures: [
      "Faceted collection filtering across colour, lens colour, shape and material, so a deep multi-variant catalogue stays browsable",
      "Full-bleed monochrome campaign hero as a carousel, with collection entry points overlaid directly on the imagery",
      "Product pages with variant swatches, live imagery switching, quantity control, and both add-to-cart and express checkout",
      "Progressive-disclosure spec accordions covering acetate, hinge hardware, lens category, coatings and measurements",
      "Paired sunglasses and optical collections for every frame model, each with its own colourway and lens variants",
      "Store locator for physical stockists plus a wholesale enquiry path alongside direct-to-consumer checkout",
      "Full retail policy surface — shipping and delivery, warranty, returns and exchange, terms and privacy",
      "Editorial brand pages for the label story, collaborations and signature editions",
    ],
    image: vaanyardImage.src,
    technologies: [
      "Shopify",
      "Liquid",
      "JavaScript",
      "CSS",
      "Shopify Storefront Filtering",
      "Responsive Design",
      "Cloudflare",
    ],
    category: "Website",
    featured: false,
    slug: "vaanyard",
    links: {
      live: "https://vaanyard.com",
    },
    challenges:
      "The catalogue multiplies fast. Every frame model ships in both sunglasses and optical, and each of those carries several colourway and lens combinations. Presented as a flat product list it becomes unshoppable — nobody browses eyewear by remembering model names.\n\nThe brand is uncompromising about restraint, which fights against commerce conventions. Badges, urgency banners, review widgets and promotional clutter would all raise conversion in the short term and all of them would cheapen a label selling $520 frames on design credibility.\n\nEyewear is also a spec-heavy considered purchase — acetate origin, hinge construction, lens category, coatings, measurements. Buyers need that detail, but leading with it buries the product.\n\nAnd it is not purely direct-to-consumer: the same storefront has to serve retail stockists and wholesale enquiries without those paths intruding on the shopping experience.",
    solutions:
      "Filtering carries the catalogue. Rather than asking shoppers to know model names, collection pages let them narrow by the attributes they can actually picture — shape, colour, lens colour, material — which is what makes a deep variant matrix navigable.\n\nThe restraint is treated as a constraint to design within rather than around: campaign photography runs full-bleed and does the selling, navigation stays monospaced and quiet, and nothing decorative is layered over the product imagery.\n\nSpecs live behind accordions on the product page, so the frame and price lead and the technical detail is one tap away for the buyer who wants it — considered purchase served without cluttering the first impression.\n\nStockist and wholesale routes are given their own pages reachable from the footer, keeping the trade audience served while the primary path stays a clean consumer checkout.",
    screenshots: [
      {
        url: vaanyardImage.src,
        caption:
          "Homepage — full-bleed monochrome campaign imagery as a carousel, with collection entry points overlaid on the photography.",
      },
      {
        url: vaanyardCollectionImage.src,
        caption:
          "Sunglasses collection — product grid with faceted filtering on colour, lens colour, shape and material, plus sort control.",
      },
      {
        url: vaanyardProductImage.src,
        caption:
          "Product page — variant swatches, SKU, quantity control, add-to-cart and express checkout, with specs behind progressive-disclosure accordions.",
      },
      {
        url: vaanyardAboutImage.src,
        caption:
          "Brand story page — editorial layout pairing the label's design position with urban photography.",
      },
    ],
  },
  {
    id: 6,
    title: "Kennedy AI Studio",
    description:
      "An AI-run Meta ads platform for small business owners with no advertising background. Answer a few plain-language questions and a campaign goes live on Facebook and Instagram in under ten minutes — targeting, copy, creative and budget all handled.",
    fullDescription:
      "Kennedy AI Studio replaces Meta Ads Manager as the layer where campaigns are created and managed. Its users are restaurateurs, e-commerce sellers, tradespeople and local service operators across many countries — people who need customers, not an education in media buying. The product's entire premise is that it does less than Meta Ads Manager on purpose: outcomes before inputs, one recommended path instead of five equal options.\n\nThe system is two connected surfaces over a shared token layer. A marketing site handles positioning and signup; the authenticated app carries the real workflow — connect a Meta business account over OAuth, answer brand-setup questions, configure a campaign, review AI-generated creative and captions, see a projected performance estimate before committing money, pick a plan, and then manage the live campaign from a dashboard with spend, reach and click trends.\n\nBehind it sits a modular NestJS backend: Meta Graph API integration with encrypted long-lived tokens, Gemini-driven copy and image generation dispatched to BullMQ workers so HTTP requests never block on model latency, Stripe subscriptions and webhooks, S3 media with sharp-generated variants, Socket.io notifications fanned out through a Redis adapter, and a full audit trail. A separate admin console gives internal staff customer, campaign, billing, support-ticket and audit-log views over the same API.",
    keyFeatures: [
      "Guided campaign creation that asks plain-language business questions instead of ad-platform settings, with a median onboarding time of 8 minutes 40 seconds",
      "AI creative pipeline generating ad copy and images through Google Gemini, run as background BullMQ jobs with retry, concurrency limits and preview/final render tiers",
      "Meta Business Login and Graph API integration — OAuth connect, encrypted long-lived system tokens, campaign/ad-set/ad publishing to Facebook and Instagram",
      "Performance estimate shown before any spend is committed, so users approve projected results rather than configuration",
      "Stripe subscription billing across monthly, quarterly, semi-annual and yearly tiers with webhook-driven state, invoices and a customer billing portal",
      "Live campaign dashboard with reach, click and spend trends, plus real-time notifications over Socket.io with a Redis adapter for multi-instance fan-out",
      "Support ticketing with threaded messages, shared between the customer dashboard and an internal admin queue",
      "Admin console covering customers, campaigns, billing, tickets and an append-only audit log",
      "Full light and dark theming across marketing, onboarding, dashboard and admin, driven by CSS custom properties rather than per-component overrides",
      "Global-audience constraints throughout: no country-specific idiom, layouts tolerant of ~30% text expansion, WCAG 2.1 AA targets and reduced-motion support",
    ],
    image: kennedyImage.src,
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Redux Toolkit",
      "RTK Query",
      "redux-persist",
      "React Hook Form",
      "Zod",
      "Framer Motion",
      "Recharts",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Socket.io",
      "Google Gemini",
      "Meta Graph API",
      "Stripe",
      "AWS S3",
      "Resend",
      "Docker",
      "Sentry",
      "PostHog",
    ],
    category: "Web Application",
    featured: true,
    slug: "kennedy-ai-studio",
    links: {
      live: "https://kennedyai.studio",
    },
    challenges:
      "Meta's Graph API is the hard dependency the whole product rests on. Tokens are long-lived but revocable, scoped per business, and every publish path — campaign, ad set, ad, creative — can fail independently. A half-published campaign is worse than a failed one, because the user is already being charged by Meta.\n\nAI creative generation is slow and unreliable in a way HTTP requests are not. Image generation can take tens of seconds and fail intermittently, but the campaign-creative screen has to stay responsive and let users keep working.\n\nAuthentication had to survive parallelism. The dashboard fires several requests at once on load, and a naive refresh-on-401 lets multiple in-flight calls race to refresh the same token and invalidate each other's session.\n\nThe product spans a marketing site, a multi-step onboarding funnel, a customer dashboard and an internal admin console — four different mental models that still had to feel like one product, while the audience is explicitly non-technical and global.\n\nBilling correctness: Stripe subscription state is authoritative and arrives asynchronously by webhook, but the app has to gate features on it immediately.",
    solutions:
      "Publishing to Meta is staged and idempotent — each step records its Meta object id before the next runs, so a failure resumes rather than restarts, and partially created objects are reconciled instead of duplicated. Access tokens are encrypted at rest with a dedicated key rather than stored raw.\n\nCreative generation moved out of the request path entirely into BullMQ workers running as a separate process, with bounded concurrency, retry with backoff, and separate timeouts for cheap previews versus final renders. The frontend tracks job state in Redux and streams completion over Socket.io, so users see previews appear rather than waiting on a spinner. Mock AI and mock insights flags let the whole flow run locally without burning model quota.\n\nToken refresh is serialized behind an async-mutex in the RTK Query base query: the first 401 refreshes, every parallel request waits on that same promise, and the queue replays afterwards.\n\nOn structure, the backend is organized as feature modules with service ports and injection tokens, repositories owning all Prisma access, and a normalized response envelope — so a new surface plugs into existing patterns instead of inventing its own. On the frontend, one shared component and token layer spans marketing, onboarding, dashboard and admin, with route-level role checks mirroring backend guards rather than merely hiding buttons.\n\nStripe webhooks are the single source of truth for entitlement, written into the database and read by feature gates, so the UI never infers subscription state from a client-side checkout result.",
    screenshots: [
      {
        url: kennedyImage.src,
        caption:
          "Marketing landing page in dark theme — positioning against Meta Ads Manager, with signup inline in the hero.",
      },
      {
        url: kennedyLandingLightImage.src,
        caption:
          "The same landing page in light theme. Both themes are first-class, not an inverted afterthought.",
      },
      {
        url: kennedyOnboardingBrandImage.src,
        caption:
          "Onboarding step 1 — brand setup. Enter a website and the backend scrapes logo, colours and tone so later campaigns inherit them; skippable so nobody is trapped at the first screen.",
      },
      {
        url: kennedyOnboardingAssetsImage.src,
        caption:
          "Campaign details, step 3 of 3 — business description, logo and product image uploads with previews and validation, alongside contextual Expert Tips that explain why each input matters.",
      },
      {
        url: kennedyPerformanceEstimateImage.src,
        caption:
          "The performance estimate — projected reach, clicks, conversions and CPC shown before any money is committed. This screen is the product thesis: outcomes before inputs.",
      },
      {
        url: kennedyAdminDashboardImage.src,
        caption:
          "Internal admin dashboard — customers, live ads, open tickets and ad spend, with customer growth, plan mix, revenue and a campaign funnel over a selectable period.",
      },
      {
        url: kennedyAdminCustomersImage.src,
        caption:
          "Admin customer directory with search, filters and pagination across the account base. Customer names are blurred here; the product shows them in full.",
      },
      {
        url: kennedyAdminCampaignsImage.src,
        caption:
          "Admin campaign queue — every campaign across all customers with objective, budget, start date and status. Customer identities blurred for this portfolio.",
      },
      {
        url: kennedyHowItWorksImage.src,
        caption:
          "Onboarding broken into three timed steps, with the median real onboarding time stated openly — dark theme.",
      },
      {
        url: kennedyHowItWorksLightImage.src,
        caption: "The same onboarding breakdown rendered in light theme.",
      },
      {
        url: kennedyProductPreviewImage.src,
        caption:
          "Live campaign view — reach, clicks and spend with trend deltas, updated as the AI shifts budget. This section stays dark in both themes by design.",
      },
      {
        url: kennedyComparisonImage.src,
        caption:
          "Comparison table positioning Kennedy against DIY Ads Manager and agency retainers — dark theme.",
      },
      {
        url: kennedyComparisonLightImage.src,
        caption:
          "The same comparison in light theme, with the Kennedy column holding its dark treatment for emphasis.",
      },
      {
        url: kennedyLoginImage.src,
        caption: "Authentication entry point into the customer dashboard.",
      },
    ],
  },
  {
    id: 7,
    title: "FiveOne",
    description:
      "A published iOS and Android dating app built as a four-round elimination game rather than a swipe feed. Past 20,000 downloads, on a React Native client with a real-time NestJS backend.",
    fullDescription:
      "FiveOne rejects the infinite-scroll premise most dating apps are built on. A match seats five guys and one girl in a single timed group chat, and across four rounds the group gets smaller until one connection is left. The mechanic is the product: conversation has stakes because elimination is real, and the app is engineered around that — synchronized rounds, live presence, and a chat that several people occupy at once.\n\nThe mobile client is bare React Native — no Expo — shipped to both the App Store and Google Play. It carries Firebase authentication with Google and Apple sign-in, push notifications through Firebase Messaging and Notifee, Socket.io for live chat and round transitions, Reanimated for the card and round animations, MMKV and redux-persist for state that survives cold starts, and PostHog with session replay for behavioural analytics.\n\nThe backend is a modular NestJS service on Prisma and PostgreSQL, split into the domains the game actually needs: matches and game configuration, wildcards, timed rounds, chat, follows, timeline, notifications, reporting and moderation, login-attempt throttling, media handling, and Gemini-generated conversation prompts. A separate ads-client module wires the app into an in-house ad network alongside AdMob, so monetization is not solely rented from Google.\n\nA Next.js site handles everything the stores require and the app itself cannot: a smart deep link that routes visitors to the right store or opens the installed app, support, privacy policy, terms, and self-service account deletion.",
    keyFeatures: [
      "Four-round elimination match engine with server-authoritative timers, so every participant sees the same round state and eliminations cannot be raced client-side",
      "Real-time group chat over Socket.io with presence, delivery state and reconnect handling on flaky mobile networks",
      "Wildcard economy — a wildcard skips a player into a semi-final, and 100 wildcards trade up to a Super Wildcard for a direct match with a daily top pick",
      "Firebase authentication with Google and Apple sign-in, backed by login-attempt throttling and refresh handling on the NestJS side",
      "Push notifications through Firebase Messaging with Notifee for rich local presentation and scheduling",
      "Dual monetization: AdMob plus an in-house ad network integrated through a dedicated ads-client module",
      "Gemini-generated conversation prompts and pickup lines, seeded and moderated rather than free-form model output",
      "Reporting, blocking and moderation paths required for store review, plus self-service account deletion on the web",
      "Next.js marketing site with a smart deep link that detects platform and routes to App Store, Play Store, or the installed app",
      "PostHog analytics with mobile session replay driving retention and round-completion analysis",
    ],
    image: fiveOneImage.src,
    technologies: [
      "React Native",
      "TypeScript",
      "React Navigation",
      "Redux Toolkit",
      "redux-persist",
      "MMKV",
      "Reanimated",
      "Socket.io",
      "Firebase Auth",
      "Firebase Messaging",
      "Notifee",
      "AdMob",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Google Gemini",
      "Next.js",
      "Tailwind CSS",
      "Docker",
      "PostHog",
    ],
    category: "Mobile Application",
    featured: true,
    slug: "five-one",
    links: {
      live: "https://fiveone.app",
    },
    challenges:
      "A timed multiplayer round is a distributed-state problem wearing a dating-app costume. Six clients on mobile networks, each with its own clock and its own dropouts, all have to agree on which round is active and who has been eliminated — and any client-authoritative shortcut turns into a cheating vector.\n\nMobile connectivity is hostile to persistent sockets. Backgrounding, network switches and dead zones all disconnect users mid-round, and a naive reconnect either loses messages or replays them.\n\nStore review is a hard gate rather than a soft one: both Apple and Google require account deletion, reporting, blocking and explicit tracking disclosure for an app in this category, and a rejection costs a release cycle.\n\nThe backend started on MongoDB and its access patterns had outgrown it — the relational shape of matches, rounds, participants and eliminations was being reconstructed in application code on every read.\n\nMonetizing a young app without a large audience: AdMob alone left both fill rate and margin at a third party's discretion.",
    solutions:
      "Round state is server-authoritative. Timers, transitions and eliminations are computed and broadcast by the backend; clients render state rather than deciding it, so a lagging or tampered client cannot change the outcome. Redis backs shared state so socket handling is not pinned to one process.\n\nReconnect is treated as the normal case rather than an error path. Clients resubscribe and rehydrate the current round on reconnect, with message identity used to reconcile rather than blindly append — the same problem I wrote up in more detail in the conversion-tracking post, where dropped and duplicated events had to be reconciled the same way.\n\nStore requirements were built as real features rather than compliance theatre: reporting and blocking are first-class backend modules, and account deletion is a public web flow so it stays reachable when someone has already uninstalled the app.\n\nThe MongoDB to PostgreSQL migration moved the relational core onto Prisma and Postgres, replacing hand-rolled joins with real foreign keys and transactions — written up separately in my post on that migration.\n\nOn monetization, the in-house ad network integration through the ads-client module runs alongside AdMob, so house campaigns can fill inventory that would otherwise go unsold and the app is not entirely dependent on a single demand source.",
    screenshots: [
      {
        url: fiveOneImage.src,
        caption:
          "Marketing site hero — the premise stated plainly, with both store links and live download count.",
      },
      {
        url: fiveOneRoundsImage.src,
        caption:
          "The four rounds of a match, shown with real in-app chat screens from the iOS client.",
      },
      {
        url: fiveOneWildcardImage.src,
        caption:
          "Wildcard mechanics — skipping into a semi-final, and trading 100 wildcards for a Super Wildcard.",
      },
    ],
  },
  {
    id: 1,
    title: "Hajir Khata",
    description:
      "A multi-tenant HR and payroll SaaS running attendance, leave, claims and payroll for 40+ organisations and 2,025+ active users, with biometric device sync, geofenced check-in and role-based access.",
    fullDescription: `
      Hajir Khata is a production HR and payroll platform with 40+ organisations and more than 2,025 active users on it, sold into hospitality, retail, manufacturing, healthcare, education and financial services.

      The problem it solves is the gap between how attendance is actually captured and how payroll gets calculated. Most of these organisations were reconciling a paper register, a biometric device export and a spreadsheet by hand every month. Hajir Khata closes that loop: fingerprint and face devices sync straight into the platform, field staff clock in from a mobile app with location capture, and that attendance data flows directly into salary components, overtime, allowances and tax without a manual export step.

      Around that core sit the workflows an HR team needs to actually run the month — leave requests, approvals, allocations and substitute cover; advance, proposed and overtime claims from submission through review; announcements and events; and device and geofence management for teams split across offices and sites.

      Access is split by audience rather than bolted on: administrators get the operational dashboard and payroll controls, while employees get a separate self-service surface for their own attendance, leave and payslips. Roles and permissions are granular across modules, and every organisation gets its own tenant with independent settings, so one deployment serves all of them without their data touching.
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
        caption:
          "Admin dashboard — attendance overview with headcount, present, absent and late counts, department breakdown, and absent/late employee lists.",
      },
      {
        url: hajirKhataMarketingImage.src,
        caption:
          "Product site — positioning, adoption figures (40+ organisations, 2,025+ active users) and the customer logos the product ships to.",
      },
      {
        url: hajirKhataAttendanceImage.src,
        caption:
          "Attendance capability page — biometric device sync, mobile GPS check-in for field staff, and shift and roster management.",
      },
      {
        url: hajirKhataAppLoginImage.src,
        caption:
          "Authentication entry to the tenant workspace, with email and Google sign-in and rotating customer testimonials.",
      },
    ],
  },
  // {
  // id: 2,
  // title: "Billing System",
  // description:
  // "A robust billing system to streamline inventory, invoicing, transaction tracking, and reporting for SMBs.",
  // fullDescription: `
  // The Billing System is an all-in-one financial management tool designed for small to medium-sized businesses.
  // It features real-time inventory management, customizable invoice generation,
  // unified transaction tracking across multiple payment methods, and comprehensive reporting dashboards.
  // `,
  // keyFeatures: [
  // "Inventory Management",
  // "Invoice generation with PDF export",
  // "Detailed analytics: sales trends, aging receivables/payables, cash flow forecasts",
  // ],
  // image: billingSystemImage.src,
  // technologies: [
  // "Next.js",
  // "TypeScript",
  // "Tailwind CSS",
  // "Recharts",
  // "React-pdf",
  // "Redux",
  // ],
  // category: "Web Application",
  // featured: false,
  // slug: "billing-system",
  // links: {
  // live: "https://billings-system.vercel.app/login/?email=rajinsakha07@gmail.com&password=billingdemo@7",
  // github: "https://github.com/rajinsakha/Billing-System",
  // },
  // challenges: `
  // Ensuring data consistency across inventory, invoicing, and transaction modules:
  // We needed atomic updates so that stock levels, invoices, and ledger entries always remained in sync.
  //
  // Handling high volumes of daily transactions without performance degradation:
  // Queries needed heavy optimization and caching to serve large datasets quickly.
  //
  // Supporting diverse tax jurisdictions and compliance reporting:
  // The system must be flexible enough to model various tax rules and generate region-specific reports.
  // `,
  // solutions: `
  // Implemented database transactions with strict referential integrity to guarantee consistency.
  // Optimized tables with appropriate indexes, added caching layers for frequently used data, and paginated large result sets.
  // Built a dynamic tax engine allowing admins to configure tax rules per product/region and generate compliance-ready exports.
  // `,
  // screenshots: [
  // {
  // url: productBillingImage.src,
  // caption: "Products Section",
  // },
  //
  // {
  // url: invoiceBillingImage.src,
  // caption: "Bill Creation Screen",
  // },
  // {
  // url: generateBillPdfImage.src,
  // caption: "Custom invoice template editor and PDF preview",
  // },
  // ],
  // },
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

  // {
  // id: 3,
  // title: "Project Information Management System",
  // description:
  // "A SaaS platform for business development and project operations teams to manage the full project lifecycle — from lead capture and proposal submission to shortlisting, contracts, delivery tracking, finance, assets, and documents — in one system.",
  // fullDescription:
  // "PIMS replaces fragmented spreadsheets and disconnected tools with one system for how opportunities become projects. Business development can capture and qualify leads, run proposals against checklists and deadlines, move work through shortlisting and contractual steps, and hand off cleanly into active delivery — with the same entities (clients, partners, vendors, experts) and documents visible end to end.\n\nProject and operations teams get calendars and project views tied to milestones and deadlines, while finance and admin see bills, payments, and expense structure alongside asset inventory, handover, repair, land, and vehicle tracking. Dashboards summarize lead health, project progress, finance, assets, expenses, and operations so leadership can spot risk early instead of reconciling reports manually.\n\nA configurable settings layer (themes, categories, fiscal year, master data for clients/partners/vendors, expenses, assets, and file types) keeps the product adaptable without one-off hardcoding. Together, the app is built as a long-lived internal platform: consistent navigation, role-aware access, and reusable patterns across dozens of screens.",
  // keyFeatures: [
  // "Six dashboards (Lead, Project, Finance, Assets, Expenses, Operations) plus a project management hub for calendars, milestones, deadlines, and at-a-glance delivery/financial risk",
  // "End-to-end lead-to-award workflow with checklist-driven proposals, submissions/results, round-based shortlisting, contractual steps, and clean handoff into project creation",
  // "Unified master roster for clients, organizations, partners, vendors, and experts so proposals, contracts, and project records stay consistent across modules",
  // "Operational and financial control through expenses, bills, payments, and full asset lifecycle tracking (inventory, handover, repair, land, and vehicles)",
  // "Role-based access with granular permissions, a productivity toolkit (documents, checklists, experience/letter tools, imports/exports), and deep configurable settings including Nepali date support",
  // ],
  // image: pimsLeadDashboardImage.src,
  // technologies: [
  // "React",
  // "TypeScript",
  // "Vite",
  // "Tailwind CSS",
  // "Shadcn/ui",
  // "Redux Toolkit",
  // "React Router",
  // "React Hook Form",
  // "Zod",
  // "Axios",
  // "Recharts",
  // ],
  // category: "Web Application",
  // featured: true,
  // slug: "project-information-management-system",
  // links: {
  // live: "#",
  // },
  // challenges:
  // "Shipping a single UX that stays understandable while the product spans dashboards, CRM-like pipeline, contracts, roster, finance, assets, and admin settings — without every screen feeling like a different app.\n\nModeling a lead lifecycle that is strict enough to be auditable (checklists, stages, documents) yet flexible enough for real-world variance — unsuccessful paths, multiple shortlist rounds, and different contract types.\n\nKeeping configuration powerful (many master-data dimensions) without letting inconsistent settings break downstream lists, filters, and reports — especially as tables and libraries grow.\n\nImplementing access control that matches how organizations actually delegate work: not just “logged in,” but read/write boundaries per module and action, aligned with backend rules.",
  // solutions:
  // "Defined a consistent app shell: grouped navigation, searchable command palette, and repeatable list/detail/form patterns so new modules plug into the same mental model instead of inventing new UX each time.\n\nImplemented a stage-based lead experience with clear status, checklist usage, and document touchpoints so the path from proposal to contract to project is visible in the UI — not only in spreadsheets.\n\nCentralized master data in Settings (grouped by domain: general, assets, expenses, file types) so categories, fiscal year, and document/expense semantics stay authoritative for the rest of the app.\n\nUsed a layered frontend architecture — service modules for REST integration, typed forms with validation, Redux for session and cross-cutting UI state, and route-level permission guards — so behavior stays predictable as the surface area grows.\n\nPrioritized heavy lists (documents, long tables) with patterns that stay performant and usable (infinite scroll, clear loading states) so operational users aren’t blocked at scale.",
  // screenshots: [
  // {
  // url: pimsLeadDashboardImage.src,
  // caption:
  // "Lead Dashboard — summary cards and opportunity submitted status chart",
  // },
  // {
  // url: pimsDocumentLibraryImage.src,
  // caption:
  // "Document Library — upload, create folder, and grid view of files",
  // },
  // {
  // url: pimsExperienceManagementImage.src,
  // caption:
  // "Experience Management — generic experience table with assignments and contracts",
  // },
  // {
  // url: pimsSettingsThemeImage.src,
  // caption: "Settings — Theme management under General Settings",
  // },
  // {
  // url: pimsCalendarImage.src,
  // caption: "Calendar — project calendar with upcoming deadlines",
  // },
  // {
  // url: pimsShortlistedImage.src,
  // caption:
  // "Lead detail — shortlisted phase with rounds and proposal workflow",
  // },
  // {
  // url: pimsLeadsImage.src,
  // caption:
  // "Proposal step — choose checklist and multi-step proposal flow",
  // },
  // ],
  // },

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
  {
    id: 5,
    title: "Mitho",
    description:
      "A published Android app that answers “what should I eat?” for Nepali food: pick a mood and a budget, tap once, and get a single meal suggestion that fits both—with favorites, dish details, and optional mealtime reminders.",
    fullDescription: `
      Mitho is a meal-decision app built around Nepali food and cravings rather than generic recipe listings. Instead of returning a long list to scroll through, it commits to one suggestion at a time: choose a vibe—comfort, quick, healthy, or a full feast—set what you are willing to spend, and tap Surprise Me.

      The app covers the full loop around that single decision: dish details with price range, spice level and ingredients so you know what you are committing to, favorites for meals worth repeating, dietary preferences that filter every suggestion, and optional local reminders at mealtimes so the choice happens before you are already hungry.

      Built solo with Expo and React Native, using Supabase for authentication and Redux Toolkit with persistence for state that survives restarts. Shipped to the Play Store, with a companion web build and marketing site.
    `,
    keyFeatures: [
      "Single-suggestion recommendation flow driven by mood and budget, rather than an endless scrollable list",
      "Budget ceiling honoured on every suggestion, so nothing surfaced falls outside what the user will spend",
      "Dish detail view with price range, spice level and ingredients before committing to cook or order",
      "Favorites and dietary preferences persisted locally across app restarts",
      "Optional local mealtime notifications, scheduled to the user's own routine",
      "Light and dark themes, plus language and appearance settings",
      "Supabase authentication with Google sign-in via Expo Auth Session",
    ],
    image: mithoImage.src,
    technologies: [
      "React Native",
      "Expo",
      "Expo Router",
      "TypeScript",
      "Supabase",
      "Redux Toolkit",
      "redux-persist",
      "React Navigation",
      "Expo Notifications",
      "Reanimated",
      "Next.js",
    ],
    category: "Mobile Application",
    featured: true,
    slug: "mitho",
    links: {
      // Play listing (play.google.com/store/apps/details?id=com.rajinsakha.mitho)
      // still 404s publicly — swap `live` to it once the listing resolves.
      live: "https://mitho.rajinsakha.com.np",
    },
    challenges: `
      The core problem is decision fatigue, so the usual answer—show more options—makes the product worse. The interface had to resist becoming a browsable catalogue while still giving enough information to trust a suggestion.

      Recommendations also had to respect several constraints at once: mood, budget ceiling and dietary preference, without frequently returning nothing at all.

      As a solo build, the app needed authentication, persisted state and scheduled notifications without a backend service to maintain alongside it.
    `,
    solutions: `
      The home screen is built around one action. Surprise Me returns a single meal, with re-spin and save as the only follow-ups, so the decision stays small; detail and browsing live one level deeper for when a suggestion needs checking.

      Filtering runs over bundled seed data through pure helper functions, keeping recommendation logic testable and instant offline, with preferences applied as constraints rather than post-hoc filters.

      Supabase covers authentication so there is no server to run, and Redux Toolkit with redux-persist keeps favorites, dietary settings and appearance choices intact between sessions. Reminders use Expo's local notifications, which need no push infrastructure.
    `,
    screenshots: [
      {
        url: mithoHomeImage.src,
        caption:
          "Home — one tap on Surprise Me returns a single meal rather than a list.",
      },
      {
        url: mithoRecommendImage.src,
        caption:
          "Recommendations tuned to the selected mood and budget ceiling.",
      },
      {
        url: mithoDetailImage.src,
        caption:
          "Dish detail — price range, spice level and ingredients before committing.",
      },
      {
        url: mithoNotificationsImage.src,
        caption:
          "Optional local mealtime reminders, scheduled to the user's routine.",
      },
      {
        url: mithoHomeDarkImage.src,
        caption: "Home screen in dark theme.",
      },
    ],
  },
];
