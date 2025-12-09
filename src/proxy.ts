import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import { redis } from './lib/redis';

export const proxy = async (req: NextRequest) => {
	const pathname = req.nextUrl.pathname;
  const roomMatch = pathname.match(/^\/room\/([^\/]+)(\/.*)?$/);

  if (!roomMatch) return NextResponse.next();

  const roomId = roomMatch[1];
  const metaKey = `meta:${roomId}`;

  const meta = await redis.hgetall<{
    connected: string;
    createdAt: number;
  }>(metaKey);

  if (!meta) {
    return NextResponse.redirect(new URL('/?error=room-not-found', req.url));
  }

  let connected: string[] = [];
  try {
    connected = typeof meta.connected === 'string' 
      ? JSON.parse(meta.connected) 
      : (meta.connected || []);
  } catch {
    connected = [];
  }

  const existingToken = req.cookies.get('x-auth-token')?.value;

  if (existingToken && connected.includes(existingToken)) {
    return NextResponse.next();
  }

  if (connected.length >= 2) {
    return NextResponse.redirect(new URL('/?error=room-full', req.url));
  }

  const token = nanoid();
  const response = NextResponse.next();

  response.cookies.set('x-auth-token', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax', 
    secure: process.env.NODE_ENV === 'production',
  });

  const updatedConnected = [...connected, token];
  
  await redis.hset(metaKey, {
    connected: JSON.stringify(updatedConnected),
  });

  return response;
};

export const config = {
	matcher: '/room/:path*',
};
