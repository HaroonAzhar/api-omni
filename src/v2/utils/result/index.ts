export type Result<SuccessContent, ErrorType extends Error> = SuccessContent | ErrorType;
