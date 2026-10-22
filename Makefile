.PHONY: help player-up player-down player-restart player-logs player-ps player-check player-deploy

# The dev server has the standalone docker-compose; elsewhere: make COMPOSE="docker compose" …
COMPOSE ?= docker-compose
ENV_FILE ?= .env.player
PLAYER = $(COMPOSE) -p twist-player -f docker-compose.player.yml --env-file $(ENV_FILE)

# ─── Default ────────────────────────────────────────────────────────────────

help:
	@echo ""
	@echo "Twist lesson player — Docker Compose Commands"
	@echo ""
	@echo "  PLAYER (docker-compose.player.yml · login in .env.player · 127.0.0.1:4410)"
	@echo "    make player-up         Start (or recreate after a compose or login change)"
	@echo "    make player-down       Stop and remove the container"
	@echo "    make player-restart    Restart the container (after a serve.mjs change)"
	@echo "    make player-logs       Follow logs (start line only; requests are not logged)"
	@echo "    make player-ps         Show the container and its health"
	@echo "    make player-check      401 without login, 200 with it, on the local port"
	@echo "    make player-deploy     git pull main, restart only if needed, then check"
	@echo ""

# ─── Player ─────────────────────────────────────────────────────────────────

player-up:
	$(PLAYER) up -d

player-down:
	$(PLAYER) down

player-restart:
	$(PLAYER) restart

player-logs:
	$(PLAYER) logs -f

player-ps:
	$(PLAYER) ps

# Reads the login from $(ENV_FILE); the password is never printed.
player-check:
	@set -a; . ./$(ENV_FILE); set +a; \
	url="http://127.0.0.1:$${PLAYER_PORT:-4410}"; code=000; \
	for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do \
	  code=$$(curl -s -o /dev/null -w '%{http_code}' -u "$$TWIST_USER:$$TWIST_PASS" "$$url/pages/player/" || true); \
	  [ "$$code" = 200 ] && break; sleep 1; \
	done; \
	noauth=$$(curl -s -o /dev/null -w '%{http_code}' "$$url/" || true); \
	echo "no login: $$noauth (want 401), login: $$code (want 200)"; \
	[ "$$code" = 200 ] && [ "$$noauth" = 401 ]

# Content is read from disk on every request, so a pull is live at once: the
# container is recreated only when the compose file changed, restarted only
# when serve.mjs changed. The checkout stays on main and is never edited.
player-deploy:
	@set -e; before=$$(git rev-parse HEAD); \
	git pull --ff-only origin main; \
	after=$$(git rev-parse HEAD); \
	echo "deployed: $$(git log --oneline -1)"; \
	changed=$$(git diff --name-only $$before $$after); \
	if echo "$$changed" | grep -qx 'docker-compose.player.yml'; then \
	  echo "compose file changed: recreating"; $(PLAYER) up -d; \
	elif echo "$$changed" | grep -qx 'twist/serve.mjs'; then \
	  echo "serve.mjs changed: restarting"; $(PLAYER) restart; \
	elif [ -z "$$($(PLAYER) ps -q)" ]; then \
	  echo "container not running: starting"; $(PLAYER) up -d; \
	else \
	  echo "content only: no restart needed"; \
	fi
	@$(MAKE) --no-print-directory player-check
