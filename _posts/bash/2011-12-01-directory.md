---
layout: post
category: bash
author: neizod
---
{% include JB/setup %}

โครงสร้าง directory ในระบบ Unix/Linux จะมีหน้าตาประมาณ

    /
    ├── bin
    ├── boot
    ├── build
    ├── cdrom
    ├── dev
    ├── etc
    ├── home
    │   └── username
    │       ├── Desktop
    │       ├── Documents
    │       ├── Downloads
    │       ├── Music
    │       └── Pictures
    ├── lib
    ├── lib32
    ├── lib64
    ├── lost+found
    ├── media
    ├── mnt
    ├── opt
    ├── proc
    ├── root
    ├── run
    ├── sbin
    ├── selinux
    ├── srv
    ├── sys
    ├── tmp
    ├── usr
    └── var

โดยที่ `/` (แค่ `/` ตัวเดียว) คือ directory ราก ส่วน `/home/username/` จะเป็น directory ประจำผู้ใช้ ซึ่งระบบจะย่อให้เป็น `~` เพื่อให้อ่าน/เรียกใช้ได้สะดวกขึ้น

ภายในแต่ละ directory จะมี directory พิเศษที่ชื่อว่า `.` (directory ตัวเอง) และ `..` (directory แม่) ไว้สำหรับการ browse directory

---

แม้ว่า Unix/Linux บางระบบจะแสดง path ไว้ที่ prompt อยู่แล้ว แต่เราก็สามารถเรียกดู fullpath ได้โดยคำสั่ง `pwd` (ซึ่งจะไม่ย่อ home direstory) ครับ

    $ pwd
    /home/username

การแสดงไฟล์ที่มีอยู่ใน directory นั้นๆ สามารถทำโดยคำสั่ง ls

    $ ls
    Desktop  Documents  Downloads  Music  Pictures
    $ ls -a
    .   .cache   Desktop    Downloads  Pictures
    ..  .config  Documents  Music      .profile

สังเกตว่านอกจาก `.` กับ `..` แล้ว ยังมีไฟล์ที่โดนซ่อนไว้โดยใช้ . นำหน้าชื่ออีกด้วย

ส่วนการแสดงไฟล์ที่อยู่ใน directory อื่น อาจผ่าน argument เข้าไปให้ `ls` ก็ได้

    $ ls Documents/
    help.txt  tutorial.txt  abc.txt

---

แต่ถ้าต้องการเปลี่ยน directory ก็ทำได้ผ่านคำสั่ง `cd`

    $ cd Pictures/Flower/
    $ pwd
    /home/username/Pictures/Flower/
    $ cd ~
    $ pwd
    /home/username
    $ cd /
    $ pwd
    /
    $ cd
    $ pwd
    /home/username

สังเกตว่าถ้าไม่ผ่าน argument เป็นชื่อ directory เข้าไป มันจะพาเรากลับ directory ส่วนตัวครับ

ส่วนการสร้าง/ลบ directory ได้โดยคำสั่ง `mkdir` และ `rmdir`

    $ mkdir Test
    $ ls
    Desktop  Documents  Downloads  Music  Pictures  Test
    $ mkdir Test/Sub
    $ mkdir Test/Sub/Set
    $ mkdir Test/Sub/Way
    $ ls Test/Set
    Set  Way
    $ rmdir Test/Sub/Set
    $ ls Test/Set
    Way

สังเกตว่าการลบด้วย `rmdir` จะต้องทำกับ directory ว่างๆ เท่านั้น ถ้าต้องการลบ directory ที่ยังมีไฟล์อยู่ในนั้นทำได้โดยคำสั่ง `rm -r`

    $ rm -r Test
    $ ls
    Desktop  Documents  Downloads  Music  Pictures

สิ่งที่ต้องระวังให้มากคือ เราไม่สามารถกู้คืนไฟล์ที่ลบด้วย `rmdir` หรือ `rm -r` ได้นะครับ
