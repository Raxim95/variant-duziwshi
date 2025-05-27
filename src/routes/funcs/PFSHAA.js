import _ from "lodash";

export class PFSHA {
  // _questions: string[]
  constructor(_questions) {
    this.i = 0;
    this.questions = _.shuffle(_questions.filter((q) => q != null));
  }

  next(count = 1) {
    if (count <= 0) return null;
    if (count === 1) return this.give();
    let result = [];
    for (let j = 0; j < count; j++) {
      let q = this.give();
      if (q) result.push(q);
    }
    return result.length > 0 ? result : null;
  }

  give() {
    if (this.questions.length === 0) return null;
    if (this.i >= this.questions.length) {
      this.i = 0;
      this.questions = _.shuffle(this.questions);
    }
    return this.questions[this.i++];
  }
}

export class PFSHAA {
  // kategoriyalar: string[][]
  constructor(kategoriyalar) {
    this.indexes = new PFSHA(_.range(kategoriyalar.length));
    this.kategoriyalar = kategoriyalar.map((v) => new PFSHA(v));
  }

  give() {
    let index = this.indexes.next();
    let nextQ = this.kategoriyalar[index]?.next();
    return nextQ;
  }

  next(count = 1) {
    if (count <= 0) return null;
    if (count === 1) return this.give();
    let result = [];
    for (let j = 0; j < count; j++) {
      let q = this.give();
      if (q) result.push(q);
    }
    return result.length > 0 ? result : null;
  }
}
