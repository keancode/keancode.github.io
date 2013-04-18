---
layout: post
category: haskell
author: neizod
---

นอกจากเราจะสร้างฟังก์ชันด้วย if-else แล้ว Haskell ยังมีความสามารถในการทำ pattern matching กับตัวแปรฟังก์ชันได้อีกด้วย

ตัวอย่างฟังก์ชันจากคราวก่อนในแบบ pattern matching

    logAbs 0 = error "log zero!"
    logAbs x = log (abs x)

pattern matching จะช่วยให้อ่านฟังก์ชันที่อยู่ในรูป recursive ง่ายขึ้นมาก

    fact 0 = 1
    fact x = x * fact (x - 1)

แต่ฟังก์ชัน `fact` นี้ยังมีปัญหาอยู่ ตรงที่มันจะ terminate ไม่ได้ ถ้าใส่จำนวนเต็มลบเข้าไป

จากบรรทัดที่สอง `x` จะไป match กับค่าใดๆ ก็ตามที่ไม่ใช่ `0` เราอาจนึกถึงการใช้ if-else เพื่อดักตัวแปรเหมือนที่ผ่านมา อย่างไรก็ตาม Haskell มีสิ่งที่เรียกว่า guard ซึ่งเทียเท่าได้กับ switch-case ในภาษาอื่น โดยสามารถเรียกใช้งานได้เช่นนี้

    fact 0             = 1
    fact x | x > 0     = x * fact (x - 1)
           | otherwise = error "factorial negative number!"

นอกจากนี้ เรายังสามารถระบุ type ฟังก์ชันได้เช่นเดียวกับตัวแปร โดยเพิ่มบรรทัดนี้เข้าไปด้านบนสุดครับ

    fact :: Integral n => n -> n

---

ด้านขอบเขตของตัวแปรนั้น เราเคยใช้ `let` เก็บค่าตัวแปรที่คำนวณเอาไว้ก่อนมาแล้ว ซึ่งนี่เป็นคำสั่งพิเศษเฉพาะบน `ghci` เท่านั้น เมื่อเขียนเป็นฟังก์ชันจะต้องมีส่วน `in` เพื่อบอกขอบเขตของตัวแปรที่โดนประกาศด้วย `let` เสมอ

    fib n = let phi = (1 + sqrt 5) / 2
                psi = (1 - sqrt 5) / 2
            in  (phi ** n - psi ** n) / sqrt 5

เช่นตัวอย่างนี้จะประมาณค่า Fibonacci ในตำแหน่งที่ `n` โดยคำนวณค่า `phi` กับ `psi` เก็บไว้ก่อน ซึ่งมันจะถูกนำไปใช้ได้ในหลังจาก `in` ตรงบรรทัดที่ 3 เท่านั้นครับ

นอกจากการประกาศด้วย `let-in` แล้ว ยังมีอีกวิธีคือใช้ `where` ซึ่งคราวนี้ตัวแปรที่ถูกประกาศจะเห็นได้ทั้งฟังก์ชัน รวมถึงส่วน guard เพื่อทำ switch-case อีกด้วย

    grade mean sd point
        | aboveMean > 2 * sd = "A"
        | aboveMean > 1 * sd = "B"
        | belowMean > 2 * sd = "F"
        | belowMean > 1 * sd = "D"
        | otherwise          = "C"
        where aboveMean = point - mean
              belowMean = mean - point

สิ่งที่ต้องระวังในการเขียนหลายบรรทัดคือการ indent (จัดย่อหน้า) สังเกตว่าประโยคหลัง `where` หรือ `let` นั้นต้อง indent ให้เท่ากัน เช่นเดียวกับส่วน `let` และ `in` ครับ

ด้านการออกแบบลำดับตัวแปรของฟังก์ชันนั้น จะให้ตัวแปรแรกๆ เป็นตัวแปรที่เปลี่ยนค่าไม่บ่อย เนื่องจากเราสามารถทำ partial application เพื่อสร้างฟังก์ชันที่มี initial value ได้เช่นนี้

    ghci> let gradeMath = grade 55 12.5
    ghci> let gradeChem = grade 70 10.0
    ghci> gradeMath 80
    "B"
    ghci> gradeChem 80
    "C"
