line = list('')
groups = 0

def parseline():
  if line[0] != '<':
    return

  while True:
    if line[0] == '!':
      line.pop(0)
      line.pop(0)
      continue

    if line[0] == '>':
      line.pop(0)
      return

    line.pop(0)

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
  '<>',
  '<random characters>',
  '<<<<>',
  '<{!>}>',
  '<!!>',
  '<!!!>>',
  '<{o"i!a,<{i<a>'
]

for t in tests:
  line = list(t)
  parseline()
  assert len(line) == 0

tests2 = [
  ('{}', 1),
  ('{{{}}}', 3),
  ('{{},{}}', 3),
  ('{{{},{},{{}}}}', 6),
  ('{<{},{},{{}}>}', 1),
  ('{<a>,<a>,<a>,<a>}', 1),
  ('{{<a>},{<a>},{<a>},{<a>}}', 5),
  ('{{<!>},{<!>},{<!>},{<a>}}', 2)
]

for t in tests2:
  line = list(t[0])
  groups = 0
  parsegroup()
  assert len(line) == 0
  assert groups == t[1]

tests3 = [
  ('{}', 1),
  ('{{{}}}', 6),
  ('{{},{}}', 5),
  ('{{{},{},{{}}}}', 16),
  ('{<a>,<a>,<a>,<a>}', 1),
  ('{{<ab>},{<ab>},{<ab>},{<ab>}}', 9),
  ('{{<!!>},{<!!>},{<!!>},{<!!>}}', 9),
  ('{{<a!>},{<a!>},{<a!>},{<ab>}}', 3),
]

for t in tests3:
  line = list(t[0])
  assert parsegroup() == t[1]

for l in file('09.txt'):
  line = list(l)
  print parsegroup()
