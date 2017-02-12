export class Challange {
  public id: string;
  public uid: string;
  public accomplished: boolean[];
  public exp: string[];
  public completed: boolean;

  constructor(public title: string,
              public desc: string,
              public startDate: Date,
              public failed: boolean)
  {
    this.accomplished = [];
    for(let i=0; i<30; i++)
      this.accomplished[i] = false;
    this.exp = [];
    this.completed = false;
  }
}
