/**
    * 电机
    */
enum Motors {
    //% block="M1"
    M1 = 1,
    //% block="M2"
    M2 = 2,
    //% block="ALL"
    ALL = 3
}

enum Motors1 {
    //% block="M1"
    M1 = 1,
    //% block="M2"
    M2 = 2,
}

/**
 * 正反转
 */
enum Dir {
    //% block="CW"
    CW = 0,
    //% block="CCW"
    CCW = 1
}

/**
 * 舵机
 */
enum Servos {
    //% block="S1"
    S1 = 1,
    //% block="S2"
    S2 = 2,
    //% block="S3"
    S3 = 3
}

/**
 * RGB灯
 */
enum RGBLight {
    //%block="RGB_L"
    RGBL = 1,
    //%block="RGB_R"
    RGBR = 2,
    //%block="ALL"
    RGBA = 3
}

/**
 * 寻线传感器
 */
enum Patrol {
    //% block="Line_L1"
    L1 = 1,
    //%block="Line_L2"
    L2 = 2,
    //%block="Line_R1"
    R1 = 3,
    //%block="Line_R2"
    R2 = 4
}

/**
 * 超声波单位
 */
enum Sonicunit {
    //% block="cm"
    Centimeters,
    //% block="μs"
    MicroSeconds
}

/**
 * PID开关
 */
enum PID {
    //%block="OFF"
    OFF = 0,
    //%block="ON"
    ON = 1
}
/**
 * RGB灯颜色
 */
enum Color {
    //%block="Red"
    RED = 1,
    //%block="Green"
    GREEN = 2,
    //%block="Yellow"
    YELLOW = 3,
    //%block="Blue"
    BLUE = 4,
    //%block="Pink"
    PINK = 5,
    //%block="Cyan"
    CYAN = 6,
    //%block="White"
    WHITH = 7,
    //%block="Put out"
    PUT = 8

}

//% weight=100  color=#00A654   block="Maqueen+"
namespace DFRobotMaqueenPluss {
    /**
     * 开启PID
     */
    //%block="PID switch|%pid"
    export function PID(pid: PID): void {
        let buf = pins.createBuffer(2)
        buf[0] = 0x0A;
        buf[1] = pid;
        pins.i2cWriteBuffer(0x10, buf)
    }
    /**
     * 控制电机运行
     */
    //% block="Motor|%index|dir|%direction|speed|%speed "
    //% speed.min=0 speed.max=255
    export function MototRun(index: Motors, direction: Dir, speed: number): void {
        let buf = pins.createBuffer(5)
        if (index == 1) {
            buf[0] = 0x00;
            buf[1] = direction;
            buf[2] = speed;
            buf[3] = 0x03;
            buf[4] = 0;
            pins.i2cWriteBuffer(0x10, buf)

        } else if (index == 2) {
            buf[0] = 0x02;
            buf[1] = direction;
            buf[2] = speed;
            buf[3] = 0x01;
            buf[4] = 0;
            pins.i2cWriteBuffer(0x10, buf)
        } else if (index == 3) {
            buf[0] = 0x00;
            buf[1] = direction;
            buf[2] = speed;
            buf[3] = direction;
            buf[4] = speed;
            pins.i2cWriteBuffer(0x10, buf)
        }

    }

    /**
     * 电机补偿
     */
    //% block="Motor Compensation|%mostors speed|%speed"
    //% speed.min=0 speed.max=255
    export function MostotCompensation(mostor: Motors, speed: number): void {
        let buf = pins.createBuffer(4)
        if (mostor == 1) {
            buf[0] = 0x08;
            buf[1] = speed;
            buf[2] = 0x09;
            buf[3] = 0;
            pins.i2cWriteBuffer(0x10, buf)
        } else if (mostor == 2) {
            buf[0] = 0x09;
            buf[1] = speed;
            buf[2] = 0x08;
            buf[3] = 0
            pins.i2cWriteBuffer(0x10, buf)
        } else if (mostor == 3) {
            buf[0] = 0x08;
            buf[1] = speed;
            buf[2] = speed;
            pins.i2cWriteBuffer(0x10, buf)
        }
    }
    /**
     * 读电机转速
     */
    //%block="read mostor|%index speed"
    export function ReadSpeed(index: Motors1): number {
        pins.i2cWriteNumber(0x10, 0, NumberFormat.Int8LE)
        let x = pins.i2cReadBuffer(0x10, 4)
        let y
        if (index == 1) {
            y = x[1];
            return y

        } else if (index == 2) {
            y = x[3];
            return y
        }
        return -1
    }

    /**
     * 舵机
     */
    //% block="servo|%index|angle|%angle"
    //% angle.min=0  angle.max=180
    export function ServoRun(index: Servos, angle: number): void {
        let buf = pins.createBuffer(2)
        if (index == 1) {
            buf[0] = 0x14;
            buf[1] = angle;
            pins.i2cWriteBuffer(0x10, buf)
        } else if (index == 2) {
            buf[0] = 0x15;
            buf[1] = angle;
            pins.i2cWriteBuffer(0x10, buf)
        } else if (index == 3) {
            buf[0] = 0x16;
            buf[1] = angle;
            pins.i2cWriteBuffer(0x10, buf)
        }
    }

    /**
     * RGB灯
     */
    //% block="|%rgbshow color|%color"
    export function SetRGBLight(rgb: RGBLight, color: Color): void {
        let buf = pins.createBuffer(3)
        if (rgb == 1) {
            buf[0] = 0x0B
            buf[1] = color
            pins.i2cWriteBuffer(0x10, buf)
        } else if (rgb == 2) {
            buf[0] = 0x0C
            buf[1] = color
            pins.i2cWriteBuffer(0x10, buf)
        } else if (rgb == 3) {
            buf[0] = 0x0B
            buf[1] = color
            buf[2] = color
            pins.i2cWriteBuffer(0x10, buf)
        }

    }

    /**
     * 寻线传感器
     */
    //%block="read patrol|%patrol"
    export function ReadPatrol(patrol: Patrol): number {
        let x
        if (patrol == 1) {
            pins.i2cWriteNumber(0x10, 0x1A, NumberFormat.Int8LE)
            x = pins.i2cReadNumber(0x10, NumberFormat.Int8LE)
            return x
        } else if (patrol == 2) {
            pins.i2cWriteNumber(0x10, 0x19, NumberFormat.Int8LE)
            x = pins.i2cReadNumber(0x10, NumberFormat.Int8LE)
            return x
        } else if (patrol == 3) {
            pins.i2cWriteNumber(0x10, 0x1B, NumberFormat.Int8LE)
            x = pins.i2cReadNumber(0x10, NumberFormat.Int8LE)
            return x
        } else if (patrol == 4) {
            pins.i2cWriteNumber(0x10, 0x1C, NumberFormat.Int8LE)
            x = pins.i2cReadNumber(0x10, NumberFormat.Int8LE)
            return x
        }
        return -1
    }
    /**
     * 读版本号
     */
    //%block="get product information"
    export function ReadVersion(): number{
        pins.i2cWriteNumber(0x10, 0x28, NumberFormat.Int8LE)
        let v = pins.i2cReadNumber(0x10, NumberFormat.Int8LE)
        pins.i2cWriteNumber(0x10, 0x29, NumberFormat.Int8LE)
        let  y = pins.i2cReadBuffer(0x10, v);
        serial.writeBuffer(y)
        return 0
    }
    /**
     * 超声波
     */
    //%block="ultrasonic T|%T E|%E |%sonic"
    export function UltraSonic(T: DigitalPin, E: DigitalPin, sonic: Sonicunit): number {
        let maxCmDistance = 500
        pins.setPull(T, PinPullMode.PullNone);
        pins.digitalWritePin(T, 0);
        control.waitMicros(2);
        pins.digitalWritePin(T, 1);
        control.waitMicros(10);
        pins.digitalWritePin(T, 0);

        pins.setPull(E, PinPullMode.PullUp);
        let d = pins.pulseIn(E, PulseValue.High, maxCmDistance * 42);
        console.log("DISTANCE:" + d / 42);
        basic.pause(50);
        let x = Math.round(d / 42);
        let y = Math.round(d / 1);

        switch (sonic) {
            case Sonicunit.Centimeters: return x
            default: return y
        }
    }
    /**
     * 紅外
     */
    //%block=""
}