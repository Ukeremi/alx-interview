!#/usr/bin/python3
""" making changes """

def makeChange(coins, total):
    """ Generate changes needed to reach total

    Args
        coins ([List]): [List of coins available]
        total ([int]: [Total amount needed]
    """
    if total <= 0:
        return 0
    check = 0
    temp = 0
    coins.sort(reverse=True)
    for i in coins:
        while check < total:
            check += 1
            temp += 1
        if check == total:
            return temp
        check -= i
        temp -= 1
    return -1
