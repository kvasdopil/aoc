const weapons = [
  { price: 8, dmg: 4, arm: 0 },
  { price: 10, dmg: 5, arm: 0 },
  { price: 25, dmg: 6, arm: 0 },
  { price: 40, dmg: 7, arm: 0 },
  { price: 74, dmg: 8, arm: 0 }
];

const armor = [
  { price: 0, dmg: 0, arm: 0 },
  { price: 13, dmg: 0, arm: 1 },
  { price: 31, dmg: 0, arm: 2 },
  { price: 53, dmg: 0, arm: 3 },
  { price: 75, dmg: 0, arm: 4 },
  { price: 102, dmg: 0, arm: 5 }
];

const rings = [
  { price: 0, dmg: 0, arm: 0 },
  { price: 25, dmg: 1, arm: 0 },
  { price: 50, dmg: 2, arm: 0 },
  { price: 100, dmg: 3, arm: 0 },
  { price: 20, dmg: 0, arm: 1 },
  { price: 40, dmg: 0, arm: 2 },
  { price: 80, dmg: 0, arm: 3 }
];

const boss = {
  dmg: 8,
  arm: 2
};

function solve(dmg, arm) {
  const yourDmg = Math.max(1, dmg - boss.arm);
  const hisDmg = Math.max(1, boss.dmg - arm);

  return yourDmg >= hisDmg;
}

const sums = [];

let ct = 0;
for (let w = 0; w < weapons.length; w++) {
  for (let a = 0; a < armor.length; a++) {
    for (let r1 = 0; r1 < rings.length; r1++) {
      for (let r2 = 0; r2 < rings.length; r2++) {
        if (r1 === r2 && r1 != 0) {
          continue;
        }

        const sum =
          weapons[w].price + armor[a].price + rings[r1].price + rings[r2].price;

        const dmg = weapons[w].dmg + rings[r1].dmg + rings[r2].dmg;
        const arm = armor[a].arm + rings[r1].arm + rings[r2].arm;

        if (!solve(dmg, arm)) {
          continue;
        }

        sums.push({ sum, dmg, arm, w, a, r1, r2 });
      }
    }
  }
}

sums.sort((a, b) => a.sum - b.sum);
console.log(sums.shift());
