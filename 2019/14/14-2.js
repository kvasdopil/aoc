const { assert, file } = require("../../utils");

const parse = lines => {
  const items = lines.map(line => {
    const [from, to] = line.split(" => ");
    return {
      req: from.split(", ").reduce((res, item) => {
        const [amount, name] = item.split(" ");
        return { ...res, [name]: parseInt(amount, 10) };
      }, {}),
      amount: parseInt(to.split(" ")[0], 10),
      name: to.split(" ")[1]
    };
  });

  return items.reduce(
    (res, item) => ({ ...res, [item.name]: { ...item } }),
    {}
  );
};

const solve = (tf, FUEL = 1) => {
  const transforms = parse(tf);
  const resources = { FUEL };

  const transform = (checkAmount = true) => {
    for (const res in resources) {
      if (res === "ORE") {
        continue;
      }
      if (resources[res] <= 0) {
        continue;
      }
      if (checkAmount) {
        if (transforms[res].amount > resources[res]) {
          continue;
        }

        const rem = resources[res] % transforms[res].amount;
        const ct = Math.floor(resources[res] / transforms[res].amount);

        resources[res] = rem;
        for (const res2 in transforms[res].req) {
          if (resources[res2] === undefined) {
            resources[res2] = 0;
          }
          resources[res2] += transforms[res].req[res2] * ct;
        }
      } else {
        resources[res] -= transforms[res].amount;
        for (const res2 in transforms[res].req) {
          if (resources[res2] === undefined) {
            resources[res2] = 0;
          }
          resources[res2] += transforms[res].req[res2];
        }
      }

      if (resources[res] === 0) {
        delete resources[res];
      }
      return true;
    }
    return false;
  };

  while (transform()) {}
  while (transform(false)) {}

  return 1000000000000 - resources.ORE;
};

const p3 = [
  "157 ORE => 5 NZVS",
  "165 ORE => 6 DCFZ",
  "44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL",
  "12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ",
  "179 ORE => 7 PSHF",
  "177 ORE => 5 HKGWZ",
  "7 DCFZ, 7 PSHF => 2 XJWVT",
  "165 ORE => 2 GPVTF",
  "3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT"
];

assert(solve(p3, 82892753), 0); // 13312

const p4 = [
  "2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG",
  "17 NVRVD, 3 JNWZP => 8 VPVL",
  "53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL",
  "22 VJHF, 37 MNCFX => 5 FWMGM",
  "139 ORE => 4 NVRVD",
  "144 ORE => 7 JNWZP",
  "5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC",
  "5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV",
  "145 ORE => 6 MNCFX",
  "1 NVRVD => 8 CXFTF",
  "1 VJHF, 6 MNCFX => 4 RFSQX",
  "176 ORE => 6 VJHF"
];

assert(solve(p4, 5586022), 0); // 180697

const p5 = [
  "171 ORE => 8 CNZTR",
  "7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL",
  "114 ORE => 4 BHXH",
  "14 VRPVC => 6 BMBT",
  "6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL",
  "6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT",
  "15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW",
  "13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW",
  "5 BMBT => 4 WPTQ",
  "189 ORE => 9 KTJDG",
  "1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP",
  "12 VRPVC, 27 CNZTR => 2 XDBXC",
  "15 KTJDG, 12 BHXH => 5 XCVML",
  "3 BHXH, 2 VRPVC => 7 MZWV",
  "121 ORE => 7 VRPVC",
  "7 XCVML => 6 RJRHP",
  "5 BHXH, 4 VRPVC => 5 LTCX"
];

assert(solve(p5, 460664), 0); // 2210736

console.log(solve(file("./14.txt"), 4200533));
