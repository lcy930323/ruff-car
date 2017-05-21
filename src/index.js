
var Server = require('home').Server;
var server = new Server();

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 8888
    });


server.use('/', Server.static('static'));

var carStatus = 'stop';

server.get('/', function (req, res) {
    return {
        sn: process.ruff.sn,
        time: Date.now()
    };
});


//前进
server.get('/up', function (req) {
    $("#hg7881").turnUp();
    carStatus = 'up';
    return {
        sn: process.ruff.sn,
        status: 'success',
        direction:'up',
    };
})

//后退
server.get('/down', function (req) {
    $("#hg7881").turnDown();
    carStatus = 'down';
    return {
        sn: process.ruff.sn,
        status: 'success',
        direction:'down',
    };
})

//左转
server.get('/left', function (req) {
    $("#hg7881").turnLeft();
    carStatus = 'left';
    return {
        sn: process.ruff.sn,
        status: 'success',
        direction:'left',
    };
})

//右转
server.get('/right', function (req) {
    $("#hg7881").turnRight();
    carStatus = 'right';
    return {
        sn: process.ruff.sn,
        status: 'success',
        direction:'right',
    };
})
server.get('/stop', function (req) {
    $("#hg7881").turnStop();
    carStatus = 'stop';
    return {
        sn: process.ruff.sn,
        status: 'success',
        direction:'stop',
    };
})




//广播
wss.broadcast = function broadcast(s, ws) {
    // console.log(ws);
    // debugger;
    wss.clients.forEach(function each(client) {
    });
};

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    server.listen(8080);

    var directiveMap = {
        '/stop': function(){ $("#hg7881").turnStop() },
        '/up': function(){ $("#hg7881").turnUp() },
        '/down': function(){ $("#hg7881").turnDown() },
        '/left': function(){ $("#hg7881").turnLeft() },
        '/right': function(){ $("#hg7881").turnRight() },
        '/lightOn': function(){ lightOn() },
        '/lightOff': function(){ lightOff() },
        '/custom': function(data){
            var list = data.data || {};
            $('#hg7881').custom(list);
        }
    }

    // 初始化
    wss.on('connection', function(ws) {
        // console.log(ws.clients.session);
        // console.log("在线人数", wss.clients.length);
        ws.send('你是第' + wss.clients.length + '位上帝');
        // 发送消息
        ws.on('message', function(jsonStr) {
            console.log( jsonStr )
            try {
                var obj = JSON.parse(jsonStr);
                if( obj.type ) {
                    if( directiveMap[ obj.type ] ) {
                        directiveMap[ obj.type ](obj);
                    }
                }

            } catch (e) {
                console.log('parse error', jsonStr, e)
            }
        });
        // 退出聊天
        ws.on('close', function(close) {
            try{
                // wss.broadcast(0, this.user.name);
            }catch(e){
                console.log('刷新页面了');
            }
        });
    });

    function blink() {
        lightOn();
        setTimeout(lightOff, 300)
    }
    
    function lightOn() {
        $("#led-r").turnOn();
        $("#led-g").turnOn();
        $("#led-b").turnOn();
    }

    function lightOff() {
        $("#led-r").turnOff();
        $("#led-g").turnOff();
        $("#led-b").turnOff();
    }

    blink();


    server.get('/lightOn', function (req) {
        lightOn();
        return {
            sn: process.ruff.sn,
            status: 'success',
            direction:'onLight',
        };
    })
    server.get('/lightOff', function (req) {
        lightOff();
        return {
            sn: process.ruff.sn,
            status: 'success',
            direction:'offLight',
        };
    })

    // $('#led-r').turnOn();
});

$.end(function () {
    // $('#led-r').turnOff();
});
