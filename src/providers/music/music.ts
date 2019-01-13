import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const API: string = "https://orangevalleycaa.org/api/music"
@Injectable()
export class MusicProvider {

  constructor(public http: HttpClient) {
      
  }

  getMusic(){
    return  this.http.get(API)
  }

  getOneSong(){
    let oneSongUrl = API + "/qty/1"
    return this.http.get(oneSongUrl)
  }

}
