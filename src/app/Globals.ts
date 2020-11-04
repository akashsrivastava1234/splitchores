import { Injectable } from '@angular/core';

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
      "Group 1",
      "Group 2"
    ];
}
