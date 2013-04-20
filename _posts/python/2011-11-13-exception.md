---
layout: post
category: python
author: neizod
---
{% include JB/setup %}

จากหลายตอนที่ผ่านๆ มา ถ้าใคร code เอง คงผ่านตากับข้อความเตือน error อย่างเช่น

    IndentationError: unexpected indent
    SyntaxError: invalid syntax

พวกนี้ เป็นความผิดพลาดจากการพิมพ์ของเราเอง แก้ไขได้โดยการไปฝึก code เยอะๆ ซะ จะได้พิมพ์ผิดน้อยลง

---

แต่ก็ยังมี error อีกประเภทที่อาจเกิดขึ้นได้แม้ว่าเราจะตรวจ syntax ว่าไม่มีที่ผิดแล้ว เช่น

    a = int(input('dividend: '))
    b = int(input('divisor: '))
    print(a/b)

ถ้าผู้ใช้ป้อนค่า 0 เข้ามาในครั้งที่สอง (ตัวแปร b) จะทำให้เกิด

    ZeroDivisionError: int division or modulo by zero

เพื่อแก้ไขให้ code นี้ใช้งานได้ เราอาจดักเช็คค่าของ b ง่ายๆ เช่น

    while True:
        a = int(input('dividend: '))
        b = int(input('divisor: '))
        if b != 0:
            break

    print(a/b)

ก็ได้ แต่ในโลกความเป็นจริงแล้ว ผู้ใช้ยังสามารถป้อนตัวอักษรเข้ามาได้อีก (ซึ่งมันไม่สามารถเอาไปคำนวณแบบตัวเลขได้) แม้ว่าเราอาจดักไม่ให้ผู้ใช้สามารถกดแป้นตัวอักษรได้ แต่นั่นก็อาจแลกมากับการที่ code หนักขึ้น (มี maintainability ลดลง) เราจึงอาจหันมาพึ่ง exception เช่นนี้ครับ

    while True:
        try:
            a = int(input('dividend: '))
            b = int(input('divisor: '))
            print('division is: ', a/b)
            print('division success, now leave program.')
            break
        except ValueError:
            print("please input a number, try again.")
        except ZeroDivisionError:
            print("divisor can't be zero, try again.")

หรือ เพื่อให้ code สวยงามยิ่งขึ้น

    while True:
        try:
            # put code that can lead exception inside try.
            a = int(input('dividend: '))
            b = int(input('divisor: '))
            print('division is: ', a/b)
        except ValueError:
            print("please input a number, try again.")
        except ZeroDivisionError:
            print("divisor can't be zero, try again.")
        else:
            # put code that must be done when no exception.
            print('division success, now leave program.')
            break
        finally:
            # always done whether there are exception or not!
            print('--------------------')

---

นอกจากนี้ เรายังสามารถสั่งให้เกิด exception error จากคำสั่ง `raise` ได้อีกด้วย เช่น

    raise NameError("Don't Panic")
    # your program will show this:
    #   Traceback (most recent call last):
    #     File "<stdin>", line 1, in ?
    #   NameError: Don't Panic

---

สำหรับ exception ที่ควรรู้จัก คือ

    Exception    # prototype

    IOError      # no file to open
    EOFError     # no char in file left for read

    NameError    # variable does not exist
    ValueError   # operation on inappropriate value
    TypeError    # operation on inappropriate type

    RuntimeError # not in other categories

หรือถ้าอยากสร้าง exception ไว้ใช้เอง ก็สามารถทำได้โดยสืบทอดจาก `Exception` เช่น

    class MyError(Exception):
         def __init__(self, value):
             '''init class with a value of exception'''
             self.value = value
         def __str__(self):
             '''exception description e.g.
             IamError: value'''
             return repr(self.value)
