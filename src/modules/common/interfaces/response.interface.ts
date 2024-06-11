/* eslint-disable prettier/prettier */

export interface Response<T> {
    errorMsg: string | null;
    success: boolean;
    data: T | null;
    sessionActive: boolean;
  }
  