export class BusinessCardModel {
  name?: string;
  surname?: string;
  nickname?: string;
  title?: string;
  organisation?: string;
  mail?: string;
  phone?: string;
  homeAdress?: AdressModel;
  workAdress?: AdressModel;
}
export class AdressModel {
  type?: string;
  street?: string;
  postCode?: string;
  state?: string;
  country?: string;
}
