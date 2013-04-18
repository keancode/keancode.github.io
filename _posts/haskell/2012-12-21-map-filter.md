---
layout: post
category: haskell
author: neizod
---

โดยทั่วไปแล้ว `List` ตั้งต้นมักไม่ค่อยมีประโยชน์ที่จะเอาไปใช้ต่อเท่าไหร่ จนกว่าเราจะเปลี่ยนค่าของสมาชิกบางตัวไปตามเราที่ต้องการ

เราสามารถสร้าง `List` ใหม่จากของเดิมได้ โดยคำนวณค่าสมาชิกเก่าทุกตัวภายใต้ฟังก์ชันเดียวกัน วิธีการนี้เรียกว่า [list comprehension](http://en.wikipedia.org/wiki/List_comprehension) และสามารถทำได้ดังนี้

    ghci> [2 * x^2 | x <- [1..10]]
    [2,8,18,32,50,72,98,128,162,200]
    ghci> [[a] ++ [v] | a <- "kg", v <- "aiueo"]
    ["ka","ki","ku","ke","ko","ga","gi","gu","ge","go"]

นอกจากนี้ เรายังสามารถกรองสมาชิกตัวที่ไม่ต้องการทิ้งก่อนเอาไปคำนวณไปได้ เช่น

    ghci> [2 * x^2 | x <- [1..10], odd x]
    [2,18,50,98,162]
    ghci> [2 * x^2 | x <- [1..10], x < 5]
    [2,8,18,32]

อย่างไรก็ตาม ถ้าต้องทำงานกับ `List` อนันต์ (อย่าง `[1..]`) การกรองสมาชิกด้วยวิธีการข้างต้นนี้ไม่พอ ต้องใช้งานร่วมกับ `take`, `takeWhile` เช่นเดิมครับ

---

นอกจาก list comprehension ยังมีทางเลือกที่ช่วยให้ทำงานได้เช่นเดียวกันคือ `map` กับ `filter` ครับ

    ghci> map (^2) [1..10]
    [1,4,9,16,25,36,49,64,81,100]
    ghci> map (*2) (map (^2) [1..10])
    [2,8,18,32,50,72,98,128,162,200]
    ghci> map (*2) (map (^2) (filter odd [1..10]))
    [2,18,50,98,162]

ข้อแตกต่างหลักๆ คือ list comprehension จะทำงานกับ `List` หลายๆ อัน (มองในรูป [Cartesian product](http://en.wikipedia.org/wiki/Cartesian_product)) ได้ง่ายกว่า แต่การใช้ฟังก์ชัน `map`, `filter` แยกกัน จะเป็นธรรมชาติกว่าเมื่อทำ `filter` หลังจาก `map` เช่น

    ghci> filter (/="wu") [[a] ++ [v] | a <- "w", v <- "aeiou"]
    ["wa","we","wi","wo"]

---

ตัวอย่างเลื่องชื่อของ Haskell อย่าง [quicksort](http://en.wikipedia.org/wiki/Quicksort) ก็สามารถทำโดยใช้เทคนิค `filter` ร่วมกับการทำ pattern matching บน `List` ดังนี้ครับ

    quicksort []     = []
    quicksort (x:xs) = quicksort lesser ++ [x] ++ quicksort greater
        where lesser  = filter (<x)  xs
              greater = filter (>=x) xs
