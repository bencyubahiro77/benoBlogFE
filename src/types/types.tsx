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
export interface User {
    _id: string;
    uuid: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface UsersState {
    users: User[];
    currentPage: number;
    totalPages: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }