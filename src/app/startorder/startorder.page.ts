import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraOptions } from '@ionic-native/camera/ngx';
import { ServiceordersService} from '../serviceorders.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-startorder',
  templateUrl: './startorder.page.html',
  styleUrls: ['./startorder.page.scss'],
})
export class StartorderPage {
  
  public userData: any;
  public postData: any;
  public order_param: any;
  
  public order_id: string;
  public order_building: string;
  public order_manager: string;
  public order_supervisor: string;
  public order_apt: string;
  public order_date_opened_string: string;
  public order_status: string;

  public description_starter: string = "";
  public photo: string = '';

  fileUrl: any = null;
  respData: any;

  constructor(
    private camera: Camera, 
    public serviceordersservice: ServiceordersService,
    public http: HttpClient,
    private toastController: ToastController,
    private navegar: Router,
    private route: ActivatedRoute,
    public global: GlobalService ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.order_param = JSON.parse(params.get('id'));
    })
    this.order_id = this.order_param.id;
    this.order_building = this.order_param.building;      
    this.order_apt = this.order_param.apt;    
    this.order_date_opened_string = this.order_param.date_opened_string;
    this.order_status = this.order_param.status;
    this.userData = this.getUser();
  }

  sendPostRequest() {    
    this.postData = {
      id: this.order_param.id,
      description_started: this.description_starter,
      image: this.photo
    };

    this.http.put(this.global.urlServer + "startorder", this.postData)
      .subscribe((data) => {}, 
      error => {
        this.presentToastError();
      }
    );
   
    this.postData = {
      serviceorder_id: parseInt(this.order_id),
      description: this.description_starter + ' |-> On Started',
      image: this.photo,
    }
  
    this.http.put(this.global.urlServer + "saveHistory", this.postData)
      .subscribe((data) => {
        this.presentToastOk();
        this.navegar.navigateByUrl('/home');
      }, error => {
      }
    );
  }

  takePictureSO() {      
    this.photo = '';
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 500,
      targetHeight: 500
    }

    this.camera.getPicture(options)
    .then((imageData) => {
      let base64image = 'data:image/jpeg;base64,' + imageData;
      this.photo = base64image;
    }, (error) => {
      console.error(error);
    })
    .catch((error) => {
      console.error(error);
    })       
  }

  async presentToastOk() {
    const toast = await this.toastController.create({
      message: 'Work Order Approve!',
      duration: 800,
      animated: true,
      mode: "ios",
      color: 'success'
    });
    toast.present();
  }  

  async presentToastError() {
    const toast = await this.toastController.create({
      message: 'Sorry, wrong login! Plase try again!',
      duration: 800,
      animated: true,
      mode: "ios",
      color: 'danger'
    });
    toast.present();
  } 
  
  getUser() {         
    return JSON.parse(localStorage.getItem('postLogin'));
  }

}