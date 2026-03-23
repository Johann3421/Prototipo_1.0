import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret || !token || token !== adminSecret) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
