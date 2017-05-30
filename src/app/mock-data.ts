import { InMemoryDbService } from 'angular-in-memory-web-api'

export class MockData implements InMemoryDbService {
  createDb() {
    let codes = [{
      background: '#ffffff',
      foreground: '#000000',
      level: 'h',
      value: 'kek',
      id:'1',
      name:'kek',
      type:'Wifi'
    },{
      background: '#eaeaea',
      foreground: '#444444',
      level: 'l',
      value: 'sdflkjgblbehjrdvh;akrnefgkzjd,nvcz',
      id:'2',
      name:'kek2',
      type:'Sms'
    }];
    return { codes };
  }
}
