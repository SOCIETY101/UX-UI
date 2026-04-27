import type {
  Shipment,
  ShipmentDocumentStatus,
  ShipmentDirection,
  ShipmentOperationType,
  ShipmentPriority,
  ShipmentRisk,
  ShipmentStatus,
  ShipmentType,
} from "@/lib/shipments/types"

export const shipmentStatusLabels = {
  pending: "Pending",
  "in-transit": "In Transit",
  delivered: "Delivered",
  exception: "Exception",
  cancelled: "Cancelled",
} as const

const lanes = [
  ["Tanger", "Maroc", "Barcelona", "Espagne"],
  ["Agadir", "Maroc", "Helsingborg", "Suede"],
  ["Larache", "Maroc", "Murcie", "Espagne"],
  ["Agadir", "Maroc", "Barendrecht", "Pays-Bas"],
  ["Bouskoura", "Maroc", "Bourg-Achard", "France"],
  ["Mohammedia", "Maroc", "Castelnau", "France"],
  ["Kenitra", "Maroc", "Pampelune", "Espagne"],
  ["Hernani", "Espagne", "Temara", "Maroc"],
  ["Harnes", "France", "Temara", "Maroc"],
  ["Tanger", "Maroc", "Rotterdam", "Pays-Bas"],
  ["Casablanca", "Maroc", "Valence", "Espagne"],
  ["Nador", "Maroc", "Lyon", "France"],
  ["Settat", "Maroc", "Milan", "Italie"],
  ["Fes", "Maroc", "Madrid", "Espagne"],
  ["Meknes", "Maroc", "Anvers", "Belgique"],
] as const

const carriers = [
  "Aethos Logistics",
  "Swift Transport",
  "XPO Logistics",
  "R+L Carriers",
  "Averitt Express",
  "Old Dominion",
  "Estes Express",
  "SAIA LTL Freight",
  "Knight-Swift",
  "ArcBest",
] as const

const customers = [
  "DSV Road Fujikura",
  "MFB Duroc",
  "Dirafrost Frozen",
  "Fresh2You B.V",
  "JAS Fujikura",
  "AK Freight Services",
  "Dachser Maroc",
  "Ennasr",
  "Yozifood",
  "Atlas Cold Chain",
] as const

const drivers = [
  ["Michael Brown", "MB"],
  ["David Wilson", "DW"],
  ["James Anderson", "JA"],
  ["Robert Taylor", "RT"],
  ["Christopher Lee", "CL"],
  ["Daniel Martinez", "DM"],
  ["Anthony Garcia", "AG"],
  ["Brian Thompson", "BT"],
  ["Kevin White", "KW"],
  ["Steven Harris", "SH"],
  ["Laura Bennett", "LB"],
  ["Omar Hassan", "OH"],
] as const

const shipmentTypes: ShipmentType[] = ["FTL", "LTL", "Intermodal", "Drayage"]
const directions: ShipmentDirection[] = ["export", "export", "export", "import"]
const operationTypes: ShipmentOperationType[] = ["Propre", "Propre", "Traction"]
const statuses: ShipmentStatus[] = [
  "delivered",
  "in-transit",
  "in-transit",
  "exception",
  "pending",
  "cancelled",
]
const priorities: ShipmentPriority[] = ["standard", "expedited", "critical"]
const documentStatuses: ShipmentDocumentStatus[] = [
  "complete",
  "pending",
  "missing",
]
const risks: ShipmentRisk[] = ["low", "medium", "high"]
const commodities = [
  "Consumer electronics",
  "Frozen grocery",
  "Automotive parts",
  "Retail fixtures",
  "Medical devices",
  "Paper products",
  "Industrial resin",
  "Beverages",
] as const
const equipment = [
  "53 ft dry van",
  "48 ft reefer",
  "Flatbed",
  "Container chassis",
  "26 ft box truck",
] as const

function formatDate(day: number) {
  return `May ${day}, 2024`
}

function formatTrackingDate(day: number, hour: number, minute: number) {
  return `${String(day).padStart(2, "0")}-04-26 ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
}

function createShipment(index: number): Shipment {
  const sequence = 521 - index
  const lane = lanes[index % lanes.length]
  const type = shipmentTypes[index % shipmentTypes.length]
  const direction = directions[index % directions.length]
  const status = statuses[index % statuses.length]
  const driver = drivers[index % drivers.length]
  const progress =
    status === "delivered"
      ? 100
      : status === "pending" || status === "cancelled"
        ? 0
        : status === "exception"
          ? 20 + ((index * 7) % 25)
          : 35 + ((index * 11) % 45)

  return {
    id: `shp-${String(sequence).padStart(5, "0")}`,
    shipmentId: `SHP-${String(sequence).padStart(5, "0")}`,
    orderNumber: `ORD-${String(4500 + sequence).padStart(5, "0")}`,
    voyageNumber: `${direction === "import" ? "IM" : "EX"}${8600 + index * 7}`,
    trackingDate: formatTrackingDate(25, 9 + (index % 14), (index * 7) % 60),
    referenceNumber: `REF-${24 + (index % 4)}-${String(8100 + index)}`,
    customer: customers[index % customers.length],
    direction,
    origin: `${lane[0]}, ${lane[1]}`,
    destination: `${lane[2]}, ${lane[3]}`,
    loadingCity: lane[0],
    loadingCountry: lane[1],
    unloadingCity: lane[2],
    unloadingCountry: lane[3],
    status,
    type,
    operationType: operationTypes[index % operationTypes.length],
    serviceLevel:
      priorities[index % priorities.length] === "critical"
        ? "Hot shot"
        : priorities[index % priorities.length] === "expedited"
          ? "Expedited"
          : "Standard",
    equipment: equipment[index % equipment.length],
    commodity: commodities[index % commodities.length],
    carrier: carriers[index % carriers.length],
    broker: index % 3 === 0 ? "Aethos Brokerage" : index % 3 === 1 ? "LaneTrust" : "Direct",
    driver: {
      name: driver[0],
      initials: driver[1],
    },
    tractor:
      index % 3 === 0
        ? `${16000 + index * 37} D ${index % 2 === 0 ? "40" : "45"}`
        : index % 3 === 1
          ? `${47000 + index * 91} D 40`
          : "",
    trailer: `${6300 + ((index * 37) % 2600)}-011-${index % 3 === 0 ? "TM" : "F"}`,
    pickupDate: formatDate(18 + (index % 9)),
    pickupTime: `${String(6 + (index % 7)).padStart(2, "0")}:${index % 2 === 0 ? "30" : "15"} AM`,
    etaDate: formatDate(20 + (index % 10)),
    etaTime: `${String(1 + (index % 10)).padStart(2, "0")}:${index % 3 === 0 ? "45" : "20"} PM`,
    plannedUnloadingDate: `${formatDate(22 + (index % 8))} ${String(9 + (index % 8)).padStart(2, "0")}:00`,
    appointmentWindow: `${String(8 + (index % 7)).padStart(2, "0")}:00-${String(10 + (index % 7)).padStart(2, "0")}:00`,
    progress,
    miles: 300 + ((index * 173) % 2200),
    interventions: index % 5 === 0 ? 2 : index % 4 === 0 ? 1 : null,
    totalWeight: 9_000 + ((index * 1375) % 34_000),
    pallets: 8 + (index % 19),
    rate: 950 + ((index * 265) % 5_700),
    documentsStatus: documentStatuses[index % documentStatuses.length],
    trackingDevice: index % 4 === 0 ? "Tive" : index % 4 === 1 ? "Samsara" : index % 4 === 2 ? "Project44" : "MacroPoint",
    detentionRisk: risks[index % risks.length],
    lastCheckCall:
      status === "pending"
        ? "Not dispatched"
        : `${1 + (index % 8)}h ago`,
    temperature: type === "FTL" && index % 3 === 1 ? "38 F" : undefined,
    priority: priorities[index % priorities.length],
  }
}

export const shipments: Shipment[] = Array.from({ length: 64 }, (_, index) =>
  createShipment(index)
)
