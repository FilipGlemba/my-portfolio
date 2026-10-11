// Search input goes into a MongoDB $regex. Escaping it means a shopper typing
// "(" or "c++" searches for that literally instead of crashing the query,
// and a crafted pattern like "(a+)+$" can't trigger catastrophic backtracking.
export function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Long enough for any real product name; longer input is almost certainly abuse.
export const MAX_SEARCH_LENGTH = 60;
