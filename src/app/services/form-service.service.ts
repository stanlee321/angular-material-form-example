import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
@Injectable()
export class FormServiceService {
  //  Array of forms
  public response:any;

  private apiurl:string = 'https://7pmbvcur1a.execute-api.us-east-1.amazonaws.com/prod/post-updates-to-bot?type=';
  private apiimg:string = 'https://60hy47r5sk.execute-api.us-east-1.amazonaws.com/prod/PostAsset';
  constructor(private http: HttpClient) { }

  // Upload to IMages API                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  uploadImg(image){
    return this.http.post(this.apiimg, image, {
      reportProgress: true,
      observe: 'events'
    })
  }


  // FUnction to upload to main API
  uploadData(data:any[], day:string, comida:string){
    const url = this.apiurl + comida

    const getCircularReplacer = () => {
      const seen = new WeakSet;
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };
    const response = JSON.stringify({
      day:day,
      type:comida,
      items:data
    }, getCircularReplacer())
    
    return this.http.post(url, response)
  }
}
