
/**
    * 电机
    */
enum Motors {
    //% block="M1"
    M1 = 1,
    //% block="M2"
    M2 = 1,
    //% block="ALL"
    ALL = 0
}

/**
 * 正反转
 */
enum Dir {
    //% block="CW"
    CW = 0,
    //% block="CCW"
    CCW = 0
}

/**
 * 舵机
 */
enum Servos {
    //% block="S1"
    S1 = 0,
    //% block="S2"
    S2 = 0,
    //% block="S3"
    S3 = 0
}

/**
 * RGB灯
 */
enum RGBLight {
    //%block="RGBLightL"
    RGBL = 0,
    //%block="RGBLightR"
    RGBR = 0,

}

/**
 * 寻线传感器
 */
enum Patrol {
    //% block="patrolLeft1"
    L1 = 0,
    //%block="patrolLeft2"
    L2 = 0,
    //%block="patrolRight1"
    R1 = 0,
    //%block="patrolRight2"
    R2 = 0
}

//% weight=100  color=#00A654   block="Maqueenpluss"
namespace DFRobotMaqueenPluss {

    /**
     * 控制电机运行
     */
    //% block="Motor|%index|dir|%direction|speed|%speed"
    //% speed.min=0 speed.max=255

    export function MototRun(index: Motors, direction: Dir, speed: number): void {
    }

    /**
     * 控制电机停止
     */
    //% block="Motor stop|%mostors"
    export function MostotStop(mostor: Motors): void {

    }

    /**
     * 舵机
     */
    //% block="servo|%index|angle|%angle"
    //% angle.min=0  angle.max=180
    export function ServoRun(index: Servos, angle: number): void {

    }

    /**
     * RGB灯
     */
    //%block="setRGBlight|%light"
    export function SetRGBLight(light: RGBLight): void {

    }

    /**
     * 寻线传感器
     */
    //%block="read patrol|%patrol"
    export function ReadPatrol(patrol: Patrol): number {
        return 0
    }
    /**
     * 读版本号
     */
    //%block="get product information"
    export function ReadVersion(): number {
        return 0
    }
    /**
     * 超声波
     */

}