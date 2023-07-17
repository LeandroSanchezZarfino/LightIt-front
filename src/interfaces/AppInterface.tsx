export interface PaginatedData<T> extends Page{
  data: Array<T>;

}

export interface Page {
    current_page: number;
    total: number;
    per_page: number;
}

export const defaultPage: Page = {
    current_page: 1,
    total: 0,
    per_page: 10,
}