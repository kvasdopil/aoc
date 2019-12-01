const spells = [
  { mana: 53, dmg: 4 },
  { mana: 73, dmg: 2, heal: 2 },
  { mana: 113, effect: 6, armfx: 7 },
  { mana: 173, effect: 6, dmgfx: 3 },
  { mana: 229, effect: 5, manafx: 101 }
];

let logs = [];
function log(...res) {
  logs.push(res);
}

let casts = [];

function run() {
  let mana = 500;
  let hp = 50;

  let bosshp = 58;
  const bossdmg = 9;

  const fx = [0, 0, 0, 0, 0];

  while (true) {
    let arm = 0;

    log("==PLAYER TURN==");
    for (let i = 0; i < fx.length; i++) {
      if (fx[i]) {
        const { armfx = 0, dmgfx = 0, manafx = 0 } = spells[i];
        log(`fx ${i} active for ${fx[i]} turns`, armfx, dmgfx, manafx);
        if (armfx) {
          arm = armfx;
        }
        bosshp -= dmgfx;
        mana += manafx;

        fx[i] = fx[i] - 1; // disable effect
      }
    }
    log(`mana:${mana} hp:${hp} boss:${bosshp} bossdmg:${bossdmg}`);

    if (bosshp < 1) {
      log("boss dead by fx");
      return casts; // win
    }

    // pick the spell

    let spell;
    while (true) {
      spell = Math.floor(Math.random() * spells.length);
      if (fx[spell]) {
        continue;
      }
      break;
    }

    log("spell", spell);

    // not enough mana
    if (mana < spells[spell].mana) {
      log("mana gone");
      return false;
    }
    mana -= spells[spell].mana;

    casts.push(spell);

    // your turn
    const { dmg = 0, heal = 0, effect = 0 } = spells[spell];
    bosshp -= dmg;
    hp += heal;

    // start effect
    if (effect) {
      fx[spell] = effect;
    }

    if (bosshp < 1) {
      log("boss dead");
      return casts; // you win
    }

    log("==BOSS TURN==");
    arm = 0;
    for (let i = 0; i < fx.length; i++) {
      if (fx[i]) {
        const { armfx = 0, dmgfx = 0, manafx = 0 } = spells[i];
        log(`fx ${i} active for ${fx[i]} turns`, armfx, dmgfx, manafx);
        if (armfx) {
          arm = armfx;
        }
        bosshp -= dmgfx;
        mana += manafx;

        fx[i] = fx[i] - 1; // disable effect
      }
    }
    log(`mana:${mana} hp:${hp} boss:${bosshp} bossdmg:${bossdmg} arm:${arm}`);

    if (bosshp < 1) {
      log("boss dead by fx");
      return casts; // win
    }

    // boss turn
    log("boss hits ", Math.max(1, bossdmg - arm));
    hp -= Math.max(1, bossdmg - arm);

    if (hp < 1) {
      log("you dead");
      return false; // you lose
    }
  }
}

let ct = 0;
let i = 0;
let min = 9999999;
while (true) {
  i++;
  const r = run();

  // if (casts[0] === 4) {
  //   if (casts[1] === 2) {
  //     console.log(casts);
  //     console.log();
  //     console.log(logs);
  //   }
  // }

  if (r) {
    ct++;
    const sum = r.map(i => spells[i].mana).reduce((a, b) => a + b, 0);
    if (sum < min) {
      min = sum;
      console.log(r);
    }
  }

  logs = [];
  casts = [];

  if (i % 100000 == 0) {
    console.log(Math.floor((ct / i) * 1000), "%", min, ct);
  }
}
