import { notFound } from 'next/navigation';
import { BentoPage } from '@/components/public/BentoPage';
import prisma from '@/lib/db';
import { Layout, Widget, WidgetData, WidgetStyle } from '@/types';

interface DBWidget {
  id: string;
  bentoId: string;
  type: string;
  data: unknown;
  style: unknown;
  layoutId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { username } = await params;

  try {
    const bento = await prisma.bento.findFirst({
      where: {
        user: { username },
        isPublished: true,
      },
      include: {
        user: {
          select: { name: true, username: true },
        },
      },
    });

    if (!bento) {
      return {
        title: 'Not Found | Bento',
        description: 'This Bento page does not exist.',
      };
    }

    return {
      title: `${bento.user.name || bento.user.username} | Bento`,
      description: `Check out ${bento.user.name || bento.user.username}'s Bento page`,
    };
  } catch {
    return {
      title: 'Bento',
      description: 'Your link in bio',
    };
  }
}

export default async function UserPage({ params }: PageProps) {
  const { username } = await params;

  try {
    const bento = await prisma.bento.findFirst({
      where: {
        user: { username },
        isPublished: true,
      },
      include: {
        user: {
          select: { name: true, username: true, avatar: true, bio: true },
        },
        widgets: true,
      },
    });

    if (!bento) {
      notFound();
    }

    // Increment views
    await prisma.bento.update({
      where: { id: bento.id },
      data: { views: { increment: 1 } },
    });

    const layout = bento.layout as unknown as Layout;
    const widgets: Widget[] = bento.widgets.map((w: DBWidget) => ({
      id: w.layoutId,
      type: w.type as Widget['type'],
      data: w.data as WidgetData,
      style: w.style as WidgetStyle | undefined,
      defaultSize: { w: 2, h: 2 },
    }));

    return (
      <BentoPage
        username={bento.user.username}
        name={bento.user.name || undefined}
        avatar={bento.user.avatar || undefined}
        bio={bento.user.bio || undefined}
        layout={layout}
        widgets={widgets}
        theme={bento.theme as 'light' | 'dark'}
      />
    );
  } catch (error) {
    console.error('Error loading bento page:', error);
    notFound();
  }
}
