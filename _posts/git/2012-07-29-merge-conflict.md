---
layout: post
category: git
author: neizod
---
{% include JB/setup %}

ตอนก่อนจะเห็นว่า เราทำการ merge ได้อย่างสบายใจไร้กังวล เพราะ code ส่วนที่แก้นั้นอยู่คนละที่กันเลย แต่ถ้าแก้ code ในที่ๆ ซ้อนทับกัน จะเกิด conflict ซึ่งโปรแกรมไม่สามารถหยั่งรู้ได้ว่า เราต้องการ code ตอนสุดท้ายออกมาเป็นยังไงกันแน่ และเราต้องลงมือจัดการกับ conflict นั้นเองครับ

ศึกษาการแก้ conflict โดยการแตก branch แรกเพื่อเพิ่มความสามารถให้โปรแกรมรับ `-v` สำหรับบอกเวอร์ชั่นโปรแกรม

    $ git checkout -b show-version
    Switched to a new branch 'show-version'

ที่ไฟล์ `hello.py` ส่วนที่เช็ค `-h` (แถวบรรทัดที่ 5) เพิ่ม code ให้เป็นอย่างนี้

    if '-h' in names:
        exit('usage: python hello.py [-h] [NAME [NAME ...]]')
    elif '-v' in names:
        exit('advance hello beta')

แล้วก็ commit

    $ git commit -am 'add option -v as show version'
    [show-version 02513a2] add option -v as show version
     1 file changed, 2 insertions(+)

เรียร้อยกับ branch แรกไปแล้ว ก็มาทำ branch ที่สอง โดยเขียนให้โปรแกรมรับ `-l` เพื่อบอกลิขสิทธิ์โปรแกรม

    $ git checkout master 
    Switched to branch 'master'
    $ git checkout -b show-license
    Switched to a new branch 'show-license'

แก้ไฟล์ `hello.py` ที่เดิมเลย (แค่เปลี่ยนหน้าตา code นิดหน่อย)

    if '-h' in names:
        exit('usage: python hello.py [-h] [NAME [NAME ...]]')
    elif '-l' in names:
        exit('license under WTFPL v2.0')

เช่นเดิม commit มันซะ

    $ git commit -am 'add option -l as show license'
    [show-license ec29013] add option -l as show license
     1 file changed, 2 insertions(+)

คราวนี้กลับมาที่ master แล้วทำการ merge เหมือนตอนที่ผ่านมา

    $ git checkout master 
    Switched to branch 'master'
    $ git merge show-version show-license 
    Fast-forwarding to: show-version
    Trying simple merge with show-license
    Simple merge did not work, trying automatic merge.
    Auto-merging hello.py
    ERROR: content conflict in hello.py
    fatal: merge program failed
    Automatic merge failed; fix conflicts and then commit the result.

พบว่ามีฟ้อง conflict และส่งผลให้ merge ไม่ผ่าน ตอนนี้ถ้าดูสถานะจะพบว่า

    $ git status 
    # On branch master
    # Unmerged paths:
    #   (use "git add/rm <file>..." as appropriate to mark resolution)
    #
    # both modified:      hello.py
    #
    no changes added to commit (use "git add" and/or "git commit -a")

หมายเหตุว่า Git จะไม่ยอมให้ย้าย branch ถ้าหากยังมี conflict เช่นนี้อยู่ ดังนั้นมาเก็บข้อผิดพลาดนี้กัน โดยเปิดไฟล์ `hello.py` ขึ้นมา จะเห็นดังนี้

    import sys

    names = sys.argv[1:]

    if '-h' in names:
        exit('usage: python hello.py [-h] [NAME [NAME ...]]')
    <<<<<<< .merge_file_trt1cP
    elif '-v' in names:
        exit('advance hello beta')
    =======
    elif '-l' in names:
        exit('license under WTFPL v2.0')
    >>>>>>> .merge_file_XPZY4N

    if not names:
        print('Hello, world!')

    if '-s' in names:
        names.remove('-s')
        names.sort()

    for name in names:
        print('Hi {}.'.format(name))

ส่วนที่เกิด conflict จะถูกคั่นด้วยบรรทัดที่ขึ้นต้นด้วยเครื่องหมาย ` <<<<<<< `, ` ======= `, ` >>>>>>> ` ในตัวอย่างนี้ จัดการลบ 3 บรรทดนั้นทิ้งไปก็พอครับ (สำหรับงานจริง เปิดอ่านโปรแกรมแล้วจัดการเรียบเรียง code ใหม่ให้ทำงานถูกต้องนะครับ)

ตอนนี้อาจจะทดสอบเพิ่มกันอีกเล็กน้อย เมื่อมั่นใจว่าโปรแกรมทำงานถูกต้องแล้ว ก็สั่ง commit ความเปลี่ยนแปลงนี้ครับ (ไม่ใช่สั่ง merge ไปอีกรอบนะครับ -- ตัว Git จะรู้ได้เองว่านี่เป็นการแก้ conflict ที่เกิดจากการ merge)

    $ git commit -am 'manual merge show-version and show-license'
    [master 388a013] manual merge show-version and show-license

ถึงตอนนี้ถ้ายังไม่มั่นใจว่าทั้ง 2 branch นั้นถูก merge แล้วจริงหรือเปล่า สามารถดูด้วย `branch --no-merged` ซึ่งควรจะไม่แสดงผลลัพท์ออกมา (เพราะถูก merge เรียบร้อยแล้ว) และถ้าสั่ง `branch --merged` ก็ควรจะเห็นครบ

    $ git branch --no-merged
    $ git branch --merged 
    * master
      show-license
      show-version

เรียบร้อยแล้วก็ลบ branch ทั้ง 2 ทิ้งเลยครับ

    $ git branch show-version show-license -d
    Deleted branch show-version (was 02513a2).
    Deleted branch show-license (was ec29013).
