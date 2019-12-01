def check(phrase):
  di = {}
  p = phrase.split( )
  for i in range(0, len(p)):
    if di.get(p[i]):
      return False
    di.setdefault(p[i], 1)
  return True

assert check("aa bb cc dd ee")
assert not check("aa bb cc dd aa")
assert check("aa bb cc dd aaa")

ct = 0
with open('04.txt') as f:
  for line in f:
    if check(line):
      ct += 1

print ct
