import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NationalparksService } from '@app/services/nationalparks.service';
import { latLng, LatLngTuple, tileLayer, icon, marker } from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isLoading = false;
  public parks: any[] = [];
  public stateOptions = [
    'AL',
    'AK',
    'AS',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FM',
    'FL',
    'GA',
    'GU',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MH',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'MP',
    'OH',
    'OK',
    'OR',
    'PW',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VI',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
  ];
  public selectedState: string;
  public mapZoom: number;
  public mapCenter: LatLngTuple = [39, -98];

  public options = {
    layers: [tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })],
    zoom: 4,
    center: latLng(this.mapCenter)
  };

  constructor(private npsService: NationalparksService) {
    this.selectedState = this.stateOptions[54];
  }

  ngOnInit() {
    this.isLoading = true;
    this.updateList();
  }

  public updateList = () => {
    this.npsService
      .getParks([this.selectedState])
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((parks: any) => {
        this.parks = parks.data;
        if (parks.data.length > 0) {
          this.mapZoom = 6;
          let pos: any = ('{' + parks.data[0].latLong + '}').replace('lat', '"lat"').replace('long', '"long"');
          pos = JSON.parse(pos);
          this.mapCenter = [pos.lat, pos.long];
        }
      });
  };
}
