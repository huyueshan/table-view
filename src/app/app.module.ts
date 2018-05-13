import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './/app-routing.module';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { CellDataService } from './cell-data.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CellgroupComponent } from './components/home/cellgroup/cellgroup.component';
import { CellgroupService } from './components/home/cellgroup.service';
import { CanvasComponent } from './components/home/canvas/canvas.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CellgroupComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    FlexLayoutModule,
    AppRoutingModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   CellDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [CellgroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
