import { Injectable } from '@angular/core';
import { QRious } from '../_global/qrious';
import { Code } from '../_global/code';
@Injectable()
export class ExportCodeService {
  public types: string[] = ['png', 'svg', 'jpeg'];
  constructor() {

  }
  saveSVG(qrious, name) {
    const svgData = qrious.swgCtx.getSerializedSvg();
    this.saveBlob(svgData, 'image/svg+xml;charset=utf-8', name);
  }
  saveImage(qrious, type, name) {
    let streamType,
    base64;
    if ( type === 'jpeg') {
        base64 = qrious.toDataURL('image/jpeg');
        streamType = 'image/jpeg';
    } else {
      base64 = qrious.toDataURL('image/png');
      streamType = 'image/png';
    }
    base64 = base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    const byteCharacters = atob(base64),
    byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    this.saveBlob(byteArray, streamType, name);
  }
  saveBlob(data, streamType, name) {
    const blob = new Blob([data], {type: streamType});
    let url = URL.createObjectURL(blob);
    const fileName = name || 'code';
    if (~window.navigator.userAgent.indexOf('MSIE ')) {
      navigator.msSaveBlob(blob, fileName);
    } else {
      const a = document.createElement('a');
      url = URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    }
  }
  export(code: Code, type: string) {
    const elem = document.createElement('canvas'),
    qrious = new QRious({
      size: 500,
      element: elem,
      hasSvg: type === 'svg'
    });
    qrious.value = code.value;
    for (const option in code.options) {
      if (code.options.hasOwnProperty(option)) {
        qrious[option] = code.options[option];
      }
    }
    if (type === 'svg') {
      this.saveSVG(qrious, name);
    } else {
      this.saveImage(qrious, type, name);
    }
    elem.remove();
  }
}
