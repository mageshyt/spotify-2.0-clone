import { getToken } from "next-auth/jwt";

import { NextResponse } from "next/server";

export async function middleware(req) {
  // *Token will work only when user login
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;
  console.log(pathname);
  // ! Allow the request is true
  //* 1 --> if token exist
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // * 2 -->  Redirect them to login page if token not exist and requesting a protected route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login ");
  }
}
