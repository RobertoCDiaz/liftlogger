import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-weighting',
  templateUrl: './add-weighting.component.html',
  styleUrls: ['./add-weighting.component.sass']
})
export class AddWeightingComponent {

  data: Record<string, number> = {};

  constructor(private http: HttpClient) { }

  onDataChanged(value: number, fieldName: string): void {
    this.data[fieldName] = Number(value);

    console.log(this.data)
  }

  onSubmit(): void {
    // alert('submitting ' + JSON.stringify(this.data));


    this.http.post(
      'http://localhost:3001/weighting',
      this.data,
      { headers: { 'Content-Type': 'application/json' } }
    ).subscribe();
  }

}
