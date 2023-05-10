import Image from "next/image";
import { marked } from "marked";
import hljs from "highlight.js";
import { fetchIssuePageData } from "@/lib/github";
import avatar from "../avatar.png";
import getFormattedTime from "../time-ago";
import { markedHighlight } from "marked-highlight";

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

function markdownToHtml(markdown: string) {
  if (!markdown) {
    return null;
  }

  marked.use(
    markedHighlight({
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    })
  );

  return marked.parse(markdown);
}

export default async function IssuePage({
  params,
}: {
  params: { id: string };
}) {
  const { issue, comments } = await fetchIssuePageData(params.id);

  return (
    <div className="w-full text-[#c8d1d9] text-sm rounded-md">
      <a
        href={issue.html_url}
        target="_blank"
        rel="noreferrer"
        className="flex py-4"
        key={issue.id}
      >
        <div className="mt-1 mb-auto mr-3">
          <Image
            alt={issue.user.login}
            src={issue.user?.avatar_url || avatar}
            className="rounded-[50%] object-cover border-[1px] border-[#21262d] hover:bg-[#151b22]"
            height={32}
            width={32}
          />
        </div>
        <div className="relative w-full border rounded-md">
          <div className="text-sm mb-3 bg-[#313f50] w-full px-4 py-3 min-h-[2.2rem]">
            <b>{issue.user.login}</b> commented{" "}
            {getFormattedTime(issue.created_at)}
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                markdownToHtml(issue.body) || "<i>No description provided.</i>",
            }}
            className="text-base px-4 py-2 min-h-[2.6rem] leading-[1.5rem]"
          />
        </div>
      </a>
      {comments.map((comment: any) => (
        <a
          href={comment.html_url}
          target="_blank"
          rel="noreferrer"
          className="w-full text-[#c8d1d9] text-sm rounded-md"
          key={comment.id}
        >
          <div className="mt-1 mb-auto mr-3">
            <Image
              alt={comment.user.login}
              src={comment.user?.avatar_url || avatar}
              className="rounded-[50%] object-cover border-[1px] border-[#21262d] hover:bg-[#151b22]"
              height={32}
              width={32}
            />
          </div>
          <div className="relative w-full border rounded-md">
            <div className="text-sm mb-3 bg-[#313f50] w-full px-4 py-3 min-h-[2.2rem]">
              <b>{comment.user.login}</b> commented{" "}
              {getFormattedTime(comment.created_at)}
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: markdownToHtml(comment.body) || "",
              }}
              className="text-base px-4 min-h-[2.6rem] leading-[1.5rem]"
            />
          </div>
        </a>
      ))}
    </div>
  );
}
