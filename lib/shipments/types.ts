export type ShipmentStatus =
  | "pending"
  | "in-transit"
  | "delivered"
  | "exception"
  | "cancelled"

export type ShipmentType = "FTL" | "LTL" | "Intermodal" | "Drayage"

export type ShipmentPriority = "standard" | "expedited" | "critical"

export type ShipmentDocumentStatus = "complete" | "pending" | "missing"

export type ShipmentRisk = "low" | "medium" | "high"

export type ShipmentDirection = "export" | "import"

export type ShipmentOperationType = "Propre" | "Traction"

export type Shipment = {
  id: string
  shipmentId: string
  orderNumber: string
  voyageNumber: string
  trackingDate: string
  referenceNumber: string
  customer: string
  direction: ShipmentDirection
  origin: string
  destination: string
  loadingCity: string
  loadingCountry: string
  unloadingCity: string
  unloadingCountry: string
  status: ShipmentStatus
  type: ShipmentType
  operationType: ShipmentOperationType
  serviceLevel: string
  equipment: string
  commodity: string
  carrier: string
  broker: string
  driver: {
    name: string
    initials: string
  }
  tractor: string
  trailer: string
  pickupDate: string
  pickupTime: string
  etaDate: string
  etaTime: string
  plannedUnloadingDate: string
  appointmentWindow: string
  progress: number
  miles: number
  interventions: number | null
  totalWeight: number
  pallets: number
  rate: number
  documentsStatus: ShipmentDocumentStatus
  trackingDevice: string
  detentionRisk: ShipmentRisk
  lastCheckCall: string
  temperature?: string
  priority: ShipmentPriority
}

export type ShipmentSortPreset =
  | "eta"
  | "progress"
  | "status"
  | "route"
  | "priority"
