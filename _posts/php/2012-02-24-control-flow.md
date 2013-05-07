---
layout: post
category: php
author: mementototem
---
{% include JB/setup %}

## If... Else...

คำสั่งทางเลือก If... Else ใน PHP จะใช้อยู่ 2 แบบ คือ `if {} else` และ `if: else:`

```php
    <?php

    if ('male' == $sex) {
        echo 'Hello, Mister ' . $name;
    } elseif ('female' == $sex) {
        echo 'Hello, Miss ' . $name;
    } else {
        echo 'Hello, Khun ' . $name;
    }

    // or
    if ('male' == $sex):
        echo 'Hello, Mister ' . $name;
    elseif ('female' == $sex):
        echo 'Hello, Miss ' . $name;
    else:
        echo 'Hello, Khun ' . $name;
    endif;
```


`elseif` ในแบบแรก สามารถเขียนแทนด้วย `else if` ได้ แต่จะทำงานช้ากว่า เพราะเป็นการแยกคำสั่งออกเป็น 2 คำสั่ง แต่ที่จะเป็นคำสั่งของ `if` อันแรกอันเดียวก็เป็น `if` 2 อัน และหากมีคำสั่งใน `if` แค่บรรทัดเดียวสามารถละ `{}` ได้ แต่ก็ต้องมั่นใจว่า อ่านโค้ดแล้วไม่งง

ส่วนในแบบหลัง elseif **ต้องติดกันเท่านั้น**, ในแบบหลังนี้มักใช้ตอนที่เขียน PHP ร่วมกับ HTML หรือมีคำสั่งใน `if... else` เยอะมาก ๆ เพราะอ่านเข้าใจง่ายกว่า เช่น

```php
    <?php if($htime < 12): ?>
        <span>Good morning</span>
    <?php elseif($htime < 17): ?>
        <span>Good afternoon</span>
    <?php elseif ($htime < 19): ?>
        <span>Good evening</span>
    <?php else: ?>
        <span>Good night</span>
    <?php endif; ?>
```

แต่ถ้าต้องการคืนค่า หรือทำตามคำสั่งสั้น ๆ ง่าย ๆ สามารถใช้คำสั่ง `?:` (ternary operator) แทนได้ โดยที่จะมีรูปแบบคือ

>   ทำการเปรียบเทียบ ? ถ้าเป็นจริงทำอันนี้ : ถ้าเป็นเท็จทำอันนี้

```php
    <?php

    $type = (6 == $legs) ? 'Insect' : 'Arachnid';
```

## Comparison Operator

operator ในการเปรียบเทียบ จะมีเหมือน ๆ กับภาษาอื่นคือ

- `==` คือ เท่ากัน (แปลงค่าเปรียบเทียบกรณีตัวแปรต่างชนิดกัน
- `===` คือ เท่ากันทุกประการ (ถ้าตัวแปรต่างชนิดก็จะถือว่าไม่เท่ากัน)
- `!=` และ <> คือ ไม่เท่ากัน
- `!==` คือ ค่าไม่เท่ากัน หรือ ต่างชนิดกัน
- `<` คือ น้อยกว่า
- `>` คือ มากกว่า
- `<=` คือ น้อยกว่า หรือเท่ากับ
- `>=` คือ มากกว่า หรือเท่ากับ

```php
    <?php

    $a = 2;
    $b = '2';

    $result = ($a == $b) ? 'yes' : 'no';    // = yes;
    $result = ($a === $b) ? 'yes' : 'no';   // = no;
    $result = ($a != $b) ? 'yes' : 'no';    // = no;
    $result = ($a !== $b) ? 'yes' : 'no';   // = yes;
```

## Switch

ถ้าตรวจสอบค่าจากตัวแปรตัวเดียว ในรูปแบบต่าง ๆ สามารถใช้ `switch` แทน `if... elseif` ยาว ๆ ได้ ซึ่งโค้ดที่ได้จะอ่านง่ายกว่าด้วย เช่น

```php
    <?php

    switch($color) {
        case 'red':
            $meaning = 'desire';
            break;
        case 'white':
            $meaning = 'purity';
            break;
        case 'yellow':
            $meaning = 'friendship';
            break;
        case 'pink':
            $meaning = 'love';
            break;
        case 'orange':
            $meaning = 'forever';
            break;
        case 'violet':
        case 'purple':
            $meaning = 'first love';
            break;
        case 'peach':
            $meaning = 'sincerity';
            break;
        case 'black':
            $meaning = 'sorrow';
            break;
        default:
            // Not match any case
            $meaning = 'unknown its meaning';
    }
```

และก็เหมือนกับ `if... else` ที่สามารถใช้รูปของ `:` ได้ด้วย คือ `switch(ตัวแปรที่ต้องการ): ...(case: ต่าง ๆ)... endswitch;`

และเนื่องจาก เมื่อ `switch` เจอ `case` ไหนแล้ว จะทำตาม `case` นั้นลงไปจนออกนอก `switch` หากไม่เจอคำสั่ง `break;` จึงประยุกต์ให้ตรวจสอบค่าหลาย ๆ ค่า แต่ทำคำสั่งเดียวกันได้ อย่างเช่น `case: 'violet'` และ `case: 'purple'` จากตัวอย่างข้างบน

ถ้าสังเกต การเปรียบเทียบตัวแปรกับค่าคงที่ ผมจะให้ค่าคงที่ขึ้นก่อน รูปแบบนี้เรียกว่า Yoda Condition ข้อดีของมันคือ ถ้าเราเผลอใช้ `=` อันเดียวแทนที่จะเป็น `==` มันจะแจ้ง error ขึ้นมา แทนที่จะทำงานไปตามปกติ แล้วเกิดบั๊กที่ตรวจสอบได้ยาก แต่ข้อเสียคือ ทำให้การอ่านโค้ดไม่เป็นธรรมชาติ (ผู้ชาย เท่ากับ เพศ แทนที่จะเป็น เพศ เท่ากับ ผู้ชาย) ... ยกเว้นว่าจะชื่นชอบ Star War และเข้าใจท่าน Yoda เป็นอย่างดี...

แต่เราก็ไม่ควรจะใช้ Yoda Condition ในทุก ๆ ภาษา, บางภาษาเช่น Java ไม่อนุญาตให้กำหนดค่าตัวแปรในตอนเปรียบเทียบค่าอยู่แล้ว จึงไม่มีเหตุผลที่จะใช้ Yoda Condition แม้แต่น้อย
