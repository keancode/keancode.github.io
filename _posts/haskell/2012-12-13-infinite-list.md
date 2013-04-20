---
layout: post
category: haskell
author: neizod
---
{% include JB/setup %}

การประกาศ `List` นอกจากจะทำได้ตามวิธีปรกติแล้ว Haskell ยังทำท่านี้ได้อีกด้วย

    ghci> [1..10]
    [1,2,3,4,5,6,7,8,9,10]
    ghci> ['a'..'z']
    "abcdefghijklmnopqrstuvwxyz"

ค่าที่เพิ่มจะเพิ่มขึ้นครั้งละ 1 หน่วย (ถ้าตัวเลขก็คือ `+1` ถ้าเป็นตัวอักษรก็คือตัวอักษรถัดไป) เราสามารถแก้ไขค่าที่จะเพิ่มขึ้นได้โดยบอกสมาชิกตัวถัดไปใน `List` นี้แทน

    ghci> [1,3..20]
    [1,3,5,7,9,11,13,15,17,19]
    ghci> ['a','f'..'z']
    "afkpuz"

สมาชิกตัวสุดท้ายที่บอกขอบเขตบนนั้น อาจอยู่หรือไม่อยู่ใน `List` ที่สร้างเสร็จก็ได้ แต่จะไม่มีสมาชิกที่มีค่าใหญ่กว่านี้ครับ

ส่วนการประกาศค่าแบบลดลงนั้น ไม่สามารถบอกแค่ `[10..1]` ได้ ต้องบอกสมาชิกตัวถัดมาด้วย

    ghci> [10,9..1]
    [10,9,8,7,6,5,4,3,2,1]

หมายเหตุว่าให้ระวังการประกาศ `List` แบบนี้กับเลขทศนิยม เพราะ bug ของตัว Haskell เองทำให้อาจมีสมาชิกที่ใหญ่กว่าขอบเขตบนโผล่มาได้ครับ

อนึ่ง เราสามารถละส่วนขอบเขนบนได้ โดย Haskell จะเอาขอบเขตบนของ type นั้นมาเติมให้เอง เช่น

    ghci> ['a','z'..]

ปล่อยไว้ซักพัก จะเห็นว่า `List` ที่สร้างขึ้นนี้วิ่งไปจบที่ตัวอักษรซักตัวเอง และถ้าสงสัยว่าขอบเขตบนนั้นคืออะไร ก็สามารถหาได้โดย

    ghci> maxBound :: Char
    '\1114111'
    ghci> minBound :: Char
    '\NUL'

แต่สำหรับข้อมูลบาง type ที่ไม่มีขอบเขตบน (เช่น `Integer`) เมื่อสั่ง `[1..]` ตัวเลขจะวิ่งขี้นไปเรื่อยๆ ไม่มีที่สิ้นสุดครับ (เป็น `List` ที่ยาวเป็นอนันต์)

---

`List` ที่ยาวเป็นอนันต์อาจฟังดูไม่มีประโยชน์ เพราะมันคล้ายว่าเราสั่งให้โปรแกรมไปสร้าง `List` ที่ไม่มีวันเสร็จ (และโปรแกรมก็จะไม่สามารถไปทำงานอย่างอื่นต่อได้) อย่างไรก็ตาม การดึงสมาชิกเพียงบางส่วนจากออกมานั้นเป็นไปได้ใน Haskell เพราะมันจะไม่พยายามสร้าง `List` นั้นๆ จนเสร็จ แต่จะสร้างเพียงเท่าที่เราขอไปใช้ต่อเท่านั้น

ฟังก์ชันที่ใช้เพื่อขอสมาชิกเพียงไม่กี่ตัวแรกของ `List` จากทางด้านหน้าคือ `take`

    ghci> take 10 [1,3..]
    [1,3,5,7,9,11,13,15,17,19]

ส่วน `drop` นั้นจะใช้เพื่อทิ้งสมาชิกตัวหน้าออกไป

    ghci> drop 5 [1..10]
    [6,7,8,9,10]

(`drop` เพียงอย่างเดียวนั้นไม่ค่อยมีประโยชน์กับ `List` ที่ยาวเป็นอนันต์ครับ)

ฟังก์ชันอีกกลุ่มที่ทำหน้าที่เช่นเดียวกันนี้ เพียงแต่เปลี่ยนจากจำนวนสมาชิกที่ต้องการแน่นอน ไปเป็นการตรวจสอบค่าสมาชิกว่าตรงเงื่อนไขหรือยัง คือ `takeWhile` และ `dropWhile`

    ghci> takeWhile (<10) [1,3..20]
    [1,3,5,7,9]
    ghci> dropWhile (/=3) [1,2,3,4,5,4,3,2,1]
    [3,4,5,4,3,2,1]

ย้ำอีกทีว่าฟังก์ชันพวกนี้จะเริ่มทำงานจากด้านหัว และคืนค่าทันทีเมื่อเงื่อนไขครบ เห็นได้จาก `dropWhile (/=3)` ที่ทิ้งเลข `[1,2]` เฉพาะทางด้านหัวเท่านั้น

---

นอกจากจะใช้การประกาศ `List` ตามด้านบนเพื่อสร้าง `List` ที่ยาวอนันต์ได้แล้ว ยังสามารถสร้าง `List` ที่ยาวเป็นอนันต์โดยใช้ฟังก์ชันเหล่านี้

`cycle` รับตัวแปรเป็น `List` ที่จะเอามาทำซ้ำเรื่อยๆ

    ghci> take 15 (cycle "kak ")
    "kak kak kak kak"

ส่วน `repeat` จะรับตัวแปรคือสมาชิกตัวเดียวของ `List` ที่จะเอาไปทำซ้ำๆ แต่ถ้ารู้ขนาดที่แน่นอนอยู่แล้ว สามารถใช้ฟังก์ชัน `replicate` แทนได้

    ghci> take 3 (repeat 5)
    [5,5,5]
    ghci> replicate 3 5
    [5,5,5]