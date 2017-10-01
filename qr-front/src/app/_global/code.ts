export class Code {
  id?:string;
  name:string = '';
  options?:CodeOptions;
  private _model : WifiCodeModel | UrlCodeModel | StringCodeModel | SmsCodeModel | RedirectCodeModel;
  constructor(code?:Code){
    this.id = code && code.id ? code.id : this.id;
    this.name = code && code.name ? code.name : this.name;
    if(code && code.options){
      this.options = new CodeOptions(code.options);
    } else {
      this.options = new CodeOptions();
    }
    if(code && code.model)
      switch( code.model.type ){
        case 'wifi':
          this._model = new WifiCodeModel(code.model);
        break;
        case 'url':
          this._model = new UrlCodeModel(code.model);
        break;
        case 'string':
          this._model = new StringCodeModel(code.model);
        break;
        case 'sms':
          this._model = new SmsCodeModel(code.model);
        case 'redirect':
          this._model = new RedirectCodeModel(code.model);
        break;
      }
  }
  public toJSON(): string {
    let obj = this.toObj();
    return JSON.stringify(obj);
  }
  public toObj(): any {
    let obj = Object.assign({}, this);
    obj.model = this.model;
    delete obj.toJSON;
    delete obj._model;
    delete obj.id;
    return obj;
  }
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
        case 'redirect' :
          this._model = new RedirectCodeModel(model);
        break;
      }
    }
  };
  get model():any{
    return this._model || null;
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
      case 'redirect' :
        this._model = new RedirectCodeModel();
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
      for(let prop in options){
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
      for(let prop in options){
        if(this.hasOwnProperty(prop) && options[prop])
          this[prop] = options[prop];
      };
  }
  public getValue (){
    return 'URL:' + this.url;
  }
}
export class RedirectCodeModel{
  readonly type:string='redirect';
  path?:string='';
  redirect?:string='';
  address?:string='';
  constructor(options?:any){
    if(options)
      for(let prop in options){
        if(this.hasOwnProperty(prop) && options[prop])
          this[prop] = options[prop];
      };
  }
  public getValue (){
    console.log(this.address , this.path, 'kek')
    return 'URL:' + this.address + this.path;
  }
}
export class StringCodeModel{
  readonly type:string='string';
  string?:string='';
  constructor(options?:any){
    if(options)
      for(let prop in options){
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
  number?:string='';
  message?:string='';
  constructor(options?:any){
    if(options)
      for(let prop in options){
        if(this.hasOwnProperty(prop) && options[prop])
          this[prop] = options[prop];
      };
  }
  public getValue (){
    return 'SMSTO:' + this.number + ':' + this.message
  }
}
