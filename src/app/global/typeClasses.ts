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
export const Levels = ['L', 'M', 'Q', 'H'];
