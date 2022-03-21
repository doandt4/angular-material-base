import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';

const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
    },
];

@NgModule({
    declarations: [LandingPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), CarouselModule.forRoot()],
    exports: [RouterModule],
})
export class LandingPageModule {}
