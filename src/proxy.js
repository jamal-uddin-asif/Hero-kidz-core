import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoutes = ["/cart", "/dashboard", "/checkout", '/myOrders'];

export async function proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = Boolean(token);
  const reqPath = req.nextUrl.pathname;
  const isPrivateReq = privateRoutes.some((route) => reqPath.startsWith(route));
  // console.log({ token, isAuthenticated, reqPath, isPrivateReq });

  if (!isAuthenticated && isPrivateReq) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${reqPath}`, req.url),
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/dashboard/:path*", "/checkout/:path*", "/myOrders/:path*"],
};
