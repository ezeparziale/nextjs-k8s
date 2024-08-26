import { NextRequest } from "next/server"
import { createClient, RedisFlushModes } from "redis"

export async function GET(req: NextRequest) {
  const token = req.headers.get("x-api-key")

  if (token === process.env.X_API_KEY) {
    const client = createClient({
      url: process.env.REDIS_URL,
    })

    await client.connect()

    await client.flushAll(RedisFlushModes.ASYNC)

    await client.quit()

    return Response.json({ message: "Redis cleaned" }, { status: 200 })
  }

  return Response.json({ message: "Unauthorized" }, { status: 401 })
}
