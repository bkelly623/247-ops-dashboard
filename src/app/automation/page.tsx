import { AppShell } from "@/components/app-shell";
import { getAutomationEvidence } from "@/lib/automation-evidence";
import { getCommandState } from "@/lib/command-state/server";
export const dynamic = "force-dynamic";
function date(value: string | null) {
  return value
    ? new Date(value).toISOString().slice(0, 16).replace("T", " ") + " UTC"
    : "Not recorded";
}
export default async function AutomationPage() {
  const [evidence, state] = await Promise.all([
    getAutomationEvidence(),
    getCommandState(),
  ]);
  return (
    <AppShell>
      <div className="page-title">
        <div>
          <h1>Automation watch</h1>
          <p>Actual recorded runs, failures, and next scheduled work.</p>
        </div>
        <span className="pill">Read-only evidence</span>
      </div>
      <div className="notice">
        {evidence
          ? `Observed ${date(evidence.observedAt)} via OpenClaw. Scope: ${evidence.scope}. This is a dated import, not a live scheduler connection.`
          : "No scheduler evidence imported yet. Execution status is unknown."}{" "}
        Other agents’ jobs are not visible from this session; absence here does
        not mean they have no automations.
      </div>
      {evidence?.jobs.map((job) => (
        <section className="panel mb-5" key={job.id}>
          <div className="panel-head">
            <div>
              <h2>{job.name}</h2>
              <p className="source-note mb-0 mt-1">
                {job.owner} · {job.schedule}
              </p>
            </div>
            <div className="flex gap-2">
              <span className="pill">
                {job.enabled ? "Enabled" : "Disabled"}
              </span>
              <span
                className={`pill ${job.lastStatus === "error" ? "red" : job.lastStatus === "ok" ? "green" : ""}`}
              >
                Last run: {job.lastStatus}
              </span>
            </div>
          </div>
          <div className="panel-body">
            <p className="muted text-xs">
              Next scheduled at observation: {date(job.nextRunAt)}
            </p>
          </div>
          <div className="table-wrap">
            <table className="ops-table">
              <thead>
                <tr>
                  <th>Run time</th>
                  <th>Result</th>
                  <th>Duration</th>
                  <th>Recorded output / failure</th>
                </tr>
              </thead>
              <tbody>
                {job.runs.map((run) => (
                  <tr key={run.at}>
                    <td>{date(run.at)}</td>
                    <td>
                      <span
                        className={`pill ${run.status === "error" ? "red" : "green"}`}
                      >
                        {run.status}
                      </span>
                    </td>
                    <td>{Math.round(run.durationMs / 1000)}s</td>
                    <td>{run.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
      <details className="panel">
        <summary className="panel-head">
          Planning registry · not execution history ({state.automation.length}{" "}
          entries)
        </summary>
        <div className="panel-body">
          {state.automation.map((job) => (
            <div key={job.id} className="strategy-step">
              <h3>{job.name}</h3>
              <p>{job.purpose}</p>
              <p>Planned next work: {job.nextPlannedWork}</p>
              <p>Retire rule: {job.retireRule}</p>
            </div>
          ))}
        </div>
      </details>
      <p className="source-note">
        No run, pause, or retry controls are exposed. Inspect and change actual
        schedules in OpenClaw; a recorded successful run is not independent
        verification of its claimed output.
      </p>
    </AppShell>
  );
}
