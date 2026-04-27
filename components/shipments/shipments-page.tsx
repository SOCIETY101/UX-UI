"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import {
  IconAlertTriangle,
  IconArrowBarUp,
  IconArchive,
  IconBell,
  IconBox,
  IconBuildingWarehouse,
  IconCalendarClock,
  IconChartBar,
  IconCheck,
  IconChevronDown,
  IconCircleCheck,
  IconClock,
  IconCloudDownload,
  IconDots,
  IconEdit,
  IconFileAnalytics,
  IconFilter,
  IconGridDots,
  IconListDetails,
  IconLayoutBoard,
  IconMap,
  IconMapPin,
  IconMoon,
  IconPackage,
  IconStatusChange,
  IconPlus,
  IconRefresh,
  IconRoute,
  IconSearch,
  IconShieldCheck,
  IconTruck,
  IconTrash,
  IconUsers,
  IconUserPlus,
  IconUserShield,
  IconX,
} from "@tabler/icons-react"

import {
  DataGrid,
  DataGridColumnOptionsMenu,
  type DataGridColumn,
  type DataGridDrawerPanelProps,
  type DataGridToolbarRenderProps,
} from "@/components/data-grid"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ActionList } from "@/components/ui/action-list"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { useIsMobile } from "@/hooks/use-mobile"
import { shipments as initialShipments, shipmentStatusLabels } from "@/lib/shipments/mock-data"
import type {
  Shipment,
  ShipmentDirection,
  ShipmentOperationType,
  ShipmentPriority,
  ShipmentSortPreset,
  ShipmentStatus,
  ShipmentType,
} from "@/lib/shipments/types"
import { cn } from "@/lib/utils"

type ShipmentColumnId =
  | "trackingDate"
  | "voyageNumber"
  | "client"
  | "direction"
  | "operationType"
  | "tractor"
  | "trailer"
  | "loadingDate"
  | "loadingCity"
  | "loadingCountry"
  | "plannedUnloadingDate"
  | "unloadingCity"
  | "unloadingCountry"
  | "distance"
  | "interventions"
  | "shipmentId"
  | "orderNumber"
  | "referenceNumber"
  | "route"
  | "status"
  | "type"
  | "serviceLevel"
  | "equipment"
  | "commodity"
  | "carrier"
  | "broker"
  | "driver"
  | "pickup"
  | "eta"
  | "appointmentWindow"
  | "miles"
  | "weight"
  | "pallets"
  | "rate"
  | "documents"
  | "tracking"
  | "detentionRisk"
  | "lastCheckCall"
  | "progress"
  | "actions"

type ShipmentStatusFilter = "all" | ShipmentStatus
type ShipmentDirectionFilter = "all" | ShipmentDirection

const statusFilters: ShipmentStatusFilter[] = [
  "all",
  "pending",
  "in-transit",
  "delivered",
  "exception",
  "cancelled",
]

const directionFilters: ShipmentDirectionFilter[] = ["all", "export", "import"]

const shipmentTypeOptions: ShipmentType[] = ["FTL", "LTL", "Intermodal", "Drayage"]
const operationTypeOptions: ShipmentOperationType[] = ["Propre", "Traction"]
const carrierOptions = [
  "Aethos Logistics",
  "Swift Transport",
  "XPO Logistics",
  "R+L Carriers",
  "Averitt Express",
] as const
const driverOptions = [
  "Michael Brown",
  "David Wilson",
  "James Anderson",
  "Robert Taylor",
  "Laura Bennett",
] as const

const sortLabels: Record<ShipmentSortPreset, string> = {
  eta: "ETA earliest",
  progress: "Progress low-high",
  status: "Status",
  route: "Route",
  priority: "Priority",
}

const priorityWeight: Record<ShipmentPriority, number> = {
  critical: 3,
  expedited: 2,
  standard: 1,
}

const numberFormatter = new Intl.NumberFormat("en-US")

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const PAGE_SIZE = 100
const MOBILE_PAGE_SIZE = 20

const shipmentColumns: DataGridColumn<ShipmentColumnId>[] = [
  {
    id: "trackingDate",
    label: "Date Tracking",
    icon: IconMapPin,
    defaultWidth: 150,
    minWidth: 136,
  },
  {
    id: "voyageNumber",
    label: "Voyage No.",
    icon: IconRoute,
    defaultWidth: 126,
    minWidth: 112,
  },
  {
    id: "client",
    label: "Client",
    icon: IconUsers,
    defaultWidth: 185,
    minWidth: 160,
  },
  {
    id: "direction",
    label: "Direction",
    icon: IconRoute,
    defaultWidth: 118,
    minWidth: 108,
  },
  {
    id: "operationType",
    label: "Type",
    icon: IconTruck,
    defaultWidth: 110,
    minWidth: 96,
  },
  {
    id: "tractor",
    label: "Tracteur",
    icon: IconTruck,
    defaultWidth: 142,
    minWidth: 124,
  },
  {
    id: "trailer",
    label: "Semi-remorque",
    icon: IconBox,
    defaultWidth: 150,
    minWidth: 132,
  },
  {
    id: "loadingDate",
    label: "Date Chargement",
    icon: IconCalendarClock,
    defaultWidth: 152,
    minWidth: 134,
  },
  {
    id: "loadingCity",
    label: "Ville Chargement",
    icon: IconBuildingWarehouse,
    defaultWidth: 168,
    minWidth: 146,
  },
  {
    id: "loadingCountry",
    label: "Pays Chargement",
    icon: IconMap,
    defaultWidth: 152,
    minWidth: 134,
  },
  {
    id: "plannedUnloadingDate",
    label: "Dechargement prevu",
    icon: IconCalendarClock,
    defaultWidth: 172,
    minWidth: 154,
  },
  {
    id: "unloadingCity",
    label: "Ville Dechargement",
    icon: IconBuildingWarehouse,
    defaultWidth: 178,
    minWidth: 154,
  },
  {
    id: "unloadingCountry",
    label: "Pays Dechargement",
    icon: IconMap,
    defaultWidth: 164,
    minWidth: 144,
  },
  {
    id: "distance",
    label: "Distance",
    icon: IconRoute,
    defaultWidth: 118,
    minWidth: 104,
  },
  {
    id: "interventions",
    label: "Interventions",
    icon: IconShieldCheck,
    defaultWidth: 126,
    minWidth: 112,
  },
  {
    id: "shipmentId",
    label: "Shipment ID",
    icon: IconPackage,
    defaultWidth: 118,
    minWidth: 108,
  },
  {
    id: "orderNumber",
    label: "Order #",
    icon: IconBox,
    defaultWidth: 118,
    minWidth: 108,
  },
  {
    id: "referenceNumber",
    label: "Reference #",
    icon: IconFileAnalytics,
    defaultWidth: 136,
    minWidth: 120,
  },
  {
    id: "route",
    label: "Route",
    icon: IconRoute,
    defaultWidth: 285,
    minWidth: 240,
  },
  {
    id: "status",
    label: "Status",
    icon: IconCircleCheck,
    defaultWidth: 128,
    minWidth: 118,
  },
  {
    id: "type",
    label: "Type",
    icon: IconTruck,
    defaultWidth: 92,
    minWidth: 86,
  },
  {
    id: "serviceLevel",
    label: "Service",
    icon: IconShieldCheck,
    defaultWidth: 128,
    minWidth: 112,
  },
  {
    id: "equipment",
    label: "Equipment",
    icon: IconTruck,
    defaultWidth: 150,
    minWidth: 130,
  },
  {
    id: "commodity",
    label: "Commodity",
    icon: IconPackage,
    defaultWidth: 190,
    minWidth: 160,
  },
  {
    id: "carrier",
    label: "Carrier",
    icon: IconBuildingWarehouse,
    defaultWidth: 174,
    minWidth: 150,
  },
  {
    id: "broker",
    label: "Broker",
    icon: IconBuildingWarehouse,
    defaultWidth: 160,
    minWidth: 138,
  },
  {
    id: "driver",
    label: "Driver",
    icon: IconUserShield,
    defaultWidth: 180,
    minWidth: 154,
  },
  {
    id: "pickup",
    label: "Pickup Date",
    icon: IconCalendarClock,
    defaultWidth: 146,
    minWidth: 132,
  },
  {
    id: "eta",
    label: "ETA",
    icon: IconClock,
    defaultWidth: 146,
    minWidth: 132,
  },
  {
    id: "appointmentWindow",
    label: "Appt Window",
    icon: IconCalendarClock,
    defaultWidth: 132,
    minWidth: 118,
  },
  {
    id: "miles",
    label: "Miles",
    icon: IconRoute,
    defaultWidth: 104,
    minWidth: 94,
  },
  {
    id: "weight",
    label: "Weight",
    icon: IconBox,
    defaultWidth: 124,
    minWidth: 108,
  },
  {
    id: "pallets",
    label: "Pallets",
    icon: IconPackage,
    defaultWidth: 104,
    minWidth: 94,
  },
  {
    id: "rate",
    label: "Rate",
    icon: IconChartBar,
    defaultWidth: 118,
    minWidth: 104,
  },
  {
    id: "documents",
    label: "Docs",
    icon: IconFileAnalytics,
    defaultWidth: 124,
    minWidth: 110,
  },
  {
    id: "tracking",
    label: "Tracking",
    icon: IconMapPin,
    defaultWidth: 132,
    minWidth: 116,
  },
  {
    id: "detentionRisk",
    label: "Detention Risk",
    icon: IconAlertTriangle,
    defaultWidth: 142,
    minWidth: 126,
  },
  {
    id: "lastCheckCall",
    label: "Last Check Call",
    icon: IconClock,
    defaultWidth: 142,
    minWidth: 126,
  },
  {
    id: "progress",
    label: "Progress",
    icon: IconChartBar,
    defaultWidth: 180,
    minWidth: 154,
  },
  {
    id: "actions",
    label: "",
    icon: IconDots,
    defaultWidth: 64,
    minWidth: 54,
  },
]

const mobileShipmentColumnIds: ShipmentColumnId[] = [
  "client",
  "actions",
  "voyageNumber",
  "status",
  "route",
  "tractor",
  "trailer",
  "plannedUnloadingDate",
  "progress",
]

function areShipmentToolbarPropsEqual(
  current: DataGridToolbarRenderProps<ShipmentColumnId> | null,
  next: DataGridToolbarRenderProps<ShipmentColumnId>
) {
  if (!current) return false

  return (
    current.visibleRowCount === next.visibleRowCount &&
    current.selectedRowCount === next.selectedRowCount &&
    current.allVisibleRowsSelected === next.allVisibleRowsSelected &&
    current.someVisibleRowsSelected === next.someVisibleRowsSelected &&
    current.showSummaries === next.showSummaries &&
    current.visibleColumnIds.join("|") === next.visibleColumnIds.join("|") &&
    current.selectedRowIds.join("|") === next.selectedRowIds.join("|") &&
    current.hiddenColumns.map((column) => column.id).join("|") ===
      next.hiddenColumns.map((column) => column.id).join("|")
  )
}

function Sparkline({ tone }: { tone: "blue" | "teal" | "orange" | "slate" }) {
  const color = {
    blue: "stroke-blue-500",
    teal: "stroke-teal-500",
    orange: "stroke-orange-500",
    slate: "stroke-slate-500",
  }[tone]

  return (
    <svg viewBox="0 0 92 36" className="h-10 w-24" aria-hidden="true">
      <path
        d="M2 28 L14 18 L25 21 L37 8 L49 25 L62 11 L73 17 L90 5"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={color}
      />
    </svg>
  )
}

function statusBadge(status: ShipmentStatus) {
  const tone =
    status === "delivered"
      ? "border-teal-500/20 bg-teal-500/10 text-teal-700 dark:text-teal-300"
      : status === "in-transit"
        ? "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300"
        : status === "exception"
          ? "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-300"
          : status === "cancelled"
            ? "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300"
            : "border-slate-500/20 bg-slate-500/10 text-slate-700 dark:text-slate-300"

  return (
    <Badge variant="outline" className={cn("rounded-lg px-2.5", tone)}>
      {shipmentStatusLabels[status]}
    </Badge>
  )
}

function simpleToneBadge(
  label: string,
  tone: "green" | "amber" | "red" | "blue" | "slate"
) {
  const className = {
    green: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    amber: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    red: "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    blue: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    slate: "border-slate-500/20 bg-slate-500/10 text-slate-700 dark:text-slate-300",
  }[tone]

  return (
    <Badge variant="outline" className={cn("rounded-lg px-2.5", className)}>
      {label}
    </Badge>
  )
}

function progressColor(shipment: Shipment) {
  if (shipment.status === "exception") return "bg-orange-500"
  if (shipment.status === "delivered") return "bg-teal-500"
  if (shipment.status === "cancelled") return "bg-rose-500"
  return "bg-blue-600"
}

function FilterMenu<TValue extends string>({
  label,
  value,
  options,
  getOptionLabel,
  onChange,
}: {
  label: string
  value: TValue
  options: TValue[]
  getOptionLabel: (option: TValue) => string
  onChange: (option: TValue) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm" className="h-9 rounded-xl" />
        }
      >
        {label}
        <IconChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-48">
        <DropdownMenuRadioGroup value={value} onValueChange={(next) => onChange(next as TValue)}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option} value={option}>
              {getOptionLabel(option)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function TmsSidebar({
  activeStatus,
  onStatusChange,
}: {
  activeStatus: ShipmentStatusFilter
  onStatusChange: (status: ShipmentStatusFilter) => void
}) {
  const views = [
    { key: "all", label: "All Shipments", icon: IconTruck, count: 64 },
    { key: "in-transit", label: "In Transit", icon: IconRoute, count: 22 },
    { key: "delivered", label: "Delivered", icon: IconCircleCheck, count: 11 },
    { key: "exception", label: "Exception", icon: IconAlertTriangle, count: 11 },
    { key: "pending", label: "Pending", icon: IconClock, count: 10 },
    { key: "cancelled", label: "Cancelled", icon: IconX, count: 10 },
  ] as const
  const operations = [
    { label: "Orders", icon: IconBox },
    { label: "Fleet", icon: IconTruck },
    { label: "Drivers", icon: IconUserShield },
    { label: "Customers", icon: IconUsers },
    { label: "Routes", icon: IconMap },
    { label: "Locations", icon: IconMapPin },
  ]
  const analytics = [
    { label: "Reports", icon: IconFileAnalytics },
    { label: "Performance", icon: IconChartBar },
    { label: "Compliance", icon: IconShieldCheck },
  ]

  return (
    <aside className="hidden h-svh w-60 shrink-0 flex-col border-r bg-white dark:bg-zinc-950 lg:flex">
      <div className="flex h-20 items-center gap-3 px-5">
        <div className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 via-teal-400 to-blue-600 text-white shadow-sm">
          <IconRoute className="size-6" />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight">AETHOS TMS</div>
          <div className="text-xs text-muted-foreground">Transportation System</div>
        </div>
        <Button variant="ghost" size="icon-sm" className="ml-auto rounded-xl">
          <IconGridDots className="size-4" />
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        <p className="px-3 pb-2 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          Views
        </p>
        <nav className="space-y-1">
          {views.map((item) => {
            const Icon = item.icon
            const active = activeStatus === item.key
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onStatusChange(item.key)}
                className={cn(
                  "flex h-9 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
                    : "text-slate-600 hover:bg-muted dark:text-zinc-300"
                )}
              >
                <Icon className="size-4" />
                <span className="min-w-0 flex-1 text-left">{item.label}</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {item.count}
                </span>
              </button>
            )
          })}
        </nav>

        <p className="px-3 pt-7 pb-2 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          Operations
        </p>
        <nav className="space-y-1">
          {operations.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                type="button"
                className="flex h-9 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-muted dark:text-zinc-300"
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <p className="px-3 pt-7 pb-2 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          Analytics
        </p>
        <nav className="space-y-1">
          {analytics.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                type="button"
                className="flex h-9 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-muted dark:text-zinc-300"
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            JC
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">John Carter</div>
            <div className="truncate text-xs text-muted-foreground">
              Operations Manager
            </div>
          </div>
          <IconChevronDown className="size-4 text-muted-foreground" />
        </div>
      </div>
    </aside>
  )
}

function ShipmentCell({ shipment, columnId }: { shipment: Shipment; columnId: ShipmentColumnId }) {
  if (columnId === "trackingDate") {
    return (
      <span className="inline-flex items-center gap-2 font-medium">
        <IconMapPin className="size-4 text-slate-500" />
        {shipment.trackingDate}
      </span>
    )
  }
  if (columnId === "voyageNumber") {
    return (
      <span className={cn(
        "font-semibold",
        shipment.direction === "import" && "text-rose-600 dark:text-rose-300"
      )}>
        {shipment.voyageNumber}
      </span>
    )
  }
  if (columnId === "client") {
    return <span className="font-medium">{shipment.customer}</span>
  }
  if (columnId === "direction") {
    return simpleToneBadge(
      shipment.direction === "export" ? "Export" : "Import",
      shipment.direction === "export" ? "red" : "blue"
    )
  }
  if (columnId === "operationType") {
    return simpleToneBadge(
      shipment.operationType,
      shipment.operationType === "Propre" ? "green" : "blue"
    )
  }
  if (columnId === "tractor") {
    return shipment.tractor ? (
      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
        {shipment.tractor}
      </span>
    ) : (
      <span className="text-muted-foreground">-</span>
    )
  }
  if (columnId === "trailer") {
    return (
      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
        {shipment.trailer}
      </span>
    )
  }
  if (columnId === "loadingDate") {
    return <span className="font-medium">{shipment.pickupDate}</span>
  }
  if (columnId === "loadingCity") {
    return <span className="font-medium">{shipment.loadingCity}</span>
  }
  if (columnId === "loadingCountry") {
    return <span className="font-medium">{shipment.loadingCountry}</span>
  }
  if (columnId === "plannedUnloadingDate") {
    return <span className="font-medium">{shipment.plannedUnloadingDate}</span>
  }
  if (columnId === "unloadingCity") {
    return <span className="font-medium">{shipment.unloadingCity}</span>
  }
  if (columnId === "unloadingCountry") {
    return <span className="font-medium">{shipment.unloadingCountry}</span>
  }
  if (columnId === "distance") {
    return <span className="font-medium">{numberFormatter.format(shipment.miles)} KM</span>
  }
  if (columnId === "interventions") {
    return <span className="font-medium">{shipment.interventions ?? "-"}</span>
  }
  if (columnId === "shipmentId") {
    return <span className="font-semibold text-slate-800 dark:text-zinc-100">{shipment.shipmentId}</span>
  }
  if (columnId === "orderNumber") {
    return <span className="text-slate-700 dark:text-zinc-200">{shipment.orderNumber}</span>
  }
  if (columnId === "referenceNumber") {
    return <span className="font-medium text-slate-600 dark:text-zinc-300">{shipment.referenceNumber}</span>
  }
  if (columnId === "route") {
    return (
      <span className="inline-flex min-w-0 items-center gap-2">
        <span className="truncate font-medium">{shipment.origin}</span>
        <span className="text-muted-foreground">to</span>
        <span className="truncate font-medium">{shipment.destination}</span>
      </span>
    )
  }
  if (columnId === "status") return statusBadge(shipment.status)
  if (columnId === "type") {
    return (
      <span className="inline-flex items-center gap-1.5 font-medium text-blue-700 dark:text-blue-300">
        <IconTruck className="size-4" />
        {shipment.type}
      </span>
    )
  }
  if (columnId === "serviceLevel") {
    return simpleToneBadge(
      shipment.serviceLevel,
      shipment.priority === "critical"
        ? "red"
        : shipment.priority === "expedited"
          ? "amber"
          : "slate"
    )
  }
  if (columnId === "equipment") return <span className="font-medium">{shipment.equipment}</span>
  if (columnId === "commodity") return <span className="font-medium">{shipment.commodity}</span>
  if (columnId === "carrier") return <span className="font-medium">{shipment.carrier}</span>
  if (columnId === "broker") return <span className="font-medium">{shipment.broker}</span>
  if (columnId === "driver") {
    return (
      <span className="inline-flex min-w-0 items-center gap-2">
        <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-slate-700 to-slate-950 text-[10px] font-semibold text-white">
          {shipment.driver.initials}
        </span>
        <span className="truncate font-medium">{shipment.driver.name}</span>
      </span>
    )
  }
  if (columnId === "appointmentWindow") {
    return <span className="font-medium">{shipment.appointmentWindow}</span>
  }
  if (columnId === "miles") {
    return <span className="font-medium">{numberFormatter.format(shipment.miles)}</span>
  }
  if (columnId === "weight") {
    return <span className="font-medium">{numberFormatter.format(shipment.totalWeight)} lb</span>
  }
  if (columnId === "pallets") {
    return <span className="font-medium">{shipment.pallets}</span>
  }
  if (columnId === "rate") {
    return <span className="font-semibold">{currencyFormatter.format(shipment.rate)}</span>
  }
  if (columnId === "documents") {
    return simpleToneBadge(
      shipment.documentsStatus,
      shipment.documentsStatus === "complete"
        ? "green"
        : shipment.documentsStatus === "pending"
          ? "amber"
          : "red"
    )
  }
  if (columnId === "tracking") {
    return <span className="font-medium">{shipment.trackingDevice}</span>
  }
  if (columnId === "detentionRisk") {
    return simpleToneBadge(
      shipment.detentionRisk,
      shipment.detentionRisk === "low"
        ? "green"
        : shipment.detentionRisk === "medium"
          ? "amber"
          : "red"
    )
  }
  if (columnId === "lastCheckCall") {
    return <span className="font-medium">{shipment.lastCheckCall}</span>
  }
  if (columnId === "pickup") {
    return (
      <span className="block leading-tight">
        <span className="block font-medium">{shipment.pickupDate}</span>
        <span className="text-xs text-muted-foreground">{shipment.pickupTime}</span>
      </span>
    )
  }
  if (columnId === "eta") {
    return (
      <span className="block leading-tight">
        <span className="block font-medium">{shipment.etaDate}</span>
        <span className="text-xs text-muted-foreground">{shipment.etaTime}</span>
      </span>
    )
  }
  if (columnId === "progress") {
    return (
      <span className="flex items-center gap-3">
        <span className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800">
          <span
            className={cn("block h-full rounded-full", progressColor(shipment))}
            style={{ width: `${shipment.progress}%` }}
          />
        </span>
        <span className="w-9 text-xs font-semibold">{shipment.progress}%</span>
      </span>
    )
  }
  return <ShipmentActionList shipment={shipment} />
}

function ShipmentActionList({ shipment }: { shipment: Shipment }) {
  return (
    <ActionList
      label={`Open actions for ${shipment.shipmentId}`}
      contentClassName="min-w-58"
      items={[
        {
          label: "View shipment",
          icon: IconListDetails,
        },
        {
          label: "Edit shipment",
          icon: IconEdit,
        },
        {
          label: "Assign carrier",
          icon: IconUserPlus,
        },
        {
          label: "Change status",
          icon: IconStatusChange,
        },
        {
          label: "Archive shipment",
          icon: IconArchive,
        },
        {
          label: "Delete shipment",
          icon: IconTrash,
          destructive: true,
        },
      ]}
    />
  )
}

type AddShipmentFormState = {
  showAdditionalInfo: boolean
  important: boolean
  importantComment: string
  shipmentType: ShipmentType
  operationType: ShipmentOperationType
  direction: ShipmentDirection
  orderNumber: string
  customer: string
  clientComment: string
  numberOfDrivers: string
  origin: string
  destination: string
  loadingSecondCity: string
  unloadingSecondCity: string
  pickupDate: string
  pickupTime: string
  deliveryDate: string
  deliveryTime: string
  carrier: string
  supplier: string
  supplierComment: string
  driver: string
  driverRapide: string
  driverNat: string
  tractor: string
  trailer: string
  srType: string
  commodity: string
  weight: string
  pallets: string
  rate: string
  caMad: string
  caEuro: string
  cost: string
  seaCrossing: string
  portFees: string
  gasoilSurcharge: string
  invoicingReference: string
  status: ShipmentStatus
  subStatus: string
  tractorBilled: boolean
  maritimeCompany: string
  boardingDate: string
  dateDepartAlgeciras: string
  notes: string
  comment: string
}

const defaultAddShipmentForm: AddShipmentFormState = {
  showAdditionalInfo: true,
  important: false,
  importantComment: "",
  shipmentType: "FTL",
  operationType: "Propre",
  direction: "export",
  orderNumber: "ORD-04621",
  customer: "Aethos Retail Inc.",
  clientComment: "",
  numberOfDrivers: "1",
  origin: "Tanger, Maroc",
  destination: "Barcelona, Espagne",
  loadingSecondCity: "",
  unloadingSecondCity: "",
  pickupDate: "2026-04-25",
  pickupTime: "09:00",
  deliveryDate: "2026-04-27",
  deliveryTime: "14:00",
  carrier: "Aethos Logistics",
  supplier: "Aethos Logistics",
  supplierComment: "",
  driver: "Michael Brown",
  driverRapide: "",
  driverNat: "",
  tractor: "TRK-102",
  trailer: "TRL-5567",
  srType: "Frigo",
  commodity: "Electronics",
  weight: "18500",
  pallets: "24",
  rate: "28750",
  caMad: "12400",
  caEuro: "1150",
  cost: "8200",
  seaCrossing: "3400",
  portFees: "450",
  gasoilSurcharge: "3.5%",
  invoicingReference: "FAC-04621",
  status: "pending",
  subStatus: "Programmé",
  tractorBilled: false,
  maritimeCompany: "Balearia",
  boardingDate: "2026-04-26T09:30",
  dateDepartAlgeciras: "2026-04-26T18:00",
  notes: "Handle with care. Keep dry.",
  comment: "",
}

function FieldBlock({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">
        {label}
        {required ? <span className="text-rose-500">*</span> : null}
      </Label>
      {children}
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
      {children}
    </p>
  )
}

function ToggleLine({
  label,
  checked,
  onCheckedChange,
  disabled,
}: {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-slate-50 px-3 py-2 dark:bg-zinc-950">
      <span className="text-sm font-medium">{label}</span>
      <Switch
        size="sm"
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  )
}

function FormSelect({
  value,
  options,
  onChange,
}: {
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}) {
  return (
    <Select
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue !== null) {
          onChange(nextValue)
        }
      }}
    >
      <SelectTrigger className="h-9 w-full rounded-xl border-border bg-slate-50 dark:bg-zinc-950">
        <SelectValue>{value}</SelectValue>
      </SelectTrigger>
      <SelectContent align="start">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function splitLocation(location: string) {
  const [city = location, country = "Maroc"] = location
    .split(",")
    .map((part) => part.trim())

  return { city, country }
}

function normalizeDateInput(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value

  const match = value.match(/^May\s+(\d{1,2}),\s+(\d{4})$/)
  if (!match) return "2026-04-25"

  return `${match[2]}-05-${match[1].padStart(2, "0")}`
}

function normalizeTimeInput(value: string) {
  const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return value.length === 5 ? value : "09:00"

  let hour = Number(match[1])
  const minute = match[2]
  const period = match[3].toUpperCase()

  if (period === "PM" && hour < 12) hour += 12
  if (period === "AM" && hour === 12) hour = 0

  return `${String(hour).padStart(2, "0")}:${minute}`
}

function shipmentToForm(shipment: Shipment): AddShipmentFormState {
  return {
    showAdditionalInfo: true,
    important: shipment.detentionRisk === "high",
    importantComment:
      shipment.detentionRisk === "high"
        ? "Voyage sensible. Suivre les horaires de chargement et confirmer l'embarquement."
        : "",
    shipmentType: shipment.type,
    operationType: shipment.operationType,
    direction: shipment.direction,
    orderNumber: shipment.orderNumber,
    customer: shipment.customer,
    clientComment: "",
    numberOfDrivers: shipment.driver.name ? "1" : "0",
    origin: shipment.origin,
    destination: shipment.destination,
    loadingSecondCity: "",
    unloadingSecondCity: "",
    pickupDate: normalizeDateInput(shipment.pickupDate),
    pickupTime: normalizeTimeInput(shipment.pickupTime),
    deliveryDate: normalizeDateInput(shipment.etaDate),
    deliveryTime: normalizeTimeInput(shipment.etaTime),
    carrier: shipment.carrier,
    supplier: shipment.carrier,
    supplierComment: "",
    driver: shipment.driver.name,
    driverRapide: "",
    driverNat: "",
    tractor: shipment.tractor,
    trailer: shipment.trailer,
    srType: shipment.equipment.includes("reefer") ? "Frigo" : "Tautliner",
    commodity: shipment.commodity,
    weight: String(shipment.totalWeight),
    pallets: String(shipment.pallets),
    rate: String(shipment.rate),
    caMad: String(Math.round(shipment.rate * 10.1)),
    caEuro: String(Math.round(shipment.rate / 10.6)),
    cost: String(Math.round(shipment.rate * 0.68)),
    seaCrossing: "3400",
    portFees: "450",
    gasoilSurcharge: "3.5%",
    invoicingReference: shipment.referenceNumber,
    status: shipment.status,
    subStatus:
      shipment.status === "delivered"
        ? "Déchargé"
        : shipment.status === "in-transit"
          ? "En route"
          : "Programmé",
    tractorBilled: false,
    maritimeCompany: "Balearia",
    boardingDate: `${normalizeDateInput(shipment.pickupDate)}T09:30`,
    dateDepartAlgeciras: `${normalizeDateInput(shipment.pickupDate)}T18:00`,
    notes: shipment.lastCheckCall,
    comment: "",
  }
}

function applyShipmentForm(shipment: Shipment, form: AddShipmentFormState) {
  const loading = splitLocation(form.origin)
  const unloading = splitLocation(form.destination)
  const weight = Number.parseInt(form.weight.replace(/\D/g, ""), 10) || 0
  const pallets = Number.parseInt(form.pallets.replace(/\D/g, ""), 10) || 0
  const rate = Number.parseInt(form.rate.replace(/\D/g, ""), 10) || 0

  return {
    ...shipment,
    orderNumber: form.orderNumber,
    customer: form.customer,
    direction: form.direction,
    origin: form.origin,
    destination: form.destination,
    loadingCity: loading.city,
    loadingCountry: loading.country,
    unloadingCity: unloading.city,
    unloadingCountry: unloading.country,
    type: form.shipmentType,
    operationType: form.operationType,
    equipment: form.shipmentType === "FTL" ? "53 ft dry van" : shipment.equipment,
    commodity: form.commodity,
    carrier: form.carrier,
    driver: {
      name: form.driver,
      initials: getInitials(form.driver),
    },
    tractor: form.tractor,
    trailer: form.trailer,
    pickupDate: form.pickupDate,
    pickupTime: form.pickupTime,
    etaDate: form.deliveryDate,
    etaTime: form.deliveryTime,
    plannedUnloadingDate: `${form.deliveryDate} ${form.deliveryTime}`,
    appointmentWindow: `${form.pickupTime}-${form.deliveryTime}`,
    totalWeight: weight,
    pallets,
    rate,
    lastCheckCall: form.notes || shipment.lastCheckCall,
  }
}

function buildShipmentFromForm(
  form: AddShipmentFormState,
  nextIndex: number
): Shipment {
  const loading = splitLocation(form.origin)
  const unloading = splitLocation(form.destination)
  const direction = form.direction
  const voyagePrefix = direction === "import" ? "IM" : "EX"
  const voyageNumber = `${voyagePrefix}${8800 + nextIndex}`
  const weight = Number.parseInt(form.weight.replace(/\D/g, ""), 10) || 0
  const pallets = Number.parseInt(form.pallets.replace(/\D/g, ""), 10) || 0
  const rate = Number.parseInt(form.rate.replace(/\D/g, ""), 10) || 0

  return {
    id: `shp-new-${Date.now()}`,
    shipmentId: `SHP-${String(640 + nextIndex).padStart(5, "0")}`,
    orderNumber: form.orderNumber,
    voyageNumber,
    trackingDate: "25-04-26 23:18",
    referenceNumber: `REF-26-${9000 + nextIndex}`,
    customer: form.customer,
    direction,
    origin: form.origin,
    destination: form.destination,
    loadingCity: loading.city,
    loadingCountry: loading.country,
    unloadingCity: unloading.city,
    unloadingCountry: unloading.country,
    status: form.status,
    type: form.shipmentType,
    operationType: form.operationType,
    serviceLevel: "Standard",
    equipment: form.shipmentType === "FTL" ? "53 ft dry van" : "LTL trailer",
    commodity: form.commodity,
    carrier: form.carrier,
    broker: "Aethos Brokerage",
    driver: {
      name: form.driver,
      initials: getInitials(form.driver),
    },
    tractor: form.tractor,
    trailer: form.trailer,
    pickupDate: form.pickupDate,
    pickupTime: form.pickupTime,
    etaDate: form.deliveryDate,
    etaTime: form.deliveryTime,
    plannedUnloadingDate: `${form.deliveryDate} ${form.deliveryTime}`,
    appointmentWindow: `${form.pickupTime}-${form.deliveryTime}`,
    progress: 0,
    miles: 1152,
    interventions: null,
    totalWeight: weight,
    pallets,
    rate,
    documentsStatus: "pending",
    trackingDevice: "Project44",
    detentionRisk: "low",
    lastCheckCall: form.notes || "Not dispatched",
    priority: "standard",
  }
}

function AddShipmentSheet({
  open,
  onOpenChange,
  onCreateShipment,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateShipment: (shipment: Shipment) => void
}) {
  const [form, setForm] = React.useState(defaultAddShipmentForm)

  React.useEffect(() => {
    if (open) {
      setForm(defaultAddShipmentForm)
    }
  }, [open])

  const updateForm = <Key extends keyof AddShipmentFormState>(
    key: Key,
    value: AddShipmentFormState[Key]
  ) => {
    setForm((currentForm) => ({ ...currentForm, [key]: value }))
  }

  const submitShipment = () => {
    onCreateShipment(buildShipmentFromForm(form, Date.now() % 1000))
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-[460px]! max-w-[calc(100vw-1rem)]! bg-white p-0 dark:bg-zinc-950 sm:max-w-[460px]!"
      >
        <SheetHeader className="border-b px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <SheetTitle className="text-lg font-semibold">
                Add New Shipment
              </SheetTitle>
              <SheetDescription className="text-xs">
                Fill in the details to create a new shipment.
              </SheetDescription>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-xl"
              onClick={() => onOpenChange(false)}
              aria-label="Close add shipment panel"
            >
              <IconX className="size-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-6">
            <section className="space-y-3">
              <SectionHeading>Global toggles</SectionHeading>
              <ToggleLine
                label="Afficher les informations supplémentaires"
                checked={form.showAdditionalInfo}
                onCheckedChange={(checked) =>
                  updateForm("showAdditionalInfo", checked)
                }
              />
              <ToggleLine
                label="Special / Important"
                checked={form.important}
                onCheckedChange={(checked) => updateForm("important", checked)}
              />
              {form.important ? (
                <FieldBlock label="Important comment">
                  <textarea
                    value={form.importantComment}
                    onChange={(event) =>
                      updateForm("importantComment", event.target.value)
                    }
                    className="min-h-20 w-full resize-none rounded-xl border bg-slate-50 px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30 dark:bg-zinc-950"
                  />
                </FieldBlock>
              ) : null}
            </section>

            <section className="space-y-3">
              <SectionHeading>1. Client & Direction</SectionHeading>
              <FieldBlock label="Shipment Type" required>
                <FormSelect
                  value={form.shipmentType}
                  options={shipmentTypeOptions}
                  onChange={(value) => updateForm("shipmentType", value as ShipmentType)}
                />
              </FieldBlock>
              <div className="grid grid-cols-2 gap-3">
                <FieldBlock label="Direction" required>
                  <FormSelect
                    value={form.direction}
                    options={["export", "import"]}
                    onChange={(value) => updateForm("direction", value as ShipmentDirection)}
                  />
                </FieldBlock>
                <FieldBlock label="Type" required>
                  <FormSelect
                    value={form.operationType}
                    options={operationTypeOptions}
                    onChange={(value) => updateForm("operationType", value as ShipmentOperationType)}
                  />
                </FieldBlock>
              </div>
              <FieldBlock label="Reference / Order #" required>
                <Input
                  value={form.orderNumber}
                  onChange={(event) => updateForm("orderNumber", event.target.value)}
                  className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                />
              </FieldBlock>
              <FieldBlock label="Customer" required>
                <Input
                  value={form.customer}
                  onChange={(event) => updateForm("customer", event.target.value)}
                  className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                />
              </FieldBlock>
              <FieldBlock label="Shipment ID (Auto)">
                <Input
                  value="SHP-00631"
                  readOnly
                  className="rounded-xl border-transparent bg-slate-100 text-muted-foreground dark:bg-zinc-900"
                />
              </FieldBlock>
            </section>

            <section className="space-y-3">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Route Information
              </p>
              <div className="grid grid-cols-2 gap-3">
                <FieldBlock label="Origin" required>
                  <Input
                    value={form.origin}
                    onChange={(event) => updateForm("origin", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Destination" required>
                  <Input
                    value={form.destination}
                    onChange={(event) => updateForm("destination", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Pickup Date" required>
                  <Input
                    type="date"
                    value={form.pickupDate}
                    onChange={(event) => updateForm("pickupDate", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Pickup Time">
                  <Input
                    type="time"
                    value={form.pickupTime}
                    onChange={(event) => updateForm("pickupTime", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Delivery Date" required>
                  <Input
                    type="date"
                    value={form.deliveryDate}
                    onChange={(event) => updateForm("deliveryDate", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Delivery Time">
                  <Input
                    type="time"
                    value={form.deliveryTime}
                    onChange={(event) => updateForm("deliveryTime", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
              </div>
            </section>

            <section className="space-y-3">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Carrier & Driver
              </p>
              <div className="grid grid-cols-2 gap-3">
                <FieldBlock label="Carrier" required>
                  <FormSelect
                    value={form.carrier}
                    options={carrierOptions}
                    onChange={(value) => updateForm("carrier", value)}
                  />
                </FieldBlock>
                <FieldBlock label="Driver">
                  <FormSelect
                    value={form.driver}
                    options={driverOptions}
                    onChange={(value) => updateForm("driver", value)}
                  />
                </FieldBlock>
                <FieldBlock label="Truck / Equipment">
                  <Input
                    value={form.tractor}
                    onChange={(event) => updateForm("tractor", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Trailer">
                  <Input
                    value={form.trailer}
                    onChange={(event) => updateForm("trailer", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
              </div>
            </section>

            <section className="space-y-3">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Cargo Details
              </p>
              <div className="grid grid-cols-3 gap-3">
                <FieldBlock label="Commodity">
                  <Input
                    value={form.commodity}
                    onChange={(event) => updateForm("commodity", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Weight">
                  <Input
                    value={form.weight}
                    onChange={(event) => updateForm("weight", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Pieces">
                  <Input
                    value={form.pallets}
                    onChange={(event) => updateForm("pallets", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
              </div>
              <FieldBlock label="Total Value (USD)">
                <Input
                  value={form.rate}
                  onChange={(event) => updateForm("rate", event.target.value)}
                  className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                />
              </FieldBlock>
            </section>

            <section className="space-y-3">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Additional Information
              </p>
              <FieldBlock label="Special Instructions">
                <textarea
                  value={form.notes}
                  onChange={(event) => updateForm("notes", event.target.value)}
                  className="min-h-24 w-full resize-none rounded-xl border bg-slate-50 px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30 dark:bg-zinc-950"
                />
              </FieldBlock>
            </section>
          </div>
        </div>

        <SheetFooter className="flex-row justify-end border-t px-5 py-4">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="rounded-xl bg-blue-950 text-white hover:bg-blue-900"
            onClick={submitShipment}
          >
            Create Shipment
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function EditShipmentDrawer({
  drawerRow,
  updateRow,
  closeDrawer,
}: DataGridDrawerPanelProps<Shipment, ShipmentColumnId>) {
  const [form, setForm] = React.useState<AddShipmentFormState>(() =>
    drawerRow ? shipmentToForm(drawerRow) : defaultAddShipmentForm
  )

  React.useEffect(() => {
    if (drawerRow) {
      setForm(shipmentToForm(drawerRow))
    }
  }, [drawerRow])

  const updateForm = <Key extends keyof AddShipmentFormState>(
    key: Key,
    value: AddShipmentFormState[Key]
  ) => {
    setForm((currentForm) => ({ ...currentForm, [key]: value }))
  }

  const saveShipment = () => {
    if (!drawerRow) return
    updateRow(drawerRow.id, (shipment) => applyShipmentForm(shipment, form))
    closeDrawer()
  }

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[1px] data-ending-style:opacity-0 data-starting-style:opacity-0" />
      <DialogPrimitive.Popup className="fixed inset-y-0 right-0 z-50 flex w-[460px] max-w-[calc(100vw-1rem)] translate-x-full flex-col border-l bg-white shadow-2xl outline-none transition-transform duration-200 data-open:translate-x-0 data-closed:translate-x-full dark:bg-zinc-950">
        <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
          <div>
            <DialogPrimitive.Title className="text-lg font-semibold">
              Edit Shipment
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="text-xs text-muted-foreground">
              {drawerRow ? `${drawerRow.voyageNumber} · ${drawerRow.customer}` : "Update shipment details."}
            </DialogPrimitive.Description>
          </div>
          <DialogPrimitive.Close
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-xl"
                aria-label="Close edit shipment panel"
              />
            }
          >
            <IconX className="size-4" />
          </DialogPrimitive.Close>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-6">
            <section className="space-y-3">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Basic Information
              </p>
              <FieldBlock label="Shipment Type" required>
                <FormSelect
                  value={form.shipmentType}
                  options={shipmentTypeOptions}
                  onChange={(value) => updateForm("shipmentType", value as ShipmentType)}
                />
              </FieldBlock>
              <div className="grid grid-cols-2 gap-3">
                <FieldBlock label="Direction" required>
                  <FormSelect
                    value={form.direction}
                    options={["export", "import"]}
                    onChange={(value) => updateForm("direction", value as ShipmentDirection)}
                  />
                </FieldBlock>
                <FieldBlock label="Type" required>
                  <FormSelect
                    value={form.operationType}
                    options={operationTypeOptions}
                    onChange={(value) => updateForm("operationType", value as ShipmentOperationType)}
                  />
                </FieldBlock>
              </div>
              <FieldBlock label="Reference / Order #" required>
                <Input
                  value={form.orderNumber}
                  onChange={(event) => updateForm("orderNumber", event.target.value)}
                  className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                />
              </FieldBlock>
              <FieldBlock label="Customer" required>
                <Input
                  value={form.customer}
                  onChange={(event) => updateForm("customer", event.target.value)}
                  className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                />
              </FieldBlock>
              <div className="grid grid-cols-2 gap-3">
                <FieldBlock label="Nombre de chauffeurs">
                  <Input
                    value={form.numberOfDrivers}
                    onChange={(event) =>
                      updateForm("numberOfDrivers", event.target.value)
                    }
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Commentaire client">
                  <Input
                    value={form.clientComment}
                    onChange={(event) =>
                      updateForm("clientComment", event.target.value)
                    }
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
              </div>
              <FieldBlock label="Shipment ID">
                <Input
                  value={drawerRow?.shipmentId ?? ""}
                  readOnly
                  className="rounded-xl border-transparent bg-slate-100 text-muted-foreground dark:bg-zinc-900"
                />
              </FieldBlock>
            </section>

            <section className="space-y-3">
              <SectionHeading>2. Chargement - Déchargement</SectionHeading>
              <div className="grid grid-cols-2 gap-3">
                <FieldBlock label="Origin" required>
                  <Input
                    value={form.origin}
                    onChange={(event) => updateForm("origin", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Destination" required>
                  <Input
                    value={form.destination}
                    onChange={(event) => updateForm("destination", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Pickup Date" required>
                  <Input
                    type="date"
                    value={form.pickupDate}
                    onChange={(event) => updateForm("pickupDate", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Pickup Time">
                  <Input
                    type="time"
                    value={form.pickupTime}
                    onChange={(event) => updateForm("pickupTime", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Delivery Date" required>
                  <Input
                    type="date"
                    value={form.deliveryDate}
                    onChange={(event) => updateForm("deliveryDate", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Delivery Time">
                  <Input
                    type="time"
                    value={form.deliveryTime}
                    onChange={(event) => updateForm("deliveryTime", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                {form.showAdditionalInfo ? (
                  <>
                    <FieldBlock label="2e ville chargement">
                      <Input
                        value={form.loadingSecondCity}
                        onChange={(event) =>
                          updateForm("loadingSecondCity", event.target.value)
                        }
                        placeholder="Optional"
                        className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                      />
                    </FieldBlock>
                    <FieldBlock label="2e ville déchargement">
                      <Input
                        value={form.unloadingSecondCity}
                        onChange={(event) =>
                          updateForm("unloadingSecondCity", event.target.value)
                        }
                        placeholder="Optional"
                        className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                      />
                    </FieldBlock>
                  </>
                ) : null}
              </div>
            </section>

            <section className="space-y-3">
              <SectionHeading>3. Details & 5. Equipments</SectionHeading>
              <div className="grid grid-cols-2 gap-3">
                <FieldBlock label="Supplier / Tractionnaire">
                  <Input
                    value={form.supplier}
                    onChange={(event) =>
                      updateForm("supplier", event.target.value)
                    }
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Commentaire fournisseur">
                  <Input
                    value={form.supplierComment}
                    onChange={(event) =>
                      updateForm("supplierComment", event.target.value)
                    }
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Carrier" required>
                  <FormSelect
                    value={form.carrier}
                    options={carrierOptions}
                    onChange={(value) => updateForm("carrier", value)}
                  />
                </FieldBlock>
                <FieldBlock label="Driver">
                  <FormSelect
                    value={form.driver}
                    options={driverOptions}
                    onChange={(value) => updateForm("driver", value)}
                  />
                </FieldBlock>
                <FieldBlock label="Truck / Equipment">
                  <Input
                    value={form.tractor}
                    onChange={(event) => updateForm("tractor", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Trailer">
                  <Input
                    value={form.trailer}
                    onChange={(event) => updateForm("trailer", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Driver rapide">
                  <Input
                    value={form.driverRapide}
                    onChange={(event) =>
                      updateForm("driverRapide", event.target.value)
                    }
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Driver national">
                  <Input
                    value={form.driverNat}
                    onChange={(event) =>
                      updateForm("driverNat", event.target.value)
                    }
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="SR Type">
                  <Input
                    value={form.srType}
                    onChange={(event) => updateForm("srType", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
              </div>
            </section>

            <section className="space-y-3">
              <SectionHeading>4. Info client & Cargo</SectionHeading>
              <div className="grid grid-cols-3 gap-3">
                <FieldBlock label="Commodity">
                  <Input
                    value={form.commodity}
                    onChange={(event) => updateForm("commodity", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Weight">
                  <Input
                    value={form.weight}
                    onChange={(event) => updateForm("weight", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Pieces">
                  <Input
                    value={form.pallets}
                    onChange={(event) => updateForm("pallets", event.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
              </div>
              <FieldBlock label="Total Value (USD)">
                <Input
                  value={form.rate}
                  onChange={(event) => updateForm("rate", event.target.value)}
                  className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                />
              </FieldBlock>
            </section>

            {form.showAdditionalInfo ? (
              <section className="space-y-3">
                <SectionHeading>6. Payment</SectionHeading>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["CA MAD", "caMad"],
                    ["CA EURO", "caEuro"],
                    ["Coût", "cost"],
                    ["Sea crossing", "seaCrossing"],
                    ["Frais de port", "portFees"],
                    ["Surcharge gasoil", "gasoilSurcharge"],
                  ].map(([label, key]) => (
                    <FieldBlock key={key} label={label}>
                      <Input
                        value={form[key as keyof AddShipmentFormState] as string}
                        onChange={(event) =>
                          updateForm(
                            key as keyof AddShipmentFormState,
                            event.target.value as never
                          )
                        }
                        className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                      />
                    </FieldBlock>
                  ))}
                </div>
                <FieldBlock label="Invoicing reference">
                  <Input
                    value={form.invoicingReference}
                    onChange={(event) =>
                      updateForm("invoicingReference", event.target.value)
                    }
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
              </section>
            ) : null}

            <section className="space-y-3">
              <SectionHeading>8. Status row</SectionHeading>
              <div className="grid grid-cols-2 gap-3">
                <FieldBlock label="Statut">
                  <FormSelect
                    value={form.status}
                    options={statusFilters.filter((status) => status !== "all")}
                    onChange={(value) =>
                      updateForm("status", value as ShipmentStatus)
                    }
                  />
                </FieldBlock>
                <FieldBlock label="Sous-statut">
                  <Input
                    value={form.subStatus}
                    onChange={(event) =>
                      updateForm("subStatus", event.target.value)
                    }
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
              </div>
              <ToggleLine
                label="Tracteur à facturer"
                checked={form.tractorBilled}
                onCheckedChange={(checked) => updateForm("tractorBilled", checked)}
              />
            </section>

            <section className="space-y-3">
              <SectionHeading>10. Maritime / completion extras</SectionHeading>
              <div className="grid grid-cols-2 gap-3">
                <FieldBlock label="Compagnie maritime">
                  <Input
                    value={form.maritimeCompany}
                    onChange={(event) =>
                      updateForm("maritimeCompany", event.target.value)
                    }
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Date embarquement">
                  <Input
                    type="datetime-local"
                    value={form.boardingDate}
                    onChange={(event) =>
                      updateForm("boardingDate", event.target.value)
                    }
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
                <FieldBlock label="Date départ Algeciras">
                  <Input
                    type="datetime-local"
                    value={form.dateDepartAlgeciras}
                    onChange={(event) =>
                      updateForm("dateDepartAlgeciras", event.target.value)
                    }
                    className="rounded-xl bg-slate-50 dark:bg-zinc-950"
                  />
                </FieldBlock>
              </div>
            </section>

            <section className="space-y-3">
              <SectionHeading>12. Commentaire</SectionHeading>
              <FieldBlock label="Special Instructions">
                <textarea
                  value={form.notes}
                  onChange={(event) => updateForm("notes", event.target.value)}
                  className="min-h-24 w-full resize-none rounded-xl border bg-slate-50 px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30 dark:bg-zinc-950"
                />
              </FieldBlock>
              <FieldBlock label="Comment">
                <textarea
                  value={form.comment}
                  onChange={(event) => updateForm("comment", event.target.value)}
                  className="min-h-24 w-full resize-none rounded-xl border bg-slate-50 px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30 dark:bg-zinc-950"
                />
              </FieldBlock>
            </section>

            <section className="space-y-3">
              <SectionHeading>13. List of steps</SectionHeading>
              <div className="space-y-2 rounded-xl border bg-slate-50 p-3 dark:bg-zinc-950">
                {[
                  "Programmé",
                  "Chargement",
                  "Embarquement",
                  "En transit",
                  "Déchargement",
                ].map((step, index) => (
                  <div key={step} className="flex items-center gap-3 text-sm">
                    <span className="grid size-6 place-items-center rounded-full bg-blue-950 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <span className="font-medium">{step}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {index === 0 ? "0 km" : `${index * 288} km`}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t px-5 py-4">
          <DialogPrimitive.Close
            render={<Button variant="outline" className="rounded-xl" />}
          >
            Cancel
          </DialogPrimitive.Close>
          <Button
            className="rounded-xl bg-blue-950 text-white hover:bg-blue-900"
            onClick={saveShipment}
          >
            Save Changes
          </Button>
        </div>
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  )
}

export function ShipmentsPage() {
  const isMobile = useIsMobile()
  const [items, setItems] = React.useState(initialShipments)
  const [query, setQuery] = React.useState("")
  const [codeFilter, setCodeFilter] = React.useState("")
  const [clientFilter, setClientFilter] = React.useState("all")
  const [directionFilter, setDirectionFilter] =
    React.useState<ShipmentDirectionFilter>("all")
  const [tractorFilter, setTractorFilter] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<ShipmentStatusFilter>("all")
  const [trailerFilter, setTrailerFilter] = React.useState("")
  const [sortPreset, setSortPreset] = React.useState<ShipmentSortPreset>("eta")
  const [showStats, setShowStats] = React.useState(true)
  const [page, setPage] = React.useState(1)
  const [isAddShipmentOpen, setIsAddShipmentOpen] = React.useState(false)
  const [toolbarProps, setToolbarProps] =
    React.useState<DataGridToolbarRenderProps<ShipmentColumnId> | null>(null)
  const handleToolbarPropsChange = React.useCallback(
    (nextToolbarProps: DataGridToolbarRenderProps<ShipmentColumnId>) => {
      setToolbarProps((currentToolbarProps) =>
        areShipmentToolbarPropsEqual(currentToolbarProps, nextToolbarProps)
          ? currentToolbarProps
          : nextToolbarProps
      )
    },
    []
  )
  const visibleShipmentColumns = React.useMemo(() => {
    if (!isMobile) return shipmentColumns

    return mobileShipmentColumnIds
      .map((columnId) =>
        shipmentColumns.find((column) => column.id === columnId)
      )
      .filter((column): column is DataGridColumn<ShipmentColumnId> =>
        Boolean(column)
      )
      .map((column) => {
        if (column.id === "client") {
          return { ...column, defaultWidth: 220, minWidth: 180 }
        }
        if (column.id === "route") {
          return { ...column, defaultWidth: 240, minWidth: 180 }
        }
        if (column.id === "plannedUnloadingDate") {
          return { ...column, defaultWidth: 160, minWidth: 136 }
        }
        if (column.id === "progress") {
          return { ...column, defaultWidth: 150, minWidth: 130 }
        }
        return column
      })
  }, [isMobile])

  const filteredShipments = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const normalizedCodeFilter = codeFilter.trim().toLowerCase()
    const normalizedTractorFilter = tractorFilter.trim().toLowerCase()
    const normalizedTrailerFilter = trailerFilter.trim().toLowerCase()

    return items
      .filter((shipment) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          [
            shipment.shipmentId,
            shipment.orderNumber,
            shipment.origin,
            shipment.destination,
            shipment.carrier,
            shipment.driver.name,
            shipment.referenceNumber,
            shipment.customer,
            shipment.broker,
            shipment.commodity,
            shipment.equipment,
            shipment.trackingDevice,
            shipment.voyageNumber,
            shipment.tractor,
            shipment.trailer,
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)
        const matchesCode =
          normalizedCodeFilter.length === 0 ||
          `${shipment.voyageNumber} ${shipment.shipmentId} ${shipment.orderNumber}`
            .toLowerCase()
            .includes(normalizedCodeFilter)
        const matchesClient =
          clientFilter === "all" || shipment.customer === clientFilter
        const matchesDirection =
          directionFilter === "all" || shipment.direction === directionFilter
        const matchesTractor =
          normalizedTractorFilter.length === 0 ||
          shipment.tractor.toLowerCase().includes(normalizedTractorFilter)
        const matchesStatus =
          statusFilter === "all" || shipment.status === statusFilter
        const matchesTrailer =
          normalizedTrailerFilter.length === 0 ||
          shipment.trailer.toLowerCase().includes(normalizedTrailerFilter)
        return (
          matchesQuery &&
          matchesCode &&
          matchesClient &&
          matchesDirection &&
          matchesTractor &&
          matchesStatus &&
          matchesTrailer
        )
      })
      .sort((left, right) => {
        if (sortPreset === "progress") return left.progress - right.progress
        if (sortPreset === "status") return left.status.localeCompare(right.status)
        if (sortPreset === "route") return left.origin.localeCompare(right.origin)
        if (sortPreset === "priority") {
          return priorityWeight[right.priority] - priorityWeight[left.priority]
        }
        return left.etaDate.localeCompare(right.etaDate) || left.etaTime.localeCompare(right.etaTime)
      })
  }, [
    clientFilter,
    codeFilter,
    directionFilter,
    items,
    query,
    sortPreset,
    statusFilter,
    tractorFilter,
    trailerFilter,
  ])

  React.useEffect(() => {
    setPage(1)
  }, [
    clientFilter,
    codeFilter,
    directionFilter,
    query,
    sortPreset,
    statusFilter,
    tractorFilter,
    trailerFilter,
  ])

  const pageSize = isMobile ? MOBILE_PAGE_SIZE : PAGE_SIZE
  const totalPages = Math.max(1, Math.ceil(filteredShipments.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageStartIndex = (currentPage - 1) * pageSize
  const pageEndIndex = Math.min(pageStartIndex + pageSize, filteredShipments.length)
  const paginatedShipments = React.useMemo(
    () => filteredShipments.slice(pageStartIndex, pageEndIndex),
    [filteredShipments, pageEndIndex, pageStartIndex]
  )
  const clientOptions = React.useMemo(
    () => ["all", ...Array.from(new Set(items.map((shipment) => shipment.customer))).sort()],
    [items]
  )

  const handleCreateShipment = React.useCallback((shipment: Shipment) => {
    setItems((currentItems) => [shipment, ...currentItems])
    setStatusFilter("all")
    setClientFilter("all")
    setCodeFilter("")
    setTractorFilter("")
    setTrailerFilter("")
    setDirectionFilter("all")
    setPage(1)
  }, [])

  const stats = React.useMemo(() => {
    const delivered = items.filter((shipment) => shipment.status === "delivered").length
    const inTransit = items.filter((shipment) => shipment.status === "in-transit").length
    const exceptions = items.filter((shipment) => shipment.status === "exception").length
    return [
      {
        label: "Total Shipments",
        value: String(items.length),
        delta: "18 (8.5%) vs last week",
        icon: IconTruck,
        tone: "blue" as const,
      },
      {
        label: "In Transit",
        value: String(inTransit),
        delta: "4 (20%) vs last week",
        icon: IconRoute,
        tone: "teal" as const,
      },
      {
        label: "Delivered",
        value: String(delivered),
        delta: "12 (8.3%) vs last week",
        icon: IconCheck,
        tone: "teal" as const,
      },
      {
        label: "Exception",
        value: String(exceptions),
        delta: "3 (30%) vs last week",
        icon: IconAlertTriangle,
        tone: "orange" as const,
      },
      {
        label: "On Time Delivery",
        value: "92.4%",
        delta: "2.6% vs last week",
        icon: IconClock,
        tone: "slate" as const,
      },
    ]
  }, [items])

  return (
    <div className="flex h-svh overflow-hidden bg-slate-50 text-slate-950 dark:bg-zinc-950 dark:text-zinc-50">
      <TmsSidebar activeStatus={statusFilter} onStatusChange={setStatusFilter} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-white/90 px-3 backdrop-blur dark:bg-zinc-950/90 sm:h-18 sm:px-6">
          <div className="min-w-0 lg:hidden">
            <div className="truncate text-sm font-semibold tracking-tight">
              AETHOS TMS
            </div>
            <div className="truncate text-xs text-muted-foreground">
              Shipments
            </div>
          </div>
          <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            <IconShieldCheck className="size-4" />
            <span>Workspace</span>
            <span>/</span>
            <span className="font-semibold text-foreground">Shipments</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <div className="relative hidden w-96 lg:block">
              <IconSearch className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search shipments, order #, ref no..."
                className="h-10 rounded-2xl bg-white pl-10 shadow-sm dark:bg-zinc-900"
              />
              <kbd className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                ⌘ K
              </kbd>
            </div>
            <Button variant="outline" size="icon-lg" className="hidden rounded-2xl bg-white dark:bg-zinc-900 sm:inline-flex">
              <IconBell className="size-4" />
            </Button>
            <Button variant="outline" size="icon-lg" className="rounded-2xl bg-white dark:bg-zinc-900 max-sm:size-9">
              <IconMoon className="size-4" />
            </Button>
            <div className="grid size-9 place-items-center rounded-full bg-slate-900 text-xs font-semibold text-white sm:size-10">
              JC
            </div>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-hidden px-2 py-2 sm:px-4 sm:py-4">
          <div className="flex h-full min-h-0 w-full flex-col gap-3 sm:gap-4">
            <div className="flex flex-wrap items-end justify-between gap-2 sm:gap-4">
              <div />
              <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
                <Button variant="outline" className="hidden rounded-xl bg-white dark:bg-zinc-900 sm:inline-flex">
                  <IconCloudDownload className="size-4" />
                  Export
                </Button>
                <Button
                  className="rounded-xl bg-blue-950 text-white hover:bg-blue-900"
                  onClick={() => setShowStats((current) => !current)}
                  aria-expanded={showStats}
                  aria-controls="shipment-stats"
                >
                  <IconArrowBarUp
                    className={cn(
                      "size-4 transition-transform",
                      !showStats && "rotate-180"
                    )}
                  />
                </Button>
                <Button
                  className="rounded-xl bg-blue-950 text-white hover:bg-blue-900 max-sm:flex-1"
                  onClick={() => setIsAddShipmentOpen(true)}
                >
                  <IconPlus className="size-4" />
                  New Shipment
                </Button>
              </div>
            </div>

            {showStats ? (
              <div id="shipment-stats" className="grid shrink-0 gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {stats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <section key={stat.label} className="rounded-xl border bg-white p-3 shadow-sm dark:bg-zinc-900 sm:p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "grid size-10 place-items-center rounded-full text-white",
                              stat.tone === "blue" && "bg-blue-950",
                              stat.tone === "teal" && "bg-teal-500",
                              stat.tone === "orange" && "bg-orange-400",
                              stat.tone === "slate" && "bg-slate-500"
                            )}
                          >
                            <Icon className="size-5" />
                          </div>
                          <div>
                            <div className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                              {stat.label}
                            </div>
                            <div className="mt-1 text-2xl font-semibold">{stat.value}</div>
                          </div>
                        </div>
                        <div className="hidden sm:block">
                          <Sparkline tone={stat.tone} />
                        </div>
                      </div>
                      <div className="mt-4 text-xs font-medium text-blue-600">
                        ↗ {stat.delta}
                      </div>
                    </section>
                  )
                })}
              </div>
            ) : null}

            <section className="flex min-h-0 flex-1 flex-col rounded-xl border bg-white p-2 shadow-sm dark:bg-zinc-900 sm:p-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:gap-3">
                <div className="relative w-36 shrink-0 sm:w-40">
                  <IconSearch className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={codeFilter}
                    onChange={(event) => setCodeFilter(event.target.value)}
                    placeholder="Code"
                    className="rounded-xl bg-slate-50 pl-10 dark:bg-zinc-950"
                  />
                </div>
                <div className="relative w-36 shrink-0 sm:w-40">
                  <IconSearch className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={tractorFilter}
                    onChange={(event) => setTractorFilter(event.target.value)}
                    placeholder="Tracteur"
                    className="rounded-xl bg-slate-50 pl-10 dark:bg-zinc-950"
                  />
                </div>
                <div className="relative w-48 shrink-0 sm:w-64">
                  <IconSearch className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={trailerFilter}
                    onChange={(event) => setTrailerFilter(event.target.value)}
                    placeholder="Semi-remorque"
                    className="rounded-xl bg-slate-50 pl-10 dark:bg-zinc-950"
                  />
                </div>
                <FilterMenu
                  label="Client"
                  value={clientFilter}
                  options={clientOptions}
                  getOptionLabel={(option) => option === "all" ? "All clients" : option}
                  onChange={setClientFilter}
                />
                <FilterMenu
                  label="Direction"
                  value={directionFilter}
                  options={directionFilters}
                  getOptionLabel={(option) =>
                    option === "all"
                      ? "All directions"
                      : option === "export"
                        ? "Export"
                        : "Import"
                  }
                  onChange={setDirectionFilter}
                />
                <FilterMenu
                  label="Statut"
                  value={statusFilter}
                  options={statusFilters}
                  getOptionLabel={(option) => option === "all" ? "All statuses" : shipmentStatusLabels[option]}
                  onChange={setStatusFilter}
                />
                <div className="ml-auto flex shrink-0 items-center gap-2">
                  <Button variant="outline" size="sm" className="h-9 rounded-xl">
                    <IconFilter className="size-4" />
                    Filtres
                  </Button>
                  <Button variant="outline" size="sm" className="hidden h-9 rounded-xl bg-slate-50 dark:bg-zinc-950 md:inline-flex">
                    <IconLayoutBoard className="size-4" />
                    Board view
                  </Button>
                  {toolbarProps ? (
                    <DataGridColumnOptionsMenu
                      {...toolbarProps}
                      triggerLabel="Table options"
                    />
                  ) : null}
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="h-9 rounded-xl" />}>
                      Sort: {sortLabels[sortPreset]}
                      <IconChevronDown className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Sort shipments</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup value={sortPreset} onValueChange={(next) => setSortPreset(next as ShipmentSortPreset)}>
                        {(Object.keys(sortLabels) as ShipmentSortPreset[]).map((preset) => (
                          <DropdownMenuRadioItem key={preset} value={preset}>
                            {sortLabels[preset]}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" size="icon-sm" className="h-9 rounded-xl">
                    <IconRefresh className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden rounded-xl border">
                <DataGrid
                  rows={paginatedShipments}
                  columns={visibleShipmentColumns}
                  getRowLabel={(shipment) => shipment.shipmentId}
                  renderCell={(shipment, column) => (
                    <ShipmentCell shipment={shipment} columnId={column.id} />
                  )}
                  isEditableColumn={() => false}
                  getCellEditValue={(shipment, columnId) => String(shipment[columnId as keyof Shipment] ?? "")}
                  applyCellEdit={(shipment) => shipment}
                  getDrawerCellValue={(shipment, columnId) => {
                    if (columnId === "route") {
                      return `${shipment.origin} to ${shipment.destination}`
                    }
                    return <ShipmentCell shipment={shipment} columnId={columnId} />
                  }}
                  canOpenDrawer={(columnId) =>
                    columnId === "voyageNumber" ||
                    columnId === "client" ||
                    columnId === "route" ||
                    columnId === "status"
                  }
                  onRowsChange={setItems}
                  onToolbarPropsChange={handleToolbarPropsChange}
                  fillAvailableHeight
                  mobileCardLayout={isMobile}
                  tableContainerClassName="h-full bg-white dark:bg-zinc-900"
                  renderSummary={(column, rows) => {
                    if (column.id === "shipmentId") return `${rows.length} visible`
                    if (column.id === "progress") {
                      const average = rows.length
                        ? Math.round(rows.reduce((sum, row) => sum + row.progress, 0) / rows.length)
                        : 0
                      return `${average}% avg`
                    }
                    if (column.id === "carrier") {
                      return `${new Set(rows.map((row) => row.carrier)).size} carriers`
                    }
                    return null
                  }}
                  stickySummaryFooter
                  renderDrawerPanel={(props) => (
                    <EditShipmentDrawer {...props} />
                  )}
                />
              </div>

              <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 pt-3 text-xs text-muted-foreground sm:gap-3 sm:text-sm">
                <span className="min-w-0">
                  Showing {filteredShipments.length === 0 ? 0 : pageStartIndex + 1} to {pageEndIndex} of{" "}
                  {filteredShipments.length} shipments
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => index + 1).map((pageNumber) => (
                    <Button
                      key={pageNumber}
                      variant={pageNumber === currentPage ? "secondary" : "ghost"}
                      size="icon-sm"
                      className="rounded-xl"
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  ))}
                  {totalPages > 5 ? (
                    <>
                      <span className="px-2">...</span>
                      <Button
                        variant={currentPage === totalPages ? "secondary" : "ghost"}
                        size="icon-sm"
                        className="rounded-xl"
                        onClick={() => setPage(totalPages)}
                      >
                        {totalPages}
                      </Button>
                    </>
                  ) : null}
                </div>
              </div>
            </section>
          </div>
        </main>

        {toolbarProps && toolbarProps.selectedRowCount > 0 ? (
          <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center">
            <div className="pointer-events-auto flex items-center gap-2 rounded-xl border border-blue-900/40 bg-blue-950 px-3 py-2 text-sm text-white shadow-2xl">
              <IconCheck className="size-4 text-teal-300" />
              <span className="pr-2 font-semibold">
                {toolbarProps.selectedRowCount} shipment selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 rounded-lg text-white hover:bg-white/10 hover:text-white"
                onClick={() => toolbarProps.onToggleAllRows(true)}
              >
                Select all {filteredShipments.length}
              </Button>
              <Button variant="ghost" size="sm" className="h-8 rounded-lg text-white hover:bg-white/10 hover:text-white">
                Change status
              </Button>
              <Button variant="ghost" size="sm" className="h-8 rounded-lg text-white hover:bg-white/10 hover:text-white">
                Assign
              </Button>
              <Button variant="ghost" size="sm" className="h-8 rounded-lg text-white hover:bg-white/10 hover:text-white">
                Export
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 rounded-lg text-red-300 hover:bg-red-500/15 hover:text-red-200"
                onClick={toolbarProps.clearSelection}
              >
                Clear
              </Button>
            </div>
          </div>
        ) : null}

        <AddShipmentSheet
          open={isAddShipmentOpen}
          onOpenChange={setIsAddShipmentOpen}
          onCreateShipment={handleCreateShipment}
        />
      </div>
    </div>
  )
}
