export type BudgetTabKey =
  | "overview"
  | "categories"
  | "vendors"
  | "cashflow"
  | "roi"
  | "insights";

export type TabItem = {
  key: BudgetTabKey;
  label: string;
  count?: number;
};

export type BudgetTabsProps = {
  tabs: TabItem[];
  selected: number;
  setSelected: (index: number) => void;
};
