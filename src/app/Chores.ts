import { Injectable, Inject } from '@angular/core';
Injectable()
export class Chore {
  choreName;
  chorePoint;
  choreType;
  ownerId;
  startDate;
  expiryDate;
  familyId;
  total;
  constructor(
    choreName: any, chorePoint: any,   choreType, ownerId, startDate, expiryDate, familyId, total
  ) {
    this.choreName = choreName;
    this.chorePoint = chorePoint;
    this.choreType = choreType;
    this.ownerId = ownerId;
    this.startDate = startDate;
    this.expiryDate = expiryDate;
    this.familyId = familyId;
    this.total = total;
  }
}

Injectable()
export class Chores{

    static chores = [
        new Chore("Cooking", 500, "member1", "", "", "", "family1", "1"),
        new Chore("Cleaning Utensils", 400, "member1", "", "", "", "family1", "1"),
      ];

    static ChoreName = '';
    static ChorePoint = '';
    static ChoreMember = '';
    
}
