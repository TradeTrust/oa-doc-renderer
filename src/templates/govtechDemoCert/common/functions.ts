import { tz } from "moment-timezone";

export const TIMEZONE = "Asia/Singapore";

export const formatDate = (dateString: string): string | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return tz(date, TIMEZONE)
    .format("MMM YYYY")
    .toUpperCase();
};

export const formatDateFullMonth = (dateString: string): string | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return tz(date, TIMEZONE)
    .format("MMMM YYYY")
    .toUpperCase();
};
