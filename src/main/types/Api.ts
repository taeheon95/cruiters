export interface ApiResposne<T> {
  message: string;
  data: T;
}

export interface ErrorResponse<T> {
  message: string;
  error: T;
}
