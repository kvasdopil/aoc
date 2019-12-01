def check(phrase):
  di = {}
  p = phrase.split( )
  for i in range(0, len(p)):
    index = list(p[i])
    index.sort()
    index = "".join(index)
    if di.get(index):
      return False
    di.setdefault(index, 1)
  return True

assert check("abcde fghij")
assert not check("abcde xyz ecdab")
assert check("a ab abc abd abf abj")
assert check("iiii oiii ooii oooi")
assert not check("oiii ioii iioi iiio")

ct = 0
with open('04.txt') as f:
  for line in f:
    if check(line):
      ct += 1

print ct
