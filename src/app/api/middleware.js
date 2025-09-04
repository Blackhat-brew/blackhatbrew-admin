// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const origin = req.headers.get("origin");

  // Clone the response and modify the headers
  const res = NextResponse.next();

  // Set the CORS headers
  res.headers.set("Access-Control-Allow-Origin", origin || "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Return the modified response
  return res;
}

export const config = {
  matcher: "/api/:path*", // Apply to all API routes
};
