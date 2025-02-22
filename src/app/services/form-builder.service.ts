import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
@Injectable({ providedIn: 'root' })
export class FormBuilderService {
  fieldGroups: any[] = JSON.parse(localStorage.getItem('fieldGroups') || '[]');
  selectedGroup: any = null;
  selectedElement: any = null;

  exportJson(data: any[], filename: string): void {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, `${filename}.json`);
  }

  addFieldGroup(newGroup) {
   
    this.fieldGroups.push(newGroup);
    this.saveGroups();
  }

  deleteFieldGroup(index: number) {
    this.fieldGroups.splice(index, 1);
    this.saveGroups();
  }

  selectFieldGroup(group: any) {
    this.selectedGroup = group;
  }

  saveGroups() {
    localStorage.setItem('fieldGroups', JSON.stringify(this.fieldGroups));
  }
}
