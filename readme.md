http-test-helpers
=================

A collection of helpers that I usually need when doing Node/REST API tests.

Note that this is still very much a work-in-progress, and there are huge holes
in the current feature-set.


Features
--------

Wrap request with a few convenience methods:

- It supports both promises and regular callbacks
-- Giving a callback makes it return the underlying `request` object, which is
   a read/write stream. This is useful for piping files.
- auto-setting basic url
- automatically translating certain types from the server (at least application/json)
