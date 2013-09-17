---
layout: post
category: python
author: neizod
---
{% include JB/setup %}

นอกจาก list, dictionary, tuple และ set แล้ว ยังมีโครงสร้างข้อมูลชุดแบบอื่นๆ เช่น

deque ที่ทำความเร็วได้ดีกว่าการใช้ `list.append(elem)` และ `list.pop(0)` สร้าง[คิว](http://en.wikipedia.org/wiki/Queue_(data_structure\))เอง

```python
    from collections import deque

    d = deque([1,2,3,4])
    d.append(5)
    print(d)
    # get: deque([1,2,3,4,5])
    d.popleft()
    # get: deque([2,3,4,5])
```

อีกประเด็ตที่น่าสนใจคือ deque สามารถจำกัดขนาดได้ครับ

```python
    e = deque('abcde', 3)
    print(e)
    # get: deque(['c', 'd', 'e'], maxlen=3)
    e.appendleft('z')
    print(e)
    # get: deque(['z', 'c', 'd'], maxlen=3)
    e.rotate(1)
    print(e)
    # get: deque(['d', 'z', 'c'], maxlen=3)
```

ระวังไว้หน่อยตอนที่เพิ่มค่าเข้าไปจนล้น มันไม่ได้คืนตัวที่โดนปัดทิ้งให้นะ

---

defaultdict ที่จะสร้างค่าเริ่มต้นให้เสมอเมื่อเรียกใช้ index ตัวที่ยังไม่มีใน dict

```python
    from collections import defaultdict

    salary = defaultdict(int)
    print(salary)
    # get: defaultdict(<class 'int'>, {})
    print(salary['jack'])
    # get: 0
    print(salary)
    # get: defaultdict(<class 'int'>, {'jack': 0})
```

และจะเห็นความง่ายของมันเมื่อสร้าง dict ที่เก็บ list ของ key ที่ซ้ำกันได้

```python
    like = [('alice', 'lego'), ('mac', 'novel'), ('mac', 'burger'),
            ('tom', 'lego'), ('alice', 'barbie')]

    child = defaultdict(list)
    for k, v in like:
        child[k].append(v)
    print(child)
    # get: defaultdict(<class 'list'>,
    #          {'mac': ['novel', 'burger'],
    #           'alice': ['lego', 'barbie'],
    #           'tom': ['lego']})
```

---

namedtuple สำหรับสร้าง tuple ที่มีชื่อสำหรับเรียกแทนตัวแปรต่างๆ (หรืออาจมองว่ามันเป็น struct ที่สามารถเรียกตำแหน่งได้จากทั้งตำแหน่งและชื่อก็ได้)

```python
    from collections import namedtuple

    point = namedtuple('coordinate', 'x y z')
    p0 = point(1, 2, 3)
    print(p0)
    # get: coordinate(x=1, y=2, z=3)
    p1 = point(z=0, x=4, y=2)
    print(p1)
    # get: coordinate(x=4, y=2, z=0)

    print(p0[0]+p1[0])
    # get: 5
    print(p0.x)
    # get: 1
```

สังเกตความสะดวกในการประกาศตัวแปรชุด xyz นะครับ
