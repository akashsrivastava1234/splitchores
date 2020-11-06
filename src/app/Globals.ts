import { Injectable } from '@angular/core';


export class MemberFamily {
  familyId;
  familyName;
  memberPoints;
  constructor(familyId, familyName, memberPoints) {
    this.familyId = familyId;
    this.familyName = familyName;
    this.memberPoints = memberPoints;
  }
  clone() {
    return new MemberFamily(this.familyId, this.familyName, this.memberPoints);
  }
}


Injectable()
export class Globals{
    static UserName = 'UserName';
    static Address = 'Address';
    static userId = 'UserId';

    get userName() {
        return Globals.UserName;
      }
    get address() {
        return Globals.Address;
      }
    get getUserId() {
      return Globals.userId;
    }
    
    static groupsName = [
      new MemberFamily("G1", "Group 1", 100),
      new MemberFamily("G2", "Group 2", 200)
    ];
    
    static async delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }

  
}
