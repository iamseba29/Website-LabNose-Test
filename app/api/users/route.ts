import { NextResponse } from 'next/server';
import { dynamoDb } from '@/lib/dynamodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const params = {
    TableName: 'Users',
    Key: { email }
  };

  try {
    const result = await dynamoDb.get(params).promise();
    if (result.Item) {
      return NextResponse.json(result.Item);
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('DynamoDB error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.email || !body.name) {
    return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
  }

  const params = {
    TableName: 'Users',
    Item: {
      email: body.email,
      name: body.name,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDb.put(params).promise();
    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    console.error('DynamoDB error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}