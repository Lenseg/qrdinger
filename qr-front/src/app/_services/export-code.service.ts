import { Injectable } from '@angular/core';
import { QRious } from '../_global/qrious';
import { Code } from '../_global/code';
@Injectable()
export class ExportCodeService {
  public types: string[] = ['png', 'svg', 'jpeg'];
  constructor() {

  }
  saveFile(data,streamType,name?){
    let base64 = data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''),
    byteCharacters = atob(base64),
    byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers),
    blob = new Blob([byteArray], {type:streamType}),
    url = URL.createObjectURL(blob),
    fileName = name || 'code';
    if(~window.navigator.userAgent.indexOf("MSIE ")){
      navigator.msSaveBlob(blob,fileName)
    } else {
      let a = document.createElement("a");
      url = URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    }
  }
  export(code:Code, type:string){
    let elem = document.createElement('canvas'),
    qrious = new QRious({
      size:500,
      element:elem
    });
    document.body.appendChild(elem)
    qrious.value = code.value;
    for(var option in code.options){
      qrious[option] = code.options[option];
    }
    let data;
    switch( type ){
      case 'jpeg':
        data = qrious.toDataURL('image/jpeg');
      break;
      case 'png':
        data = qrious.toDataURL('image/png');
      break;
      case 'svg':
        qrious.toSVG('image/png');
      break;
      default:
        data = qrious.toDataURL('image/png');
      break;
    }
    this.saveFile(data, 'image/'+type, code.name)
  }
}
