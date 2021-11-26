import { readFile, rm } from "fs/promises";
import { htmlExport } from "../src/utils/parse";

it("should be same string", async () => {
  const rootDir = "./tests/mock";
  const testFile = `${rootDir}/mock-file.md`;
  const outputFilename = testFile.replace(".md", "-out.txt");

  await htmlExport(testFile, {
    isHtml: false,
    browser: false,
  });

  const expectFile = "expect-file.txt";
  const expectData = await readFile(`${rootDir}/${expectFile}`, "utf8");
  const outputData = await readFile(`${outputFilename}`, "utf8");
  expect(expectData).toBe(outputData);

  await rm(outputFilename);
  process.exit(0);
});
