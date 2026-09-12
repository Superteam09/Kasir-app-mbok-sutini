import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const STAFF_PATHS = ["/dashboard", "/pos", "/orders", "/menu", "/staff", "/share", "/settings"];
const OWNER_ONLY_PATHS = ["/menu", "/staff", "/settings"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isStaffPath = STAFF_PATHS.some((p) => path.startsWith(p));

  if (isStaffPath) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", path);
      return NextResponse.redirect(url);
    }

    const isOwnerOnly = OWNER_ONLY_PATHS.some((p) => path.startsWith(p));
    if (isOwnerOnly) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "owner") {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/pos/:path*",
    "/orders/:path*",
    "/menu/:path*",
    "/staff/:path*",
    "/share/:path*",
    "/settings/:path*",
  ],
};
