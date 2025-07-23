import { $ } from "bun";

async function check(): Promise<boolean> {
  try {
    const { exitCode } = await $`pandoc --version`.quiet();
    return exitCode === 0;
  } catch {
    return false;
  }
}

if (!(await check())) {
  console.error("Error: Pandoc is not installed. Please install pandoc first.");
  console.error("Installation instructions: https://pandoc.org/installing.html");
  process.exit(1);
}
