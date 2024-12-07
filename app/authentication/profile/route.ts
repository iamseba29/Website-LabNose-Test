import { NextResponse } from 'next/server'
import * as z from 'zod'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'

const profileSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  deviceId: z.string().optional(),
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    const params = {
      TableName: 'Users',
      Key: { email },
    }

    const result = await docClient.send(new GetCommand(params))
    const user = result.Item

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Remove sensitive information before sending the response
    const { password, ...userProfile } = user

    return NextResponse.json(userProfile)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, name, deviceId } = profileSchema.parse(body)

    const params = {
      TableName: 'Users',
      Key: { email },
      UpdateExpression: 'set #name = :name, deviceId = :deviceId',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': name ?? null,
        ':deviceId': deviceId ?? null,
      },
      ReturnValues: 'ALL_NEW' as const,
    }

    const result = await docClient.send(new UpdateCommand(params))
    const updatedUser = result.Attributes

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Remove sensitive information before sending the response
    const { password, ...updatedProfile } = updatedUser

    return NextResponse.json(updatedProfile)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error updating user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}