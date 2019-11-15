# 远程控制电脑显示器状态

首先感谢 [display-control](https://github.com/SynergiTech/display-control) 这个库， 让我可以坐在床上关掉我的显示器
~~(操， 都写完我才发现， 做一个 TG 机器人不是更舒服么)~~
主要是使用GUI开关， 推荐不加token， 懒得输

## Start
`npm start`
## CLI 参数

```shell script
sage:
  bin.js [OPTIONS] [ARGS]

Options:
  -p, --port [NUMBER]    listen port  default <2333> (Default is 2333)
  -h, --host [IP]        listen host default <0.0.0.0> (Default is 0.0.0.0)
  -t, --token STRING     token  default null
```
## API


```shell script
 control your display
            
            API:
                GET /display/<token>/gui    control WebGui
                GET /display/<token>        return your display state
                PUT /display/<token>        set your display state
                    params: 
                        state: true | false | 0 | 1
        
            Example:
                curl -X PUT -d "state=0"  http://<your host>:<your port>/display 
```

