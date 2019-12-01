function solve(input) {
  const total = input.reduce((a, b) => a + b, 0);

  let qamin = 99999999999999999999;

  for (let a = 0; a < input.length; a++) {
    for (let b = 0; b < input.length; b++) {
      for (let c = 0; c < input.length; c++) {
        for (let d = 0; d < input.length; d++) {
          for (let e = 0; e < input.length; e++) {
            for (let f = 0; f < input.length; f++) {
              if (f == a || f == b || f == c || f == d || f == e) {
                continue;
              }
              if (a == b || a == c || a == d || a == e) {
                continue;
              }
              if (b == c || b == d || b == e) {
                continue;
              }
              if (c == d || c == e) {
                continue;
              }
              if (d == e) {
                continue;
              }

              const r = [
                input[a],
                input[b],
                input[c],
                input[d],
                input[e],
                input[f]
              ];
              const sum = r.reduce((a, b) => a + b, 0);
              const qa = r.reduce((a, b) => a * b, 1);

              // console.log(sum, total);
              if (sum != total / 3) {
                continue;
              }

              if (qa < qamin) {
                qamin = qa;
                console.log(r, qa);
              }
            }
          }
        }
      }
    }
    console.log(".");
  }
}

const data = [
  1,
  3,
  5,
  11,
  13,
  17,
  19,
  23,
  29,
  31,
  37,
  41,
  43,
  47,
  53,
  59,
  67,
  71,
  73,
  79,
  83,
  89,
  97,
  101,
  103,
  107,
  109,
  113
];

solve(data);
