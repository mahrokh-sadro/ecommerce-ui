import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  siteName: string = 'mywebsite';
  effectiveDate: string = 'March 29, 2025';
  contactEmail: string = 'contact@mywebsite.com';
}
