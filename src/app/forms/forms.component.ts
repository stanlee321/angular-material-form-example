import { Component, OnInit, Input } from '@angular/core';
import { FormServiceService } from '../services/form-service.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { element } from 'protractor';
import  'rxjs/add/operator/map' ;
import { HttpEventType } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  @Input('selectedDay') day: any;

  // Placeholder for forms as array
  public sopas = []
  public segundos = []
  public refrescos = []
  // Upload Status
  public sopasUploaded: boolean=false;
  public segundosUploaded: boolean=false;
  public refrescosUploaded: boolean=false;

  // Form group for items
  sopa: FormGroup;
  segundo:FormGroup;
  refresco:FormGroup;

  // HTTP response
  public response:any;
  // Placholder for image url response
  public uploadProgress:number = 0;
  public uploadingProgressing:boolean = false;



  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private backservice: FormServiceService) {}
  

  // For slider
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirthFormGroup: FormGroup;
  // On init
  ngOnInit() {
    this.sopa = this.createFormBuilder();
    this.segundo = this.createFormBuilder();
    this.refresco = this.createFormBuilder();

    // For slider
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });

    this.thirthFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
    // Push this items to array
    //this.sopas.push(this.sopa);
    //this.segundos.push(this.segundo);
    //this.refrescos.push(this.refresco);
  }

  // TODO Load from service arrays if exists
  ngOnChanges(changes: any){
    this.sopas = [];
    this.segundos= [];
    this.refrescos =[];
    this.sopasUploaded =false;
    this.segundosUploaded=false;
    this.refrescosUploaded=false;

  }
  // Update card 
  updateSomething(type:string){
    console.log(type)
    if (type == 'segundo'){
      this.segundosUploaded=false;
    }else if(type=='sopa'){
      this.sopasUploaded =false;
    }else if(type=='refresco'){
      this.refrescosUploaded=false;
    }
  }

  // Generic form builder
  createFormBuilder(){
    return this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      price: ['', Validators.required],
      image_url: 'assets/upload-cloud.png'
    });
  }

  // Sopas/Segundos  SUBMIT TO API
  onSubmit(){
    console.log('Updating outputs...again')

    this.backservice.uploadData(this.sopas, this.day, 'sopa').subscribe((resp:any ) => {
      if (resp.status == 200){
        this.sopasUploaded = true
        //this.isLinear = false
        console.log('DONEEEEE!!')

      }
    })
    //console.log('ONFORMS response', this.response)
  }
  onSubmitSegundos(){
    console.log('updating segundos...')
    this.backservice.uploadData(this.segundos, this.day, 'segundo').subscribe((resp:any ) => {
      if (resp.status == 200){
        this.segundosUploaded = true
        //this.isLinear = false
        console.log('DONEEEEE!!')

      }
    })
  }

  onSubmitRefrescos(){
    console.log('updating segundos...')
    this.backservice.uploadData(this.refrescos, this.day, 'refresco').subscribe((resp:any ) => {
      if (resp.status == 200){
        this.refrescosUploaded = true
        //this.isLinear = false
        console.log('DONEEEEE!!')
      }
    })
  }


  // Add/Delete sopas
  onAddItem(){
    this.sopa = this.createFormBuilder();
    this.sopas.push(this.sopa)
    this.uploadingProgressing = false
    this.uploadProgress = 0;

  }
  onDeleteItem(){
    this.sopas.pop()
  }

  // Add/Delete Segundos
  onAddSegundo(){
    this.segundo = this.createFormBuilder();
    this.segundos.push(this.segundo)
    this.uploadingProgressing = false
    this.uploadProgress = 0;

  }

  onDeleteSegundo(){
    this.segundos.pop()
  }

  // Add/Delete Refrescos
  onAddRefresco(){
    this.refresco = this.createFormBuilder();
    this.refrescos.push(this.refresco)
    this.uploadingProgressing = false
    this.uploadProgress = 0;
  }

  onDeleteRefresco(){
    this.segundos.pop()
  }
  

  handleProgress(event){
    this.uploadingProgressing = true
    this.uploadProgress = Math.round(100 * event.loaded / event.total)
  }


  onFileChange(event,idx:number, type:number) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        ///this.backservice.uploadImg(reader.result).map((resp:any ) => this.imageurl )
        this.backservice.uploadImg(reader.result).subscribe((event:any) => {
          if (event.type === HttpEventType.UploadProgress){
            this.handleProgress(event)
          } else if (event.type === HttpEventType.Response){
              if (type == 1) {
                this.sopas[idx].patchValue({
                  image_url: event.body.url
              });
              }else if( type == 2){
                this.segundos[idx].patchValue({
                  image_url: event.body.url
              });
              }else if (type == 3){
                this.refrescos[idx].patchValue({
                  image_url: event.body.url
              })
            }
          }
        })
      };
    }
  }
}
