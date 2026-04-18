#!/usr/bin/env node

process.env.NEXT_TELEMETRY_DISABLED = "1";

const extraArgs = process.argv.slice(2);
process.argv = [process.argv[0], process.argv[1], "build", "--webpack", ...extraArgs];

await import("next/dist/bin/next");
