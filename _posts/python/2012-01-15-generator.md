---
layout: post
category: python
author: neizod
---
{% include JB/setup %}

โดยปรกติแล้ว ในฟังก์ชันหนึ่งๆ จะจบการทำงานทันทีที่เจอ `return` ตัวแรก นั่นคือการคืนค่าเพียง 1 เดียวของมัน

โดยถ้าเราไม่ต้องการให้ฟังก์ชันของเราจบการทำงานทันที แต่ก็ยังต้องการผลลัพท์ระหว่างการทำงานเป็นรอบๆ ออกมาเรื่อยๆ นี่คือแนวคิดของ generator นั่นเอง ซึ่งสามารถสร้างได้ง่ายๆ โดยการเปลี่ยน keyword จาก `return` เป็น `yield` เช่นตัวอย่างนี้

```python
    def gen_prime():
        yield 2
        yield 3
        yield 5
        yield 7
```

---

ในการใช้งาน generator นั้น ปรกติเราจะเรียกมันผ่าน iterator ทั้งหลายอยู่แล้ว เช่น

```python
    for p in gen_prime():
        print(p**2)
```

แต่ถ้าต้องการเรียก generator เป็น object ตรงๆ เพื่อควบคุมการดึงค่าออกมาให้ได้มากขึ้น ก็สามารถทำได้โดย

```python
    gen_obj = gen_prime()

    print(next(gen_obj))
    # get: 2
    print(next(gen_obj))
    # get: 3
    print(next(gen_obj))
    # get: 5
    print(next(gen_obj))
    # get: 7
    print(next(gen_obj))
    # get exception: StopIteration
```

---

ข้อดีของมันเหนือการสร้างฟังก์ชันที่วิ่งวนหาค่าที่ต้องการทุกตัวแล้วส่งคืนมาเป็น list คือ generator จะทำงานเท่าที่ร้องขอเท่านั้น [lazy evaluation](http://en.wikipedia.org/wiki/Lazy_evaluation) ในรอบการทำงานหนึ่งๆ เมื่อเจอ keyword `yield` ก็จะหยุดพัก จนกว่าจะถูกเรียกอีกโดย `next()` มันถึงจะวิ่งไปหา `yield` ตัวถัดไป ทำให้ประหยัดหน่วยความจำมากกว่าการเตรียมทุกค่าไว้ก่อน แถมยังประหยัดเวลาอีกด้วยในกรณีที่มีการ `break` ออกจาก iterator

และจะยิ่งเห็นข้อดีเด่นชัดขึ้นอีกอย่าง เมื่อเราสามารถนิยาม generator ให้อยู่ในรูปของ iterator ได้ เช่นจากตัวอย่างข้างบน เขียนใหม่สำหรับกรณีทั่วไปได้ดังนี้

```python
    def gen_prime(stop=0):
        n = 2
        while n < stop or not stop:
            for i in range(2, n):
                if n%i == 0:
                    break
            else:
                yield n
            n += 1
```

ข้อเสียของมันคงเป็นการที่ไม่สามารถระบุตำแหน่งของข้อมูลได้ เช่นตามตัวอย่างนี้ เราไม่สามารถบอกได้ว่าจำนวนเฉพาะตัวที่ 15 คืออะไร จนกว่าเราจะแปลง generator ไปอยู่ในรูปของข้อมูลแบบอื่นๆ อย่างเช่น list ครับ
