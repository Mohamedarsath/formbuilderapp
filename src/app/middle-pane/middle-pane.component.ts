
import { Component } from '@angular/core';
import { FormBuilderService } from '../services/form-builder.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-middle-pane',
  templateUrl: './middle-pane.component.html',
  styleUrls: ['./middle-pane.component.scss']
})
export class MiddlePaneComponent {
  iseditbox:boolean=false;
  name:any;
  description:any;
  jsonData: any;
  jsonArray: any[] = [];
  selectedFile: File | null = null;
  constructor(public formBuilderService: FormBuilderService) {}

 
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        try {
          this.jsonData = JSON.parse(fileReader.result as string);
          this.formBuilderService.selectedGroup.elements = this.jsonData;
          this.formBuilderService.saveGroups();
          console.log(this.jsonData);
          //this.processJsonData();
        } catch (error) {
          console.error('Error parsing JSON', error);
        }
      };
      fileReader.readAsText(this.selectedFile);
    }
  }

  openeditbox(){
    this.name=this.formBuilderService.selectedGroup.name
  this.description=  this.formBuilderService.selectedGroup.description;
    this.iseditbox=true;
  }
  exportfields(){
   this.formBuilderService.exportJson(this.formBuilderService.selectedGroup.elements, 'my_data');
  }
  updateGroup() {
    this.formBuilderService.selectedGroup.name=this.name;
    this.formBuilderService.selectedGroup.description=this.description;
    this.iseditbox=false;
    this.name='';
    this.description='';
    this.formBuilderService.saveGroups();

  }
  cancel(){
    this.iseditbox=false;
    this.name='';
    this.description='';
  }
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.formBuilderService.saveGroups();
  }

  selectElement(element: any) {
    this.formBuilderService.selectedElement = element;
  }

  deleteElement(index: number) {
    this.formBuilderService.selectedGroup.elements.splice(index, 1);
    this.formBuilderService.saveGroups();
  }
}
