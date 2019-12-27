const p1 = [
  "10 ORE => 10 A",
  "1 ORE => 1 B",
  "7 A, 1 B => 1 C",
  "7 A, 1 C => 1 D",
  "7 A, 1 D => 1 E",
  "7 A, 1 E => 1 FUEL"
];

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

const solve = transforms => {
  const resources = { FUEL: 1 };

  const process = item => {
    const reqs = transforms[item].req;
    resources[item]--;
    for (const req in reqs) {
      if (resources[req] === undefined) {
        resources[req] = reqs[req];
      } else {
        resources[req] += reqs[req];
      }
    }
  };

  while (true) {
    let transformed = 0;
    for (const item in resources) {
      if (resources[item] > 0) {
        if (item !== "ORE") {
          process(item);
          transformed++;
          console.log(resources);
          break;
        }
      }
    }
    if (transformed === 0) {
      return;
    }
  }
};

solve(parse(p1));
