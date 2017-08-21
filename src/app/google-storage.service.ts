import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class GoogleStorageService {

  constructor(private http: Http) { }

  getImg(filename: string): Promise<string> {
    const params = new URLSearchParams();
    params.append('filename', filename);
    return this.http.get('/getimg?filename=' + filename)
      .toPromise()
      .then(response => response.text())
      .catch(this.handleError);
  }

  getImgList(category: string): Promise<string[]> {
    const params = new URLSearchParams();
    params.append('cagetory', category);
    return this.http.get('/ls?category=' + category)
      .toPromise()
      .then(response => JSON.parse(response.text()))
      .catch(this.handleError);
  }

  getCategoryList(): Promise<string[]> {
    return this.http.get('/category')
      .toPromise()
      .then( response => JSON.parse(response.text()))
      .catch(this.handleError);
  }

  saveXML(content: any, filename: string): Promise<string> {
    const body = {filename: filename, content: content};
    return this.http.post('save', body).toPromise()
            .then(response => response.text())
            .catch(this.handleError);
  }

  loadXML(filename: string): Promise<any> {
    return this.http.get('/getboxes?filename=' + filename).toPromise()
      .then(response => JSON.parse(response.text()))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
