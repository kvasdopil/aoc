const { file, assert } = require('../../utils')

const validate = ([field, value]) => {
  if (field === 'cid') return false;
  return true;
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
assert(work(file('input.txt')), 254);