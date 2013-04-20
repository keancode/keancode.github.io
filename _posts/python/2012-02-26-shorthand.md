---
layout: post
category: python
author: neizod
---
{% include JB/setup %}

ในภาษาอื่น อาจพบ shorthand if-else เช่น `condition ? true : false ;` ส่วนใน Python เรามี

```python
    True if condition else False
```

อย่าลืมว่าการย่อแบบนี้ ต้องมีส่วน else เสมอนะครับ

---

สำหรับ generator expressions (หรือที่มักเรียกกันว่า list comprehension เมื่อได้ผลลัพท์เป็น list) มีเทคนิคการกรองข้อมูล (filter) เช่นนี้

```python
    [i for i in range(10) if i%2 == 0]
    # get: [0, 2, 4, 6, 8]
```

ส่วนการซ้อนชั้นของประโยค for ก็จะไล่ทำจากด้านหน้าไปด้านหลังเรื่อยๆ เช่นเดียวกับการวน for หลายชั้นครับ

```python
    [i+j for i in 'abc' for j in 'xyz' if ord(j)-ord(i) != 23]
    # get: ['ay', 'az', 'bx', 'bz', 'cx', cy']
```

ข้อสังเกตคือ การ filter นี้มีแต่ if อย่างเดียวนะครับ ไม่มี else และถ้าเอาไปใช้รวมกับ shorthand if-else ก็ระวังว่าจะงงเองหละ

```python
    [i if i%4 == 0 else -i for i in range(10) if i%2 == 0]
    # get: [0, -2, 4, -6, 8]
```

---

สำหรับการเขียน slice เราสามารถเล่นกับมันได้มากขึ้นอีกโดยการบอก step ครับ

```python
    my_list = list(range(10))
    my_list = my_list[::2]
    # get: [0, 2, 4, 6, 8]
```

แต่ส่วนใหญ่ประโยชน์ของมันจะมาจากการกลับตำแหน่งของสมาชิกใน list มากกว่า คือ

```python
    my_list = my_list[::-1]
    # get: [8, 6, 4, 2, 0]
```

นอกจากนี้ เรายังสามารถ unzip ตัวแปรในกรณีที่ไม่ต้องการระบุตัวแปรครบทุกตัวได้ด้วย

```python
    first, *remain = my_list
    print(first)
    # get: 8
    print(remain)
    # get: [6, 4, 2, 0]
```

อย่างไรก็ดี แม้ว่าเทคนิคเหล่านี้จะทำให้ code ของเราดูสั้น (เพราะจำนวนบรรทัดที่ลดลง) แต่ก็ควรเลือกใช้ให้เหมาะสมด้วยนะครับ ไม่งั้นแล้วจะกลายเป็นว่า code ของเราจะอ่านยากและไร้ระเบียบไปแทน แถมบางเทคนิคก็อาจก่อนให้เกิดปัญหาด้าน performance อีกด้วยนะ
