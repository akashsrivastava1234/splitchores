import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
  { path: 'add-group', loadChildren: './pages/add-group/add-group.module#AddGroupPageModule' },
  { path: 'edit-group', loadChildren: './pages/edit-group/edit-group.module#EditGroupPageModule' },
  { path: 'add-member', loadChildren: './pages/add-member/add-member.module#AddMemberPageModule' },
  { path: 'add-chore', loadChildren: './pages/add-chore/add-chore.module#AddChorePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
