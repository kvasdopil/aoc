def work(lines):
  jumps = map(lambda val: int(val), lines)

  # print jumps

  steps = 0
  pos = 0
  while pos >= 0 and pos < len(jumps):
    oldp = pos
    pos += jumps[pos]

    if jumps[oldp] >= 3:
      jumps[oldp] -= 1
    else:
      jumps[oldp] += 1
    steps += 1
    # print jumps
    # print pos
    if steps % 100000 == 0:
      print steps
  return steps

lines = [
  "0",
  "3",
  "0",
  "1",
  "-3",
]

assert work(lines) == 10

print work(file('05.txt'))