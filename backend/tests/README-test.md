These tests use **pytest-flask** (https://pytest-flask.readthedocs.io/en/latest/index.html)

In order to run these tests, install pytest-flask by running:

` pip install pytest-flask `

Then, in the `backend/` directory, run `py.test`

You should get an output that looks something like this:

```
============================= test session starts =============================
platform win32 -- Python 3.7.3, pytest-5.0.1, py-1.8.0, pluggy-0.12.0
rootdir: [...]\backend
plugins: flask-0.15.0
collected 1 item

tests\test_basic.py .                                                    [100%]

========================== 1 passed in 0.06 seconds ===========================
```

If you have any problems getting the tests running, please don't hesitate to let me know!