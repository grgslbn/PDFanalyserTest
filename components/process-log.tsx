import { Circle, CheckCircle2, XCircle, Timer } from "lucide-react"
import type { LogEntry } from "@/types/bill-analysis"

const LogIcon = ({ type }: { type: LogEntry["type"] }) => {
  switch (type) {
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case "error":
      return <XCircle className="h-4 w-4 text-red-500" />
    case "processing":
      return <Timer className="h-4 w-4 text-blue-500 animate-pulse" />
    default:
      return <Circle className="h-4 w-4 text-gray-400" />
  }
}

export function ProcessLog({ logs }: { logs: LogEntry[] }) {
  if (logs.length === 0) {
    return <div className="text-center text-sm text-gray-500">No logs yet. Upload a bill to start the analysis.</div>
  }

  return (
    <div className="space-y-2">
      {logs.map((log, index) => (
        <div key={index} className="flex items-start gap-2 text-sm">
          <LogIcon type={log.type} />
          <div className="flex-1">
            <span className="text-gray-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
            <span className="ml-2">{log.message}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

