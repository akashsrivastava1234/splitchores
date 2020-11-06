import { Injectable } from '@angular/core';
import { MemberFamily } from './Globals';

export class Member {
  memberId; memberName; memberPoints;
  constructor(memberId, memberName, memberPoints) {
    this.memberId = memberId;
    this.memberName = memberName;
    this.memberPoints = memberPoints;
  }

  fromJSON(json) {
    for (var propName in json)
        this[propName] = json[propName];
    return this;
}

clone(){
  return new Member(this.memberId, this.memberName, this.memberPoints)
}
}

Injectable()
export class EditGroupData{
    static GroupName = new MemberFamily("familyId", "FamilyName", "300")
    static memberNames = [
        new Member("id", "Member 1", "200"),
        new Member("id2", "Member 2", "100")
      ];

    /*static MemberName = '';
    static MemberEmail = '';
    constructor(name: any, email: any) {
      EditGroupData.MemberEmail = email;
      EditGroupData.MemberName = name;
    }*/
}
