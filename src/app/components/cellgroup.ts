import { Cell } from './cell';

// 服务端返回数据类
export class Cellgroup {
    id: number;
    number: string;
    data: object;

}

// 页面处理数据类
export class Datalist {
    id: number;
    number: string;
    reddata: Cell[];
    bluedata: Cell[];


}
