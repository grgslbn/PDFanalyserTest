import { UploadBillAnalyzer } from "@/components/upload-bill-analyzer"
import Image from "next/image"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="border-b">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6L74KyYfsYqb1ouzbMuJgIw649VWrW.png"
            alt="Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              How it works
            </a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              About
            </a>
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Decorative elements */}
        <div className="absolute top-20 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              Smart Energy Bill Analysis
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Upload your energy bill and get instant insights about your consumption, tariffs, and potential savings.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="px-6 py-3 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors">
                Analyze Your Bill
              </button>
              <button className="px-6 py-3 text-sm font-medium text-primary bg-white border border-primary rounded-full hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Features grid before the upload section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Upload Component */}
          <UploadBillAnalyzer />
        </div>
      </main>
    </div>
  )
}

const features = [
  {
    icon: <span className="text-2xl">⚡</span>,
    title: "Instant Analysis",
    description: "Get detailed insights about your energy consumption and costs in seconds.",
  },
  {
    icon: <span className="text-2xl">💡</span>,
    title: "Smart Recommendations",
    description: "Receive personalized suggestions to optimize your energy usage and reduce costs.",
  },
  {
    icon: <span className="text-2xl">📊</span>,
    title: "Detailed Breakdown",
    description: "View comprehensive breakdown of your tariffs, consumption patterns, and potential savings.",
  },
]

