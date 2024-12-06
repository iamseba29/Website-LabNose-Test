import { NextResponse } from 'next/server'
import * as z from 'zod'
import bcrypt from 'bcrypt'
import { DynamoDB } from 'aws-sdk'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const dynamoDB = new DynamoDB.DocumentClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = loginSchema.parse(body)

    // Fetch user from DynamoDB
    const params = {
      TableName: 'Users',
      Key: { email },
    }

    const result = await dynamoDB.get(params).promise()
    const user = result.Item

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Here you would typically create and return a JWT token
    return NextResponse.json({ message: 'Login successful' })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}