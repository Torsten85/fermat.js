// =============================================================================
// Fermat.js | Complex Numbers
// (c) Mathigon
// =============================================================================


import {nearlyEquals} from './arithmetic';

const absStr = (n: number) => n < 0 ? '–' + (-n) : '' + n;


/**  Complex number class. */
export class Complex {

  constructor(public re = 0, public im = 0) {}

  get modulus() {
    return Math.sqrt(this.re * this.re + this.im * this.im);
  }

  get argument() {
    return Math.atan2(this.im, this.re);
  }

  get conjugate() {
    return new Complex(this.re, -this.im);
  }

  /** Returns the ith nth-root of this complex number. */
  root(n: number, i = 0) {
    const r = Math.pow(this.modulus, 1/n);
    const th = (this.argument + i * 2 * Math.PI) / n;
    return new Complex(r * Math.cos(th), r * Math.sin(th));
  }

  toString() {
    if (nearlyEquals(this.im, 0)) return absStr(this.re);
    if (nearlyEquals(this.re, 0)) return absStr(this.im) + 'i';
    if (this.im < 0) return `${this.re} – ${-this.im}i`;
    return `${absStr(this.re)} + ${this.im}i`;
  }

  // ---------------------------------------------------------------------------

  /** Calculates the sum of two complex numbers c1 and c2. */
  static sum(c1: Complex|number, c2: Complex|number) {
    if (typeof c1 === 'number') c1 = new Complex(c1, 0);
    if (typeof c2 === 'number') c2 = new Complex(c2, 0);

    return new Complex(c1.re + c2.re, c1.im + c2.im);
  }

  /** Calculates the difference of two complex numbers c1 and c2. */
  static difference(c1: Complex|number, c2: Complex|number) {
    if (typeof c1 === 'number') c1 = new Complex(c1, 0);
    if (typeof c2 === 'number') c2 = new Complex(c2, 0);

    return new Complex(c1.re - c2.re, c1.im - c2.im);
  }

  /** Calculates the product of two complex numbers c1 and c2. */
  static product(c1: Complex|number, c2: Complex|number) {
    if (typeof c1 === 'number') c1 = new Complex(c1, 0);
    if (typeof c2 === 'number') c2 = new Complex(c2, 0);

    let re = c1.re * c2.re - c1.im * c2.im;
    let im = c1.im * c2.re + c1.re * c2.im;
    return new Complex(re, im);
  }

  /** Calculates the sum of two quotient numbers c1 and c2. */
  static quotient(c1: Complex|number, c2: Complex|number) {
    if (typeof c1 === 'number') c1 = new Complex(c1, 0);
    if (typeof c2 === 'number') c2 = new Complex(c2, 0);

    if (Math.abs(c2.re) < Number.EPSILON || Math.abs(c2.im) < Number.EPSILON)
      return new Complex(Infinity, Infinity);

    let denominator = c2.re * c2.re + c2.im * c2.im;
    let re = (c1.re * c2.re + c1.im * c2.im) / denominator;
    let im = (c1.im * c2.re - c1.re * c2.im) / denominator;

    return new Complex(re, im);
  }

  /** Calculates e^c for a complex number c. */
  static exp(c: Complex|number) {
    if (typeof c === 'number') c = new Complex(c, 0);
    const r = Math.exp(c.re);
    return new Complex(r * Math.cos(c.im), r * Math.sin(c.im));
  }
}
