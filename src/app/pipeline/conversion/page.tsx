import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getBrandSiteOverview } from "@/lib/brand-site/server";
export const dynamic = "force-dynamic";
export default async function Conversion() {
  const data = await getBrandSiteOverview().catch(() => null),
    e = data?.siteEvents;
  const stages = [
    {
      name: "Site attention",
      count: e?.pageViews7Days,
      meaning: "Tracked page-view events",
      action: "Inspect relevant traffic before interpreting volume.",
    },
    {
      name: "Audit started",
      count: e?.aiOpportunityAuditStarts7Days,
      meaning: "Audit session-start events",
      action: "Check the audit entry point and offer clarity.",
    },
    {
      name: "Report unlocked",
      count: e?.aiOpportunityAuditUnlocks7Days,
      meaning: "Report-unlock events",
      action: "Review friction between starting and unlocking.",
    },
    {
      name: "Phone clicks",
      count: e?.phoneClicks7Days,
      meaning: "Phone-link clicks, not confirmed calls",
      action: "Verify that calls become real conversations.",
    },
    {
      name: "Email clicks",
      count: e?.emailClicks7Days,
      meaning: "Email-link clicks, not sent emails",
      action: "Connect contact intent to confirmed enquiries.",
    },
  ];
  return (
    <AppShell>
      <div className="page-title">
        <div>
          <h1>Conversion front</h1>
          <p>AI Opportunity Audit → contact intent · trailing 7 days</p>
        </div>
        <Link href="/work" className="button">
          Direct work →
        </Link>
      </div>
      <div className="briefing">
        <div>
          <p className="eyebrow">Objective</p>
          <p>
            Convert qualified attention into useful audits and real business
            conversations.
          </p>
        </div>
        <div>
          <p className="eyebrow">Measurement boundary</p>
          <p>
            These are event counts, not a cohort funnel. Repeat events are
            possible. Contact clicks are not confirmed leads.
          </p>
        </div>
      </div>
      <section className="panel table-wrap">
        <table className="ops-table">
          <thead>
            <tr>
              <th>Signal</th>
              <th>7-day events</th>
              <th>Interpretation</th>
              <th>Next inspection</th>
            </tr>
          </thead>
          <tbody>
            {stages.map((s) => (
              <tr key={s.name}>
                <td>{s.name}</td>
                <td className="text-xl">
                  {s.count == null ? "Unknown" : s.count.toLocaleString()}
                </td>
                <td className="muted">{s.meaning}</td>
                <td>{s.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <p className="source-note">
        {e?.tableReady
          ? `Site event feed retrieved ${data?.generatedAt}.`
          : "Site event feed unavailable. No zero values have been substituted."}{" "}
        Known excluded traffic is filtered. Session-level conversion and
        confirmed enquiries are not connected.
      </p>
    </AppShell>
  );
}
