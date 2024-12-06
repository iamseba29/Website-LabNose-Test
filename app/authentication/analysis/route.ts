import { NextResponse } from 'next/server'
import * as z from 'zod'
import { DynamoDB } from 'aws-sdk'

const analyticsSchema = z.object({
  userId: z.string(),
  eventType: z.string(),
  eventData: z.record(z.unknown()),
})

const dynamoDB = new DynamoDB.DocumentClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, eventType, eventData } = analyticsSchema.parse(body)

    const params = {
      TableName: 'Analytics',
      Item: {
        userId,
        eventType,
        eventData,
        timestamp: Date.now(),
      },
    }

    await dynamoDB.put(params).promise()

    return NextResponse.json({ message: 'Analytics data stored successfully' })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}