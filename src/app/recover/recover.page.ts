import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  public postData: any;
  public userData: any;
  public email: any;

  constructor(
    private toastController: ToastController,
    private router: Router,
    public global: GlobalService,
    public http: HttpClient ) {}

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.userData = this.getUser();
  }

  sendEmailChangePassword() {
    this.postData = {
      email: this.email
    };               
    this.http.put(this.global.urlServer + 'searchPassword', this.postData).subscribe((data) => { 
      this.presentToastOk();
      this.router.navigateByUrl('/login');      
    }, error => {
      this.presentToastError();
    });
  }

  async presentToastOk() {
    const toast = await this.toastController.create({
      message: "It's ok. The password sended for email!",
      animated: true,
      mode: "ios",
      duration: 800,
      showCloseButton: true,
      color: 'success'
    });
    toast.present();
  } 

  async presentToastError() {
    const toast = await this.toastController.create({
      message: "Please make sure you're connected to the internet and try again.",
      animated: true,
      mode: "ios",
      duration: 800,
      showCloseButton: true,
      color: 'danger'
    });
    toast.present();
  } 

  getUser() {         
    return JSON.parse(localStorage.getItem('postLogin'));
  }

}