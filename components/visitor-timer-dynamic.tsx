"use client";

import dynamic from "next/dynamic";

// VisitorTimer uses setInterval, so it must be client-only (no SSR)
const VisitorTimerInner = dynamic(
  () => import("@/components/visitor-timer").then((m) => m.VisitorTimer),
  { ssr: false },
);

export function VisitorTimerDynamic() {
  return <VisitorTimerInner />;
}
