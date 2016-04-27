# Javascript Fuzzy Set Theory library

[![NPM version](https://img.shields.io/npm/v/fuzzy-theo.svg)](https://www.npmjs.com/package/fuzzy-theo)
[![Build Status](https://travis-ci.org/leoaretakis/fuzzy-theo.svg?branch=master)](https://travis-ci.org/leoaretakis/fuzzy-theo)
[![Code Climate](https://codeclimate.com/github/leoaretakis/fuzzy-theo/badges/gpa.svg)](https://codeclimate.com/github/leoaretakis/fuzzy-theo)
[![codecov](https://codecov.io/github/leoaretakis/fuzzy-theo/coverage.svg)](https://codecov.io/gh/leoaretakis/fuzzy-theo)
[![Dependency Status](https://david-dm.org/leoaretakis/fuzzy-theo.svg)](https://david-dm.org/leoaretakis/fuzzy-theo)
[![devDependency Status](https://david-dm.org/leoaretakis/fuzzy-theo/dev-status.svg)](https://david-dm.org/leoaretakis/fuzzy-theo#info=devDependencies)

> Fuzzy-theo is a fuzzy-set theory utility javascript library

This library is written in Javascript ES6 and it is based on the readings of the book: _Neuro-Fuzzy and Soft Computing: A Computational Approach to Learning and Machine Intelligence_, by J.-S. R. Jang, C.-T. Sun, E. Mizutani ([See the book](http://www.amazon.com/Neuro-Fuzzy-Soft-Computing-Computational-Intelligence/dp/0132610663))

## Installation

Fuzzy-theo can be installed using

```sh
$ npm install --save fuzzy-theo
```

## Usage

```js
// load fuzzy-theo
import FuzzySet from 'fuzzy-theo';

// discrete map fuzzy-sets
const mapMembershipGrades = {
  'San Francisco': 0.9,
  'Los Angeles': 0.6,
  Boston: 0.8,
  Amsterdam: 100,
  Chennai: -100,
  London: 'cloudy',
};
const fsDiscrete = new FuzzySet({ func: (x) => mapMembershipGrades[x] });

// continuous fuzzy sets
const fsContinuous = new FuzzySet({ func: (x) => x });

// membership grade
fsDiscrete.membershipGrade('San Francisco'); // 0.9

// Fuzzy set properties
const fs = new FuzzySet({
  func: (x) => Math.abs(x),
  dimension: 1, // dimension of the function
  convex: false, // f(a*x1 + (1-a)*x2) >= min(f(x1), f(x2))
  normal: false, // at least one x where this.membershipGrade(x) == 1
  singleton: false, // only one x where f(x) == 1, all the others grades are 0,
  crossoverPoints: [], // points where func(x) = 0.5
  isSymmetricAroundC: () => false, // func(x + c) == func(x - c), for all x
  bandwidth: 0, // width Math.abs(x1 - x2), being x1 and x2 the two unique crossover points
  isOpenLeft: false, // lim fun(x) = 1, when x -> -Infinity
  isOpenRight: false, // lim fun(x) = 1, when x -> +Infinity
  isClosed: false, // lim fun(x) = 0, when x -> -Infinity OR x -> +Infinity
  setType: null, // continuous, discrete
  dataType: null, // numeric(quantitative), string(qualitative)
  // setInterval: [a,b] (closed), [a,b) (open-right), (a,b] (open-left), (a,b) (open)
  setInterval: null,
  set: null, // [a, c, g ...]
});

// Fuzzy set types
import { BellFS, GaussianFS, LeftRightFS, SigmoidalFS, TrapezoidalFS, TriangularFS } from 'fuzzy-theo';

const fs = new BellFS(50, 4, 20); // Bell shaped fuzzy-set
const fs = new GaussianFS(50, 20); // Gaussian shaped fuzzy-set
const fs = new LeftRightFS(65, 60, 10); // LR fuzzy-set
const fs = new SigmoidalFS(50, 4); // Sigmoid shaped fuzzy-set
const fs = new TrapezoidalFS(20, 40, 60, 80); // Trapezoid shaped fuzzy-set
const fs = new TriangularFS(20, 60, 80); // Triangle shaped fuzzy-set

// TODO: explain fuzzy set operations

```

## Test

To execute tests for the library, install the project dependencies once:

```sh
$ npm install
$ npm install -g gulp
```

Then, the tests can be executed with:

```sh
$ gulp test
```

To test code coverage of the tests:

```sh
$ npm test-coverage
```

To see the coverage results, open the generated report in your browser:

```sh
$ open ./coverage/lcov-report/index.html
```


## Roadmap


### 1.0.0

* Add bignumber.js
* Bind operations to FuzzySet
* Implement more FS types
* Create gh-pages with examples
