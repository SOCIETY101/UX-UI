import { IconCheck, IconMap, IconTruck, IconClock, IconUsers, IconBarcode, IconAlertCircle, IconArrowUpRight } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import "./styles.css"

export const metadata = {
  title: "LogFlow - Transport Management System | Modern Fleet Management",
  description: "Streamline your logistics operations with intelligent routing, real-time tracking, and seamless coordination. Manage shipments effortlessly.",
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-silver bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconTruck className="size-6 text-ink" />
            <span className="text-xl font-semibold text-graphite">LogFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-graphite hover:text-ink">Features</a>
            <a href="#how-it-works" className="text-sm text-graphite hover:text-ink">How it works</a>
            <a href="#testimonials" className="text-sm text-graphite hover:text-ink">Testimonials</a>
          </div>
          <Link href="/shipments">
            <Button variant="default" size="sm" className="rounded-full">
              Launch App
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-silver">
              <span className="text-xs font-semibold text-graphite">New: Real-time Route Optimization</span>
              <IconArrowUpRight className="size-3 text-ink" />
            </div>

            <h1 className="text-5xl font-semibold leading-tight text-graphite sm:text-6xl lg:text-7xl">
              The better way to manage shipments
            </h1>

            <p className="text-lg leading-relaxed text-slate max-w-lg">
              Real-time visibility, intelligent routing, and seamless coordination. LogFlow gives you the precision and control needed to optimize every mile of your supply chain.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center pt-4">
              <Link href="/shipments">
                <Button
                  size="lg"
                  className="rounded-full bg-ink text-white hover:bg-ink/90"
                >
                  Get Started
                </Button>
              </Link>
              <a href="#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-silver text-graphite hover:bg-white"
                >
                  See features
                </Button>
              </a>
            </div>

            {/* Trust Badge */}
            <div className="space-y-3 pt-6 border-t border-silver">
              <p className="text-xs text-slate font-semibold uppercase tracking-wide">Trusted by industry leaders</p>
              <div className="flex flex-wrap gap-4">
                {["500+ Companies", "99.9% Uptime", "24/7 Support"].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <IconCheck className="size-4 text-graphite" />
                    <span className="text-sm text-graphite">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Visual - Dashboard Image */}
          <div className="relative">
            <div className="rounded-3xl bg-white p-2 shadow-[rgba(36,36,36,0.1)_0px_8px_24px_0px] ring-1 ring-silver/30 overflow-hidden">
              <Image
                src="/riq1.png"
                alt="LogFlow Dashboard - Real-time tracking and shipment management"
                width={1200}
                height={900}
                className="rounded-2xl w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Three Feature Cards Section (Cal.com style) */}
      <section className="border-t border-silver py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-semibold text-graphite mb-16">
            With us, shipment management is easy
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {mainFeatures.map((feature, i) => {
              const imageNum = i + 2; // riq2, riq3, riq4
              return (
                <div key={i} className="rounded-3xl bg-white p-8 ring-1 ring-silver/50 hover:shadow-[rgba(36,36,36,0.08)_0px_8px_16px_0px] transition-all overflow-hidden">
                  <div className="mb-6 rounded-2xl overflow-hidden">
                    <Image
                      src={`/riq${imageNum}.png`}
                      alt={feature.title}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-graphite mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="border-t border-silver py-20 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-semibold text-graphite mb-4">
            Your shipment management platform all-in-one
          </h2>
          <p className="text-center text-slate max-w-2xl mx-auto mb-16">
            Everything you need to manage routes, track shipments, and coordinate your fleet from a single, intuitive interface.
          </p>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              {detailFeatures.slice(0, 3).map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-paper">
                    <feature.icon className="size-5 text-graphite" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-graphite mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Image */}
            <div className="rounded-3xl bg-white p-2 ring-1 ring-silver/30 shadow-lg overflow-hidden">
              <Image
                src="/riq5.png"
                alt="Route Management and Optimization"
                width={1200}
                height={1200}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="border-t border-silver py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-semibold text-graphite mb-16">
            And even more
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allFeatures.map((feature, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 ring-1 ring-silver/50 hover:shadow-md transition-all">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-paper p-2">
                  <feature.icon className="size-5 text-graphite" />
                </div>
                <h3 className="font-semibold text-graphite mb-2">{feature.title}</h3>
                <p className="text-xs text-slate">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="border-t border-silver bg-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-semibold text-graphite mb-4">
            Loved by logistics companies
          </h2>
          <p className="text-center text-slate mb-16 max-w-2xl mx-auto">
            See what industry leaders say about LogFlow
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="rounded-2xl bg-paper p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array(5).fill(null).map((_, j) => (
                    <span key={j} className="text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-sm text-graphite mb-4 leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-white ring-2 ring-silver" />
                  <div>
                    <p className="text-sm font-semibold text-graphite">{testimonial.name}</p>
                    <p className="text-xs text-slate">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="border-t border-silver py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-semibold text-graphite mb-4">
            All your tools synced
          </h2>
          <p className="text-center text-slate mb-16">
            LogFlow integrates with the tools you already use
          </p>

          <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
            {integrations.map((integration, i) => (
              <div key={i} className="flex items-center justify-center rounded-2xl bg-white p-4 ring-1 ring-silver/50 hover:shadow-md transition-all">
                <div className="size-8 rounded-lg bg-paper flex items-center justify-center">
                  <span className="text-2xl">{integration.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-silver py-20 sm:py-32 bg-white">
        <div className="mx-auto max-w-3xl px-6 text-center space-y-8">
          <h2 className="text-4xl font-semibold text-graphite sm:text-5xl">
            Smarter shipping starts here
          </h2>
          <p className="text-lg text-slate">
            Join hundreds of logistics companies optimizing their operations with LogFlow
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:items-center">
            <Link href="/shipments">
              <Button size="lg" className="rounded-full bg-ink text-white hover:bg-ink/90">
                Start Free Trial
              </Button>
            </Link>
            <p className="text-sm text-slate">No credit card required. 14-day free trial.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-silver bg-paper py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 pb-8 border-b border-silver">
            <div className="flex items-center gap-2 mb-4">
              <IconTruck className="size-5 text-ink" />
              <span className="font-semibold text-graphite">LogFlow</span>
            </div>
            <p className="text-sm text-slate max-w-md">
              The all-in-one platform for modern transport management.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4 mb-8">
            {footerSections.map((section, i) => (
              <div key={i}>
                <h4 className="font-semibold text-graphite mb-4 text-sm">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-sm text-slate hover:text-graphite transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-silver pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate">© 2026 LogFlow. All rights reserved.</p>
            <div className="flex gap-4 text-sm text-slate">
              <Link href="/privacy-policy" className="hover:text-graphite">Privacy</Link>
              <a href="#" className="hover:text-graphite">Terms</a>
              <a href="#" className="hover:text-graphite">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const mainFeatures = [
  {
    icon: IconMap,
    title: "Intelligent Routing",
    description: "AI-powered route optimization reduces fuel costs and delivery times automatically.",
  },
  {
    icon: IconTruck,
    title: "Real-Time Tracking",
    description: "Monitor every vehicle and shipment with live GPS tracking and status updates.",
  },
  {
    icon: IconClock,
    title: "Predictive Delays",
    description: "Anticipate and prevent delays before they happen with AI predictions.",
  },
]

const detailFeatures = [
  {
    icon: IconMap,
    title: "Smart Route Optimization",
    description: "AI algorithms calculate the most efficient routes considering traffic, weather, and delivery windows.",
  },
  {
    icon: IconBarcode,
    title: "Full Shipment Visibility",
    description: "Track packages from pickup to delivery with real-time updates and proof of delivery.",
  },
  {
    icon: IconUsers,
    title: "Team Coordination",
    description: "Seamless communication between drivers, dispatchers, and management teams.",
  },
]

const allFeatures = [
  {
    icon: IconAlertCircle,
    title: "Alert Management",
    description: "Get instant notifications for delays, issues, and shipment events.",
  },
  {
    icon: IconClock,
    title: "Scheduled Pickups",
    description: "Plan and schedule pickups with automated confirmation and reminders.",
  },
  {
    icon: IconUsers,
    title: "Driver Management",
    description: "Track driver performance, assign routes, and manage availability.",
  },
  {
    icon: IconBarcode,
    title: "Barcode Scanning",
    description: "Mobile app with barcode scanning for quick and accurate shipment tracking.",
  },
  {
    icon: IconMap,
    title: "Analytics Dashboard",
    description: "Comprehensive reports on routes, costs, and performance metrics.",
  },
  {
    icon: IconTruck,
    title: "Fleet Management",
    description: "Monitor vehicle maintenance, fuel consumption, and compliance.",
  },
]

const testimonials = [
  {
    quote: "LogFlow has transformed how we manage our shipments. We've reduced delivery times by 25% and improved customer satisfaction dramatically.",
    name: "Sarah Chen",
    company: "FastFreight Inc",
  },
  {
    quote: "The real-time tracking and routing optimization have saved us thousands in fuel costs. Best investment for our fleet.",
    name: "Marcus Johnson",
    company: "Premier Logistics",
  },
  {
    quote: "Our team loves how intuitive LogFlow is. Setup took minutes, not weeks. Highly recommend to any logistics company.",
    name: "Elena Rodriguez",
    company: "Swift Delivery Services",
  },
]

const integrations = [
  { icon: "📊", name: "Analytics" },
  { icon: "💳", name: "Payment" },
  { icon: "📱", name: "Mobile" },
  { icon: "🗺️", name: "Maps" },
  { icon: "📧", name: "Email" },
  { icon: "☁️", name: "Cloud" },
]

const footerSections = [
  {
    title: "Product",
    links: ["Features", "Security", "Pricing", "Enterprise"],
  },
  {
    title: "Developers",
    links: ["API", "Webhooks", "Status", "Documentation"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Press"],
  },
  {
    title: "Resources",
    links: ["Help", "Community", "Contact", "Partners"],
  },
]
