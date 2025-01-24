export interface paginationProps{
    currentPage: number,
    totalPages: number,
    onPageCHange: (page: number) => void
}

export interface SearchProps {
    query: string; 
    onSearch: (value: string) => void; 
}

export interface ToastProps {
    message: any;
    type:any
}