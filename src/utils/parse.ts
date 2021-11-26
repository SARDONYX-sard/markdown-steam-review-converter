import * as mume from "@shd101wyy/mume";
import * as path from "path";
import * as os from "os";
import * as fs from "fs/promises";

import { glob } from "glob";
import type { IOptions } from "glob";
import { convertHTML } from "./converter";
import { Options } from "./types";

export async function htmlExport(file: string, markdownOptions: Options) {
  let { outputFilename, isHtml } = markdownOptions;
  outputFilename = outputFilename || `${file}-out.txt`;
  isHtml = false;

  const configPath = path.resolve(os.tmpdir(), ".mume");

  // if no configPath is specified, the default is "~/.config/mume"
  // but only if the old location (~/.mume) does not exist
  await mume.init(configPath);

  const engine = new mume.MarkdownEngine({
    filePath: file,
    projectDirectoryPath: "../",
    config: {
      configPath: configPath,
      previewTheme: "github-light.css",
      codeBlockTheme: "default.css",
      printBackground: true,
      enableScriptExecution: true, // <= for running code chunks
      plantumlServer: "http://localhost:8080/",
    },
  });

  // open in browser
  if (markdownOptions.browser) {
    await engine.openInBrowser({ runAllCodeChunks: true });
  }

  // html export
  await engine.htmlExport({ offline: false, runAllCodeChunks: true });

  const htmlFile = file.replace(".md", ".html");
  const data = await fs.readFile(htmlFile, "utf8");
  await fs.writeFile(outputFilename, convertHTML(data));
  if (!isHtml) {
    await fs.rm(htmlFile);
  }

  process.exit(0);
}

export function searchMarkdownFiles(markdownOptions: Options) {
  const options: IOptions = {
    // cwd: "./",
  };

  glob("contents/**/*.md", options, function (er, files) {
    if (er) {
      throw er;
    }

    files.forEach(async (file) => {
      await htmlExport(file, markdownOptions);
    });
  });
}
