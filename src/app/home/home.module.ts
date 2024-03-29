import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NationalparksService } from '@app/services/nationalparks.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    HomeRoutingModule,
    PerfectScrollbarModule,
    LeafletModule
  ],
  declarations: [HomeComponent],
  providers: [NationalparksService]
})
export class HomeModule {}
