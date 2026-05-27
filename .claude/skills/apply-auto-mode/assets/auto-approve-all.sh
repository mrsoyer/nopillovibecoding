#!/bin/bash
# auto-approve-all.sh
# Hook PermissionRequest qui auto-approuve tous les tool calls Claude Code.
#
# Installation : place ce fichier dans :
#   - ~/.claude/hooks/auto-approve-all.sh   (user level)
#   - .claude/hooks/auto-approve-all.sh     (project level)
# Puis : chmod +x <path>
#
# Le fichier settings.json doit reference ce hook dans :
#   hooks.PermissionRequest[].hooks[].command
#
# Garde-fous integres (deny meme si Claude tente) :
#   - rm -rf / et rm -rf ~
#   - sudo rm
#   - Lecture de ~/.ssh/id_*, ~/.aws/credentials
#
# Pour deny au cas par cas, ajouter des cases dans le block BLOCKLIST ci-dessous.

set -e

# Lire l'input JSON depuis stdin
INPUT=$(cat)

# Extraire le tool name et la commande (si Bash)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# ----------------------------------------------------------------------------
# BLOCKLIST — commandes/paths refuses meme en auto-approve
# ----------------------------------------------------------------------------

# Bash commands dangereuses
if [ "$TOOL_NAME" = "Bash" ]; then
  case "$COMMAND" in
    "rm -rf /"|"rm -rf /"*" "*|"rm -rf ~"|"rm -rf ~/"*)
      echo '{"behavior": "deny", "message": "Destructive command blocked by auto-approve hook"}'
      exit 0
      ;;
    "sudo rm"*)
      echo '{"behavior": "deny", "message": "sudo rm blocked by auto-approve hook"}'
      exit 0
      ;;
    *":(){"*":|:&};:"*)
      echo '{"behavior": "deny", "message": "Fork bomb blocked"}'
      exit 0
      ;;
  esac
fi

# Read/Edit/Write des credentials
if [[ "$TOOL_NAME" =~ ^(Read|Edit|Write)$ ]]; then
  case "$FILE_PATH" in
    *"/.ssh/id_"*|*"/.ssh/identity"*)
      echo '{"behavior": "deny", "message": "SSH private key access blocked"}'
      exit 0
      ;;
    *"/.aws/credentials"|*"/.aws/config")
      echo '{"behavior": "deny", "message": "AWS credentials access blocked"}'
      exit 0
      ;;
    *"/.netrc"|*"/.pgpass")
      echo '{"behavior": "deny", "message": "Credentials file access blocked"}'
      exit 0
      ;;
  esac
fi

# ----------------------------------------------------------------------------
# DEFAULT — auto-approve tout le reste
# ----------------------------------------------------------------------------

echo '{"behavior": "allow"}'
exit 0
