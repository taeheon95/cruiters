export interface ApiSuccess<T> {
  code: string;
  data: T;
}

export interface ApiError<T> {
  code: string;
  error: T;
}
