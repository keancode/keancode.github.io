---
layout: post
category: vb.net
author: neizod
---
{% include JB/setup %}

จากตอนก่อน เมื่อเรารู้จักกับบูลีนแล้ว เราก็สามารถจัด control flow ของโปรแกรมได้

```vb.net
    Dim chk As Boolean

    If chk Then
        MessageBox.Show("chk: True")
    End If
```

การเขียน if - else if - else ก็เหมือนทั่วไปครับ

```vb.net
    Dim n As Integer

    If n < 40 Then
        MessageBox.Show("F")
    ElseIf n < 75 Then
        MessageBox.Show("P")
    Else
        MessageBox.Show("G")
    End If
```

หรือจะเช็คแบบ switch case ก็ได้

```vb.net
    Dim g As Char

    Select Case g
        Case "F", "E"
            MessageBox.Show(0)
        Case "P"
            MessageBox.Show(2.5)
        Case "G", "A"
            MessageBox.Show(4)
        Case Else
            MessageBox.Show("error")
    End Select
```

ความต่างจากภาษาอื่นๆ คือ จบแต่ละ case ไม่ต้องสั่ง break ออกมา มันจะทำแค่อันแรกที่เจอเท่านั้น

---

ส่วนการวน for ทำได้โดย

```vb.net
    Dim i As Integer

    ' loop show 1, 2, 3
    For i = 1 To 3
        MessageBox.Show(i)
    Next i
```

สังเกตว่าตอนจบคำสั่งด้วย `Next` จะมีตัวแปรห้อยอยู่ ตรงนี้ไม่ต้องใส่ตัวแปรก็ได้นะครับ แต่จะใส่เพื่อให้อ่านง่ายในกรณีที่ซ้อน for หลายชั้นก็ไม่ว่ากัน

ส่วนการข้ามการทำงาน หรือเช็คเพื่อออกจาก for ทันที

```vb.net
    Dim i As Integer

    ' loop show 1, 3, 5
    For i = 1 To 10
        If i Mod 2 = 0 Then
            Continue For
        ElseIf i > 5 Then
            Exit For
        End If
        MessageBox.Show(i)
    Next
```
