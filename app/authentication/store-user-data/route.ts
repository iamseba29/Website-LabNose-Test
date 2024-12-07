import { NextResponse } from 'next/server'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const docClient = DynamoDBDocumentClient.from(client)

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json()

    const params = {
      TableName: process.env.USERS_TABLE_NAME,
      Item: {
        email,
        name,
        createdAt: new Date().toISOString(),
      },
    }

    await docClient.send(new PutCommand(params))

    return NextResponse.json({ message: 'User data stored successfully' })
  } catch (error) {
    console.error('Error storing user data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}