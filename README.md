gulp-filter-by
==============

A gulp plugin designed to help filter files from source

## Usage

```js
gulp.src('./**/*.scss')
    .pipe(filterBy(function(file) {
        return file.contents.toString().indexOf('@import "partialName"') > -1;
    }))
    .pipe(sass())
```

### filterBy(fn)

Will filter files based on the boolean return value of the provided `fn` function

#### fn

The required `fn` function is executed by the `filterBy` plugin, and it is passed the `file` from the stream
to be processed by `fn`; it is then up to the developer of the task to decide whether the file should be
included into the stream by performing any desired computations they please, the only requirement is that the
function returned a boolean value to the plugin, so that it knows how to process the file:
 
- returning `true` will include the file into the stream.
- returning `false` will exclude the file from the stream.
