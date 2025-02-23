export interface BillAnalysis {
  clientDetails: {
    name: string
    accountNumber: string
    address: string
  }
  providerDetails: {
    name: string
    contactInfo: string
  }
  tariffDetails: {
    name: string
    rate: string
    standingCharge: string
  }
  consumption: {
    yearly: number
    unit: string
  }
}

export interface LogEntry {
  timestamp: string
  message: string
  type: "info" | "success" | "error" | "processing"
}

