def test(v1, op, v2):
  if op == '>':
    return v1 > v2
  if op == '<':
    return v1 < v2
  if op == '>=':
    return v1 >= v2
  if op == '<=':
    return v1 <= v2
  if op == '==':
    return v1 == v2
  if op == '!=':
    return v1 != v2
  print 'unknown operator', op

def solve(filename):
  prog = []
  regs = {}

  for line in file(filename):
    li = line.strip().split()

    reg = li[0]
    value = regs.get(reg, 0)
    mul = 1 if li[1] == 'inc' else -1
    val = int(li[2])

    cond = regs.get(li[4], 0)
    cop = li[5]
    cval = int(li[6])

    # process
    if test(cond, cop, cval):
      regs[reg] = value + mul * val

  # print regs.values()
  return max(regs.values())

assert solve('08.test.txt') == 1

print solve('08.txt')


