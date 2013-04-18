---
layout: post
category: python
---
{% include JB/setup %}

การจัดการเลขทศนิยมในคอมพิวเตอร์ส่วนมาก จะใช้ [floating point](http://en.wikipedia.org/wiki/Floating_point) ตามมาตรฐาน [IEEE 754](http://en.wikipedia.org/wiki/IEEE_754-2008) ทำให้ความแม่นยำในหลักท้ายๆ หายไปเสมอ เช่น

    a = 0.1 + 0.1 + 0.1
    print(a)
    # get: 0.30000000000000004

    print(a == 0.3)
    # get: False

    print(round(a, 10) == 0.3)
    # get: True

---

ทางแก้นอกจากจะปัดเศษตามข้างต้นแล้ว ยังมี `decimal` เมื่อต้องการค่าที่แม่นยำครับ

    import decimal

    d = decimal.Decimal 

    print(d(1))
    # get: Decimal('1')
    print(d(0.1))
    # get: Decimal('0.10000000000000000555111512312578270211815834...')
    print(d('0.1'))
    # get: Decimal('0.1')

    print(d('0.1') + d('0.1') + d('0.1') == d('0.3'))
    # get: True

ค่าปริยายของตำแหน่งทศนิยมอยู่ที่ 28 หลัก คือ

    r = d('1.23456789012345678901234567890')
    print(r)
    # get: Decimal('1.23456789012345678901234567890') (30 places)
    print(r+1)
    # get: Decimal('2.234567890123456789012345679') (28 places)

จะเห็นว่าเมื่อนำมาคำนวณ ความแม่นยำจะถอยกลับมาที่ 28 ตำแหน่ง ถ้าต้องการความละเอียดมากกว่านั้น

    decimal.getcontext().prec = 50

    n = d('1.234567890123456789012345678901234567890')
    print(n+1)
    # get: Decimal('2.234567890123456789012345678901234567890') (40 places)

และการเปลี่ยนวิธีการปัดค่าตัวท้าย

    print(d(6) / d(9))
    # get: Decimal('0.6666666666666666666666666667')

    decimal.getcontext().rounding = 'ROUND_DOWN'

    print(d(6) / d(9))
    # get: Decimal('0.6666666666666666666666666666')

---

ส่วน `fractions` เป็นการเก็บเศษส่วนที่เขียนได้ในรูปของจำนวนเต็มหารกัน ([จำนวนตรรกยะ](http://en.wikipedia.org/wiki/Rational_number)) วิธีใช้คือ

    import fractions

    f = fractions.Fraction

    print(f(1, 10))
    # get: Fraction(1, 10)
    print(f('0.1'))
    # get: Fraction(1, 10)
    print(f('1/10'))
    # get: Fraction(1, 10)
    print(f('1/10') + f('1/10') + f('1/10') == f('3/10'))
    # get: True

    print(f(f(4, 7), f(3, 5)))
    # get: Fraction(20, 21)

แม้ว่า `fractions` จะไม่สูญเสียความแม่นยำเลย แต่มันก็ไม่สามารถเก็บจำนวนอตรรกยะ (อย่างเช่น `sqrt(2)`) ก็เลือกใช้เครื่องมือเหล่านี้ให้ถูกงานนะครับ
