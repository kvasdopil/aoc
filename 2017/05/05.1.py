def work(lines):
  jumps = map(lambda val: int(val), lines)

  # print jumps

  steps = 0
  pos = 0
  while pos >= 0 and pos < len(jumps):
    oldp = pos
    pos += jumps[pos]
    jumps[oldp] += 1
    steps += 1
    # print jumps
    # print pos
  return steps

lines = [
  "0",
  "3",
  "0",
  "1",
  "-3",
]

assert work(lines) == 5

print work(file('05.txt'))