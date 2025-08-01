import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

const s3 = new S3Client({
  region: 'us-east-2', // Replace with your actual region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  const Bucket = 'labnose-data';
  const Prefix = 'voc-data/';
  const maxFiles = 20;

  try {
    const listCommand = new ListObjectsV2Command({
      Bucket,
      Prefix,
      MaxKeys: 100,
    });

    const listResponse = await s3.send(listCommand);

    if (!listResponse.Contents || listResponse.Contents.length === 0) {
      return NextResponse.json({ data: [] });
    }

    const sorted = listResponse.Contents
      .filter((obj) => obj.Key && obj.LastModified)
      .sort(
        (a, b) =>
          (b.LastModified?.getTime() || 0) - (a.LastModified?.getTime() || 0)
      )
      .slice(0, maxFiles);

    const data = await Promise.all(
      sorted.map(async (file) => {
        const command = new GetObjectCommand({ Bucket, Key: file.Key! });
        const response = await s3.send(command);
        const body = await response.Body?.transformToString();
        return JSON.parse(body || '{}');
      })
    );

    return NextResponse.json({ data: data.reverse() }); // Oldest → Newest
  } catch (err: any) {
    console.error('Error fetching VOC data:', err);
    return NextResponse.json(
      { error: 'Failed to fetch VOC data from S3' },
      { status: 500 }
    );
  }
}
