"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function AnalyticsPlaceholder() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const event = new CustomEvent("portfolio:pageview", {
      detail: {
        pathname,
        query: searchParams.toString(),
      },
    });

    window.dispatchEvent(event);
  }, [pathname, searchParams]);

  return null;
}
