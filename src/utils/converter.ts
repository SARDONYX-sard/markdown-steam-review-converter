export function deleteTag(convertText: string) {
  return convertText
    .replace(/\s?<h(\d)(?:.+?)?>/g, "[h$1]")
    .replace(/<\/h(\d)>/g, "[/h$1]\n\n")
    .replace(/\n?<t([dhr])(?:.+?)?>/g, "\n[t$1]") // table
    .replace(/<\/t([dhr])>/g, "[/t$1]\n\n")
    .replace(/<!DOCTYPE html>/g, "")
    .replace(/<html>/g, "")
    .replace(/<\/html>/g, "")
    .replace(/\s\s/g, "")
    .replace(/<head>[\s\S]*<\/head>/g, "")
    .replace(/<body(?:.+?)?>/g, "")
    .replace(/<\/body>/g, "")
    .replace(/<div(?:.+?)?>/g, "")
    .replace(/<\/div>/g, "")
    .replace(/<a id="sidebar-toc-btn">.*<\/a>/g, "")
    .replace(/(?:id|class|name)=".*"/g, "")
    .replace(/<script(?:.+?)?>[\s\S]*<\/script>/g, "");
}

/**
 * Copyright (c) 2021 dons20
 * https://github.com/dons20/steam-review-editor/blob/master/assets/scripts.js
 *
 * This software is released under the Apache-2.0 License.
 * https://opensource.org/licenses/Apache-2.0
 */
export function convertHTML(convertText: string) {
  return deleteTag(convertText)
    .replace(/<p>/g, "")
    .replace(/<\/p>/g, "\n")
    .replace(/<strong>/g, "[b]")
    .replace(/<\/strong>/g, "[/b]")
    .replace(/<em>/g, "[i]")
    .replace(/<\/em>/g, "[/i]")
    .replace(/<u>/g, "[u]")
    .replace(/<\/u>/g, "[/u]")
    .replace(/<ol>/g, "[olist]")
    .replace(/<\/ol>/g, "[/olist]")
    .replace(/<ul>/g, "\n\n[list]")
    .replace(/<\/ul>/g, "[/list]\n\n")
    .replace(/<li>/g, "[*]")
    .replace(/<\/li>/g, "\n")
    .replace(/<br>/g, "\n")
    .replace(/<a href="(.*)">/g, "[url=$1]")
    .replace(/<\/a>/g, "[/url]")
    .replace(/<s>/g, "[strike]")
    .replace(/<\/s>/g, "[/strike]")
    .replace(/<blockquote>/g, "[quote=author]")
    .replace(/<\/blockquote>/g, "[/quote]\n")
    .replace(/<span class="spoiler">/g, "[spoiler]")
    .replace(/<\/span>/g, "[/spoiler]")
    .replace(/<pre spellcheck="false">/g, "[code]")
    .replace(/<\/pre>/g, "[/code]\n")
    .replace(/<code>/g, "[code]")
    .replace(/<\/code>/g, "[/code]")
    .replace(/<t(head|body)>\n?/g, "")
    .replace(/<\/t(head|body)>/g, "")
    .replace(/<table>/g, "[table]")
    .replace(/<\/table>/g, "[/table]");
}
