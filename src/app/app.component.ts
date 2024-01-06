import { Component, OnInit } from '@angular/core';
import { CaseService } from './services/case-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'echocalypse-link-helper';
  message: any;
  cases: any[] = [];
  selectedCases = Array(6).fill(null);
  isGlobal: boolean = false;
  selectedLinksArray: { name: string, weight: number, multipleLinks: boolean, linkCount: number }[] = [];
  

  constructor(private caseService: CaseService) { }; 

  ngOnInit() {
    this.caseService.listCases().subscribe({
      next: (data) => {
        this.cases = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  sortCasesAlphabetically() {
    this.cases.sort((a, b) => a.CaseName.localeCompare(b.CaseName));
  }

  onSubmit() {
    //this.selectedCases = ['Lilith', 'Note', 'Audrey', 'Aiken', 'Set', 'Mori'];

    let selectedLinks: any = [];
    this.selectedCases.forEach(selectedCase => {
      ['Link_1', 'Link_2', 'Link_3', 'Link_4'].forEach(linkProperty => {
        const linkName = this.cases.find(c => c.CaseName === selectedCase)[linkProperty];
        const linkWeight = this.cases.find(c => c.CaseName === selectedCase)[linkProperty + '_weight'];
    
        if (linkName) {
          const linkNames = linkName.split(',').map((part: string) => part.trim());
    
          const halveWeight = linkNames.length > 1;
          linkNames.forEach((name: string | number) => {
            if (!selectedLinks[name]) {
              selectedLinks[name] = { name, weight: linkWeight || 0, multipleLinks: halveWeight, linkCount: 1 };
            } else {
              selectedLinks[name].weight += linkWeight || 0;
              selectedLinks[name].multipleLinks = selectedLinks[name].multipleLinks || halveWeight;
              selectedLinks[name].linkCount++;
            }
          });
        }
      });
    });
    
    this.selectedLinksArray = Object.values(selectedLinks);
    this.selectedLinksArray.sort((a: any, b: any) => b.weight - a.weight);
    
  }
   
}
