---
layout: post
category: python
author: neizod
---
{% include JB/setup %}

ใน Python เมือจบการถาม `if` ต้องตามด้วยเครื่องหมาย `:` (colon) และขึ้นบรรทัดใหม่เสมอ ซึ่งบรรทัดใหม่ต้องเว้นด้านหน้าเพิ่มจากเดิม 1 indent level เท่านั้นด้วย มากกว่าน้อยกว่านี้ไม่ได้

```python
    x = 42
    if x == 42:
        print('this is the answer')
```

นี่อาจฟังดูยุ่งยากเกินกว่าที่จะจำได้ ไม่ต้องจำครับ เพราะตอนใช้งานจริง จะพบว่ามันเป็นธรรมชาติมากๆ

อย่างไรก็ตาม มีเรื่องที่ผิดกันบ่อยๆ คือ หลังประกาศ if แล้ว ยังไม่รู้ว่าจะทำอะไรกับมันต่อ (แต่รู้แน่ๆ ว่าต้อง check if แบบนี้) ตรงนี้จะปล่อยว่างๆ ไว้ไม่ได้ครับ (เขียนคอมเมนท์ก็ไม่ช่วย) ต้องใช้คำสั่ง `pass` อย่างนี้

```python
    if x-20 > 0:
        pass
```

ข้อดี (หรือเสีย) ของ `pass` คือ กลับมาเขียน code ต่อไม่ต้องลบ `pass` ทิ้งก็ได้ (แต่ก็ควรจะลบทิ้ง)

การเข้า elif และ else สังเกตว่าตัว check statement จะอยู่ที่ความลึก indent เดียวกันกับ if นะครับ

```python
    if x > 30:
        print('caan')
    elif x > 18:
        print('cute')
    else:
        print('cook')
```

อ๋อ... Python ไม่มี `switch case` ให้ใช้นะครับ

---

การวน `for` ใน Python จะประหลาดกว่าภาษาอื่นหน่อย ตรงที่ต้องอาศัย `range()` เข้าช่วย

```python
    # print number 0 ... 9
    for i in range(10):
        print(i)
```

การจบ loop ทันทีเมื่อเจอ condition หรือข้ามบาง condition ใช้ `break` และ `continue` เหมือนภาษาอื่นครับ

```python
    # print even number 0, 2, 4 , ..., 8
    for i in range(10):
        if i%2 != 0:
            continue
        print(i)

    # print 0 ... 5
    for i in range(10):
        print(i)
        if i > 5:
            break
```

ส่วนการวน loop แบบ `while` ก็จะคล้ายๆ `for` ครับ

```python
    # print 0 ... 5
    i = 0
    while i <= 5:
        print(i)
        i += 1
```

ลูกเล่นพิเศษของ Python คือ `else` สำหรับ loop ครับ มันจะทำงานก็ต่อเมื่อ loop จบลงธรรมดาๆ และจะไม่ทำงานถ้า loop จบด้วย `break` เช่น

```python
    # this will print 0 ... 15
    # then print loop success
    for i in range(16):
        print(i)
        if n > 32:
            print('loop overflow')
            break
    else:
        print('loop success')

    # but this will print 0 ... 32
    # and loop overflow (without print loop success)
    for i in range(50):
        print(i)
        if i > 32:
            print('loop overflow')
            break
    else:
        print('loop success')
```

อนึ่ง Python ไม่มี `do ... while` แบบภาษาอื่นให้ใช้ด้วยนะครับ (เพราะ `while` เฉยๆ ก็ครอบคลุมแล้ว)
