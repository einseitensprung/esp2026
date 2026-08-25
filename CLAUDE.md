# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Static one-page website for **einseitensprung** (Stephan Fössl) — plain HTML5/CSS3/JavaScript, no build step. See `README.md` for full project details.

## Auto-commit & auto-push policy

**All changes made in this repository must be automatically committed and pushed to GitHub — no confirmation needed.**

- After making any change to files in this repo (edits, additions, deletions), immediately:
  1. `git add` the changed files
  2. Create a commit with a clear, concise message describing the change
  3. `git push` to the remote (`origin`)
- Do not wait for the user to ask "please commit" or "please push" — this repo overrides the usual default of asking first.
- Still use good judgment on commit granularity (one logical change per commit) and write meaningful commit messages.
- Do not force-push. Do not rewrite history. Do not skip hooks (`--no-verify`).
- If a push fails (e.g. diverged history), pull/rebase first rather than force-pushing, and let the user know if manual intervention is needed.
- Never commit secrets, credentials, or `.env` files.
