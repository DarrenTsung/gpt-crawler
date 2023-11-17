import { Page } from "playwright";
import { EnqueueLinksOptions } from "crawlee";

type Config = {
  /** Custom function to extract text from an HTMLElement */
  customTextExtractor?: (element: HTMLElement) => string;
  /** URL to start the crawl */
  url: string;
  /** Configuration for link matching using extractLinks() */
  linkConfig?: EnqueueLinksOptions;
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
  linkConfig: {
    regexps: [new RegExp('https://boardgamegeek.com/thread/\\d+/.*')],
    exclude: [new RegExp('https://boardgamegeek.com/thread/\\d+/article/.*')],
  },
  customTextExtractor: (element) => {
    if (element.classList.contains('post-header')) {
      const lines = element.innerText.split('\n').filter(line => line.trim() !== '');
      if (lines.length > 1 && lines[1] === 'Designer') {
        return `${lines[0]} (Designer)`;
      } else {
        return lines[0];
      }
    } else {
      return element.innerHTML;
    }
  },
  selector: `.post-header, .post-body`,
  maxPagesToCrawl: 5,
  outputFileName: "output.json",
};
