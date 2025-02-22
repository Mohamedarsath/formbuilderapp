

import { Component } from '@angular/core';
import { FormBuilderService } from '../services/form-builder.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-right-pane',
  templateUrl: './right-pane.component.html',
  styleUrls: ['./right-pane.component.scss']
})
export class RightPaneComponent {
  searchTerm: string = '';
  availableElements = [
    { name: 'Single Line Text', type: 'text',placeholder:'Single Line',required:false },
    { name: 'Multi Line Text', type: 'textarea',placeholder:'',required:false },
    { name: 'Integer', type: 'number',placeholder:'',required:false },
    { name: 'Date', type: 'date',placeholder:'',required:false },
    { name: 'Time', type: 'time' ,placeholder:'',required:false},
    { name: 'Date & Time', type: 'datetime-local' ,placeholder:'',required:false},
    { name: 'Single Selection', type: 'radio',placeholder:'',required:false,options: ['RadioOption 1', 'RadioOption 2', 'RadioOption 3'] },
    { name: 'Multi Selection', type: 'checkbox',placeholder:'',required:false,options: ['check 1', 'check 2', 'check 3'] },
    { name: 'Dropdown', type: 'select',placeholder:'',required:false,options: ['select 1', 'Select 2', 'Select 3'] },
    { name: 'Upload', type: 'file' ,required:false}
  ];

  constructor(public formBuilderService: FormBuilderService) {}
  get filteredElements() {
    return this.availableElements.filter(element =>
      element.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  drop(event: CdkDragDrop<any[]>) {
    if (this.formBuilderService.selectedGroup) {
      transferArrayItem(
        event.previousContainer.data,
        this.formBuilderService.selectedGroup.elements,
        event.previousIndex,
        event.currentIndex
      );
      this.formBuilderService.saveGroups();
    }
  }
}
