import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminSecret = process.env.ADMIN_SECRET ?? '';

    if (!adminSecret) {
      return NextResponse.json({ error: 'Panel no configurado' }, { status: 503 });
    }

    // Timing-safe comparison to prevent timing attacks
    const inputBuf = Buffer.from(String(password ?? ''));
    const secretBuf = Buffer.from(adminSecret);

    const valid =
      inputBuf.length === secretBuf.length &&
      crypto.timingSafeEqual(inputBuf, secretBuf);

    if (!valid) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set('admin_token', adminSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8, // 8 horas
      path: '/',
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete('admin_token');
  return response;
}
