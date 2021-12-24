var [x, y, z, w, i] = [0, 0, 0, 0, 0]
w = input[i++]

x = z
x %= 26
z = Math.round(z / 1)
x += 11
x = (x !== w) ? 1 : 0

y = 25
y *= x
y += 1
z *= y

y = w
y += 3
y *= x
z += y
w = input[i++]

x = z
x %= 26
z = Math.round(z / 1)
x += 14
x = (x !== w) ? 1 : 0

y = 25
y *= x
y += 1
z *= y

y = w
y += 7
y *= x
z += y

w = input[i++]
x = z
x %= 26
z = Math.round(z / 1)
x += 13
x = (x !== w) ? 1 : 0
y = 25
y *= x
y += 1
z *= y

y = w
y += 1
y *= x
z += y

w = input[i++]
x = z
x %= 26
z = Math.round(z / 26)
x += -4
x = (x !== w) ? 1 : 0
y = 25
y *= x
y += 1
z *= y
y = w
y += 6
y *= x
z += y

w = input[i++]
x = z
x %= 26
z = Math.round(z / 1)
x += 11
x = (x !== w) ? 1 : 0

y = 25
y *= x
y += 1
z *= y
y = w
y += 14
y *= x
z += y

w = input[i++]
x = z
x %= 26
z = Math.round(z / 1)
x += 10
x = (x !== w) ? 1 : 0

y = 25
y *= x
y += 1
z *= y
y = w
y += 7
y *= x
z += y

w = input[i++]
x = z
x %= 26
z = Math.round(z / 26)
x += -4
x = (x !== w) ? 1 : 0

y = 25
y *= x
y += 1
z *= y
y = w
y += 9
y *= x
z += y

w = input[i++]
x = z
x %= 26
z = Math.round(z / 26)
x += -12
x = (x !== w) ? 1 : 0

y = 25
y *= x
y += 1
z *= y
y = w
y += 9
y *= x
z += y

w = input[i++]
x = z
x %= 26
z = Math.round(z / 1)
x += 10
x = (x !== w) ? 1 : 0

y = 25
y *= x
y += 1
z *= y
y = w
y += 6
y *= x
z += y
w = input[i++]

x = z
x %= 26
z = Math.round(z / 26)
x += -11
x = (x !== w) ? 1 : 0

y = 25
y *= x
y += 1
z *= y
y = w
y += 4
y *= x
z += y
w = input[i++]

x = z
x %= 26
z = Math.round(z / 1)
x += 12
x = (x !== w) ? 1 : 0

y = 25
y *= x
y += 1
z *= y

y = w
y += 0
y *= x
z += y
w = input[i++]

x = (z % 26) - 1
z = Math.round(z / 26)
x = (x !== w) ? 1 : 0

y = 1 + (25 * x)
z *= y

y = x * (w + 7)
z += y
w = input[i++]

x = z
x %= 26
z = Math.round(z / 26)
x += 0
x = (x !== w) ? 1 : 0

y = (25 * x) + 1
z *= y

y = x * (w + 12)
z += y
w = input[i++]

x = (z % 26) - 11;
z = Math.round(z / 26)
x = (x !== w) ? 1 : 0

y = 25 * x + 1
z *= y

y = x * (w + 1)
z += y