import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { FormServiceService } from '../services/form-service.service';


@Component({
  selector: 'app-cenas-update',
  templateUrl: './cenas-update.component.html',
  styleUrls: ['./cenas-update.component.css']
})
export class CenasUpdateComponent implements OnInit {
  public cenas = [];

  public cenasUploaded: boolean=false;


  // Form groups for items
  cena: FormGroup;

  // Http response placeholder
  public response:any;
  // Placholder for image url response
  public uploadProgress:number = 0;
  public uploadingProgressing:boolean = false;
  
  constructor(private fb: FormBuilder,
    private backservice: FormServiceService){ }

  

  ngOnInit() {
    this.cena = this.createFormBuilder();
  }

  updateSomething(type:string){
    console.log(type)
    if (type == 'cenas'){
      this.cenasUploaded=false;
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


  // Add/Delete sopas
  onAddItem(){
    this.cena = this.createFormBuilder();
    this.cenas.push(this.cena)
    this.uploadingProgressing = false
    this.uploadProgress = 0;

  }
  onDeleteItem(){
    this.cenas.pop()
  }

  handleProgress(event){
    this.uploadingProgressing = true
    this.uploadProgress = Math.round(100 * event.loaded / event.total)
  }


  // ON return S3 img-url
  onFileChange(event, idx:number, type:number) {
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
              if (type == 4) {
                this.cenas[idx].patchValue({
                  image_url: event.body.url
              });
            }
          }
        })
      };
    }
  }

  // Cenas  SUBMIT TO API TOTAL INFO
  onSubmit(){
    console.log('Updating outputs...again')
    let d = new Date(); 
    let n = d.toLocaleDateString();
    let t = d.toLocaleTimeString();
    let time = n.replace('/',' ').replace('/', ' ') + ' ' + t.replace(':', ' ').replace(':', ' ');
    
    this.backservice.uploadData(this.cenas, time, 'cena').subscribe((resp:any ) => {
      if (resp.status == 200){
        this.cenasUploaded = true
        //this.isLinear = false
        console.log('DONEEEEE!!')
      }
    })

  }
}