import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const STAFF_PATHS = ["/dashboard", "/pos", "/orders", "/chat", "/menu", "/staff", "/share", "/settings"];

// Dua halaman ini SELALU khusus Owner, tidak pernah bisa diberikan ke kasir
// mana pun lewat izin akses per-akun (lihat lib/types.ts, StaffPageKey
// sengaja tidak menyertakan keduanya).
const OWNER_ONLY_PATHS = ["/staff", "/settings"];

// Menu selain dua di atas, boleh dibatasi per-akun kasir lewat kolom
// profiles.allowed_pages. Urutan array ini juga dipakai sebagai urutan
// prioritas kalau perlu mencari halaman pengganti (lihat resolveFallback).
const PAGE_KEY_BY_PATH: [string, string][] = [
  ["/pos", "pos"],
  ["/dashboard", "dashboard"],
  ["/orders", "orders"],
  ["/chat", "chat"],
  ["/menu", "menu"],
  ["/share", "share"],
];

function resolveFallbackPath(allowedPages: string[] | null | undefined): string {
  // null/undefined = akses default (semua menu di atas boleh) — sama seperti
  // perilaku sebelum fitur izin akses ada.
  if (!allowedPages) return "/dashboard";
  for (const [path, key] of PAGE_KEY_BY_PATH) {
    if (allowedPages.includes(key)) return path;
  }
  // Edge case (seharusnya tidak pernah terjadi karena UI Kelola Staff
  // mewajibkan minimal satu menu dicentang): akun ini tidak diberi akses
  // ke menu mana pun sama sekali.
  return "/login";
}

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
    const pageKeyMatch = PAGE_KEY_BY_PATH.find(([p]) => path.startsWith(p));

    // Cuma perlu query profil kalau halamannya butuh pengecekan (owner-only
    // ATAU salah satu halaman yang bisa dibatasi per-akun).
    if (isOwnerOnly || pageKeyMatch) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, allowed_pages")
        .eq("id", user.id)
        .single();

      const role = profile?.role || "cashier";
      const allowedPages = (profile?.allowed_pages as string[] | null) ?? null;

      if (isOwnerOnly && role !== "owner") {
        const url = request.nextUrl.clone();
        url.pathname = resolveFallbackPath(allowedPages);
        return NextResponse.redirect(url);
      }

      if (pageKeyMatch && role !== "owner" && allowedPages && !allowedPages.includes(pageKeyMatch[1])) {
        const url = request.nextUrl.clone();
        url.pathname = resolveFallbackPath(allowedPages);
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
    "/chat/:path*",
    "/menu/:path*",
    "/staff/:path*",
    "/share/:path*",
    "/settings/:path*",
  ],
};
