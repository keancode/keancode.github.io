can wait
--------

- author licening
- beautiful 404
- rm -rf _post/api _post/usage (and those relate w/ JB)
- migrate to JB 0.3.0
- rewrite README for own site
- monitor out link to tt0x and replace it to inner link
- monitor dead link
- create post template example for newbie
- show author beautifuly (big pic, like wordpress?)
- markdown problems?
    - table doesnt render code inside -> can be fix in css
    - why link `[]()` cant accept `)` inside?
- less requite `.js` files (merge them into single file)
    - app.js (from JB)
    - dedent.js

the content
-----------

- how to
    - never write `{{ ... }}` (double brace), use `{ { ... } }` otherwise.
        (conflict w/ liquid template).
    - write how to dev w/ jekyll & liquid template
- annoc
    - landing page
    - write migrate blog
    - write web statistic of old tt0x
- git
    - python example -> use single quote instead of double quote
- haskell
    - sample the syntax highlight
- html
    - tree structure like in bash (`/html/link.html`)
    - one tag need one space before end (xhtml spec): `<div />`
    - indent = 2 space to keep spaces
    - omitted some tag but good at render: `<meta ... /><h1>hello world</h1>`
    - update those to use some modern tag: `<em>, <strong>, <span>`
- bash
    - write something about posix
    - specific `%` for root prev
    - `$SHELL` and `$TERM`
    - change `/home/username` to `/home/me` (and also add `/home/others`)
    - cd -, pushd, popd
- python
    - tree structure like in bash (`/html/module.html`)
    - mark no newline at EOF
    - add `help` to the very 1st page
    - rename `test` module in python/function.html
    - rewrite python/exception.html (not to use the zero division error check)
    - from python/lambda.html
        - move `closure` section into python/scope.html
        - move `lambda` section into python/function.html
- php
    - tell that there is `php -a` avalable
    - mark how to use print_r, var_dump
    - the reasons why pure php file require only `<?php`, but not `?>`.
- regex
    - rewrite it for full page / multi pages
- misc
    - landing page
    - change `usrname` to `username`


already drafted (move it later)
-------------------------------

- haskell
    - composite fn
    - list repr by min, max
    - foldl, foldr
