#!/usr/bin/env bash
# Small wrapper to avoid Next.js attempting to run `pnpm config get registry` from a child process
# by exporting the registry value into the environment up front.

set -euo pipefail

# Try to read registry from pnpm; fall back to npm config or default registry
REGISTRY=""
if command -v pnpm >/dev/null 2>&1; then
  REGISTRY=$(pnpm config get registry 2>/dev/null || true)
fi
if [ -z "$REGISTRY" ] && command -v npm >/dev/null 2>&1; then
  REGISTRY=$(npm config get registry 2>/dev/null || true)
fi
if [ -z "$REGISTRY" ]; then
  REGISTRY="https://registry.npmjs.org/"
fi

# Export common env vars that some tools probe when spawning child processes.
export NPM_CONFIG_REGISTRY="$REGISTRY"
export npm_config_registry="$REGISTRY"
export PNPM_REGISTRY_CONFIG="$REGISTRY"

# Keep PATH safe: include the user's local bin and pnpm install location
if [ -n "$HOME" ]; then
  # Start with a safe PATH: prefer user-local bin but intentionally exclude pnpm's shim/runtime
  # because Next sometimes spawns `pnpm` with a sanitized environment which can fail.
  # Keep other PATH entries intact but filter out pnpm-specific directories.
  OLD_PATH="$PATH"
  # Build a new PATH that excludes pnpm directories
  NEW_PATH=$(echo "$OLD_PATH" | tr ':' '\n' | grep -v -E "(/?\.local/share/pnpm|/?\.local/bin)" | tr '\n' ':')
  # Prepend common user bin if present (but keep pnpm out)
  if [ -d "$HOME/.local/bin" ]; then
    NEW_PATH="$HOME/.local/bin:$NEW_PATH"
  fi
  export PATH="$NEW_PATH"
fi

# Finally run next dev with any passed args
# Filter out common npm/pnpm runner flags that may be forwarded to scripts
# (for example: `pnpm run dev:fixed --silent` forwards `--silent` which Next
# doesn't understand and will error). We only strip a small, safe set of
# caller-level flags; any other flags will be passed to `next dev`.
NEWARGS=()
PASS_REST=false
for arg in "$@"; do
  if [ "$arg" = "--" ]; then
    PASS_REST=true
    continue
  fi
  if [ "$PASS_REST" = true ]; then
    NEWARGS+=("$arg")
    continue
  fi
  case "$arg" in
    --silent|--silent=*)
      # ignore pnpm/npm --silent
      ;;
    --reporter|--reporter=*|--filter|--filter=*|--dir|--dir=*|--workspace|--workspace=*)
      # ignore common runner flags that are not intended for `next`
      ;;
    *)
      NEWARGS+=("$arg")
      ;;
  esac
done

exec next dev "${NEWARGS[@]}"
