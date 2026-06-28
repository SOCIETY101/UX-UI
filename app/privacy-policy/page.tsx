import type { Metadata } from "next"
import Link from "next/link"
import {
  IconArrowLeft,
  IconBell,
  IconCamera,
  IconDatabase,
  IconFileText,
  IconLock,
  IconMail,
  IconMapPin,
  IconRefresh,
  IconScale,
  IconShieldCheck,
  IconTrash,
  IconUserCheck,
  IconUsers,
} from "@tabler/icons-react"

export const metadata: Metadata = {
  title: {
    absolute: "Privacy Policy for HireFlow | AETHOS Tech",
  },
  description:
    "Privacy Policy for HireFlow by AETHOS Tech, including data collection, sharing, security, retention, deletion, and contact information.",
}

const policyHighlights = [
  {
    icon: IconShieldCheck,
    label: "Developer",
    value: "AETHOS Tech",
  },
  {
    icon: IconMail,
    label: "Privacy contact",
    value: "contact@aethostech.com",
  },
  {
    icon: IconFileText,
    label: "Effective date",
    value: "June 28, 2026",
  },
]

const collectedData = [
  "Account data: name, email address, phone number, password or authentication credentials, company account, role, permissions, and login information.",
  "Employee and HR data: job position, department, workplace, contract information, work schedule, attendance, leave requests, disciplinary records, salary or compensation-related information, administrative identifiers, and employment documents.",
  "Candidate and recruitment data: candidate name, contact details, CV/resume, recruitment status, interview notes, test results, and hiring workflow information.",
  "Uploaded files and media: documents, images, attachments, receipts, profile photos, and files uploaded by users.",
  "Location data: location may be collected when you use attendance, check-in/check-out, workplace, map, or geolocation features.",
  "Camera and photo/library data: used when you take or upload photos, documents, receipts, or profile images.",
  "Notification data: device push notification token and notification preferences.",
  "Usage and technical data: device type, operating system, app version, IP address, logs, crash data, and network information needed to operate and secure the app.",
  "User-generated content: posts, comments, reactions, tasks, notes, messages, and other content entered inside the app.",
]

const useCases = [
  "Create and manage user accounts.",
  "Provide HR, attendance, recruitment, document, expense, mission, planning, and workflow features.",
  "Authenticate users and manage permissions.",
  "Enable company administrators and authorized users to manage employee records.",
  "Send app notifications and service-related alerts.",
  "Upload, store, and display documents, images, and attachments.",
  "Provide location-based check-in/check-out and workplace features.",
  "Maintain app security, prevent misuse, debug issues, and improve app performance.",
  "Comply with legal, regulatory, accounting, or contractual obligations.",
]

const sharingCases = [
  "The company or organization that created or manages your HireFlow workspace.",
  "Authorized administrators, managers, HR users, or employees according to their permissions.",
  "Service providers that help us operate HireFlow, including hosting, storage, push notifications, maps/geocoding, authentication, analytics, and technical infrastructure providers.",
  "Legal or regulatory authorities if required by applicable law.",
]

const policySections = [
  {
    id: "about",
    eyebrow: "01",
    title: "About HireFlow",
    icon: IconUsers,
    body: [
      "HireFlow is a human resources and workforce management application used by companies, employees, managers, and authorized HR users to manage employee records, recruitment, attendance, leave requests, expenses, missions, tasks, documents, equipment, internal communication, and related HR workflows.",
    ],
  },
  {
    id: "data",
    eyebrow: "02",
    title: "Data We Collect",
    icon: IconDatabase,
    list: collectedData,
  },
  {
    id: "use",
    eyebrow: "03",
    title: "How We Use Data",
    icon: IconUserCheck,
    intro: "We use data to:",
    list: useCases,
  },
  {
    id: "sharing",
    eyebrow: "04",
    title: "Sharing of Data",
    icon: IconScale,
    body: ["We do not sell personal data."],
    intro: "We may share data only when necessary with:",
    list: sharingCases,
    footer:
      "Third-party services used by the app may include cloud hosting providers, Google Maps / Google services, OneSignal push notifications, Expo services, and authentication providers when enabled.",
  },
  {
    id: "security",
    eyebrow: "05",
    title: "Security",
    icon: IconLock,
    body: [
      "We use reasonable technical and organizational measures to protect personal data. Data is transmitted using secure connections where available, and access is limited according to user roles and permissions.",
    ],
  },
  {
    id: "retention",
    eyebrow: "06",
    title: "Data Retention and Deletion",
    icon: IconTrash,
    body: [
      "We keep personal data only for as long as needed to provide HireFlow, comply with legal obligations, resolve disputes, maintain security, and support our business or contractual requirements.",
      'Users may request deletion of their account or personal data by contacting us at contact@aethostech.com. Where available, users may also use the in-app "Delete account" option. Some data may be retained when required by law, contract, audit, backup, accounting, or legitimate business obligations.',
    ],
  },
  {
    id: "choices",
    eyebrow: "07",
    title: "User Choices and Permissions",
    icon: IconCamera,
    body: [
      "You can control certain permissions, such as location, camera, photos, and notifications, from your device settings. Some HireFlow features may not work correctly if required permissions are disabled.",
    ],
  },
  {
    id: "children",
    eyebrow: "08",
    title: "Children",
    icon: IconUsers,
    body: [
      "HireFlow is intended for business and workforce management use. It is not directed to children.",
    ],
  },
  {
    id: "international",
    eyebrow: "09",
    title: "International Data Processing",
    icon: IconMapPin,
    body: [
      "Your data may be processed in countries where we or our service providers operate. We take reasonable steps to protect data according to this Privacy Policy and applicable law.",
    ],
  },
  {
    id: "changes",
    eyebrow: "10",
    title: "Changes to This Policy",
    icon: IconRefresh,
    body: [
      "We may update this Privacy Policy from time to time. When we make changes, we will update the effective date on this page.",
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f2] text-[#1f2523]">
      <header className="border-b border-[#d9d5ca] bg-[#fbfaf6]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            href="/landing"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#4f5d58] transition-colors hover:text-[#1f2523]"
          >
            <IconArrowLeft className="size-4" />
            Back to site
          </Link>
          <span className="text-sm font-semibold text-[#1f2523]">
            AETHOS Tech
          </span>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:py-16">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#607169]">
            Privacy Policy
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[#1f2523] sm:text-5xl">
            Privacy Policy for HireFlow
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#5a6762] sm:text-lg">
            This Privacy Policy explains how AETHOS Tech (&quot;AETHOS&quot;,
            &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses,
            stores, and protects personal data when you use the HireFlow mobile
            application.
          </p>

          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {policyHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-[#d9d5ca] bg-[#fbfaf6] p-4"
              >
                <item.icon className="size-5 text-[#2f6f5e]" />
                <dt className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#607169]">
                  {item.label}
                </dt>
                <dd className="mt-1 break-words text-sm font-semibold text-[#1f2523]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="h-fit border-l border-[#d9d5ca] pl-5 lg:sticky lg:top-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#607169]">
            App details
          </p>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-[#6c7773]">App name</dt>
              <dd className="font-semibold text-[#1f2523]">HireFlow</dd>
            </div>
            <div>
              <dt className="text-[#6c7773]">Android package name</dt>
              <dd className="break-words font-semibold text-[#1f2523]">
                com.hireflow.android
              </dd>
            </div>
            <div>
              <dt className="text-[#6c7773]">Website</dt>
              <dd>
                <a
                  href="https://aethostech.com"
                  className="font-semibold text-[#2f6f5e] underline-offset-4 hover:underline"
                >
                  aethostech.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[#6c7773]">Phone</dt>
              <dd className="font-semibold text-[#1f2523]">+212 771-716566</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:pb-24">
        <div className="grid gap-4">
          {policySections.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="rounded-lg border border-[#d9d5ca] bg-[#fbfaf6] p-5 shadow-[0_12px_30px_rgba(31,37,35,0.04)] sm:p-7"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#e5ede6] text-[#2f6f5e]">
                  <section.icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-xs font-semibold text-[#607169]">
                      {section.eyebrow}
                    </span>
                    <h2 className="text-xl font-semibold tracking-normal text-[#1f2523]">
                      {section.title}
                    </h2>
                  </div>

                  {section.body?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-4 text-sm leading-7 text-[#4f5d58]"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.intro ? (
                    <p className="mt-4 text-sm font-semibold text-[#1f2523]">
                      {section.intro}
                    </p>
                  ) : null}

                  {section.list ? (
                    <ul className="mt-4 grid gap-3">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm leading-6 text-[#4f5d58]"
                        >
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2f6f5e]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.footer ? (
                    <p className="mt-4 text-sm leading-7 text-[#4f5d58]">
                      {section.footer}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}

          <article className="rounded-lg border border-[#c9d8d1] bg-[#e8f0ea] p-5 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#d4e3dc] text-[#2f6f5e]">
                <IconBell className="size-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#607169]">
                  11
                </span>
                <h2 className="mt-1 text-xl font-semibold tracking-normal text-[#1f2523]">
                  Contact Us
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#4f5d58]">
                  If you have questions or requests about this Privacy Policy or
                  your personal data, contact:
                </p>
                <address className="mt-4 not-italic text-sm leading-7 text-[#1f2523]">
                  <strong>AETHOS Tech</strong>
                  <br />
                  Email:{" "}
                  <a
                    href="mailto:contact@aethostech.com"
                    className="font-semibold text-[#2f6f5e] underline-offset-4 hover:underline"
                  >
                    contact@aethostech.com
                  </a>
                  <br />
                  Phone: +212 771-716566
                  <br />
                  Website:{" "}
                  <a
                    href="https://aethostech.com"
                    className="font-semibold text-[#2f6f5e] underline-offset-4 hover:underline"
                  >
                    https://aethostech.com
                  </a>
                </address>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
