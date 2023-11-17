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
  url: "https://boardgamegeek.com/boardgame/246900/eclipse-second-dawn-galaxy/forums/66",
  linkGlobs: [],
  linkRegexps: [`https://boardgamegeek.com/thread/\d+/**`],
  selector: `.global-body-content-primary`,
  maxPagesToCrawl: 5,
  outputFileName: "output.json",
};
