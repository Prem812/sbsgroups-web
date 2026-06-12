import { MdPhone, MdEmail } from "react-icons/md";
import { FaXTwitter, FaThreads, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

export const SOCIAL_PLATFORMS = [
  { key: "phone", label: "Phone", Icon: MdPhone },
  { key: "email", label: "Email", Icon: MdEmail },
  { key: "twitter", label: "Twitter / X", Icon: FaXTwitter },
  { key: "threads", label: "Threads", Icon: FaThreads },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn },
];

// A link counts as "available" only if it's a real URL — not "", "#", or null
export const isValidLink = (url) =>
  typeof url === "string" && url.trim() !== "" && url.trim() !== "#";

export const generateEmployeeSlug = (name, role) =>
  `${name} ${role}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const employees = [
  {
    id: "EMP-101",
    name: "G K Jaiswal",
    role: "Sales Executive Manager",
    tag: "Sales Desk",
    avatar: "https://sbsgroups.co.in/assets/founder-gU9kDhlP.webp",
    bgGradient: "from-blue-600 to-indigo-950",
    description:
      "Driving global sales strategies and corporate accounts orchestration. Specialized in scale operations and dynamic business development infrastructure.",
    // ── Detail-page fields ──
    biography:
      "Handling primary supply logistics distributions agreements, corporate RFQs evaluations, and vendor negotiations for our heavy mechanical processing spare parts deployment grid channels.",
    officeLocation: "Singrauli Main Hub Depot",
    joiningDate: "August 14, 2022",
    // ── Contact / socials (empty or "#" → icon auto-hidden) ──
    phone: "tel:+9194251XXXXX",
    email: "jaiswal.sales@sbsgroups.com",
    twitter: "",
    threads: "",
    instagram: "",
    linkedin: "https://linkedin.com/in/example",
  },
  {
    id: "EMP-102",
    name: "Anjali Sharma",
    role: "Head of Human Resources",
    tag: "HR Operations",
    avatar: "https://sbsgroups.co.in/assets/founder-gU9kDhlP.webp",
    bgGradient: "from-rose-500 to-purple-950",
    description:
      "Architecting inclusive corporate cultures and talent acquisition frameworks. Spearheading organizational design and workplace wellness metrics.",
    biography:
      "Leads end-to-end HR operations at SBS Groups — recruitment, onboarding, payroll compliance and employee welfare programs across warehouse and field sales teams.",
    officeLocation: "Waidhan Corporate Office",
    joiningDate: "March 02, 2018",
    phone: "tel:+9170002XXXXX",
    email: "sharma.a@sbsgroups.com",
    twitter: "#",
    threads: "",
    instagram: "https://instagram.com/example",
    linkedin: "https://linkedin.com/in/example",
  },
];

// Lookup helper used by /employees/[slug]
export const getEmployeeBySlug = (slug) =>
  employees.find(
    (emp) => generateEmployeeSlug(emp.name, emp.role) === slug
  ) || null;