def solve(start):

  arr = map(lambda item: int(item), start.split())
  hsh = ''

  ct = 0
  while hsh != start:
    ct += 1

    maxel = max(arr)
    i = arr.index(maxel)
    val = arr[i]
    arr[i] = 0

    print val

    while val > 0:
      i = (i+1) % len(arr)
      arr[i] += 1
      val -= 1

    hsh = ' '.join(map(lambda item: str(item), arr))
    print hsh

  return ct

print solve("1 1 14 13 12 11 10 9 8 7 7 5 5 3 3 0")
