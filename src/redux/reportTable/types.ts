import { SerializedError } from "@reduxjs/toolkit";

export interface ReportState<T> {
  dataReport: T;
  status: string | null;
  error: any;
}
