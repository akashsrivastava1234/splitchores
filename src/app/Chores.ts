import { Injectable, Inject } from '@angular/core';
Injectable()
export class Chore {
  id;
  name;
  points;
  ownerId;
  startDate;
  expiryDate;
  familyId;
  total;
  type;
  status;
  completedAt;
  choresRotationSchedule;
  constructor(
  name,
  points,
  ownerId,
  startDate,
  expiryDate,
  familyId,
  total,
  type,
  status,
  completedAt,
  choresRotationSchedule,
  id = null
  ) {
    this.id = id;
    this.familyId = familyId;
    this.name = name;
    this.type = type;
    this.startDate = startDate;
    this.expiryDate = expiryDate;

    this.points = points;    
    this.total = total;
    this.ownerId = ownerId;
    this.status = status;
    this.completedAt = completedAt;
    this.choresRotationSchedule = choresRotationSchedule;
    
  }

  
  fromJSON(json) {
    for (var propName in json)
        this[propName] = json[propName];
    return this;
}

clone() {
  return this.clone();
}
}

Injectable()
export class Chores{

    static chores = [
        //new Chore("Cooking", 500, "member1", "", "", "", "family1", "1"),
        //new Chore("Cleaning Utensils", 400, "member1", "", "", "", "family1", "1"),
      ];

    static ChoreName = '';
    static ChorePoint = '';
    static ChoreMember = '';
    
}
