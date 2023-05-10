import { fetchIssueAndRepoData } from "@/lib/github";
import Explanation from "./explanation";
import {
  CommentIcon,
  ForkIcon,
  GitHubIcon,
  IssueIcon,
  StarIcon,
} from "./icons";
import Link from "next/link";
import getFormattedTime from "./time-ago";

export default async function Page() {
  const { issues, forks_count, stargazers_count } =
    await fetchIssueAndRepoData();
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
          / <Link href="/">github-feedback</Link>
        </div>
        <div className="flex items-center mt-4 sm:mt-0 [&_a:hover]:text-[#66e6f4]">
          <a
            href="https://github.com/studymachiney/github-feedback/fork"
            target="_blank"
            rel="noreferrer"
          >
            <ForkIcon /> {new Number(forks_count).toLocaleString()}
          </a>
          <a
            href="https://github.com/studymachiney/github-feedback"
            target="_blank"
            rel="noreferrer"
          >
            <StarIcon /> {new Number(stargazers_count).toLocaleString()}
          </a>
        </div>
      </div>
      <div className="border-[1px] border-[#30363d] w-full text-[#c8d1d9] text-[13px] rounded-md">
        {issues.map((issue: any) => (
          <Link
            key={issue.number}
            href={`/${issue.number}`}
            className="py-[15px] px-5 border-b-[1px] border-[#21262d] flex hover:bg-[#151b22]"
          >
            <IssueIcon />
            <div>
              <div>
                <div className="text-[15px] font-bold mb-[10px] hover:text-[#66e6f4]">
                  {issue.title}
                </div>
                <div>
                  #{issue.number} opened {getFormattedTime(issue.created_at)} by{" "}
                  {issue.user.login}
                </div>
              </div>
              {issue.comments > 0 && (
                <div className="text-[#888] flex items-center ml-auto sm:mt-0">
                  <CommentIcon /> {new Number(issue.comments).toLocaleString()}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
