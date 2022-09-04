import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public groupList: {
    name: string,
    personName: string[],
    expenseList?: any
  }[] = []
  constructor() { }
  setLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data))
  }
  getLocalStorage(key: string) {
    return JSON.parse(<any>localStorage.getItem(key));
  }
  initGroupList() {
    this.groupList = this.getLocalStorage('list') ? this.getLocalStorage('list') : [];
  }



}
