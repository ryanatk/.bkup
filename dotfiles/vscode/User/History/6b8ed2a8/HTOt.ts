/**
 * Handy util to remove new-lines & extra spaces from string literals.
 *
 * String literals are handy for writing readable code, but don't shrink
 * when written to our source. This is especially handy in our doc head.
 */

const inlineLiteral = (str: string): string => str.replace(/\s+/g, ' ').trim();

export default inlineLiteral;
