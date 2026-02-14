"use client";

import { useEffect, useState } from "react";

type HeroRoleRotatorProps = {
  roles: readonly string[];
  intervalMs?: number;
};

export function HeroRoleRotator({
  roles,
  intervalMs = 2300,
}: HeroRoleRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (roles.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [intervalMs, roles.length]);

  return (
    <span className="role-switch-track" aria-live="polite">
      <span key={roles[index]} className="role-switch-word">
        {roles[index]}
      </span>
    </span>
  );
}
