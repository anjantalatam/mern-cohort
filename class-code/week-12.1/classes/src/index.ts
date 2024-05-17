import { measure } from 'helpful-decorators';

class DateClass {
  private timeZone: string;
  constructor(timeZone: string) {
    this.timeZone = timeZone;
  }

  //   @measure
  getMonth() {
    const date = new Date();
    console.log('hi');
    return date.getMonth();
  }
}

const dateObject = new DateClass('IND');
dateObject.getMonth();
dateObject.getMonth();
dateObject.getMonth();
dateObject.getMonth();
