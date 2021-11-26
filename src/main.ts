import { Command } from "commander";
import { searchMarkdownFiles } from "./utils/parse";

export function main() {
  const program = new Command();
  program
    .option("-o, --output <filename>", "output file name")
    .option("-i, --is-html", "output html file")
    .option("-b, --browser", "open html file with browser");

  program.parse(process.argv);

  const options = program.opts();

  const markdownOptions = { outputFilename: options.output, isHtml: !!options.isHtml, browser: !!options.browser };

  searchMarkdownFiles(markdownOptions);
}

main();
