---
layout: post
category: git
author: neizod
---
{% include JB/setup %}

ในการทำงานร่วมกันหลายคน ย่อมมี branch เกิดขึ้นมากมายแน่นอน (มันคงไม่มีประโยชน์ถ้าจะรอให้คนนึงทำงานแรกเสร็จก่อน แล้วค่อยอนุญาตให้อีกคนทำงานถัดมา) ความสามารถในการ merge หลายๆ branch ที่แตกออกมาในเวลาเดียวกันนั้น จึงเป็นสิ่งที่โปรแกรม SCM ควรทำได้อย่างเป็นเรื่องปรกติธรรมดา

ตอนนี้จะทดสอบการ merge หลาย branch โดยเพิ่มความสามารถ 2 อย่างให้โปรเจค hello

ความสามารถแรกคือการแสดง help ซึ่งสามารถเรียกโดยเพิ่ม `-h` ทาง command line เช่นเดียวกับโปรแกรมทั่วๆ ไปครับ

```sh
    $ git checkout -b show-help
    Switched to a new branch 'show-help'
```

แก้ code ในไฟล์ `hello.py` ดังนี้

```python
    import sys

    names = sys.argv[1:]

    if '-h' in names:
        exit('usage: python hello.py [-h] [NAME [NAME ...]]')

    if not names:
        print('Hello, world!')

    for name in names:
        print('Hi {}.'.format(name))
```

(ทดสอบแล้วผ่าน) ก็ commit ตามปรกติครับ

```sh
    $ git commit -am 'add option -h as show help'
    [show-help 052a17b] add option -h as show help
     1 file changed, 3 insertions(+)
```

เรียบร้อยกับความสามารถแรกไปแล้ว ทีนี้มาเพิ่มความสามารถที่สอง โดยกลับไปแตก branch มาจากตัว master นะครับ

```sh
    $ git checkout master
    Switched to branch 'master'
    $ git checkout -b sort-name
    Switched to a new branch 'sort-name'
```

ความสามารถนี้ จะทำการเรียงลำดับชื่อที่รับเข้ามาก่อน แล้วค่อยทักทายแต่ละชื่อที่เรียงแล้วนั้น ซึ่งสามารถเรียกโดยเพิ่ม `-s` เข้าไปตอนเรียกโปรแกรมครับ

```python
    import sys

    names = sys.argv[1:]

    if not names:
        print('Hello, world!')

    if '-s' in names:
        names.remove('-s')
        names.sort()

    for name in names:
        print('Hi {}.'.format(name))
```

(ทดสอบกันเอง) แล้วก็ commit ครับ

```sh
    $ git commit -am 'add option -s as sorted name'
    [sort-name a973745] add option -s as sorted name
     1 file changed, 4 insertions(+)
```

สลับกลับมาที่ master ถึงตอนนี้เราอาจจะลืมไปแล้วว่าได้ทำการเปลี่ยนแปลงอะไรไว้ที่ branch อื่นบ้าง เราสามารถสั่งให้แสดงความแตกต่างระหว่าง branch ดังนี้ครับ

```sh
    $ git checkout master
    Switched to branch 'master'
    $ git diff master show-help
    diff --git a/hello.py b/hello.py
    index 728f301..13c71ed 100644
    --- a/hello.py
    +++ b/hello.py
    @@ -2,6 +2,9 @@ import sys

     names = sys.argv[1:]

    +if '-h' in names:
    +    exit('usage: python hello.py [-h] [NAME [NAME ...]]')
    +
     if not names:
         print('Hello, world!')
```

ข้อมูล 4 บรรทัดแรกจากคำสั่ง diff จะบอกว่าทำการหาความแตกต่างระหว่าง branch ไหน ข้อมูลในบรรทัดที่ 5 (ขึ้นต้นด้วยเครื่องหมาย `@@`) จะบอกช่วงบรรทัดที่นำมาแสดง และข้อมูลที่เหลือจะแสดงอยู่ในรูปของ patch file คือถ้ามีเครื่องหมาย `+` หมายถึงมีข้อมูลเพิ่มขึ้นมา เครื่องหมาย `-` คือข้อมูลที่ถูกลบทิ้งครับ

เมื่อพร้อมแล้วก็ merge กันเลย

```sh
    $ git merge show-help sort-name
    Fast-forwarding to: show-help
    Trying simple merge with sort-name
    Simple merge did not work, trying automatic merge.
    Auto-merging hello.py
    Merge made by the 'octopus' strategy.
     hello.py |    7 +++++++
     1 file changed, 7 insertions(+)
```

สังเกตว่าการ merge ย่อยครั้งแรก (show-help) แม้จะเป็นการ Fast-forward เช่นเดียวกับที่ผ่านมา แต่เมื่อ merge เสร็จ จะมี code ส่วนที่ตรวจว่ามีการขอ help หรือเปล่าเพิ่มขึ้น ทำให้บรรทัดต่างๆ ใน code ส่วนที่เหลือถูกเลื่อนลงมาข้างล่างด้วย เมื่อ Git พยายามจะ merge ครั้งถัดมา (sort-name) มันจะทำการเลื่อน code ส่วนที่ต้องตรวจว่าจะ sort หรือเปล่าลงไปให้เองโดยอัตโนมัติครับ (เปิดไฟล์ `hello.py` เพื่อศึกษาผลลัพท์)

เสร็จแล้วก็อย่าลืมลบ branch ทิ้งนะครับ

```sh
    $ git branch show-help sort-name -d
    Deleted branch show-help (was 052a17b).
    Deleted branch sort-name (was a973745).
```
