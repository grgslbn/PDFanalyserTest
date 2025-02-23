"use client"

import { useCallback, useState, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Upload } from "lucide-react"
import type { BillAnalysis, LogEntry } from "@/types/bill-analysis"
import { AnalysisResults } from "./analysis-results"
import { ProcessLog } from "./process-log"

export function UploadBillAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<BillAnalysis | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const logsRef = useRef<LogEntry[]>([])

  const addLog = useCallback((message: string, type: LogEntry["type"] = "info") => {
    logsRef.current = [
      ...logsRef.current,
      {
        timestamp: new Date().toISOString(),
        message,
        type,
      },
    ]
    setLogs(logsRef.current)
  }, [])

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const pdf = acceptedFiles[0]
      if (!pdf) return

      setFile(pdf)
      setAnalysis(null)
      setLogs([])
      logsRef.current = []
      addLog(`File "${pdf.name}" received`, "info")

      try {
        setIsAnalyzing(true)
        addLog("Starting bill analysis...", "processing")

        const formData = new FormData()
        formData.append("file", pdf)

        const response = await fetch("/api/analyze", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Analysis failed")

        const result = await response.json()
        setAnalysis(result)
        addLog("Analysis completed successfully", "success")
      } catch (error) {
        addLog("Error analyzing bill: " + (error as Error).message, "error")
      } finally {
        setIsAnalyzing(false)
      }
    },
    [addLog],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  })

  return (
    <div className="grid gap-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="relative overflow-hidden border-2 hover:border-accent transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -translate-y-16 translate-x-16" />
          <CardHeader>
            <CardTitle className="text-2xl">Upload Bill</CardTitle>
            <CardDescription>Drop your energy bill PDF here for analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragActive
                  ? "border-accent bg-accent/5 scale-98"
                  : "border-gray-200 hover:border-accent hover:bg-accent/5"
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {isDragActive ? "Drop your PDF here" : "Drag and drop your PDF here"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">or click to select</p>
                </div>
              </div>
            </div>
            {file && (
              <div className="mt-4 p-4 rounded-lg bg-gray-50 flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-medium">{file.name}</span>
              </div>
            )}
            {isAnalyzing && (
              <div className="mt-4">
                <Progress value={30} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">Analyzing your bill...</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Process Log</CardTitle>
            <CardDescription>Real-time analysis progress and details</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] rounded-xl border bg-gray-50 p-4">
              <ProcessLog logs={logs} />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {analysis && (
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Analysis Results</CardTitle>
            <CardDescription>Extracted information from your energy bill</CardDescription>
          </CardHeader>
          <CardContent>
            <AnalysisResults analysis={analysis} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

