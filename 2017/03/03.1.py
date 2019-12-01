def solve(nr):
  row = 0
  pos = 1

  if nr == 1:
    return 0

  for k in range(0, 9999):
    le = row * 2 + 1    # length of square
    pos = le * le       # value of bottom-right corner of the square
    prev = pos - (le - 1) * 4

    if pos >= nr:
      pos_in_square = nr - pos
      pos_in_line = pos_in_square % (le - 1)
      dst_from_middle = abs(pos_in_line - k)
      return dst_from_middle + k

    row += 1

  return 0

assert solve(1) == 0
assert solve(12) == 3
assert solve(23) == 2
assert solve(1024) == 31

print solve(312051)