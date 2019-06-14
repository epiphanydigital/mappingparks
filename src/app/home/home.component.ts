import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NationalparksService } from '@app/services/nationalparks.service';
import { latLng, LatLngTuple, tileLayer, icon, marker } from 'leaflet';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet/dist/leaflet/layers/control/leaflet-control-layers-config.model';

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
  public markerLayers: any[];

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

  public updateList = (newState?: string) => {
    this.isLoading = true;
    this.selectedState = newState;
    this.npsService
      .getParks([!!this.selectedState ? this.selectedState : 'VA'])
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((parks: any) => {
        this.parks = parks.data;
        if (this.parks.length > 0) {
          this.mapZoom = 6;
          this.mapCenter = this.getLatLng(this.parks[0]);
          console.log('mapcenter', this.mapCenter);
          this.setMarkers();
        }
      });
  };

  private setMarkers = () => {
    const markerOptions = {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    };
    this.markerLayers = [];
    for (let i = 0; i < this.parks.length; i++) {
      const latLong = this.getLatLng(this.parks[i]);
      if (!!latLong) {
        this.markerLayers.push(marker(latLong, markerOptions));
      }
    }
  };

  private getLatLng = (park: { latLong: LatLngTuple }): LatLngTuple => {
    if (!!park.latLong) {
      const pos: any = JSON.parse(('{' + park.latLong + '}').replace('lat', '"lat"').replace('long', '"long"'));
      return [pos.lat, pos.long];
    }
    return null;
  };
}
