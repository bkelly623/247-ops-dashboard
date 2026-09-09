export type KeywordSnapshotRow = {
  query: string;
  targetPage: string;
  clicks: number;
  impressions: number;
  ctr: number;
  averagePosition: number;
  read: string;
  nextAction: string;
};

export type PageSnapshotRow = {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  averagePosition: number;
  read: string;
};

export type KeywordSnapshot = {
  checkedAt: string;
  source: "Google Search Console";
  property: string;
  windowStart: string;
  windowEnd: string;
  clicks: number;
  impressions: number;
  ctr: number;
  averagePosition: number;
  summary: string;
  queryRows: KeywordSnapshotRow[];
  pageRows: PageSnapshotRow[];
};

export const keywordSnapshots: KeywordSnapshot[] = [
  {
    checkedAt: "2026-09-09T14:12:47Z",
    source: "Google Search Console",
    property: "sc-domain:get247roi.com",
    windowStart: "2026-08-10",
    windowEnd: "2026-09-07",
    clicks: 0,
    impressions: 79,
    ctr: 0,
    averagePosition: 49.50632911392405,
    summary:
      "Google is testing the AI employee phrase family first. The homepage, About, services, contact, lead-response, operations-coordinator, and legal pages have useful discovery/rank signal, while newer commercial pages still need crawl time and stronger support.",
    queryRows: [
      {
        query: "ai employee for small business",
        targetPage: "/ai-employees-for-small-business",
        clicks: 0,
        impressions: 39,
        ctr: 0,
        averagePosition: 72.64102564102564,
        read:
          "Strongest exact query signal by volume, but ranking is still deep enough that clicks are unlikely.",
        nextAction:
          "Tune the page answer block, title/meta, role examples, FAQs, and internal links around small-business operations pain.",
      },
      {
        query: "ai operations coordinator",
        targetPage: "/ai-employees/ai-operations-coordinator",
        clicks: 0,
        impressions: 4,
        ctr: 0,
        averagePosition: 7.5,
        read:
          "Tiny volume but strong average position; this is the clearest role-specific relevance proof so far.",
        nextAction:
          "Use operations coordinator examples as supporting proof for the broader AI employees and workflow automation pages.",
      },
      {
        query: "ai employee for home services",
        targetPage: "/ai-employees-for-service-businesses",
        clicks: 0,
        impressions: 2,
        ctr: 0,
        averagePosition: 88,
        read:
          "Home-services intent is appearing, but current ranking is too weak to earn traffic.",
        nextAction:
          "Delay a new trade page until the service-business page is strengthened with real lead response, estimates, admin, and reporting workflows.",
      },
      {
        query: "ai employee for service business",
        targetPage: "/ai-employees-for-service-businesses",
        clicks: 0,
        impressions: 2,
        ctr: 0,
        averagePosition: 69.5,
        read:
          "Service-business singular phrasing reinforces that the service-business page should stay active.",
        nextAction:
          "Add small-business and service-business cross-links with practical workflow language, not generic AI employee claims.",
      },
    ],
    pageRows: [
      {
        page: "/ai-employees-for-small-business",
        clicks: 0,
        impressions: 53,
        ctr: 0,
        averagePosition: 60.943396226415096,
        read:
          "Highest-impression landing page and the first evidence-backed page tuning target.",
      },
      {
        page: "/ai-employees/ai-operations-coordinator",
        clicks: 0,
        impressions: 21,
        ctr: 0,
        averagePosition: 15.380952380952381,
        read:
          "Best role-page signal; worth using as internal support and future proof language.",
      },
      {
        page: "/",
        clicks: 0,
        impressions: 14,
        ctr: 0,
        averagePosition: 1.3571428571428572,
        read:
          "Brand/homepage discovery is strong where Google already understands the entity.",
      },
      {
        page: "/ai-employees-for-service-businesses",
        clicks: 0,
        impressions: 12,
        ctr: 0,
        averagePosition: 33.083333333333336,
        read:
          "Service-business page has enough early signal to support the small-business target before building more trade pages.",
      },
    ],
  },
];
