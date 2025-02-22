import { Component } from '@angular/core';
import { FormBuilderService } from '../services/form-builder.service';

@Component({
  selector: 'app-left-pane',
  templateUrl: './left-pane.component.html',
  styleUrls: ['./left-pane.component.scss']
})
export class LeftPaneComponent {
  name:any;
  description:any;
  constructor(public formBuilderService: FormBuilderService) {}

  addGroup() {
    if(this.name){
    this.formBuilderService.addFieldGroup({ name:this.name,description:this.description, elements: [] });
    }
    this.name='';
    this.description='';
  }
  openform(){
}
  deleteGroup(index: number) {
    this.formBuilderService.deleteFieldGroup(index);
  }

  selectGroup(group: any) {
    this.formBuilderService.selectFieldGroup(group);
  }
}