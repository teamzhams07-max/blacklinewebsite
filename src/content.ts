// ============================================
// BLACK LINE | Detailing Studio
// Centralized content — edit everything here
// ============================================

export const site = {
  name: 'BLACK LINE',
  subname: 'DETAILING STUDIO',
  tagline: 'DETAILING | PROTECTION | PERFECTION',
  heroHeadline: ['PERFECTION', 'IS IN THE', 'DETAILS.'],
  aboutHeadline: "We don't wash cars.\nWe restore them.",
  contactHeadline: ["Let's make", 'it shine.'],
};

export const about = {
  image: '/images/xuv700-white.jpg',
  imagePosition: 'center 62%',
  story:
    'BLACK LINE was founded on a simple obsession: every vehicle deserves to look better than the day it left the showroom. What started as a one-bay workshop has grown into a full-fledged detailing, protection, and customization studio — but the philosophy hasn\u2019t changed. We treat every car as if it\u2019s our own, because the difference between clean and flawless is measured in microns.',
  counters: [
    { label: 'Cars Detailed', value: 100, suffix: '+' },
    { label: 'Happy Clients', value: 100, suffix: '+' },
  ],
};

export type Service = {
  id: string;
  number: string;
  name: string;
  description: string;
};

export const services: Service[] = [
  { id: 'ceramic-coating', number: '01', name: 'Ceramic Coating', description: 'Lock in a glass-like shine that repels water, dirt, and UV damage for years.' },
  { id: 'ppf', number: '02', name: 'Paint Protection Film', description: 'Self-healing transparent film that absorbs stone chips, scratches, and road debris.' },
  { id: 'exterior-detailing', number: '03', name: 'Exterior Detailing', description: 'Deep clean, decontamination, and protection for every exterior surface.' },
  { id: 'interior-detailing', number: '04', name: 'Interior Detailing', description: 'Sanitise, condition, and restore every surface inside the cabin.' },
  { id: 'foam-wash', number: '05', name: 'Foam Wash', description: 'pH-neutral foam bath that lifts dirt without touching the paint.' },
  { id: 'paint-correction', number: '06', name: 'Paint Correction', description: 'Machine polishing to remove swirl marks, oxidation, and holograms.' },
  { id: 'vinyl-wrapping', number: '07', name: 'Vinyl Wrapping', description: 'Full or partial colour changes with premium cast vinyl films.' },
  { id: 'headlight-restoration', number: '08', name: 'Headlight Restoration', description: 'Cloudy, yellowed lenses restored to factory clarity and protection.' },
  { id: 'windshield-coating', number: '09', name: 'Windshield Coating', description: 'Hydrophobic coating that sheets rain away for safer driving.' },
  { id: 'sunfilm', number: '10', name: 'Sunfilm', description: 'Heat-rejecting window films that keep the cabin cool and protected.' },
  { id: 'modifications', number: '11', name: 'Modifications', description: 'Performance and aesthetic upgrades, installed and tuned in-house.' },
];

export type Work = {
  id: string;
  title: string;
  services: string[];
  image: string;
  position?: string; // CSS object-position, to keep the car in frame
  hasSlider: boolean;
  beforeImage?: string;
  afterImage?: string;
};

export const works: Work[] = [
  { id: 'w1', title: 'Mahindra XUV700 — Midnight Black', services: ['Paint Correction', 'Ceramic Coating'], image: '/images/xuv700-black.jpg', position: 'center 88%', hasSlider: false },
  { id: 'w2', title: 'Toyota Hilux — Gloss Black', services: ['Ceramic Coating', 'Sun Film'], image: '/images/hilux-black.jpg', position: 'center 92%', hasSlider: false },
  { id: 'w3', title: 'Mercedes-Benz CLA — Obsidian', services: ['Paint Correction', 'Windshield Coating'], image: '/images/cla-black.jpg', position: 'center 62%', hasSlider: false },
  { id: 'w4', title: 'Hyundai i20 N Line — Black & Red', services: ['PPF', 'Modifications'], image: '/images/i20-nline-black.jpg', position: 'center 82%', hasSlider: false },
  { id: 'w5', title: 'Mahindra XUV700 — Pearl White', services: ['Foam Wash', 'Exterior Detailing'], image: '/images/xuv700-white.jpg', position: 'center 62%', hasSlider: false },
  { id: 'w6', title: 'Honda Elevate — Platinum White', services: ['Exterior Detailing', 'PPF'], image: '/images/elevate-white.jpg', position: 'center 84%', hasSlider: false },
  { id: 'w7', title: 'Toyota Rumion — Silver', services: ['Headlight Restoration', 'Foam Wash'], image: '/images/rumion-silver.jpg', position: 'center 80%', hasSlider: false },
  { id: 'w8', title: 'Hyundai i20 — Black Hood Edition', services: ['Vinyl Wrapping', 'Modifications'], image: '/images/i20-white.jpg', position: 'center 58%', hasSlider: false },
  { id: 'w9', title: 'Honda — Gloss Black', services: ['Paint Correction', 'Headlight Restoration'], image: '/images/honda-black.jpg', position: 'center 86%', hasSlider: false },
  { id: 'w10', title: 'Kia — Gloss Black', services: ['Ceramic Coating', 'Vinyl Wrapping'], image: '/images/kia-black.jpg', position: 'center 70%', hasSlider: false },
];

export const process = [
  { number: '01', title: 'Inspect', description: 'Every panel, every gap, every imperfection — documented before we begin.' },
  { number: '02', title: 'Prep & Correct', description: 'Decontamination, machine polishing, and surface correction to factory finish.' },
  { number: '03', title: 'Protect', description: 'Coatings, films, and sealants applied with surgical precision.' },
  { number: '04', title: 'Deliver', description: 'Final inspection under studio lighting. You see the difference.' },
];

export const reviews = [
  {
    name: 'Anbumozhi 123',
    meta: '12 reviews · 3 photos',
    timing: '2 months ago',
    highlight: 'Reasonable price',
    body: 'I had a very good experience with the 7 years PPF and stickering work. The quality of the work was excellent, and the finishing was very neat and professional. The workers were skilled, friendly, and completed the work properly. Overall, I am very happy with the service and would definitely recommend them.',
  },
  {
    name: 'Bragadeeshwaran G',
    meta: '2 reviews · 1 photo',
    timing: '2 months ago',
    highlight: 'BLACK. BOLD. BEAST.',
    body: 'Got my Mercedes-Benz CLA 200 transformed with Full Black PPF at Blackline. The finish, attention to detail, and overall transformation were excellent.',
  },
  {
    name: 'Saraswathy J',
    meta: 'Local Guide · 11 reviews · 34 photos',
    timing: 'a week ago',
    highlight: 'Great price',
    body: 'Even though they are a new shop, their professional level is very high. The service was neat and well finished.',
  },
  {
    name: 'Mohammed Murshith',
    meta: '6 reviews',
    timing: '2 months ago',
    highlight: 'Good work and satisfied',
    body: 'Good work and satisfied with the service. The team was professional and delivered a clean finish.',
  },
  {
    name: 'Mr Madhan',
    meta: '2 reviews · 1 photo',
    timing: '19 hours ago',
    highlight: 'Great work very satisfied',
    body: 'Do visit them for the best work. Very satisfied with the result and the overall experience.',
  },
];

export const contact = {
  phones: ['+91 88258 02692', '+91 99403 31994', '+91 97909 95708'],
  whatsappNumber: '919940331994',
  whatsappDisplay: '+91 99403 31994',
  email: 'Blacklinedetailing3@gmail.com',
  instagram: 'blackline.detailing__',
  instagramUrl: 'https://instagram.com/blackline.detailing__',
  address: '1st Main Rd, Poompuhar Nagar, Kolathur, Chennai, Tamil Nadu 600099',
  hours: 'Mon\u2013Sat: 9:00 AM \u2013 7:00 PM',
  hoursSun: 'Sun: Closed',
  // Google Maps embed URL — replace with your actual embed link
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.6610187396986!2d80.2123555!3d13.120648000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265e8038e0481%3A0x2122cf1be330610e!2sBlackline%20Detailing%20Studio!5e0!3m2!1sen!2sin!4v1794836542026!5m2!1sen!2sin",
};

export const socials = [
  { name: 'Instagram', url: 'https://instagram.com/blackline.detailing__' },
  { name: 'WhatsApp', url: 'https://wa.me/919940331994' },
];

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Works', href: '#works' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export const heroImage = '/images/hilux-black.jpg';

// Home page hero: images that slide through the 3 frames (left / centre / right), one by one.
// Add or remove entries freely (works best with 4+). The 2nd entry starts in the centre.
export const heroSlides = [
  { src: '/images/i20-white.jpg', alt: 'Hyundai i20 with black hood, detailed by BLACK LINE', position: 'center 63%' },
  { src: '/images/xuv700-black.jpg', alt: 'Mahindra XUV700 in gloss black', position: 'center 85%' },
  { src: '/images/hilux-black.jpg', alt: 'Toyota Hilux in gloss black', position: 'center 78%' },
  { src: '/images/xuv700-white.jpg', alt: 'Mahindra XUV700 in pearl white at the BLACK LINE studio', position: 'center 65%' },
  { src: '/images/cla-black.jpg', alt: 'Mercedes-Benz CLA with a mirror-gloss finish', position: 'center 68%' },
  { src: '/images/i20-nline-black.jpg', alt: 'Hyundai i20 N Line in black with red accents', position: 'center 80%' },
];
export const heroSlideInterval = 2600; // ms between moves
