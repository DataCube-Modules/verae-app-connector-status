/**
 * listOutbox / listInbox — JSON names under those folders.
 */
export async function listOutbox(client) {
  const listing = await client.list("/outbox");
  return listing.files.filter((f) => f.endsWith(".json")).sort();
}

export async function listInbox(client) {
  const listing = await client.list("/inbox");
  return listing.files.filter((f) => f.endsWith(".json")).sort();
}

/**
 * jobStem
 * Input: filename
 * Output: stem without .json and trailing -export|-verify|-ts
 */
export function jobStem(name) {
  return String(name || "").replace(/\.json$/, "");
}

/**
 * classifyJobs
 * Input: outbox names[], inbox names[]
 * Output: {pending, acked}
 * Behavior: outbox job is acked if any inbox file starts with the same stem
 * or equals reply_file pattern `<stem>.` prefix.
 */
export function classifyJobs(outboxFiles, inboxFiles) {
  const inbox = inboxFiles || [];
  const pending = [];
  const acked = [];
  for (const f of outboxFiles || []) {
    const stem = jobStem(f);
    const done = inbox.some((i) => i === f || i.startsWith(stem) || jobStem(i).startsWith(stem.split("-")[0]));
    (done ? acked : pending).push(f);
  }
  return { pending, acked };
}
