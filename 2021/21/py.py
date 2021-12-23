from functools import lru_cache


def move(pos, score, amount):
    pos = (pos + amount - 1) % 10 + 1
    return pos, score + pos


def play(a, b):
    @lru_cache(maxsize=None)
    def count_wins(a, b):
        awins = bwins = 0
        for x in range(1, 4):
            for y in range(1, 4):
                for z in range(1, 4):
                    pos, score = roll_a = move(*a, x + y + z)
                    if score >= 21:
                        awins += 1
                    else:
                        roll_bwins, roll_awins = count_wins(b, roll_a)
                        awins += roll_awins
                        bwins += roll_bwins
        return awins, bwins
    return max(count_wins((a, 0), (b, 0)))


print(play(4, 1))
