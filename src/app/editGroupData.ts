import { Injectable } from '@angular/core';

Injectable()
export class EditGroupData{
    static GroupName = 'GroupName';
    static memberNames = [
        "Member 1",
        "Member 2"
      ];

    static MemberName = '';
    static MemberEmail = '';
    constructor(name: any, email: any) {
      EditGroupData.MemberEmail = email;
      EditGroupData.MemberName = name;
    }
}
