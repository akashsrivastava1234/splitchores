import { Injectable } from '@angular/core';
import { MemberFamily } from './Globals';

export class Member {
  memberId; memberName; points;
  constructor(memberId, memberName, points) {
    this.memberId = memberId;
    this.memberName = memberName;
    this.points = points;
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
