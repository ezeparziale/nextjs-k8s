import { NextRequest } from "next/server"
import Redis from "ioredis"
import { getClientInfoTag } from "@/lib/get-client-info-tag"

export async function GET(req: NextRequest) {
  const token = req.headers.get("x-api-key")

  if (token === process.env.X_API_KEY) {
    const client = new Redis(process.env.REDIS_URL!, {
      clientInfoTag: getClientInfoTag(),
    })

    await client.flushall()

    await client.quit()

    return Response.json({ message: "Redis cleaned" }, { status: 200 })
  }

  return Response.json({ message: "Unauthorized" }, { status: 401 })
}
