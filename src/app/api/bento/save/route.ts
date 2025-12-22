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

    const body = await request.json();
    const { layout, widgets, theme } = body;

    // TODO: Save to database when auth is configured
    // await prisma.bento.upsert({
    //   where: { userId: session.user.id },
    //   update: {
    //     layout,
    //     theme,
    //     widgets: {
    //       deleteMany: {},
    //       create: widgets.map((w: any) => ({
    //         type: w.type,
    //         data: w.data,
    //         style: w.style,
    //         layoutId: w.id,
    //       })),
    //     },
    //   },
    //   create: {
    //     userId: session.user.id,
    //     layout,
    //     theme,
    //     widgets: {
    //       create: widgets.map((w: any) => ({
    //         type: w.type,
    //         data: w.data,
    //         style: w.style,
    //         layoutId: w.id,
    //       })),
    //     },
    //   },
    // });

    // For now, just acknowledge the save (data is persisted in localStorage via Zustand)
    console.log('Bento save request:', { layout: layout.length, widgets: widgets.length, theme });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save bento:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
