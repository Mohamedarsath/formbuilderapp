
import { Component } from '@angular/core';
import { FormBuilderService } from '../services/form-builder.service';

@Component({
  selector: 'app-right-drawer',
  templateUrl: './right-drawer.component.html',
  styleUrls: ['./right-drawer.component.scss']
})
export class RightDrawerComponent {
  updatedval:any='';
  constructor(public formBuilderService: FormBuilderService) {}
  modelchange(i){
    this.formBuilderService.selectedElement.options[i]=this.updatedval;
 

  }
  updateProperties() {
    this.formBuilderService.saveGroups();
  }
  closeDrawer() {
    this.formBuilderService.selectedElement = null; // Close drawer when user clicks outside or a close button
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
}
