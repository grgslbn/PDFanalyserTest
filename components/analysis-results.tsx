import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Building2, Zap, Battery } from "lucide-react"
import type { BillAnalysis } from "@/types/bill-analysis"

export function AnalysisResults({ analysis }: { analysis: BillAnalysis }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index} className="relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full -translate-y-12 translate-x-12" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">{card.render(analysis)}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const cards = [
  {
    title: "Client Details",
    icon: User,
    render: (analysis: BillAnalysis) => (
      <>
        <p className="text-sm font-medium">{analysis.clientDetails.name}</p>
        <p className="text-xs text-muted-foreground">Acc: {analysis.clientDetails.accountNumber}</p>
        <p className="text-xs text-muted-foreground">{analysis.clientDetails.address}</p>
      </>
    ),
  },
  {
    title: "Provider Details",
    icon: Building2,
    render: (analysis: BillAnalysis) => (
      <>
        <p className="text-sm font-medium">{analysis.providerDetails.name}</p>
        <p className="text-xs text-muted-foreground">{analysis.providerDetails.contactInfo}</p>
      </>
    ),
  },
  {
    title: "Tariff Details",
    icon: Zap,
    render: (analysis: BillAnalysis) => (
      <>
        <p className="text-sm font-medium">{analysis.tariffDetails.name}</p>
        <p className="text-xs text-muted-foreground">Rate: {analysis.tariffDetails.rate}</p>
        <p className="text-xs text-muted-foreground">Standing Charge: {analysis.tariffDetails.standingCharge}</p>
      </>
    ),
  },
  {
    title: "Yearly Consumption",
    icon: Battery,
    render: (analysis: BillAnalysis) => (
      <>
        <p className="text-2xl font-bold">{analysis.consumption.yearly.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">{analysis.consumption.unit}</p>
      </>
    ),
  },
]

