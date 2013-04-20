---
layout: post
category: python
author: neizod
---
{% include JB/setup %}

คอมเมนท์ใน Python ใช้เครื่องหมาย `#` นำหน้าข้อความที่จะคอมเมนท์จนจบบรรทัด (ไม่มีคอมเมนท์หลายบรรทัด)

```python
    # this is a comment.
    x = 1 # this is also a comment.
    print("hello # world")
    # but this above sentence is not.
```

อย่างไรก็ตาม เครื่องหมาย `#` ที่ปรากฏอยู่ภายใต้เครื่องหมาย quote นั้น ไม่นับเป็นการคอมเมนท์ครับ

---

การ [indent](http://en.wikipedia.org/wiki/Indent_style) ใน Python ถือเป็นหัวใจสำคัญอันหนึ่ง (เพราะไม่มีระบบปีกกาเพื่อจบชุดคำสั่ง) แต่เนื่องจาก Windows และ Linux กำหนดขนาดของ tab กว้างไม่เท่ากัน เราจะใช้ 1 level indent = 4 space ครับ (ตั้งค่าใน editor เอา)

อย่างไรก็ตาม ถ้าคุณทำงานคนเดียวหรือไม่ซีเรียสตรงนี้มาก จะใช้เครื่องหมาย tab เพื่อความสะดวกก็ได้ครับ แต่ **พึงระลึก** ไว้ว่า การใช้ space และ tab ปนกันเพื่อ indent จะทำให้ code ชุดนั้นเกิด error ได้ครับ

---

แม้ว่า Python จะมี interpreter แถมมาให้ แต่การพิมพ์คำสั่งหลายๆ บรรทัดใน Python shell คงไม่เหมาะสมเท่าไหร่ (กลับไปแก้ไขบรรทัดก่อนๆ ไม่ได้) ดังนั้นเราจึงควรพิมพ์ script เก็บไว้ในไฟล์ แล้วเรียกทดลอง script ผ่าน terminal แบบนี้ครับ

```python
    $ python3 scriptfile
```
