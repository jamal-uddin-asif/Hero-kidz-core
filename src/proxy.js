import { NextResponse } from "next/server";

const privateRoutes = ["/cart", "/dashboard", "/checkout"];

export async function proxy(request) {
  return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: ["/cart", "/dashboard", "/checkout"],
};
