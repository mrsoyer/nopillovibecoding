#!/usr/bin/env bash
# test-form-submission.sh — POST sur l'Edge Function contact-form et verifie la reponse
#
# Usage : test-form-submission.sh <supabase-url> <anon-key>
# Exemple : test-form-submission.sh https://abc.supabase.co eyJ...
#
# Exit codes :
#   0 : OK (form retourne {"ok":true})
#   1 : reponse inattendue
#   2 : connection refused / timeout
#   3 : argument manquant

set -uo pipefail

SB_URL="${1:-}"
ANON="${2:-}"

if [ -z "$SB_URL" ] || [ -z "$ANON" ]; then
  echo "Usage: $0 <supabase-url> <anon-key>" >&2
  exit 3
fi

TEST_EMAIL="test+initskill-$(date +%s)@example.com"
ENDPOINT="${SB_URL%/}/functions/v1/contact-form"

echo "[1/2] POST $ENDPOINT"
echo "      Email de test: $TEST_EMAIL"

RES=$(curl -s -w "\n%{http_code}" --max-time 30 -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "apikey: $ANON" \
  -H "Authorization: Bearer $ANON" \
  -d "{\"email\":\"$TEST_EMAIL\",\"name\":\"Init Test\",\"source\":\"skill-init\"}" 2>&1)

if [ $? -ne 0 ]; then
  echo "  FAIL: erreur reseau" >&2
  exit 2
fi

HTTP_CODE=$(echo "$RES" | tail -n1)
BODY=$(echo "$RES" | sed '$d')

echo "      HTTP $HTTP_CODE"
echo "      Body: $BODY"

echo "[2/2] Verification du resultat"
if echo "$BODY" | grep -q '"ok":true'; then
  echo "  OK: form submission reussie"
  echo "  Email de test utilise: $TEST_EMAIL (visible dans Supabase table public.leads)"
  exit 0
fi

echo "  FAIL: reponse inattendue" >&2
exit 1
