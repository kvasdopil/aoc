const { file, assert } = require('../../utils')

const validate = ([field, value]) => {
  if (field === 'cid') return false;
  if (field === 'byr') return value >= '1920' && value <= '2002' && /^[0-9]{4}$/.test(value);
  if (field === 'iyr') return value >= '2010' && value <= '2020' && /^[0-9]{4}$/.test(value);
  if (field === 'eyr') return value >= '2020' && value <= '2030' && /^[0-9]{4}$/.test(value);

  if (field === 'hgt' && /^([0-9]+)cm$/.test(value))
    return parseInt(value, 10) >= 150 && parseInt(value, 10) <= 193;
  if (field === 'hgt' && /^([0-9]+)in$/.test(value))
    return parseInt(value, 10) >= 59 && parseInt(value, 10) <= 76;

  if (field === 'hcl') return /^#[0-9a-f]{6}$/.test(value);
  if (field === 'ecl') return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(value) >= 0;
  if (field === 'pid') return /^[0-9]{9}$/.test(value);
  return false;
}

const work = (lines) => {
  let result = 0;
  let ct = 0;
  for (line of lines.concat([""])) {
    const fields = line.split(" ").map(chunk => chunk.split(":")).filter(validate);
    if (line === '') {
      if (ct === 7) result++;
      ct = 0;
    } else {
      ct += fields.length;
    }
  }
  return result;
};


const test = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`.trim().split("\n");

assert(work(test), 2);
assert(work(file('input.txt')), 184);