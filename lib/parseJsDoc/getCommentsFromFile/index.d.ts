import { GetCommentsFromFileConfig } from "../types";
/**
 * Extract all jsdoc comment strings from a file
 *
 * @since v1.0.0
 * @param {string} file - String contents of a file
 * @param {GetCommentsFromFileConfig} [config={ keepIndent = false }] - The configuration for output formatting
 * @returns {string[]} Array of jsdoc strings
 */
export declare const getCommentsFromFile: (
  file: string,
  { keepIndent }?: GetCommentsFromFileConfig
) => string[];
