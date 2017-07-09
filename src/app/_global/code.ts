export class Code {
  id:string = 'new';
  name:string = '';
  options?:CodeOptions;
  private _model : WifiCodeModel | UrlCodeModel | StringCodeModel | SmsCodeModel;
  set model(model){
    if(this._model && this._model.type === model.type){
      for(let prop in model){
          this._model[prop] = model[prop];
      }
    } else {
      switch( model.type ){
        case 'wifi':
          this._model = new WifiCodeModel(model);
        break;
        case 'url':
          this._model = new UrlCodeModel(model);
        break;
        case 'string':
          this._model = new StringCodeModel(model);
        break;
        case 'sms':
          this._model = new SmsCodeModel(model);
        break;
      }
    }
  };
  get model():any{
    return this._model;
  }
  constructor(code?:Code){
    this.id = code && code.id ? code.id : this.id;
    this.name = code && code.name ? code.id : this.name;
    if(code && code.options){
      this.options = new CodeOptions(code.options);
    } else {
      this.options = new CodeOptions();
    }
    if(code && code.model)
      this.model = code.model;
  }
  get value(): string {
    if(this._model)
      return this._model.getValue();
    return null;
  }
  get type():string {
    if(this._model)
      return this._model.type;
    return null;
  }
  set type(type){
    switch(type){
      case 'wifi' :
        this._model = new WifiCodeModel();
      break;
      case 'url' :
        this._model = new UrlCodeModel();
      break;
      case 'string' :
        this._model = new StringCodeModel();
      break;
      case 'sms' :
        this._model = new SmsCodeModel();
      break;
    }
  }
}
export class CodeOptions {
  background?: string = '#ffffff';
  backgroundAlpha?: number = 1;
  foreground?: string = '#000000';
  foregroundAlpha?: number = 1;
  level?: string = 'L';
  constructor(options?:any){
    if(options)
      for(let prop in this){
        if(this.hasOwnProperty(prop) && options[prop])
          this[prop] = options[prop];
      };
  }
}
export class WifiCodeModel{
  readonly type:string = 'wifi';
  networkType?:string = 'WPA';
  name?: string = '';
  pass?: string = '';
  hidden?:boolean = false;
  constructor(options?:any){
    if(options)
      for(let prop in this){
        if(this.hasOwnProperty(prop) && options[prop])
          this[prop] = options[prop];
      };
  }
  public getValue (){
    function encodeStringComponent(str:string):string{
      var encodedStr = str.replace('"','\\"').replace('"','\\"').replace(',','\\,').replace(';','\\;').replace(':','\\:');
      if(parseInt(encodedStr,16).toString(16) === encodedStr)
        encodedStr = '"' + encodedStr + '"';
      return encodedStr
    };
    var value = 'WIFI:' + 'T:' + this.networkType + ';';
    value += 'S:' + encodeStringComponent(this.name) + ';';
    if(this.networkType !== 'nopass'){
      value += 'P:' + encodeStringComponent(this.pass) + ';';
    }
    if(this.hidden){
      value += 'H:true;';
    }
    return value
  }
}
export class UrlCodeModel{
  readonly type:string='url';
  url?:string='';
  constructor(options?:any){
    if(options)
      for(let prop in this){
        if(this.hasOwnProperty(prop) && options[prop])
          this[prop] = options[prop];
      };
  }
  public getValue (){
    return 'URL:' + this.url;
  }
}
export class StringCodeModel{
  readonly type:string='string';
  string?:string='';
  constructor(options?:any){
    if(options)
      for(let prop in this){
        if(this.hasOwnProperty(prop) && options[prop])
          this[prop] = options[prop];
      };
  }
  public getValue (){
    return this.string;
  }
}
export class SmsCodeModel{
  readonly type:string='sms';
  number?:string;
  message?:string;
  constructor(options?:any){
    if(options)
      for(let prop in this){
        if(this.hasOwnProperty(prop) && options[prop])
          this[prop] = options[prop];
      };
  }
  public getValue (){
    return 'SMSTO:' + this.number + ':' + this.message
  }
}
