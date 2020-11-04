import { Injectable, Inject } from '@angular/core';
Injectable()
export class Chore {
  choreName;
  chorePoint;
  constructor(
    choreName: any, chorePoint: any
  ) {
    this.choreName = choreName;
    this.chorePoint = chorePoint;
  }
}

Injectable()
export class Chores{

    static chores = [
        new Chore("Cooking", 500),
        new Chore("Cleaning Utensils", 400)
      ];

    static ChoreName = '';
    static ChorePoint = '';
    static ChoreMember = '';
    
}
