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
  completedBool
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
    this.completedBool = status == "Completed" ? true : false;
  }

  
  fromJSON(json) {
    for (var propName in json)
        this[propName] = json[propName];
    return this;
}

clone() {
  return new Chore(
    this.name,
    this.points,
    this.ownerId,
    this.startDate,
    this.expiryDate,
    this.familyId,
    this.total,
    this.type,
    this.status,
    this.completedAt,
    this.choresRotationSchedule,
    this.id)
}
}

export class ChoreRotationSchedule {
  memberId;order;
  constructor(memberId,order) {
    this.memberId = memberId;
    this.order = order;
  }

  clone(){
    return new ChoreRotationSchedule(this.memberId, this.order);
  }
}

Injectable()
export class Chores{

    static chores = [
        //new Chore("Cooking", 500, "member1", "", "", "", "family1", "1"),
        //new Chore("Cleaning Utensils", 400, "member1", "", "", "", "family1", "1"),
      ];    
}
