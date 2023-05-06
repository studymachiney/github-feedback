import { fetchIssueAndRepoData } from "@/lib/github";
import styles from "../styles/Home.module.scss";
import Explanation from "./explanation";
import { ForkIcon, GitHubIcon, StarIcon } from "./icons";
import Link from "next/link";

export default async function Page() {
  const { issues, forks_count, stargazers_count } =
    await fetchIssueAndRepoData();
  console.log(issues);
  return (
    <main className="flex flex-col p-[25px] max-w-[1000px] mx-0 my-auto">
      <Explanation />
        <div className={styles.repo}>
          <div className={styles.repoTitle}>
            <GitHubIcon />{" "}
            <a
              href="https://github.com/studymachiney/github-feedback"
              target="_blank"
              rel="noreferrer"
            >
              studymachiney
            </a>{" "}
            / <Link href="/">github-feedback</Link>
            <div className={styles.forksStars}>
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
          <div className={styles.issues}>
            {issues.map((issue: any) => issue.title)}
          </div>
        </div>
    </main>
  );
}
