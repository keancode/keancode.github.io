---
layout: post
category: python
---
{% include JB/setup %}

นอกจากการคำนวณขั้นพื้นฐานที่ได้เขียนไปแล้ว Python ยังมีฟังก์ชันสำหรับการคำนวณติดมาอีกเล็กน้อยคือ

    print(round(10.5), round(10.51), round(-7.2))
    # get: 10, 11, -7
    print(abs(-9), abs(4.7), abs(10j))
    # get: 9, 4.7, 10.0

    print(max(0,1,2,3), max([0,1,2,3]))
    # get: 3, 3
    print(min(0,1,2,3), min([0,1,2,3]))
    # get: 0

    print(sum([0,1,2,3]))
    # get: 6

สงสัยฟังก์ชันไหน สามารถใช้ `help(func_name)` เพื่ออ่านข้อมูลเพิ่มเเติมได้ครับ

    help(abs)
    # Help on built-in function abs in module builtins:
    # abs(...)
    #     abs(number) -> number
    #    
    #    Return the absolute value of the argument.

---

ถ้านี่ไม่พอ ต้อง `import math` มาใช้ ซึ่งมีค่าคงตัว/ฟังก์ชันสำคัญๆ ดังนี้

    import math

    print(math.e)
    # get: 2.718281828459045
    print(math.pi)
    # get: 3.141592653589793

    print(math.ceil(10.2), math.ceil(-10.2))
    # get: 11, -10
    print(math.floor(10.9), math.floor(-10.9))
    # get: 11, -10

    print(math.exp(10))
    # get: 22026.465794806718
    print(math.log(1234))
    # get: 7.1180162044653335

    print(math.sin(0))
    # get: 0.0
    print(math.cos(math.pi))
    # get: -1.0

ลงไว้ไม่หมดนะฮะ ดูเพิ่มเติมด้วย `help()` โลด

---

นอกเหนือจากการคำนวณแล้ว การสุ่มยังแยกออกมาเป็นอีกโมดูลหนึ่งด้วย

    import random

    start, stop = 0, 5
    print(random.random())
    # return float from [0, 1)
    print(random.uniform(start, stop))
    # return float from [start, stop]
    print(random.randint(start, stop))
    # return int from [start, stop]

    print(random.choice([1,2,3,4,5,6,7,8]))
    print(random.choice(['a','b','c','d']))
    # return a random arg form iterator

    card = ['a','j','q','k']
    random.shuffle(card)
    # return nothing, but shuffle arg in list
    print(card)
    # get random card position
    # e.g. ['k','j','a','q']

ลงไว้ไม่หมดเช่นกันครับ
