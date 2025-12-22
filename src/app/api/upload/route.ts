import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@/lib/auth';
// import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // TODO: Implement authentication check
    // const session = await auth();
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validation
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
    ];

    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // TODO: Implement actual file upload to cloud storage
    // For now, return a placeholder response
    // In production, you would upload to:
    // - Vercel Blob
    // - AWS S3
    // - Cloudflare R2
    // - Supabase Storage

    // Example with Vercel Blob:
    // import { put } from '@vercel/blob';
    // const blob = await put(file.name, file, {
    //   access: 'public',
    //   addRandomSuffix: true,
    // });
    // return NextResponse.json({ url: blob.url });

    // Placeholder response
    return NextResponse.json({
      error: 'Upload not configured. Please set up cloud storage.',
      info: 'You can use a URL directly in the image widget for now.',
    }, { status: 501 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
