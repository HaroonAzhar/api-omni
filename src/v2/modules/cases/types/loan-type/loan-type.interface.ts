export const loanTypes = ['retained', 'serviced', 'rolled_up'] as const;
export type LoanType = typeof loanTypes[number];
