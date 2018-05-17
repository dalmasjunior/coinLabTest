import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.css'],
  
})
export class BrokerComponent implements OnInit {

  metaData: any;
  daily: any;
  page: any;
  limit: any;
  total: any;
  paged: any;
  count: any;
  constructor(private http: HttpClient) {
    this.page = 0;
    this.limit = 3;
    this.total = -1;
    this.count = 10;
  }

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    this.http.get('https://www.alphavantage.co/query?apikey=A7A07VPQZB29ZE6Z&function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT')
              .subscribe(resp => {
                this.metaData = this.organizeMeta(resp['Meta Data']);
                this.daily = this.organizeDaily(resp['Time Series (Daily)']);
                this.paged = this.daily.slice(this.count-10,this.count);
                this.total = Math.round(this.daily.length / 10);
              });
  }

  roamTable(value) {
    this.count += value;
    this.paged = this.daily.slice(this.count + (value > 0 ? (value * -1) : value),this.count);
  }

  prev() {
    if(this.page > 0){
      this.roamTable(-10);
      this.page -= 1;
    }
  }

  next() {
    if(this.page < this.total-1) {
      this.roamTable(10);
      this.page += 1; 
    }
  }

  organizeMeta(obj) {
    var org = {
      title: obj['1. Information'],
      symbol: obj['2. Symbol'],
      last: obj['3. Last Refreshed'],
      size: obj['4. Output Size'],
      timeZone: obj['5. Time Zone']
    };      
    console.log(JSON.stringify(org));
    return org;
  }

  organizeDaily(obj) {
    var org = [];
    for(var property in obj){
      if(obj.hasOwnProperty(property)) {
        org.push({
          date: property,
          open: obj[property]["1. open"],
          high: obj[property]["2. high"],
          low: obj[property]["3. low"],
          close: obj[property]["4. close"],
          adjustedClose: obj[property]["5. adjusted close"],
          volume: obj[property]["6. volume"],
          dividendAmount: obj[property]["7. dividend amount"],
          splitCoefficient: obj[property]["8. split coefficient"]
        });
      } 
    }
    return org;
  }

}
