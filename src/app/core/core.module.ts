import { MarkdownModule } from 'ngx-markdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthEffects } from '@features/auth/store/auth.effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FooterComponent } from './components/footer/footer.component';
import { InlineEditComponent } from './components/inline-edit/inline-edit.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DataPrivacyComponent } from './containers/data-privacy/data-privacy.component';
import { HomeComponent } from './containers/home/home.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { LegalComponent } from './containers/legal/legal.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { SelectValuePipe } from './pipes/select-value.pipe';
import * as CoreState from './store/index';
import { ToastsEffects } from './store/toasts/toasts.effects';
import { UserEffects } from './store/user/user.effects';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    LayoutComponent,
    SidebarComponent,
    FooterComponent,
    LegalComponent,
    DataPrivacyComponent,
    InlineEditComponent,
    AutoFocusDirective,
    SelectValuePipe,
    EllipsisPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    StoreModule.forFeature(CoreState.coreFeatureKey, CoreState.reducers),
    EffectsModule.forFeature([ToastsEffects, UserEffects, AuthEffects]),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule
  ],
  exports: [LayoutComponent, InlineEditComponent, SelectValuePipe, EllipsisPipe]
})
export class CoreModule {}
