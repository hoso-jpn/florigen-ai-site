import { NextResponse } from "next/server";

export function proxy(request) {
  const basicAuth = request.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = Buffer.from(authValue, "base64").toString().split(":");

    if (user === process.env.SITE_USER && pwd === process.env.SITE_PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Florigen AI"',
    },
  });
}

export const config = {
  // 静的アセット（_next配下・favicon類）は除外し、それ以外の全パスを保護
  matcher: "/((?!_next/static|_next/image|favicon\\.ico).*)",
};
