---
layout: post
category: python
author: neizod
---
{% include JB/setup %}

ถึงตอนนี้ เราน่าจะวน `for` กันจนชินไปแล้ว ซึ่งจะเห็นว่าเราสามารถใช้ตัวแปร (เรียกว่า iterator) ได้หลากหลาย เช่น string, list, dictionary, file หรือจะใส่เป็นฟังก์ชัน `range()` เข้าไปก็ได้ ซึ่งถ้าเราอยากรู้ว่า `range()` นั้นมีหน้าตาลำดับเป็นยังไง ให้จับมันสร้าง list ดูครับ

    print(list(range(10)))
    # get: [0,1,2,3,4,5,6,7,8,9]

    print(list(range(5, 10)))
    # get: [5,6,7,8,9]

    print(list(range(10, 0)))
    # get: []

    print(list(range(10, 0, -1)))
    # get: [10,9,8,7,6,5,4,3,2,1]

แน่นอนว่าเราสามารถผ่าน `range()` แบบต่างๆ เข้าไปวน `for` ได้เช่นเคยครับ

<hr />

อีกเทคนิคหนึ่งที่น่าสนใจ คือ generator expressions ซึ่งมีวิธีประกาศคล้ายการวน `for` มาก

    g = (i for i in range(10))
    # genexpr obj, need to wrap inside (...)

    l = [i for i in range(10)]
    print(l)
    # get: [0,1,2,3,4,5,6,7,8,9]

    d = {i:i**2 for i in range(5)}
    print(d)
    # get: {0:0, 1:1, 2:4, 3:9, 4:16}

    s = {c+w for c in 'ab' for w in 'xy'}
    print(s)
    # get: {'ay', 'ax', 'by', 'bx'}

---

เนื่องจาก Python ออกแบบมาให้เป็นภาษาระดับสูง การลงไปเล่นกับ bit จะค่อนข้างยุ่งยากแปลกกว่าปรกติ ความต่างจากภาษาอื่นๆ ที่ชัดเจนคือมันไม่มี overflow ครับ

    print(1 << 100)
    # get: 1267650600228229401496703205376
    print(42 >> 7)
    # get: 0

    print(-1 >> 10)
    # get: -1
    # -1 in python implement as infinity bits of 1

เพื่อให้อ่านค่าได้ง่ายขึ้น เราอาจใช้ฟังก์ชันเหล่านี้ได้

    print(bin(5))
    # get: 0b101
    print(oct(25))
    # get: 0o31
    print(hex(255))
    # get: 0xff

ถ้าตัดเรื่องความแปลกๆ ของขนาด bit ออกไป ที่เหลือก็เหมือนๆ ภาษาอื่นเลยครับ

    print(3 & 6)
    # and:  2
    print(6 | 2)
    # or:   6
    print(5 ^ 4)
    # xor:  1
    print(~0)
    # neg: -1

แต่เนื่องจากไม่มี circular shift ดังนั้นเราจึงต้องประยุกต์ท่านี้มาใช้ครับ

    def cirshift(bi, n, size=8):
        n %= size
        l = bi << n
        r = bi >> (size-n)
        return (l | r) % 2**size
