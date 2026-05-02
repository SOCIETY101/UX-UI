import { IconArrowRight, IconCheck, IconMap, IconTruck, IconClock, IconUsers, IconBarcode, IconAlertCircle } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import "./styles.css"

export const metadata = {
  title: "LogFlow - Transport Management System",
  description: "Streamline your logistics operations with a powerful, intuitive transport management platform.",
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-silver bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-graphite">LogFlow</div>
          <Link href="/shipments">
            <Button variant="default" size="sm">
              Launch App
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <h1 className="text-5xl font-semibold leading-tight text-graphite sm:text-6xl">
              The better way to manage shipments
            </h1>

            <p className="text-xl leading-relaxed text-slate">
              Real-time visibility, intelligent routing, and seamless coordination. LogFlow gives you the precision and control needed to optimize every mile.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/shipments">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full bg-ink text-white hover:bg-ink/90"
                >
                  Get Started
                  <IconArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
              <a href="#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto rounded-full border-silver text-graphite hover:bg-paper"
                >
                  Explore Features
                </Button>
              </a>
            </div>

            {/* Trust Badge */}
            <div className="space-y-3 pt-4">
              <p className="text-sm text-slate">Trusted by leading logistics companies</p>
              <div className="flex gap-3">
                <div className="flex items-center gap-2">
                  <IconCheck className="size-5 text-graphite" />
                  <span className="text-sm text-graphite">500+ companies</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck className="size-5 text-graphite" />
                  <span className="text-sm text-graphite">99.9% uptime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual Card */}
          <div className="relative">
            <div className="rounded-3xl bg-white p-8 shadow-[rgba(36,36,36,0.05)_0px_4px_8px_0px] ring-1 ring-silver/30">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-paper to-silver flex items-center justify-center">
                <div className="text-center space-y-4">
                  <IconTruck className="mx-auto size-16 text-graphite" />
                  <p className="text-graphite font-medium">Real-time tracking dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-silver bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          {/* Section Header */}
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-4xl font-semibold text-graphite sm:text-5xl">
              Powerful features for modern logistics
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate">
              Everything you need to optimize routes, track shipments, and manage your fleet in one platform.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group rounded-3xl bg-paper p-8 transition-all hover:shadow-[rgba(36,36,36,0.1)_0px_8px_16px_0px] hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-white p-3 ring-1 ring-silver/50">
                  <feature.icon className="size-6 text-graphite" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-graphite">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-t border-silver py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-16 text-center text-4xl font-semibold text-graphite sm:text-5xl">
            How LogFlow works
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink text-white font-semibold">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-graphite">
                    {step.title}
                  </h3>
                </div>
                <p className="text-slate leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-silver bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2 text-center">
                <p className="text-5xl font-semibold text-ink">
                  {stat.value}
                </p>
                <p className="text-lg text-slate">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-silver py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-semibold text-graphite sm:text-5xl">
              Ready to optimize your operations?
            </h2>
            <p className="text-lg text-slate">
              Join hundreds of logistics companies that trust LogFlow to manage their shipments.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:items-center">
            <Link href="/shipments">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full bg-ink text-white hover:bg-ink/90"
              >
                Start Free Trial
                <IconArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
            <p className="text-sm text-slate">No credit card required. 14-day free trial.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-silver bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-slate">
              © 2026 LogFlow. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-slate">
              <a href="#" className="hover:text-graphite transition-colors">Privacy</a>
              <a href="#" className="hover:text-graphite transition-colors">Terms</a>
              <a href="#" className="hover:text-graphite transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
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
    title: "On-Time Delivery",
    description: "Predict delays and optimize schedules to ensure consistent on-time performance.",
  },
  {
    icon: IconUsers,
    title: "Team Coordination",
    description: "Seamless communication between drivers, dispatchers, and management teams.",
  },
  {
    icon: IconBarcode,
    title: "Shipment Visibility",
    description: "Track packages from pickup to delivery with detailed proof of delivery.",
  },
  {
    icon: IconAlertCircle,
    title: "Alert Management",
    description: "Get instant notifications for delays, issues, and important shipment events.",
  },
]

const steps = [
  {
    title: "Create Shipments",
    description: "Input shipment details and routes. Our system automatically optimizes the best path for delivery.",
  },
  {
    title: "Assign & Track",
    description: "Assign shipments to drivers and track progress in real-time with live GPS updates.",
  },
  {
    title: "Deliver & Confirm",
    description: "Complete deliveries with digital proof, automatic invoicing, and performance analytics.",
  },
]

const stats = [
  {
    value: "40%",
    label: "Average fuel savings",
  },
  {
    value: "3.5h",
    label: "Time saved per route",
  },
  {
    value: "98%",
    label: "On-time delivery rate",
  },
]
