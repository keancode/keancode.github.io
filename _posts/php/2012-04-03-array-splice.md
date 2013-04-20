---
layout: post
category: php
author: neizod
---
{% include JB/setup %}

ใน PHP ตัวแปรชุดแบบอาร์เรย์นั้นจะถูก implement ด้วย [hash table](http://en.wikipedia.org/wiki/Hash_table) ทั้งหมด นี่อาจเป็นข้อดีในแง่ความสะดวก แต่ถ้าหากเราลองทำอะไรอย่างนี้

{% highlight php %}
<?php

    $arr = array('a', 'b', 'c', 'd');
    unset($arr[2]);

    var_dump($arr);
    // output:
    //   array(4) {
    //     [0]=>
    //     string(1) "a"
    //     [1]=>
    //     string(1) "b"
    //     [3]=>
    //     string(1) "d"
    //   }
{% endhighlight %}

จะพบว่าตัวที่ถูก `unset` ไปนั้น กลายเป็นรูโหว่ๆ อยู่กลางอาร์เรย์ โดยที่ index ของ element ใน array ไม่เลื่อนลงมาถมช่องโหว่ให้เต็ม

ทางแก้นอกจากเลี่ยงไปใช้การวนแบบ foreach แทนแล้ว ในสถานการณ์ที่เลข index มีความสำคัญ (ต้องเลื่อนไปถมให้เต็ม) ก็มี `array_splice` สำหรับงานนี้ครับ

{% highlight php %}
<?php

    $arr = array('a', 'b', 'c', 'd');
    array_splice($arr, 2, 1);

    var_dump($arr);
    // output:
    //   array(3) {
    //     [0]=>
    //     string(1) "a"
    //     [1]=>
    //     string(1) "b"
    //     [2]=>
    //     string(1) "d"
    //   }
{% endhighlight %}

---

สำหรับ argument ที่ให้กับ `array_splice` จะมีอยู่ทั้งหมด 4 ตัว โดยบังคับใส่อย่างน้อย 2 ตัวได้แก่อาร์เรย์ที่จะเปลี่ยนแปลง และตำแหน่งเริ่มต้นที่จะลบตัวแปรในอาร์เรย์ทิ้ง

{% highlight php %}
<?php

    $arr = array('a', 'b', 'c', 'd');
    array_splice($arr, 2);
    // now $arr is array('a', 'b')
{% endhighlight %}

argument ตัวที่ 3 จะเป็นการบอกจำนวนของตัวแปรในอาร์เรย์ที่จะลบทิ้ง *ตั้งแต่จุดเริ่มต้นที่ได้บอกไว้* (ถ้าไม่ใส่ก็คือลบทั้งหมด) ซึ่งถ้าตัวเลขนี้เป็นลบ มันจะเป็นการบอกจำนวนของตัวแปรที่เหลือจากการลบนี้แทน

{% highlight php %}
<?php

    $arr = array('a', 'b', 'c', 'd');
    array_splice($arr, 1, 1);

    $arr = array('a', 'b', 'c', 'd');
    array_splice($arr, 1, -2);

    // both $arr is array('a', 'c', 'd')
{% endhighlight %}

ส่วน argument ตัวสุดท้ายคืออาร์เรย์ที่จะนำเข้ามาแทรกลงในตำแหน่งที่ลบไป และเนื่องจากเราไม่สามารถข้าม argument ตัวที่ 3 ได้ ดังนั้นถ้าต้องการลบอาร์เรย์ต้นฉบับทิ้งจนสุดแล้วค่อยต่อท้ายด้วยอาร์เรย์ใหม่ ให้ใส่ argument ตัวที่ 3 เป็น `count` เพื่อให้มั่นใจว่าลบตัวแปรทิ้งจนหมดก็ได้

{% highlight php %}
<?php

    $arr = array('a', 'b', 'c', 'd');
    array_splice($arr, 2, 0, array('z', 'y'));
    // now $arr is array('a', 'b', 'z', 'y', 'c', 'd')

    $arr = array('a', 'b', 'c', 'd');
    array_splice($arr, 1, count($arr), array('e', 'i'));
    // now $arr is array('a', 'e', 'i')
{% endhighlight %}

อย่างไรก็ตาม แม้ว่าเราจะสามารถใช้เครื่องมือเหล่านี้เพื่อสร้างอาร์เรย์ที่รักษาการเรียงลำดับตัวเลขไว้ได้ แต่โดยพื้นฐานของมันแล้ว มันไม่ได้ implement มาเพื่องานเช่นนี้โดยเฉพาะ ถ้าต้องการทำงานเช่นนี้โดยที่ยังคงประสิทธิภาพไว้อยู่ อาจพิจรณาการ implement แบบ [linked list](http://en.wikipedia.org/wiki/Linked_list) แทนครับ
