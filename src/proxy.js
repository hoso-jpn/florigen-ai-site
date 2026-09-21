import { NextResponse } from "next/server";
import { isAuthorized } from "./lib/basic-auth.mjs";

export function proxy(request) {
  if (isAuthorized(request.headers.get("authorization"), process.env.SITE_USER, process.env.SITE_PASSWORD)) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Florigen AI", charset="UTF-8"',
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export const config = {
  // 静的アセット（_next配下・favicon類）は除外し、それ以外の全パスを保護
  matcher: "/((?!_next/static/|_next/image(?:/|$)|favicon\\.ico$).*)",
};
