import { Component } from '@angular/core';
import { NavController,LoadingController, ActionSheetController} from 'ionic-angular';
import  { MusicProvider } from '../../providers/music/music'
import { SocialSharing } from '@ionic-native/social-sharing'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   public allMusic: any = [];
  constructor(public navCtrl: NavController,
             private musicProvider:MusicProvider,
             private loadingController:LoadingController,
             private actionSheetController:ActionSheetController,
             private socialSharing:SocialSharing
             ) {

  }

  ionViewDidLoad(){
    let allMusicLoadingController = this.loadingController.create({
      content:"Getting your music from Server"
    })
    allMusicLoadingController.present()

    this.musicProvider.getMusic().subscribe(
      (data) => {
         this.allMusic = data
         allMusicLoadingController.dismiss()
      },
      (err) => {
         alert('Error is happening')
         allMusicLoadingController.dismiss()
      }
    )
  }


  addOneSong(refresher){
    this.musicProvider.getOneSong().subscribe(
      (oneSong) => {
         this.allMusic.unshift(oneSong[0])
         refresher.complete()
      },
      (err) => {
        alert('Error server:' + err)
        refresher.complete()
      },
      () => refresher.complete()
    )
  }


  shareSong(music){
    let shareSongActionSheet = this.actionSheetController.create({
       title: "Share Song with Friends",
       buttons: [
         {
            text:"Share on Facebook",
            icon:"logo-facebook",
            handler: () => {
              this.socialSharing.shareViaFacebook(music.name,music.image,music.music_url);
            }
         },
         {
          text:"Share on Twitter",
          icon:"logo-twitter",
          handler: () => {
            this.socialSharing.shareViaTwitter(music.name,music.image,music.music_url);
          }
         },
         {
          text:"Share",
          icon:"share",
          handler: () => {
             this.socialSharing.share(music.name,"")
          }
         },
         {
           text:"Cancel",
           role: "destructive"
         }
       ]
    })     
    
    shareSongActionSheet.present()
  }



}
