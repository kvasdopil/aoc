line = list('')
groups = 0
garbage = 0

def parseline():
  global garbage

  if line[0] != '<':
    return

  line.pop(0)

  while True:
    if line[0] == '!':
      line.pop(0)
      line.pop(0)
      continue

    if line[0] == '>':
      line.pop(0)
      return

    line.pop(0)
    garbage += 1

def parsegroup(score = 1):
  global groups

  if line[0] != "{":
    return 0

  line.pop(0)

  groups += 1
  res = score

  while True:
    if line[0] == '<':
      parseline()
      continue

    if line[0] == '{':
      res += parsegroup(score + 1)
      continue

    if line[0] == '}':
      line.pop(0)
      return res

    line.pop(0)

tests = [
  ('<>', 0),
  ('<random characters>', 17),
  ('<<<<>', 3),
  ('<{!>}>', 2),
  ('<!!>', 0),
  ('<!!!>>', 0),
  ('<{o"i!a,<{i<a>', 10),
]

for t in tests:
  line = list(t[0])
  garbage = 0
  parseline()
  assert garbage == t[1]

for l in file('09.txt'):
  line = list(l)
  garbage = 0
  parsegroup()
  print garbage
