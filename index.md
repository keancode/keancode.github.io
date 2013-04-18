---
layout: splash
title: "/ ! \\ caution: KeanCode is under migration."
---

ยินดีต้อนรับสู่ KeanCode /เขียนโค้ด/ หรือที่รู้จักกันในชื่อเดิมคือ Tutor0x กับหน้าเว็บใหม่ครับ

สารบัญหน้าเพจ (ที่ย้ายมา *เกือบ* สำเร็จแล้ว)

<div class="row-fluid">
  <div class="span3">
    {% assign interesting = 'announcement misc lets-code haskell html' | split: ' ' %}
    {% for category in interesting %}
    <h4>{{ category }}</h4>
    <ul>
      {% assign pages_list = site.categories[category] %}
      {% include JB/pages_list_reversed %}
    </ul>
    {% endfor %}
  </div>
  <div class="span3 offset1">
    {% assign interesting = 'python' | split: ' ' %}
    {% for category in interesting %}
    <h4>{{ category }}</h4>
    <ul>
      {% assign pages_list = site.categories[category] %}
      {% include JB/pages_list_reversed %}
    </ul>
    {% endfor %}
  </div>
  <div class="span3 offset1">
    {% assign interesting = 'bash vi git' | split: ' ' %}
    {% for category in interesting %}
    <h4>{{ category }}</h4>
    <ul>
      {% assign pages_list = site.categories[category] %}
      {% include JB/pages_list_reversed %}
    </ul>
    {% endfor %}
  </div>
</div>
