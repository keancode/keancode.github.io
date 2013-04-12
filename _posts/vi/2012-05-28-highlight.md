---
layout: post
category: vi
---

ในบาง project เราอาจได้เจอไฟล์ที่ลงท้ายด้วยนามสกุลใน format ของตัวเอง หรือบางทีก็ต้องการเปลี่ยนไป highlight ในภาษาอื่นๆ สามารถใช้คำสั่งเช่น

    :setf python [Enter]

เพื่อเปลี่ยนการ highlight จากภาษา C ไปเป็นภาษา Python ได้

    #include<stdio.h> /*
                         print('hello world!'); ''' */
    int main(void) { printf("hello world!\n"); return 0; }
    /* ''' # */

แต่การสั่งตามข้างบนนี้ จะมีผลเพียงแค่การแก้ไขเอกสารครั้งนั้นๆ ถ้าต้องการให้มีผลไปตลอด ให้เปิดไฟล์ `.vimrc` มาแล้วเพิ่มบรรทัดนี้เข้าไป

    autocmd BufNewFile,BufRead *.ext set filetype=language

โดยเปลี่ยนส่วน `*.ext` เป็นชื่อไฟล์ที่ต้องการกำหนด highlight และเปลี่ยน `language` เป็นภาษาที่ต้องการ เช่นจากข้างต้นจะได้

    autocmd BufNewFile,BufRead *.py.c set filetype=python
