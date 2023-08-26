class DateClass {
  private timeZone: string;
  constructor(timeZone: string) {
    this.timeZone = timeZone;
  }

  getMonth() {
    const date = new Date();
    return date.getMonth();
  }

  expensiveOperation() {
    const startTime = new Date().getTime();
    let ctr = 0;

    for (let i = 0; i < 10000000000; i++) {
      ctr++;
    }

    console.log(ctr);
    const endTime = new Date().getTime();
    console.log(endTime - startTime, 'ms');
  }
}

const dateObject = new DateClass('IND');
const response = dateObject.getMonth();
const time = dateObject.expensiveOperation();

console.log(time);
