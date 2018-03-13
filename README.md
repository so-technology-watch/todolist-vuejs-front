# vuejs-front

> VueJs front for Todolist app

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

push on aws:

`aws s3 cp index.html s3://todolist-vuejs-front --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
`

`aws s3 cp dist s3://todolist-vuejs-front/dist --recursive --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers`