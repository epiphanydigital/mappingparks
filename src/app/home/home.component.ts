import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NationalparksService } from '@app/services/nationalparks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isLoading = false;
  public parks: any[] = [];

  constructor(private npsService: NationalparksService) {}

  ngOnInit() {
    this.isLoading = true;
    this.updateList();
  }

  public updateList = (state?: string) => {
    if (!state) {
      state = 'VA';
    }
    this.npsService
      .getParks([state])
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((parks: any) => {
        this.parks = parks.data;
      });
  };
}
