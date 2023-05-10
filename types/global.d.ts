declare module "marked-highlight" {
  import type { marked } from "marked";
  function markedHighlight({
    async,
    langPrefix,
    highlight,
  }: {
    async?: boolean;
    langPrefix?: string;
    highlight: (code: string, lang: string) => any;
  }): marked.MarkedExtension;
  export { markedHighlight };
}
