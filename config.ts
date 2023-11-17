import { Page } from "playwright";
import { RegExpInput } from "crawlee";

type Config = {
  /** URL to start the crawl */
  url: string;
  /** Globs to match against for links on a page to subsequently crawl */
  linkGlobs: string[];
  /** Regexps to match against for links on a page to subsequently crawl */
  linkRegexps: RegExpInput[];
  /** Selector to grab the inner text from */
  selector: string;
  /** Don't crawl more than this many pages */
  maxPagesToCrawl: number;
  /** File name for the finished data */
  outputFileName: string;
  /** Optional cookie to be set. E.g. for Cookie Consent */
  cookie?: {name: string; value: string}
  /** Optional function to run for each page found */
  onVisitPage?: (options: {
    page: Page;
    pushData: (data: any) => Promise<void>;
  }) => Promise<void>;
    /** Optional timeout for waiting for a selector to appear */
  waitForSelectorTimeout?: number;
};

export const config: Config = {
  url: "https://boardgamegeek.com/thread/3190923/influence-action-move-disk-sector-non-adjacent-sec",
  linkGlobs: [],
  linkRegexps: [new RegExp('https://boardgamegeek.com/thread/\\d+/.*')],
  selector: `.post-header, .post-body`,
  maxPagesToCrawl: 1,
  outputFileName: "output.json",
};
