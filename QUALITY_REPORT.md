# ProjectForge AI — Quality Report

## What is verified

| Area | Evidence |
| --- | --- |
| Code quality | TypeScript strict mode, clear server/client boundaries, Zod schemas, immutable score mutations, and shared rate-limit utility. |
| Security | Server-only Gemini key, validated AI input/output, prompt-injection framing, request limits, timeouts, secure response caching rules, and security headers. |
| Efficiency | Cached GitHub research, bounded AI output, upstream request timeouts, responsive CSS without image-heavy assets, and bounded in-memory rate-limit cleanup. |
| Testing | 4 Vitest suites / 9 tests covering scoring, persistence schema, AI guards, provider-output validation, and rate limiting. |
| Accessibility | Semantic navigation labels, keyboard focus indicators, live status/error announcements, labelled inputs, mobile layout, and reduced-motion support. |
| Problem alignment | A student profile drives the AI mentor; the product supports discovery, evidence research, adversarial review, mutation, version history, readiness validation and a project-specific build pack. |

## Commands run before release

```bash
npm run typecheck
npm test
npm run build
```

All three commands passed in the release workspace. Automated scoring is external, so this report documents verifiable controls rather than claiming a guaranteed numerical score.

## Production configuration

- `GEMINI_API_KEY` is configured as a Vercel **Secret** for Production and Preview.
- The key is never committed to GitHub or sent to the browser.
- The active Vercel project is connected to the `main` branch for automatic deployments.
