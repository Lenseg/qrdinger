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
  level:string|number = "L";
  name = '';
  foreground = '#000000';
  background = '#ffffff';
}
export const Levels = ['L', 'M', 'Q', 'H'];
