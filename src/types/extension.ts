export type Extension = {
  id: number;
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
};

export enum FilterType {
  ALL = "all",
  ACTIVE = "active",
  INACTIVE = "inactive",
}
