---
layout: post
category: python
author: neizod
---
{% include JB/setup %}

จากตอนก่อน เราได้เห็นวิธีใช้ `%` (percent sign) เพื่อจัด format ข้อความไปแล้ว แต่เนื่องจากมันเป็นวิธีเก่าที่กำลังถูกเลิก support ดังนั้นเราควรใช้ `.format()` ซึ่งเป็นวิธีใหม่แทนครับ

    a = 'ultimate'
    n = 42
    print("{}'s answer is {}".format(a, n))

การสลับตำแหน่ง สามารถทำได้โดยใส่เลขเรียกลำดับ arg ใน `.format()` ไว้ที่ `{}`

    print('{2} {1} is {0}.'.format('ai', 'computer', 'program'))
    # return: program computer is ai.

หรือจะตั้งชื่อให้กับตัวแปรใน `.format()` เพื่อการเรียกใช้ที่ง่ายขึ้นก็ย่อมได้

    print('{he} and {she}'.format(he='alex', she='nemo'))
    # return: alex and nemo

---

การใส่ format specifier ภายใน `{}` ต้องอยู่ตามหลัง `:` เช่น

    pi = 3.14159
    print('{:.3f}'.format(pi))
    # will return 3 place decimal

ถ้าเป็นตัวเลขเฉยๆ จะเป็นการเผื่อความกว้างไว้ตามนั้น

    print('{:4} = {:5}'.format('jack', 11))
    print('{:4} = {:5}'.format('king', 13))
    print('{:4} = {:5}'.format('joker', 99))
    # output:
    # jack =    11
    # king =    13
    # joker =    99

---

นอกจากนี้ ยังสามารถจัดย่อหน้าด้วย `.ljust()`, `.rjust()` และ `.center()` ก็ได้ครับ

    print('== this is the answer =='.center(30))
    print('google'.ljust(15) + '7427466391'.rjust(15))
    # output:
    #    == this is the answer ==
    # google              7427466391

---

อ๋อ ลืมไปอย่าง การแปลงไป/กลับระหว่างตัวเลขกับตัวอักษรทำได้โดย `ord()` และ `chr()` ครับ

    n = ord('a')
    print(n)
    # get: 97

    c = chr(65)
    print(c)
    # get: A
