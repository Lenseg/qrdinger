import { InMemoryDbService } from 'angular-in-memory-web-api'

export class MockData implements InMemoryDbService {
  createDb() {
    let codes = [{
      options:{
        background: '#ffffff',
        foreground: '#000000',
        level: 'h'
      },
      id:'1',
      name:'kek',
      model:{
        type:'sms',
        number:'1',
        message:'1'
      }
    },{
      options:{
        background: '#eaeaea',
        foreground: '#444444',
        level: 'l'
      },
      id:'2',
      name:'kek2',
      model:{
        type:'wifi',
        networkType:'WPA',
        name:'WPA',
        pass:'WPA',
        hidden:false
      }
    }];
    return { codes };
  }
}
