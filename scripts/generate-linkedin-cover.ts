import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { generateLinkedInCover } from "../src/lib/linkedin-cover-image";

async function main() {
  const out = join(process.cwd(), "public/linkedin-cover.png");
  const buffer = Buffer.from(await generateLinkedInCover().then((r) => r.arrayBuffer()));
  writeFileSync(out, buffer);
  console.log(`Wrote ${out} (${buffer.length} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
