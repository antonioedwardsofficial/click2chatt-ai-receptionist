import { BusinessProfile } from "./types";

export const DEFAULT_PROFILE: BusinessProfile = {
  name: "Fresh Cuts Barbershop",
  industry: "Barber/Personal Care",
  description: "A classic barbershop with a modern twist, specializing in fades, beard trims, and hot towel shaves.",
  services: [
    "Classic Haircut ($35)",
    "Skin Fade ($45)",
    "Beard Trim & Line Up ($25)",
    "Hot Towel Shave ($40)",
    "The Full Works (Cut + Beard + Shave) ($80)"
  ],
  pricing: "Prices are fixed for standard services. Custom designs may incur extra charges.",
  hours: "Mon-Fri: 10am - 7pm, Sat: 9am - 5pm, Sun: Closed",
  location: "123 Main St, Downtown Metro City",
  contact: "555-0199",
  policies: "Walk-ins welcome but appointments prioritized. Cancellation required 24h in advance. Late arrivals >15min may be rescheduled."
};

export const SAMPLE_PROFILES: Record<string, BusinessProfile> = {
  barber: DEFAULT_PROFILE,
  mechanic: {
    name: "Mike's Mobile Mechanics",
    industry: "Automotive",
    description: "We come to you! Certified mechanics handling diagnostics, batteries, brakes, and oil changes at your driveway.",
    services: [
      "Diagnostic Visit ($99 - waived if repair booked)",
      "Brake Pad Replacement (starts at $180/axle)",
      "Battery Replacement ($150 + parts)",
      "Oil Change (Synthetic) ($90)"
    ],
    pricing: "Rough estimates provided. Final quote requires diagnostic.",
    hours: "Daily: 8am - 8pm",
    location: "Mobile Service (Serving Metro City & Suburbs)",
    contact: "555-0244",
    policies: "Payment due upon completion. We do not do transmission rebuilds or body work."
  }
};
