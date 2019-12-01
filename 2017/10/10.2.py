pos = 0
skip = 0
field = []

def rotate(lengths):
  global pos
  global skip
  global field
  size = len(field)

  for le in lengths:
    p1 = pos
    p2 = ( pos + le - 1 ) % size

    while True:
      if p1 == p2:
        break
      if p1 == p2 - 1:
        break
      if p2 == p1 - 1:
        break
      c = field[p2]
      field[p2] = field[p1]
      field[p1] = c
      p1 = ( p1 + 1 ) % size
      if p1 == p2:
        break
      p2 = ( p2 - 1) % size

    pos = ( pos + le + skip ) % size
    skip += 1

def str2list(string):
  res = map(lambda a: ord(a), list(string))
  for i in [17, 31, 73, 47, 23]:
    res.append(i)
  return res

def hash(string):
  global pos
  global skip
  global field
  pos = 0
  skip = 0
  field = range(256)

  lengths = str2list(string)
  # print lengths
  for i in xrange(64):
    rotate(lengths)

  return sparse2dense(field)

def sparse2dense(data):
  res = [];
  for i in range(len(data) / 16):
    sublst = data[ 16 * i : 16 * (i + 1) ]
    r = reduce(lambda i, j: i ^ j , sublst, 0)
    res.append(r)
  return "".join(map(lambda i: format(i, "02x"), res))

assert str2list("1,2,3") == [49,44,50,44,51,17,31,73,47,23]

assert hash("") == 'a2582a3a0e66e6e86e3812dcb672a272'
print hash('AoC 2017')
print hash("1,2,3")
print hash("1,2,4")
print hash("120,93,0,90,5,80,129,74,1,165,204,255,254,2,50,113")