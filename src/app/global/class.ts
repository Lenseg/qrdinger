export class ErrorMessage {
  type:string;
  message:string;
};

export class Code {
  id?:string;
  name?:string;
  type?:string;
  options:CodeOptions;
  model:WifiCodeModel & UrlCodeModel & StringCodeModel & SmsCodeModel;
  get value(): string {
    if(this.model)
      return this.model.getValue();
    return null;
  }
}
export class CodeOptions {
  background?: string;
  backgroundAlpha?: number;
  foreground?: string;
  foregroundAlpha?: number;
  level?: string;
}
export class WifiCodeModel{
  networkType?:string;
  name?: string;
  pass?: string;
  hidden?:boolean;
  public getValue function(){
    
  }
}
export class SmsCodeModel{
  number?:string;
  message?:string;
  public getValue function(){

  }
}
export class UrlCodeModel{
  url?:string;
  public getValue function(){

  }
}

export class StringCodeModel{
  string?:string;
  public getValue function(){

  }
}
export interface UrlCodeValueParams extends CodeValueParams{
  url?:string
}
export interface OnLineCodeValueParams extends CodeValueParams{
  text?:string
}
export interface SmsCodeValueParams extends CodeValueParams{
  number?:string;
  message?:string;
}
export const Levels = ['L', 'M', 'Q', 'H'];
