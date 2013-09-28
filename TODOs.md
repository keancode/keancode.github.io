can wait
--------

- beautiful 404
    - the matrix of 404 :P
- rewrite README for own site
- create post template example for newbie
- less requite `.js` files (merge them into single file)
    - app.js (from JB)
    - dedent.js

the content
-----------

- how to
    - never write `{{ ... }}` (double brace), use `{ { ... } }` otherwise.
        (conflict w/ liquid template).
    - write how to dev w/ jekyll & liquid template
- git
    - rebuild entry `hello` project for correct date and hash-ref (can be wait)
- annoc
    - landing page
    - write migrate blog
    - write web statistic of old tt0x
- html
    - one tag need one space before end (xhtml spec): `<div />`
    - indent = 2 space to keep spaces
    - omitted some tag but good at render: `<meta ... /><h1>hello world</h1>`
- bash
    - write something about posix
    - specific `%` for root prev
    - `$SHELL` and `$TERM`
    - change `/home/username` to `/home/me` (and also add `/home/others`)
        - username is clearer than me -- mementototem
- python
    - index.md
        - write for python3.3
        - os x / fedora / opensuse / freebsd installation
        - linux manual build installation
        - explicit show how to error of an `IndentationError`
    - pypy.md
        - see compat list here <https://wiki.ubuntu.com/Python/3>
    - tree structure like in bash (`/html/module.html`)
    - mark no newline at EOF
    - add `help` to the very 1st page
    - rename `test` module in python/function.html
    - rewrite python/exception.html (not to use the zero division error check)
    - from python/lambda.html
        - move `closure` section into python/scope.html
        - move `lambda` section into python/function.html
    - in `math` module, mark that `gcd` can be found in `fractions` module
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
