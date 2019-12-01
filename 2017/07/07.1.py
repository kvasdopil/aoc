
def solve(filename):
  parents = {}
  names = []

  for line in file(filename):
    ln = line.strip().split()
    # print(ln)

    name = ln.pop(0)
    ln.pop(0)

    if len(ln) > 0:
      ln.pop(0) # arrow

    for child in ln:
      cname = child.strip(',')
      parents.setdefault(cname, name)

    names.append(name)


  for name in names:
    if parents.get(name) == None:
      return name

  return None

assert solve('07.test.txt') == 'tknk'

print solve('07.txt')