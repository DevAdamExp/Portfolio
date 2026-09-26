// Renders /resume to a PDF in /public so the "Download CV" buttons serve an
// up-to-date file. Run after a production build:
//
//   npm run build && npm run cv:pdf
//
// Uses your installed Google Chrome. Set CHROME_PATH to use another Chromium.
import { spawn } from "node:child_process";
import { chromium } from "playwright-core";

const PORT = 3999;
const OUTPUT = process.argv[2] ?? "public/Muhammad-Adam-CV.pdf";

const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)], {
  stdio: "ignore",
});
const stop = () => server.kill();
process.on("exit", stop);

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server did not start at ${url}. Did you run "npm run build" first?`);
}

try {
  await waitForServer(`http://localhost:${PORT}/resume`);

  const browser = await chromium.launch(
    process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" },
  );
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}/resume`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print" });
  const pdf = await page.pdf({ path: OUTPUT, preferCSSPageSize: true, printBackground: true, tagged: true });
  await browser.close();

  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  console.log(`Saved ${OUTPUT} (${pages} page${pages === 1 ? "" : "s"})`);
  if (pages > 1) console.warn("The CV runs over one page. Trim a few bullets for a one-page CV.");
} finally {
  stop();
}
