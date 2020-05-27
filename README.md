  
# Maqueen+

[Maqueen plus is a  STEM educational robot for micro:bit. Has been specially optimized in software and hardware  for being compatible with Huskylens AI Vision Sensor.](https://github.com/DFRobot/pxt-DFRobot_Maqueenplus)
## Basic usage

* 电机控制模块，控制电机速度、方向和电机停止模块控制电机停止

```blocks
DFRobotMaqueenPluss.I2CInit()
DFRobotMaqueenPluss.mototRun(Motors.ALL, Dir.CW, 255)
DFRobotMaqueenPluss.mototStop(Motors.M1)
```

* 读取电机方向和速度模块，能够读取左右电机的速度和方向

```blocks
DFRobotMaqueenPluss.I2CInit()
basic.forever(function () {
    serial.writeValue("speed", DFRobotMaqueenPluss.readSpeed(Motors1.M1))
    serial.writeValue("direction", DFRobotMaqueenPluss.readDirection(Motors1.M1))
})
```

* 读取巡线传感器的状态和灰度值 

```blocks
DFRobotMaqueenPluss.I2CInit()
basic.forever(function () {
    serial.writeValue("patorl", DFRobotMaqueenPluss.readPatrol(Patrol.L1))
    serial.writeValue("voltage", DFRobotMaqueenPluss.readPatrolVoltage(Patrol.L1))
})

```

* 读取红外值和超声波返回的距离值

```blocks
DFRobotMaqueenPluss.I2CInit()
basic.forever(function () {
    serial.writeValue("IR", DFRobotMaqueenPluss.IR_read())
    serial.writeValue("ultrasonic", DFRobotMaqueenPluss.ultraSonic(PIN.P0, PIN.P0))
})

```

* 舵机控制模块，能够控制三路舵机

```blocks
DFRobotMaqueenPluss.I2CInit()
DFRobotMaqueenPluss.servoRun(Servos.S1, 100)

```

* RGB灯控制模块，控制麦昆PLUS的RGB灯显示不同颜色

```blocks
DFRobotMaqueenPluss.I2CInit()
DFRobotMaqueenPluss.setRGBLight(RGBLight.RGBL, Color.RED)

```


## License

MIT

Copyright (c) 2018, microbit/micropython Chinese community  


## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
