---
layout: splash
title: "/ ! \\ caution: KeanCode is under migration."
---

ยินดีต้อนรับสู่ KeanCode /เขียนโค้ด/ หรือที่รู้จักกันในชื่อเดิมคือ Tutor0x กับหน้าเว็บใหม่ครับ

สารบัญหน้าเพจ

{% assign interesting = 'lets-code vi' | split: ' ' %}
{% for category in interesting %}
<h4>{{ category }}</h4>
<ul>
  {% assign pages_list = site.categories[category] %}
  {% include JB/pages_list_reversed %}
</ul>
{% endfor %}

