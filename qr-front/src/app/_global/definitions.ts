export class ErrorMessage {
  type:string;
  message:string;
};

export const codeTypes = ['wifi', 'url', 'string', 'sms', 'buisnessCard'];
export const codeTypesRepresentations = {
  wifi : 'Wi-Fi',
  url : 'Link',
  string : 'Text',
  sms : 'SMS',
  // buisnessCard: 'Buisness card'
};
export const levels = ['L', 'M', 'Q', 'H'];
