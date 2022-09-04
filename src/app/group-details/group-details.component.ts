import { HelperService } from './../service/helper.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  index!: number;
  groupDetails!: {
    name: string,
    personName: string[]
  };
  expenseList!: {
    name: string,
    personContribution: {
      name: string,
      amount: number
    }[]
  }
  public settlement: any = []
  constructor(
    private _activated: ActivatedRoute,
    public _helper: HelperService
  ) { }

  ngOnInit(): void {
    this._helper.initGroupList();
    this._activated.params.subscribe(res => {
      this.index = res['id'];
      this.groupDetails = this._helper.groupList[this.index];
      this.setExpenseList();
      this.calculateSettlement();
    })

  }
  setExpenseList() {
    this.expenseList = { name: '', personContribution: [] };
    this.groupDetails.personName.forEach(name => this.expenseList.personContribution.push({ name: name, amount: 0 }))
  console.log(this.expenseList.personContribution);

  }
  addExpense() {
    if (!this._helper.groupList[this.index].expenseList) {
      this._helper.groupList[this.index].expenseList = [];
    }
    console.log( this._helper.groupList[this.index].expenseList);
    console.log(this.expenseList);

    this._helper.groupList[this.index].expenseList.push(this.expenseList)
    this._helper.setLocalStorage('list', this._helper.groupList);
    console.log( this._helper.groupList[this.index].expenseList);
    this.setExpenseList();
    this.calculateSettlement();
  }
  deleteExpense(index: number) {
    console.log(this._helper.groupList[this.index].expenseList, index)
    this._helper.groupList[this.index].expenseList.splice(index, 1);
    this._helper.setLocalStorage('list', this._helper.groupList);
    this.calculateSettlement();
  }

  calculateSettlement() {
    this.settlement = [];
    const members = this._helper.groupList[this.index].personName;
    const money: any = [];
    const group = JSON.parse(JSON.stringify(this._helper.groupList[this.index].expenseList));
    if (this._helper.groupList[this.index].expenseList?.length !== 1) {
      group?.forEach((exp: any, index: number) =>
        exp.personContribution.forEach((element: any, j: number) => {
          if (group[index + 1]) {
            element.amount += group[index + 1].personContribution[j].amount
            money.push(element);
          }
        }));
    } else {
      money.push(this._helper.groupList[this.index].expenseList[0].personContribution[0])
    }
    const split: any = [];
    money.forEach((money: any) => {
      let getFrom = [...members]
      getFrom.splice(members.indexOf(money.name), 1)
      split.push({
        getFrom,
        bearer: money.name,
        amount: (money.amount / members.length),
      })

    })

    members.forEach(name => {

      let getFrom = [...members]
      getFrom.splice(members.indexOf(name), 1)
      const amountArray = split.filter((x: any) => x.bearer === name).map((item: any) => item.amount);
      this.settlement.push({
        bearer: name,
        amount: amountArray.reduce((a: any, b: any) => a + b, 0),
        getFrom
      })

    })

  }
}
