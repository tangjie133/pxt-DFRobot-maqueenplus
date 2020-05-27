  
# Maqueen Plus

[Maqueen plus is a  STEM educational robot for micro:bit. Has been specially optimized in software and hardware  for being compatible with Huskylens AI Vision Sensor.]（）

## Basic usage

* Set the motion direction and speed of Maqueen motor

```blocks
DFRobotMaqueenPluss.MototRun(Motors.M1, Dir.CW, 120)
```

* Read the Maqueen ultrasound data

```blocks
basic.showNumber(Maqueen.Ultrasonic(PingUnit.Centimeters))
```

* Set the  Maqueen servos 

```blocks
Maqueen.ServoRun(Maqueen.Servos.S1, 90)
```

* Set the  Maqueen  motor stop

```blocks
Maqueen.MotorStop(Maqueen.Motors.M1)
```

* Read patrol sensor data

```blocks
basic.showNumber(Maqueen.ReadPatrol(Maqueen.Patrol.PatrolLeft))
```

* Set LED light switch

```blocks
Maqueen.WriteLED(Maqueen.LED.LEDLeft, Maqueen.LEDswitch.turnOn)
```

* Read IR sensor data

```blocks
basic.showNumber(Maqueen.IR_read())
```

* Read the version number

```blocks
basic.showString(Maqueen.IR_read_version())
```

## License

MIT

Copyright (c) 2018, microbit/micropython Chinese community  


## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
