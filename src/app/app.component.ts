import { Component } from '@angular/core';
import { FormBuilderService } from './services/form-builder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public formBuilderService:FormBuilderService){}
  // Initial Field Groups (can be empty or predefined)
  fieldGroups = [
    {
      name: 'Personal Information',
      description: 'Information about the person',
      fields: [
        { label: 'First Name', type: 'text', required: false, placeholder: 'Enter first name' },
        { label: 'Last Name', type: 'text', required: false, placeholder: 'Enter last name' }
      ]
    },
    {
      name: 'Address',
      description: 'Address related information',
      fields: [
        { label: 'Street Address', type: 'text', required: false, placeholder: 'Enter street address' },
        { label: 'City', type: 'text', required: false, placeholder: 'Enter city' }
      ]
    }
  ];

  // Selected field group
  selectedFieldGroup: any = null;

  // Selected field element to edit
  selectedField: any = null;

  // Method to handle selection of a field group from the left pane
  onFieldGroupSelected(group: any) {
    this.selectedFieldGroup = group;
    this.selectedField = null; // Reset selected field when a new group is selected
  }

  // Method to handle actions on field groups (Add, Edit, Delete)
  onFieldGroupAction(event: any) {
    const { action, group } = event;

    if (action === 'add') {
      // Add a new field group with basic name and description
      const newGroup = {
        name: 'New Field Group',
        description: 'Description of the field group',
        fields: []
      };
      this.fieldGroups.push(newGroup);
    }

    if (action === 'edit' && group) {
      // Allow editing (for simplicity, just editing name and description)
      group.name = prompt('Edit Group Name', group.name) || group.name;
      group.description = prompt('Edit Group Description', group.description) || group.description;
    }

    if (action === 'delete' && group) {
      // Delete the field group
      const index = this.fieldGroups.indexOf(group);
      if (index > -1) {
        this.fieldGroups.splice(index, 1);
      }
    }
  }

  // Method to handle the addition of new elements (dragged from the right pane)
  onDragElement(element: any) {
    if (this.selectedFieldGroup) {
      const newField = { ...element, placeholder: `Enter ${element.label.toLowerCase()}` };
      this.selectedFieldGroup.fields.push(newField);
    }
  }

  // Method to handle deleting an element from the middle pane
  onDeleteElement(field: any) {
    if (this.selectedFieldGroup) {
      const index = this.selectedFieldGroup.fields.indexOf(field);
      if (index > -1) {
        this.selectedFieldGroup.fields.splice(index, 1);
      }
    }
  }

  // Method to handle editing an element's properties
  onEditElement(field: any) {
    this.selectedField = { ...field };
  }

  // Method to handle updating field properties after editing in the right drawer
  onFieldUpdated(updatedField: any) {
    if (this.selectedFieldGroup && this.selectedField) {
      const index = this.selectedFieldGroup.fields.findIndex(f => f === this.selectedField);
      if (index > -1) {
        this.selectedFieldGroup.fields[index] = updatedField;
      }
      this.selectedField = null; // Reset selected field after update
    }
  }
}
