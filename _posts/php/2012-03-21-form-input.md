---
layout: post
category: php
author: mementototem
---
{% include JB/setup %}

ในครั้งก่อน ๆ จะเป็นการทำงานเฉพาะส่วนของ PHP ไม่มีการรับค่าจากผู้ใช้ ส่วนอันนี้จะพูดถึงการรับค่าจากผู้ใช้ผ่าน `<form>` ของ HTML กันบ้าง

การส่งค่าจาก `<form>` จะส่งมายังเซิฟเวอร์ได้ 2 แบบคือ

- `get`: ข้อมูลจะถูกส่งผ่าน URL ทำให้มองเห็นได้ทุกคน และจำกัดปริมาณการส่ง
- `post`: ข้อมูลที่ส่งจะมองไม่เห็น (ง่าย ๆ) และ (เกือบ) ไม่จำกัดปริมาณการส่ง (ขึ้นอยู่กับค่า `post_max_size` ในไฟล์ `php.ini`)

จะส่งค่าแบบใดนั้น ขึ้นอยู่กับข้อมูลที่จะส่ง ถ้าไม่เป็นความลับ หรือต้องการให้มีการคัดลอก URL แล้วเอาไปใช้ได้โดยไม่จำเป็นต้องกรอกข้อมูลอีกก็ใช้ `get` ไป แต่ถ้าข้อมูลนั้นเป็นความลับ หรือมีปริมาณมาก ๆ ก็ส่งผ่าน `post` โดยกำหนดค่า `method` ส่วน `action` คือไฟล์ .php ที่จะให้ประมวลผลข้อมูลจาก `&lt;form&gt;` อันนี้

{% highlight html %}
    <!-- Use 'get' for able to user copy url for later used -->
    <form method="get" action="bmi.php">
        <label for="height">Height (cm):</label>
        <input type="text" id="height" name="height" />
        <label for="weight">Weight (kg):</label>
        <input type="text" id="weight" name="weight" />
        <input type="submit" id="send" name="send" value="Calculate" />
    </form>

    <!-- Use 'post' for hide username/password from eavesdropping -->
    <form method="post" action="loginout.php">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" />
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" />
        <input type="submit" id="send" name="send" value="Login" />
    </form>
```

ส่วนการนำค่ามาใช้งานนั้นจะใช้ผ่าน `$_GET` สำหรับ `get` และใช้ `$_POST` สำหรับ `post` ซึ่งเป็น [associative array](/php/array.html) มี key เป็น `name` ของ `<input>` อันนั้น ๆ 

ทั้ง `$_GET` และ `$_POST` ถือเป็นตัวแปรแบบ superglobal ที่เรียกใช้ได้ทุกที่ตลอดเวลา แตกต่างจากตัวแปรแบบ global ตรงที่ไม่ต้องใส่ `global` นำก่อนจะใช้งาน

```php
<?php

    // file: bmi.php
    $height = ((int)$_GET['height']) / 100;  // Centimeter to Meter
    $weight = (int)$_GET['weight'];
    $bmi = 0;

    if ($height > 0 || $weight > 0) {
        $bmi = $weight / ($height * $height);
        echo 'Your BMI is ' . $bmi;
    } else {
        echo "Are you a spirit?";
    }

    // file: loginout.php
    $correct_user = 'root';
    $correct_pass = '81dc9bdb52d04dc20036dbd8313ed055';

    $user = $_POST['username'];
    $pass = md5($_POST['password']);

    if ($pass === $correct_pass && $user === $correct_user) {
        echo 'Logged in completed, redirecting...';
    } else {
        echo 'Invalid username or password or both';
    }
```

นอกจากนี้ยังมี `$_REQUEST` ที่เก็บค่าทั้งของ `$_POST`, `$_GET` และ `$_COOKIE` ไว้ด้วยกัน แต่เสี่ยงที่จะถูกโจมตี จึงไม่แนะนำให้ใช้ 

และสิ่งสำคัญอีกอย่างคือ ควรจะตรวจสอบความถูกต้อง (validation) ของค่าที่ได้จากผู้ใช้ และ/หรือแปลงค่า (cast) ให้ถูกต้องก่อนจะนำมาใช้งานเสมอ จะเต็มรูปแบบหรือคร่าว ๆ ก็แล้วแต่ความเหมาะสม และหากใช้ค่าที่รับมากับฐานข้อมูล หรือส่งต่อให้ระบบอื่น ๆ ควรจะเรียกใช้ฟังชั่น string escape ที่เกี่ยวข้องเสียก่อนทุกครั้ง ซึ่งจะป้องกันการโจมตีได้ระดับหนึ่ง
