def solve(start):
  hashes = {}

  arr = map(lambda item: int(item), start.split())
  hsh = '-'.join(map(lambda item: str(item), arr))

  ct = 0
  while hashes.get(hsh) != 1:
    ct += 1
    hashes.setdefault(hsh, 1)

    maxel = max(arr)
    i = arr.index(maxel)
    val = arr[i]
    arr[i] = 0

    while val > 0:
      i = (i+1) % len(arr)
      arr[i] += 1
      val -= 1

    hsh = '-'.join(map(lambda item: str(item), arr))
    print hsh

  return ct

print solve("5 1 10 0 1 7 13 14 3 12 8 10 7 12 0 6")
