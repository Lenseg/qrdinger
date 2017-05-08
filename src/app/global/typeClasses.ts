export class ErrorMessage {
  type:string;
  message:string;
};
export class CodeOptions {
  background?: string;
  backgroundAlpha?: number;
  foreground?: string;
  foregroundAlpha?: number;
  level?: string;
  value?: string;
  size?: string;
}
export class CommonCodeOptions {
  level?:string|number
  foreground?:string
  background?:string
}
export class CodeValueParams {
  type?:string
}
export interface WifiCodeValueParams extends CodeValueParams{
  networkType?:string,
  name?: string,
  pass?: string,
  hidden?:boolean
}
export interface OnLineCodeValueParams extends CodeValueParams{
  text?:string
}
export interface SmsCodeValueParams extends CodeValueParams{
  number?:string,
  message?:string
}
export const Levels = ['L', 'M', 'Q', 'H'];
