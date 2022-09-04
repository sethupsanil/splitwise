import { HelperService } from './../service/helper.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  groupName!: {
    name: string,
    personName: any[]
  }
  personName: any = [];
  constructor(
    public _helper: HelperService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.addMember();
    this._helper.initGroupList();
  }
  addMember() {
    if (!this.groupName) {
      this.groupName = {
        name: '',
        personName: ['']
      }
      this.personName = [{ name: null }]
    } else {
      this.groupName.personName.push(null);
      this.personName.push({ name: null })
    }
  }
  createGroup() {
    this._helper.groupList.push({
      name: this.groupName.name,
      personName: this.groupName.personName
    });
    this.groupName.name = '';
    this.groupName.personName = []
    this.personName = [{ name: null }]
    this._helper.setLocalStorage('list', this._helper.groupList);
  }
  deleteGroup(index: number) {
    this._helper.groupList.splice(index, 1);
    this._helper.setLocalStorage('list', this._helper.groupList);
  }
  gotoDetailPage(index: number) {
    this._router.navigate(['/details/' + index])
  }
}
