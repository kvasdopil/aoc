def calc(field, x, y):

  # print  (
  #   field[x-1][y-1] ,
  #   field[x-1][y] ,
  #   field[x-1][y+1] ,
  #   field[x][y-1] ,
  #   field[x][y+1] ,
  #   field[x+1][y-1] ,
  #   field[x+1][y] ,
  #   field[x+1][y+1],
  #   )

  return (
    field[x-1][y-1] +
    field[x-1][y] +
    field[x-1][y+1] +
    field[x][y-1] +
    field[x][y+1] +
    field[x+1][y-1] +
    field[x+1][y] +
    field[x+1][y+1]
  )

def fill(le, end):
  field = []
  for i in range(0, le):
    row = []
    for j in range(0, le):
      row.append(0)
    field.append(row)

  x = le / 2
  y = le / 2
  step = 0

  field[x][y] = 1
  print(x - le/2, y - le/2, field[x][y])

  while field[x][y] < end:
    step += 1
    for i in range(0, step):
      x += 1
      field[x][y] = calc(field, x, y)
      print(x - le/2, y - le/2, field[x][y])

    for i in range(0, step):
      y += 1
      field[x][y] = calc(field, x, y)
      print(x - le/2, y - le/2, field[x][y])

    step += 1
    for i in range(0, step):
      x -= 1
      field[x][y] = calc(field, x, y)
      print(x - le/2, y - le/2, field[x][y])

    for i in range(0, step):
      y -= 1
      field[x][y] = calc(field, x, y)
      print(x - le/2, y - le/2, field[x][y])

fill(128, 312051)