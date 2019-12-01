def solve(size, lengths):
  field = range(size)
  pos = 0
  skip = 0

  for le in lengths:
    p1 = pos
    p2 = ( pos + le - 1 ) % size

    print 'pos', pos
    print 'len', le
    print '[',p1,':',p2,']:',p1 - p2

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

    print field
    pos = ( pos + le + skip ) % size
    skip += 1

  return field[0] * field[1]

assert solve(5, [3, 4, 1, 5]) == 12;
print solve(256, [120,93,0,90,5,80,129,74,1,165,204,255,254,2,50,113]);