mountain = [list(line.strip()) for line in open('./day3/day3.txt')]


def move(right, down):
    treesHit = 0
    y = 0
    for x in range(0, len(mountain), down):
        if mountain[x][y] == "#":
            treesHit += 1
        y = (y + right) % len(mountain[0])
    return treesHit


# Part 1:
print(move(3, 1))

# Part 2:
slopes = [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)]
result = 1
for slope in slopes:
    result *= move(*slope)
print(result)
