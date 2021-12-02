

with open('./day2.txt') as reader:
    # Read and print the entire file line by line
    line = reader.readline()
    good_pass = 0
    while line != '':  # The EOF char is an empty string
        # min_num = line[0]
        dash_index = line.index('-')
        space = line.index(' ')
        colon = line.index(':')
        min_num = int(line[0:dash_index])
        max_num = int(line[dash_index + 1:space])
        char = line[colon-1:colon]
        password = line[colon+2:]
        # num_occ = password.count(char)

        # if num_occ >= min_num and num_occ <= max_num:
        #     good_pass = good_pass + 1
        print(password[min_num])

        if (password[min_num - 1] == char and password[max_num - 1] != char) or (password[min_num - 1] != char and password[max_num - 1] == char):
            # print(line[min_num])
            good_pass = good_pass + 1

        line = reader.readline()

    print(good_pass)
