import { anthropic } from "@ai-sdk/anthropic"
import { generateObject } from "ai"
import { z } from "zod"

const billAnalysisSchema = z.object({
  clientDetails: z.object({
    name: z.string(),
    accountNumber: z.string(),
    address: z.string(),
  }),
  providerDetails: z.object({
    name: z.string(),
    contactInfo: z.string(),
  }),
  tariffDetails: z.object({
    name: z.string(),
    rate: z.string(),
    standingCharge: z.string(),
  }),
  consumption: z.object({
    yearly: z.number(),
    unit: z.string(),
  }),
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return new Response("No file provided", { status: 400 })
    }

    const result = await generateObject({
      model: anthropic("claude-3-5-sonnet-latest"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this energy bill and extract the following information: client details (name, account number, address), provider details (name, contact information), tariff details (name, rate, standing charge), and estimated yearly consumption. Format the response according to the schema.",
            },
            {
              type: "file",
              data: await file.arrayBuffer(),
              mimeType: "application/pdf",
            },
          ],
        },
      ],
      schema: billAnalysisSchema,
    })

    return Response.json(result.object)
  } catch (error) {
    console.error("Analysis error:", error)
    return new Response("Error analyzing bill", { status: 500 })
  }
}

