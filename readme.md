test-helpers
============

A collection of helpers that I usually need when doing Node/REST API tests.

Note that this is still very much a work-in-progress, and there are huge holes
in the current feature-set.


Features
--------

Wrap request with a few convenience methods:

- It supports both promises and regular callbacks;
- auto-setting basic url
- automatically translating certain types from the server (at least application/json)


Todo list
---------

- Fully support all http-methods
    - del
    - head
    - options
    - trace
    - connect
