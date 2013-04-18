---
layout: post
category: bash
author: neizod
---
{% include JB/setup %}

คำสั่งต่างๆ ของ Unix/Linux นั้นก็คือโปรแกรมโปรแกรมหนึ่ง ปรกติเราสามารถเรียกมันมาทำงานโดยพิมพ์ชื่อโปรแกรม (คำสั่ง) นั้นๆ ลงไป อย่างเช่นที่เคยทำมาแล้ว

    $ ls
    Desktop  Documents  Downloads  Music  Pictures

เราสามารถใส่ argument ให้กับคำสั่งนั้นๆ โดย argument มีอยู่ 2 แบบ แบบแรกคือ option argument ซึ่งจะใช้เครื่องหมาย `-` นำหน้าคำสั่งที่เป็นตัวย่อ (สามารถใส่ได้หลายคำสั่ง) หรือใช้ `--` นำหน้าคำสั่งเต็ม (เพื่อให้อ่านง่าย) ซึ่งแต่ละ option จะแยกกันด้วย space เช่น

    $ ls -a
    .   .cache   Desktop    Downloads  Pictures
    ..  .config  Documents  Music      .profile
    $ ls -aF
    ./   .cache*   Desktop/    Downloads/  Pictures/
    ../  .config*  Documents/  Music/      .profile*
    $ ls -F --all --si
    ./   .cache*   Desktop/    Downloads/  Pictures/
    ../  .config*  Documents/  Music/      .profile*

ส่วน argument อีกแบบคืออันที่ไม่มีเครื่องหมาย `-` นำหน้า มันอาจหมายถึง path ของไฟล์สำหรับคำสั่งนั้นๆ หรือข้อความที่ส่งเข้าไปเป็น argument ให้ก็ได้

    $ ls Documents/
    morning.txt  goodbye.txt
    $ mkdir New
    $ rmdir New
    $ echo what is the answer
    what is the answer

เนื่องจากคำสั่งเหล่านี้มีเยอะแยะมากมายตามแต่ละโปรแกรม สามารถหาอ่านเองได้ด้วยคำสั่ง `man` แล้วตามด้วยชื่อโปรแกรมที่อยากรู้ครับ (ออกโปรแกรมด้วยตัว q)

    $ man ls

---

ธรรมชาติอีกอย่างของโปรแกรมเหล่านี้คือ บางโปรแกรมจะพิมพ์ผลลัพท์ออกมาทันทีแล้วกลับมาอยู่ที่ shell หลักเลย ส่วนบางโปรแกรมจะพาเราเข้าไปอยู่ใน shell ประจำโปรแกรมนั้นๆ พร้อมกับรอคำสั่งเพิ่มเติม อย่างเช่นโปรแกรม `cat` ที่จะทำการพิมพ์ข้อความซ้ำตามที่เราพิมพ์ป้อนให้มันครับ

    $ cat
    hello
    hello
    world
    world

วิธีการออกจากโปรแกรมเหล่านี้ก็แตกต่างกันออกไป (บางโปรแกรมก็มีคำสั่งเฉพาะสำหรับออกโปรแกรม) แต่ส่วนใหญ่แล้ว สามารถกด keyboard เพื่อป้อนคำสั่งให้หยุดโปรแกรมได้ ดังนี้

1. `[Ctrl]+[c]` ส่งสัญญาณ keyboard interrupt บางโปรแกรมจะหยุดแค่งานย่อยๆ แต่ไม่ออกโปรแกรม
2. `[Ctrl]+[z]` หยุดโปรแกรมชั่วคราว (เรียกทำงานต่อโดยคำสั่ง `fg`)
3. `[Ctrl]+[d]` ออกโปรแกรม

อย่างไรก็ตาม โปรแกรมเหล่านี้บางโปรแกรมก็ไม่จำเป็นต้องเข้า shell ส่วนตัวเสมอไป ถ้าส่ง argument ให้กับโปรแกรมอย่างถูกต้อง เช่น โปรแกรม cat ที่เมื่อรับชื่อไฟล์เข้าไป จะพิมพ์ข้อความภายในไฟล์ออกมาทีละบรรทัด และสามารถรับไฟล์หลายไฟล์พร้อมกันได้

    $ cat Documents/morning.txt Documents/goodbye.txt
    good morning.
    good afternoon, good evening, and good night.

---

ในขั้นต้นเราอาจเห็นว่าโปรแกรมอย่าง cat นั้นดูไร้สาระ เพราะ shell ของโปรแกรมมันทำหน้าที่พิมพ์ซ้ำข้อความที่เราพิมพ์เข้าไป แต่เราจะได้ใช้ประโยชน์จากมันเมื่อรู้จักเทคนิค redirection ครับ

การ [redirection](http://en.wikipedia.org/wiki/Redirection_(computing)) คือการเปลี่ยนวิธีการใช้ input, output ซึ่งกระทำต่อ shell ของโปรแกรมย่อยๆ เหล่านั้น ซึ่งเปลี่ยนจากพิมพ์คำสั่งโดย keyboard มาเป็นใช้ไฟล์แทน อย่างเช่น

    $ cat < Desktop/hello.c
    #include <stdio.h>
    int main(void) { printf("hello\n"); return 0; }

หรือรับ input เข้ามาเป็นไฟล์เสมือน (สร้าไฟล์เดี๋ยวนั้น แล้วจบไฟล์ด้วย keyword ที่ตั้งไว้)

    $ cat << endpoint
    > there is no ultimate answer
    > where's ultimate question exist
    > endpoint
    there is no ultimate answer
    where's ultimate question exist

ส่วนการจัดการกับ output จะเป็นการบันทึก output ที่ได้มาลงในไฟล์

    $ # store output in a new file
    $ echo 4 8 15 16 23 > number.txt
    $ cat number.txt
    4 8 15 16 23
    $
    $
    $ # append output to exist file
    $ echo and 42 >> number.txt
    $ cat number.txt
    4 8 15 16 23
    and 42

อีกเทคนิคหนึ่งคือการ [pipe](http://en.wikipedia.org/wiki/Pipeline_(Unix)) มันคือการส่ง output จากโปรแกรมก่อนหน้า ไปให้โปรแกรมถัดไปจัดการต่อ เช่น ใช้โปรแกรม `grep` เพื่อหาคำที่ต้องการ

    $ ls | grep s
    Desktop/
    Music/
    Pictures/
