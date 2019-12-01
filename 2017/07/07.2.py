
def walk(tree, name):
  item = tree[name]
  # print item
  weights = map(lambda i: walk(tree, i), item['children'])
  print name, item['weight'], weights

  for i in xrange(0, len(weights)):
    if weights[i] != weights[0]:
      print "   ", weights
      print "   ", item['children']

  if len(weights):
    return item['weight'] + weights[0] * len(weights)

  return item['weight']

def solve(filename):
  items = {}
  parents = {}

  for line in file(filename):
    children = []
    ln = line.strip().split()

    name = ln[0]
    weight = int(ln[1].strip('()'))

    if len(ln) > 2:
      for child in ln[3:]:
        cname = child.strip(',')
        children.append(cname)
        parents[cname] = name

    items[name] = {
      'weight': weight,
      'children': children
    }

  for name in items.keys():
    if parents.get(name) == None:
      return walk(items, name)

  return None

solve('07.test.txt')

solve('07.txt')