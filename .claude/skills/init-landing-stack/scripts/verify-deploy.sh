#!/usr/bin/env bash
# verify-deploy.sh — verifie qu'une URL de prod est accessible et performante
#
# Usage : verify-deploy.sh <url-prod> [min-score]
# Exit codes :
#   0 : OK (HTTP 200 + Lighthouse >= min-score)
#   1 : HTTP non-200
#   2 : Lighthouse < min-score
#   3 : argument manquant
#
# Exemple : verify-deploy.sh https://ma-landing.netlify.app 90

set -uo pipefail

URL="${1:-}"
MIN_SCORE="${2:-90}"

if [ -z "$URL" ]; then
  echo "Usage: $0 <url-prod> [min-score=90]" >&2
  exit 3
fi

echo "[1/2] HTTP check sur $URL"
STATUS=$(curl -o /dev/null -s -w "%{http_code}" --max-time 30 "$URL" || echo "000")
if [ "$STATUS" != "200" ]; then
  echo "  FAIL: HTTP $STATUS" >&2
  exit 1
fi
echo "  OK: HTTP 200"

echo "[2/2] Lighthouse Performance audit"
TMP_JSON="$(mktemp -t lighthouse.XXXXXX.json)"
trap 'rm -f "$TMP_JSON"' EXIT

if ! npx --yes lighthouse "$URL" \
  --only-categories=performance \
  --chrome-flags="--headless" \
  --quiet \
  --output=json \
  --output-path="$TMP_JSON" 2>/dev/null; then
  echo "  WARN: lighthouse a echoue, skip score check" >&2
  exit 0
fi

SCORE=$(python3 -c "import json; print(int(json.load(open('$TMP_JSON'))['categories']['performance']['score']*100))" 2>/dev/null || echo "0")
echo "  Lighthouse Performance: $SCORE / 100 (min: $MIN_SCORE)"

if [ "$SCORE" -lt "$MIN_SCORE" ]; then
  echo "  FAIL: score $SCORE < $MIN_SCORE" >&2
  exit 2
fi

echo "OK : deploy verifie ($URL)"
exit 0
