export interface ITag {
  tag: string;
  value?: string;
  raw: string;
}
export interface IDescriptive extends ITag {
  description?: string;
}
export interface IParam extends IDescriptive {
  name: string;
  optional?: boolean;
  defaultValue?: string;
}
export interface IType extends IDescriptive {
  type?: string;
}
export declare type InlineLink = {
  tag: string;
  url: string;
  text: string;
  raw: string;
};
export declare type GetCommentsFromFileConfig = {
  keepIndent?: boolean;
};
export declare type ToCommentStringConfig = {
  indentChars?: number;
};
