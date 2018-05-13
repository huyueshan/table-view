export class Cell {
  value: number;
  ischecked: boolean;
  isrepet: boolean;
  isdouble: boolean;
  iscontin: boolean;
  isside: boolean;
  isomission: boolean;
  issubline: boolean;
}

export class Canvasdata {
  id: string;
  wrapid: string;
  width: number;
  height: number;
  top: number;
  left: number;
  color?: string;
  reverse: boolean;

}

export const Defaultcell: Cell = {
  value: -1,
  ischecked: false,
  isrepet: false,
  isdouble: false,
  iscontin: false,
  isside: false,
  isomission: false,
  issubline: false,
};


