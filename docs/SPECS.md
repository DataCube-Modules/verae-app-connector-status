# Function specs — connector-status

Specialist: Messaging + host engineer.

## listOutbox / listInbox → JSON filenames

## jobStem(name) → string

## classifyJobs(outboxFiles, inboxFiles) → {pending, acked}
Acked if an inbox name starts with the outbox stem.
