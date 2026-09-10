# Git Workflow, Versioning & Changelog Standards

> Source: Integrated governance rules for `IOT-db` (incorporating `git-workflow-and-versioning`, `shipping-and-launch`).

---

## 1. Semantic Versioning 2.0.0 (SemVer)

All deliverables in this repository adhere to [Semantic Versioning 2.0.0](https://semver.org/):
`MAJOR.MINOR.PATCH`

| Level | When to Increment | Examples |
|-------|-------------------|----------|
| **MAJOR** | Breaking architectural or protocol changes | Breaking Modbus register map change, breaking API payload schema without migration, incompatible database schema rewrite. |
| **MINOR** | New functionality in a backward-compatible manner | New sensor driver (e.g. pressure sensor model), new API endpoint, new dashboard view, non-breaking schema column addition. |
| **PATCH** | Backward-compatible bug fixes and small improvements | Telemetry timeout fix, UI layout adjustment, documentation updates, formula calibration fix. |

### Component Version Synchronization

The repository operates as a coordinated monorepo. Component versions must be synchronized or traceable:

1. **Firmware (`firmware/esp32-gateway`)**:
   - Defined in `include/config.h` via `#define FIRMWARE_VERSION "0.1.0"`.
   - Mirrored in `data/config.json` via `"version": "0.1.0"`.
   - Reported to the cloud via the heartbeat endpoint (`POST /v1/heartbeat`).
2. **Cloud API (`apps/api`)**:
   - Defined in `apps/api/package.json` (`"version": "0.1.0"`).
   - Exported in `.env` as `API_VERSION=0.1.0` and reported in `/health`.
3. **Web Dashboard (`apps/web`)**:
   - Defined in `apps/web/package.json` (`"version": "0.1.0"`).
4. **Shared Contracts (`packages/contracts`)**:
   - Defined in `packages/contracts/package.json` (`"version": "0.1.0"`).
5. **Monorepo Root**:
   - Defined in root `package.json` (`"version": "0.1.0"`).

---

## 2. Changelog Standard (Keep a Changelog)

All non-trivial changes must be recorded in [`CHANGELOG.md`](../../CHANGELOG.md) adhering to [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/).

### Required Sections per Release
- `### Added` for new features, drivers, endpoints, or UI components.
- `### Changed` for changes in existing functionality.
- `### Deprecated` for soon-to-be removed features.
- `### Removed` for now removed features.
- `### Fixed` for any bug fixes.
- `### Security` in case of vulnerabilities.

### Rules
- Keep an `## [Unreleased]` section at the top for in-flight work.
- When cutting a release, rename `[Unreleased]` to `[MAJOR.MINOR.PATCH] - YYYY-MM-DD` and initialize a fresh `[Unreleased]` section.
- Write entries in clear, concise human voice (no AI buzzwords).

---

## 3. Git Commit Conventions (Conventional Commits)

Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```text
<type>(<scope>): <short description in present imperative tense>

[optional body explaining rationale, context, and edge cases]

[optional footer: BREAKING CHANGE: ... or Closes #...]
```

### Allowed Types
- `feat`: A new user-facing or system feature.
- `fix`: A bug fix in firmware, API, dashboard, or data pipeline.
- `docs`: Documentation changes only (`README.md`, `CHANGELOG.md`, `docs/`).
- `style`: Code style/formatting changes that do not affect code logic.
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance or decreases resource usage.
- `test`: Adding or correcting tests.
- `build`: Changes affecting the build system or external dependencies (`platformio.ini`, `package.json`).
- `ci`: Changes to CI/CD workflows and configuration.
- `chore`: Maintenance tasks, repo hygiene, rule updates.

### Common Scopes
- `firmware`: ESP32 drivers, FreeRTOS tasks, SPIFFS, Modbus.
- `api`: Hono routes, middleware, services.
- `db`: Drizzle schema, migrations, seeds.
- `web`: SvelteKit components, routes, stores.
- `contracts`: Shared TypeScript types.
- `governance`: Constitution, agent skills, rules.
- `docs`: Architecture specification, guides.

### Commit Quality Gates
1. **Atomic commits**: One cohesive change per commit. Never bundle unrelated firmware driver fixes with web dashboard style changes.
2. **Build and test verification before commit**: Never commit code that fails `pnpm typecheck` or breaks PlatformIO compilation.
3. **No secrets or temporary files**: Ensure `.env`, credentials, build artifacts (`.pio/`, `.svelte-kit/`, `dist/`, `node_modules/`) are strictly excluded.
