# Developer reference — verae-app-connector-status

## Layout

```
peergos-app.json
assets/index.html
assets/sdk.js
src/peergos-sdk.mjs
src/lib.mjs
tests/lib.test.mjs
tests/certify-peergos.sh
```

## Integration

Sandbox `fetch` → `/peergos-api/v0/data`.  
Outbox JSON → connector → NATS (`verae-nats-bus/schemas/subjects.json`).  
Inbox JSON → app lists `/inbox/`.

## Tests

`make test` runs Node unit tests against an in-memory `fetch`.  
`make certify` adds Peergos compliance (manifest bounds, no NATS/WebSocket).

# Function specs — connector-status

Specialist: Messaging + host engineer.

## listOutbox / listInbox → JSON filenames

## jobStem(name) → string

## classifyJobs(outboxFiles, inboxFiles) → {pending, acked}
Acked if an inbox name starts with the outbox stem.

