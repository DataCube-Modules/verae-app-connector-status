import assert from "node:assert/strict";
import { createClient, createMemoryFetch } from "../src/peergos-sdk.mjs";
import { listOutbox, listInbox, classifyJobs, jobStem } from "../src/lib.mjs";

const fetchImpl = createMemoryFetch();
const client = createClient(fetchImpl);
await client.writeJSON("/outbox/job1.json", { subject: "verae.ts.request" });
await client.writeJSON("/outbox/job2.json", { subject: "verae.ts.request" });
await client.writeJSON("/inbox/job1.reply.json", { hash: "x" });
assert.deepEqual(await listOutbox(client), ["job1.json", "job2.json"]);
assert.deepEqual(await listInbox(client), ["job1.reply.json"]);
assert.equal(jobStem("job1.json"), "job1");
const cls = classifyJobs(["job1.json", "job2.json"], ["job1.reply.json"]);
assert.deepEqual(cls.acked, ["job1.json"]);
assert.deepEqual(cls.pending, ["job2.json"]);
console.log("connector-status tests ok");
