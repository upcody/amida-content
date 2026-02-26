import { mkdir, readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import anyAscii from "any-ascii";
import { $ } from "bun";
import * as cheerio from "cheerio";
import pdf2html from "pdf2html";
import TurndownService from "turndown";

const turndown = new TurndownService();
const root = process.cwd();
const dirs = {
  uploads: path.resolve(root, "tours", "uploads"),
  drafts: path.resolve(root, "tours", "drafts"),
};

// Entry point: optional filename arg
const [, , maybeFile] = process.argv;
await mdify(maybeFile);

async function mdify(file?: string) {
  const files = file ? [path.resolve(file)] : await ls(dirs.uploads);
  if (files.length === 0) {
    console.log(`No files found in '${dirs.uploads}'.`);
    return;
  }

  console.log("processing uploads...");
  for (const item of files) {
    if ((await stat(item)).isFile()) {
      await processFile(item);
    }
  }
}

async function ls(dir: string) {
  const names = await readdir(dir);
  return names.map(name => path.resolve(dir, name));
}

async function processFile(input: string) {
  console.log(`processing: ${input}`);
  const file = await normalizeFileName(input);

  const html = await toHtml(file);
  const md = turndown.turndown(html);
  const mdFile = await out(extension(file, "md"));
  await writeFile(mdFile, md);
}

async function toHtml(input: string) {
  const html = await pdf2html.html(await readFile(input));
  const root = cheerio.load(html);
  const body = root("body");

  const { ext } = path.parse(input);
  switch (ext) {
    case ".pdf": {
      let pages = body.children("div.page");
      const totalPages = Number(root('meta[name="xmpTPg:NPages"]').attr("content"));
      if (totalPages > 0) pages = pages.slice(0, totalPages);
      return pages
        .map((_, el) => root.html(el))
        .get()
        .join("\n");
    }
  }

  return body.html() ?? "";
}

async function normalizeFileName(input: string) {
  const parsed = path.parse(input);
  const name = anyAscii(parsed.name).toLowerCase().split(/[ _]/).join("-");

  if (parsed.name !== name) {
    const output = path.format({ ...parsed, base: name + parsed.ext });
    console.log(`renaming '${input}' -> '${output}'`);
    await rename(input, output);
    return output;
  }

  return input;
}

async function _pandoc(input: string, output: string) {
  console.log(`converting '${input}' -> '${output}'`);
  await $`pandoc ${input} -o ${output} --standalone --number-sections --strip-comments`;
  return output;
}

function extension(file: string, ext: string) {
  const { root, dir, name } = path.parse(file);
  return path.format({ root, dir, name, ext, base: `${name}.${ext}` });
}

async function out(file: string) {
  const output = path.resolve(dirs.drafts, path.basename(file));
  await mkdir(path.dirname(output), { recursive: true });
  return output;
}
