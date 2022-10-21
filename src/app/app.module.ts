import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SafePipe, FilterPipe } from './global.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { CustomImpurePipePipe } from '../custom-impure-pipe.pipe';
import { CustomPurePipePipe } from './custom-pure-pipe.pipe';

@NgModule({
  imports: [
    BrowserModule,
    // IonicModule.forRoot(),
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    SafePipe,
    FilterPipe,
    CustomImpurePipePipe,
    CustomPurePipePipe,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
