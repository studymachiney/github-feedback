export default function Explanation() {
  return (
    <div className="text-[#ccc] text-[14px] border-b-[1px] botder-dashed border-[#666] py-[10px] px-5 mb-10 leading-normal bg-[#161b22] font-mono [&_p]:mb-[10px] [&_a]:text-white [&_a]:border-b-[1px]">
      <p>
        This app demonstrates the new <b>*On-Demand ISR support*</b> in Next.js
        13.3 (
        <a
          href="https://github.com/studymachiney/github-feedback"
          target="_blank"
          rel="noreferrer"
        >
          view source
        </a>
        ).
      </p>

      <details className="[&[open]_summary]:font-bold [&[open]_summary]:text-[#fff] [open:bg-[#333]]">
        <summary className="cursor-pointer hover:text-white">
          <span className="pl-[5px]">How does this work?</span>
        </summary>
        <p className="py-[10px] px-5 m-0 [&_code]:bg-[#222] [&_code]:p-[3px] [&_em]:text-[#eee]">
          When issues on the `
          <a
            href="https://github.com/studymachiney/github-feedback"
            target="_blank"
            rel="noreferrer"
          >
            github-feedback
          </a>
          ` repo change (get created, commented on, deleted, etc), GitHub fires
          off a webhook and the impacted pages get re-rendered and pushed to the
          edge, on demand. The webhook on the Next.js app side executes a new{" "}
          <a
            href="https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation"
            target="_blank"
            rel="noreferrer noopener"
          >
            <code>`res.revalidate()`</code>
          </a>{" "}
          API call.
        </p>
      </details>

      <details className="[&[open]_summary]:font-bold [&[open]_summary]:text-[#fff] [open:bg-[#333]]">
        <summary className="cursor-pointer hover:text-white">
          <span  className="pl-[5px]">Didn&#39;t this exist already?</span>
        </summary>

        <p className="py-[10px] px-5 m-0 [&_code]:bg-[#222] [&_code]:p-[3px] [&_em]:text-[#eee]">
          Unlike <code>`revalidate`</code>{" "}
          <a
            href="https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration"
            target="_blank"
            rel="noreferrer"
          >
            with a time interval
          </a>
          , a Serverless Function is invoked{" "}
          <em className="text-[#f4e866] font-normal not-italic">
            _only when content changes_
          </em>
          , making it faster for the user (they see changes immediately), and
          more cost-efficient for owners.
        </p>
      </details>

      <p>
        <em className="text-[#f4e866] font-normal not-italic [&_a]:text-[#f4e866]">
          _💡 Try{" "}
          <a
          className="border-b-[1px] border-[#f4e866]"
            href="https://github.com/studymachiney/github-feedback/issues/new"
            target="_blank"
            rel="noreferrer"
          >
            creating a new issue
          </a>{" "}
          or commenting, and refresh this page to see the regenerated one!_
        </em>{" "}
        <br />
        <span className="text-[#999] mt-[5px] block font-[12px]">
          Pages take about <b>*300ms~*</b> to fully propagate to the global
          Vercel Edge Network after the regeneration completes.
        </span>
      </p>
    </div>
  );
}
