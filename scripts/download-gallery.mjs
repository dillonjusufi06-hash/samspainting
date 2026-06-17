import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projects = [
  { id: "project-1", url: "https://i.imgur.com/V4Zenes.jpeg" },
  { id: "project-2", url: "https://i.imgur.com/HjbsRn1.jpeg" },
  { id: "project-3", url: "https://i.imgur.com/gEcyqlo.jpeg" },
  { id: "project-4", url: "https://i.imgur.com/CXopZpU.jpeg" },
  { id: "project-6", url: "https://i.imgur.com/q3l77CF.png" },
  { id: "project-7", url: "https://i.imgur.com/JsGQKnE.png" },
  { id: "project-8", url: "https://i.imgur.com/xqU3aOp.jpeg" },
  { id: "project-9", url: "https://i.imgur.com/4c1vAQI.jpeg" },
  { id: "project-10", url: "https://i.imgur.com/voeCG8X.png" },
  { id: "project-11", url: "https://i.imgur.com/X0SN4kK.png" },
  { id: "project-12", url: "https://i.imgur.com/o0oq3Ma.jpeg" },
  { id: "project-13", url: "https://i.imgur.com/Bkh6jte.jpeg" },
  { id: "project-14", url: "https://i.imgur.com/sHCligV.jpeg" },
  { id: "project-15", url: "https://i.imgur.com/XDFLr3O.jpeg" },
  { id: "project-16", url: "https://i.imgur.com/Vyuh1We.jpeg" },
];

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "gallery");

await mkdir(outDir, { recursive: true });

for (const project of projects) {
  const ext = path.extname(new URL(project.url).pathname).toLowerCase() || ".jpeg";
  const filename = `${project.id}${ext}`;
  const dest = path.join(outDir, filename);

  const response = await fetch(project.url);
  if (!response.ok) {
    throw new Error(`Failed to download ${project.url}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(dest, buffer);
  console.log(`Saved ${filename} (${buffer.length} bytes)`);
}

console.log(`Done. ${projects.length} images in public/gallery/`);
