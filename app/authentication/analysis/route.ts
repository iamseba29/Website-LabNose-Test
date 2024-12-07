import { NextResponse } from 'next/server'
import * as z from 'zod'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

const analyticsSchema = z.object({
  userId: z.string(),
  eventType: z.string(),
  eventData: z.record(z.unknown()),
})

// Initialize the DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

// Create a DynamoDB document client
const docClient = DynamoDBDocumentClient.from(client)

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

    // Use the PutCommand to add an item to the table
    await docClient.send(new PutCommand(params))

    return NextResponse.json({ message: 'Analytics data stored successfully' })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error storing analytics data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}