import Link from "next/link";
import { GitHubIcon, LinkIcon } from "../icons";
import Explanation from "../explanation";

export default async function IssueLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <main className="flex flex-col p-[25px] max-w-[1000px] mx-auto my-0">
      <Explanation />
      <div className="flex flex-col justify-between mb-5 sm:flex-row">
        <div className="text-[20px] [&_a]:text-[#66e6f4] [&_a:hover]:border-b-[1px] [&_a:hover]:border-[#66e6f4] [&_a:hover]:border-dotted">
          <GitHubIcon />{" "}
          <a
            href="https://github.com/studymachiney/github-feedback"
            target="_blank"
            rel="noreferrer"
          >
            studymachiney
          </a>{" "}
          / <Link href="/">github-feedback</Link> /{" "}
          <a
            href={`https://github.com/studymachiney/github-feedback/issues/${params.id}`}
            target="_blank"
            rel="noreferrer"
          >
            #{params.id}
          </a>
        </div>
        <div className="text-[#888] flex items-center mt-4 [&_path]:hover:text-[#66e6f4] md:mt-0">
          <a
            className="hover:text-[#66e6f4]"
            href={`https://github.com/studymachiney/github-feedback/issues/${params.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <LinkIcon /> {"Open in GitHub"}
          </a>
        </div>
      </div>
      {children}
    </main>
  );
}
