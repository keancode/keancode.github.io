---
layout: post
category: haskell
author: neizod
---
{% include JB/setup %}

ตัวเลขใน Haskell ก็เหมือนภาษาอื่น ที่แบ่งออกหลักๆ เป็นจำนวนเต็มกับทศนิยม

โดยการประกาศทศนิยม จะมีข้อบังคับว่า หน้าและหลังจุดทศนิยมต้องมีตัวเลขเสมอ (แม้จะเป็น 0 ก็ตาม)

    ghci> 1
    ghci> 2.0
    ghci> 0.5

---

การดำเนินการบวกลบคูณหาร ก็ใช้ operator `+`, `-`, `*`, `/` เช่นเดียวกับภาษาอื่นๆ

    ghci> 1.0 + 2.0
    3.0
    ghci> 2 - 0.5
    1.5
    ghci> 6 * 7
    42
    ghci> 10 / 2
    5.0

สังเกตว่าการหารจะให้ผลลัพท์เป็นทศนิยมเสมอ ส่วนการหารแบบไม่เก็บเศษ (ให้ผลลัพท์เป็นจำนวนเต็ม) จะใช้ฟังก์ชัน `div` แทน

    ghci> div 10 2
    5

จะเห็นว่า การเรียกฟังก์ชั่นใน Haskell ไม่ใช้วงเล็บล้อมรอบตัวแปรเหมือนภาษาอื่นๆ

ส่วนถ้ารู้สึกไม่สะดวกที่จะเขียนอย่างข้างบน ก็สามารถใช้ grave accent (`` ` ``) ล้อมรอบชื่อฟังก์ชัน เพื่อให้มันทำงานเป็น infix แบบเดียวกับ operator พวกนั้นได้ (จะใช้ได้ก็ต่อเมื่อเป็นฟังก์ชันที่รับตัวแปร 2 ตัวเท่านั้น)

    ghci> 10 `div` 2
    5

ข้อแตกต่างอีกอย่างจาก `/` คือ `div` จะรับตัวแปรทั้ง 2 ตัวเป็นจำนวนเต็มเท่านั้น

และเมื่อต้องการหารเก็บเศษ ก็ใช้ฟังก์ชัน `mod` นั่นเอง

    ghci> 10 `mod` 2
    0

---

ส่วนการยกกำลังก็เช่นเดียวกับการหาร คือมี operator 2 แบบให้เลือกใช้

    ghci> 2 ^ 10
    1024
    ghci> 2 ** 10
    1024.0

ท้ายนี้ ถึงแม้ว่า Haskell จะไม่ใช้วงเล็บเพื่อส่งตัวแปรให้ฟังก์ชัน แต่วงเล็บก็สามารถใช้เพื่อบอกกลุ่มของตัวแปรได้เช่นเดียวกับภาษาทั่วไปครับ

    ghci> (3 + 7 `div` 4) ^ 5
    1024

หรือถ้ากลัวงง ก็สามารถประกาศค่าเหล่านั้นเป็นตัวแปร (ค่าคงที่) ได้โดยใช้คำสั่ง `let`

    ghci> let x = 7 `div` 4
    ghci> let y = 3 + x
    ghci> y ^ 5
    1024

ย้ำอีกครั้งว่า Haskell เป็นภาษา purely functional เพราะฉะนั้นจะไม่มี operator แบบ assignment (เช่น `+=`) สำหรับเปลี่ยนแปลงค่าของตัวแปรเหล่านั้นนะครับ