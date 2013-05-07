---
layout: post
category: git
author: neizod
---
{% include JB/setup %}

ตอนก่อนเราได้สวัสดีชาวโลกกันไปแล้ว แต่จะเห็นว่าไวยากรณ์ผิดพลาดอยู่บ้าง ลองแก้ไฟล์ `hello.py` เป็น

    print('Hello, world!')

พร้อมกับเขียนไฟล์ใหม่ชื่อ `README.md` เพื่อบอกข้อมูลพื้นฐานของโปรแกรมนี้ โดยมีเนื้อหาว่า

    Yet Another Hello World Program
    ===============================

    This program simply say "Hello, world!"

และอีกไฟล์ชื่อ `MANUAL.md`

    Start this program by:
        
        $ python hello.py

ลองเช็คสถานะของโปรเจคนี้ดู จะได้ผลลัพท์ดังนี้

    $ git status
    # On branch master
    # Changes not staged for commit:
    #   (use "git add <file>..." to update what will be committed)
    #   (use "git checkout -- <file>..." to discard changes in working directory)
    #
    # modified:   hello.py
    #
    # Untracked files:
    #   (use "git add <file>..." to include in what will be committed)
    #
    # MANUAL.md
    # README.md
    no changes added to commit (use "git add" and/or "git commit -a")

ซึ่งบอกว่า ทั้งไฟล์ `hello.py` ที่เพิ่งแก้ไขไป และไฟล์ `MANUAL.md`, `README.md` ที่เพิ่มมาใหม่นั้น จะไม่ถูกจำสำหรับการ commit ในครั้งถัดไป

ดังนั้น เราต้องเพิ่มไฟล์ทั้งสองเข้าไปในระบบก่อน โดยสั่ง add เหมือนตอนที่แล้วครับ

    $ git add hello.py MANUAL.md README.md

เช็คสถานะไฟล์อีกครั้ง

    $ git status
    # On branch master
    # Changes to be committed:
    #   (use "git reset HEAD <file>..." to unstage)
    #
    # new file:   MANUAL.md
    # new file:   README.md
    # modified:   hello.py
    #

พร้อมแล้วก็สั่ง commit เลยครับ

    $ git commit -m 'init project'
    [master d918f10] init project
     3 files changed, 9 insertions(+), 1 deletion(-)
     create mode 100644 MANUAL.md
     create mode 100644 README.md

---

แต่ตอนนี้เราจะเห็นว่า ไฟล์ `MANUAL.md` และ `README.md` นั้น มีเนื้อหาน้อยมาก และสามารถจับเอามารวมกันได้ แก้ไขไฟล์ `README.md` เป็นดังนี้

    Yet Another Hello World Program
    ===============================

    This program simply say "Hello, world!"

    Start program by:

        $ python hello.py

ถึงตอนนี้ เราจะไม่ต้องการไฟล์ `MANUAL.md` แล้ว ก็สั่งลบไฟล์ออกจากระบบโดย

    $ git rm MANUAL.md

จะเห็นว่าไฟล์ `MANUAL.md` หายไปจากไดเรคทอรี่เป็นที่เรียบร้อย ตอนนี้ก็ได้เวลาสั่ง commit งานที่เพิ่งแก้ไขกันครับ

    $ git add README.md
    $ git commit -m 'improve README'
    [master b2b0e96] improve READMEไฟล์
     2 files changed, 5 insertions(+), 4 deletions(-)
     delete mode 100644 MANUAL.md

อย่าลืมว่าก่อน commit ต้อง add ไฟล์ที่ถูกแก้ไขทุกครั้งนะครับ
