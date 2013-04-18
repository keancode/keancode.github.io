---
layout: post
category: python
---
{% include JB/setup %}

ใน Python ตัวแปร dictionary คือตัวแปรแบบ list ที่ใช้ "ข้อความ" แทน index ในการเรียกตัวแปรนั่นเอง (เทียบเท่ากับ associative array, hash table ในภาษาอื่นๆ)

การประกาศ และการใช้งานก็สามารถทำได้หลายวิธี เช่น

    empty = {}
    card = {'king': 13, 'queen': 12}
    card['jack'] = 11

    print(card['jack'])
    # will return: 11

    name = list(card.keys())
    print(name)
    # you will get a list that contain dict's key

แต่เนื่องจากว่า dictionary ไม่มีการเรียงลำดับข้อมูล เราจึงไม่สามารถใช้การ slice มันได้เหมือน list ดังนั้นเราต้องใช้คำสั่งเหล่านี้แทน

    del card['king']
    for member, number in card.items():
        print(member, '=', number)
    # will show only jack and queen

สังเกตว่าการวน `for` จะมีตัวแปรรับค่าเพิ่มขึ้นมาเป็น 2 ตัว (คือ key, value) ครับ

ส่วนการตรวจสอบว่ามี key อยู่ใน dictionary หรือไม่ ก็สามารถใช้ `in`/`not in` ได้ครับ

    print('jack' in card)
    # print: True
    print('king' in card)
    # print: False
    print('joker' not in card)
    # print: True

---

ส่วนตัวแปรแบบ set จะเหมือนกับ set ทางคณิตศาสตร์เลย คือไม่สนลำดับ/ค่าที่ซ้ำ

    oct = {0, 1, 2, 3, 4, 5, 6, 7}
    empty = set()
    # not to be ambiguous with empty dict

    magic = set('abracadabra')
    space = set('music')

    print(magic)
    # get: {'a', 'r', 'b', 'c', 'd'}

การดำเนินการพื้นฐานของ set 

    print(magic - space)   # diff
    # get: {'a', 'r', 'b', 'd'}
    print(magic | space)   # union
    # get: {'a', 'c', 'b', 'd', 'i', 'm', 's', 'r', 'u'}
    print(magic & space)   # intersect
    # get: {'c'}
    print(magic ^ space)   # xor
    # get: {'a', 'b', 'd', 'i', 'm', 's', 'r', 'u'}

---

ตัวแปรชุดอย่างสุดท้าย (แต่ไม่ท้ายสุด) คือ tuple คุณอาจคิดว่าไม่เคยได้ยิน แต่ถ้าบอกว่ามันคือ "คู่อันดับ" (สำหรับกรณีสามาชิก 2 ตัว) คงร้องอ๋อแน่ ซึ่ง tuple นี้คือกรณีที่ขยายไปใช้กับ n(คู่)ลำดับ ครับ

    empty = ()
    singleton = (1,)   # comma needed
    position = (42, 64)

    x = 1
    y = 4
    z = 9
    dimension = (x, y, z)

เนื่องจาก tuple ใน Python เป็น immutable type แก้ไขไม่ได้ เวลาเอามาใช้ต้อง unpack ไปใส่ตัวแปรก่อน

    a, b, c = dimension
    print(a)
    # get: 1
    b += 4
    print(b)
    # get: 8
    c = 2*(c + b + a)
    print(c)
    # get: 27

ดูแล้วอาจไม่ค่อยได้ใช้มากเท่าไหร่ แต่จะเห็นประโยน์ตอนเตรียม raw input ครับ
