let maqueene = "1"
let maqueenparam = 0
let alreadyInit = 0
let IrPressEvent = 0
let maqueencb: Action

enum PIN {
    P0 = 3,
    P1 = 2,
    P2 = 1,
    P8 = 18,
    //P9 = 10,
    // P10 = 6,
    P13 = 23,
    // P14 = 22,
    P15 = 21,
};
/**
* 电机
*/
enum Motors {
    //% block="left"
    M1 = 1,
    //% block="right"
    M2 = 2,
    //% block="ALL"
    ALL = 3
}

enum Motors1 {
    //% block="left"
    M1 = 1,
    //% block="right"
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
    //% block="L1"
    L1 = 1,
    //%block="L2"
    L2 = 2,
    //%block="R1"
    R1 = 3,
    //%block="R2"
    R2 = 4,
    //%block="M"
    M = 5
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

//% weight=100  color=#00A654   block="Maqueen+" icon="\uf136"
namespace DFRobotMaqueenPluss {

    export class Packeta {
        public mye: string;
        public myparam: number;
    }

    /**
     * 开启PID
     */
    //%block="PID switch|%pid"
    export function PID(pid: PID): void {
        let buf = pins.createBuffer(2);
        buf[0] = 0x0A;
        buf[1] = pid;
        pins.i2cWriteBuffer(0x10, buf);
    }
    /**
     * 控制电机运行
     */
    //% block="Motor|%index|direction|%direction|speed|%speed "
    //% speed.min=0 speed.max=255
    export function MototRun(index: Motors, direction: Dir, speed: number): void {

        //let buf1 = pins.createBuffer(5)
        if (index == 1) {
            let buf = pins.createBuffer(3)
            buf[0] = 0x00;
            buf[1] = direction;
            buf[2] = speed;
            // buf[3] = 0;
            // buf[4] = 0;
            pins.i2cWriteBuffer(0x10, buf)

        } if (index == 2) {
            let buf = pins.createBuffer(3)
            buf[0] = 0x02;
            buf[1] = direction;
            buf[2] = speed;
            // buf[3] = 0;
            // buf[4] = 0;
            pins.i2cWriteBuffer(0x10, buf)
        }
        if (index == 3) {
            let buf = pins.createBuffer(5)
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
    //% block="Motor Compensation|%motor speed|%speed"
    //% speed.min=0 speed.max=255
    export function MostotCompensation(motor: Motors1, speed: number): void {
        let buf = pins.createBuffer(2)
        if (motor == 1) {
            buf[0] = 0x08;
            buf[1] = speed;
            pins.i2cWriteBuffer(0x10, buf)
        } else if (motor == 2) {
            buf[0] = 0x09;
            buf[1] = speed;
            pins.i2cWriteBuffer(0x10, buf)
        }
    }
    /**
     * 读电机转速
     */
    //%block="read Motor|%index speed"
    export function ReadSpeed(index: Motors1): number {
        pins.i2cWriteNumber(0x10, 0, NumberFormat.Int8LE)
        let x = pins.i2cReadBuffer(0x10, 4)
        if (index == 1) {
            return x[1]

        } else if (index == 2) {
            return x[3]
        }
        return -1
    }
    /**
     * 读电机正反转
     */
    //%block="read Motor|%index direction"
    export function ReadDirection(index: Motors1): number {
        pins.i2cWriteNumber(0x10, 0, NumberFormat.Int8LE)
        let x = pins.i2cReadBuffer(0x10, 4)
        if (index == 1) {
            return x[0]

        } else if (index == 2) {
            return x[2]
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
        } if (index == 2) {
            buf[0] = 0x15;
            buf[1] = angle;
            pins.i2cWriteBuffer(0x10, buf)
        } if (index == 3) {
            buf[0] = 0x16;
            buf[1] = angle;
            pins.i2cWriteBuffer(0x10, buf)
        }
    }

    /**
     * RGB灯
     */
    //% block="set |%rgbshow color|%color"
    export function SetRGBLight(rgb: RGBLight, color: Color): void {
        let buf = pins.createBuffer(3)
        if (rgb == 1) {
            buf[0] = 0x0B
            buf[1] = color
            pins.i2cWriteBuffer(0x10, buf)
        } if (rgb == 2) {
            buf[0] = 0x0C
            buf[1] = color
            pins.i2cWriteBuffer(0x10, buf)
        } if (rgb == 3) {
            buf[0] = 0x0B
            buf[1] = color
            buf[2] = color
            pins.i2cWriteBuffer(0x10, buf)
        }

    }

    /**
     * 寻线传感器
     */
    //%block="read patrol sensor|%patrol"
    export function ReadPatrol(patrol: Patrol): number {
        pins.i2cWriteNumber(0x10, 0x19, NumberFormat.Int8LE);
        let y = pins.i2cReadBuffer(0x10, 5);
        if (patrol == 1) {
            return y[1];
        } if (patrol == 2) {
            return y[0];
        } if (patrol == 3) {
            return y[2];
        } if (patrol == 4) {
            return y[3];
        } if (patrol == 5) {
            return y[4];
        }
        return -1;
    }

    /**
     * 读取巡线传感器灰度值
     */
    //% block="read patrol sensor|%patrol voltage "
    export function ReadPatrolVoltage(patrol: Patrol): number {
        pins.i2cWriteNumber(0x10, 0x1E, NumberFormat.Int8LE);
        let y = pins.i2cReadBuffer(0x10, 10);
        if (patrol == 1) {
            return y[3]|y[2]<<8;
        } if (patrol == 2) {
            return y[1]|y[0]<<8;
        } if (patrol == 3) {
            return y[5]|y[4]<<8;
        } if (patrol == 4) {
            return y[7]|y[6]<<8;
        } if (patrol == 5) {
            return y[9]|y[8]<<8;
        }
        return -1;
    }
    /**
     * 读版本号
     */
    //%block="get product information"
    export function ReadVersion(): string {
        pins.i2cWriteNumber(0x10, 0x28, NumberFormat.Int8LE);
        let v = pins.i2cReadNumber(0x10, NumberFormat.Int8LE);
        pins.i2cWriteNumber(0x10, 0x29, NumberFormat.Int8LE);
        let y = pins.i2cReadBuffer(0x10, v);
        let x = y.toString();
        return x;
    }
    /**
     * 超声波
     */
    //%block="read ultrasonic sensor T|%T E|%E |%sonic"
    export function UltraSonic(T: PIN, E: PIN, sonic: Sonicunit): number {
        let maxCmDistance = 500;
        let _T;
        let _E;
        switch (T) {
            case PIN.P0: _T = DigitalPin.P0; break;
            case PIN.P1: _T = DigitalPin.P1; break;
            case PIN.P2: _T = DigitalPin.P2; break;
            case PIN.P8: _T = DigitalPin.P8; break;
            //case PIN.P9: _T = DigitalPin.P9; break;
            // case PIN.P10: _T = DigitalPin.P10; break;
            case PIN.P13: _T = DigitalPin.P13; break;
            // case PIN.P14: _T = DigitalPin.P14; break;
            case PIN.P15: _T = DigitalPin.P15; break;
            default: _T = DigitalPin.P0; break;
        }

        switch (E) {
            case PIN.P0: _E = DigitalPin.P0; break;
            case PIN.P1: _E = DigitalPin.P1; break;
            case PIN.P2: _E = DigitalPin.P2; break;
            case PIN.P8: _E = DigitalPin.P8; break;
            //case PIN.P9: _E = DigitalPin.P9; break;
            // case PIN.P10: _E = DigitalPin.P10; break;
            case PIN.P13: _E = DigitalPin.P13; break;
            // case PIN.P14: _E = DigitalPin.P14; break;
            case PIN.P15: _E = DigitalPin.P15; break;
            default: _E = DigitalPin.P0; break;
        }

        let d;
        pins.digitalWritePin(_T, 0);
        if (pins.digitalReadPin(_E) == 0) {
            pins.digitalWritePin(_T, 1);
            // basic.pause(10);
            pins.digitalWritePin(_T, 0);
            d = pins.pulseIn(_E, PulseValue.High, maxCmDistance * 58);
        } else {
            pins.digitalWritePin(_T, 0);
            // basic.pause(10);
            pins.digitalWritePin(_T, 1);
            d = pins.pulseIn(_E, PulseValue.Low, maxCmDistance * 58);
        }
        let x = d / 59;
        if (x <= 0 || x > 500) {
            return 0;
        }
        switch (sonic) {
            case Sonicunit.Centimeters: return Math.round(x);
            default: return Math.idiv(d, 2.54);
        }


    }
    /**
     * 紅外 infra-red sensor
     */
    //% advanced=true shim=maqueenIR::initIR
    function initIR(pin: Pins): void {
        return
    }
    //% advanced=true shim=maqueenIR::onPressEvent
    function onPressEvent(btn: RemoteButton, body: Action): void {
        return
    }
    //% advanced=true shim=maqueenIR::getParam
    function getParam(): number {
        return 0
    }

    function maqueenInit(): void {
        if (alreadyInit == 1) {
            return
        }
        initIR(Pins.P16);
        alreadyInit = 1;
    }


    //%  block="on IR received"
    export function IR_callbackUser(maqueencb: (message: number) => void) {
        maqueenInit();
        IR_callback(() => {
            const packet = new Packeta();
            packet.mye = maqueene;
            maqueenparam = getParam();
            packet.myparam = maqueenparam;
            maqueencb(packet.myparam);
        });
    }


    //%  block="read IR"
    export function IR_read(): number {
        maqueenInit();
        return getParam();
    }

    function IR_callback(a: Action): void {
        maqueencb = a;
        IrPressEvent += 1;
        onPressEvent(IrPressEvent, maqueencb);
    }
}