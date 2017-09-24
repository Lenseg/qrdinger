export class ErrorMessage {
  type:string;
  message:string;
};

export const codeTypes = [
  {
    name :'wifi',
    private:false
  },
  {
    name :'url',
    private:false
  },
  {
    name :'string',
    private:false
  },
  {
    name :'sms',
    private:false
  },
  {
    name :'buisnessCard',
    private:false
  },
  {
    name :'redirect',
    private:true
  }
];
export const codeTypesRepresentations = {
  wifi : 'Wi-Fi',
  url : 'Link',
  string : 'Text',
  sms : 'SMS',
  redirect : 'Redirect'
  // buisnessCard: 'Buisness card'
};
export const levels = ['L', 'M', 'Q', 'H'];
