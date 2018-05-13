import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'Rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Celldatas } from '../cellgroupdata';
import { Defaultcell, Cell } from '../cell';
import { Cellgroup, Datalist } from '../cellgroup';

let mydata = {};

@Injectable()
export class CellgroupService {
  constructor(private http: HttpClient) { }
  getcellgroup() {
    return Celldatas; // 直接返回数据
  }
  // 服务器get数据
  getdata(url) {
    return this.http.get(url);
  }
  create_row(objet, redmax, bluemax) {
    const obj = JSON.parse(JSON.stringify(objet));
    const data: Datalist[] = [];
    for (let i = 0; i < obj.length; i++) {
      const d =  this.creat_tr(redmax, bluemax);
      const b = obj[i].data.blue[0]; // 篮球的开奖号码
      d.bluedata[ (b - 1) ].ischecked = true;

      const r = obj[i].data.red; // 红球开奖号码数组
      for (let n = 0; n < r.length; n++) {
         d.reddata[(r[n] - 1)].ischecked = true;
      }
      d.id = obj[i].id;
      d.number = obj[i].number;
      data[i] = d;
    }
    this.omisssionvalue(data, 'bluedata' );
    this.omisssionvalue(data, 'reddata' );
    this.continvalue(data, 'bluedata' );
    this.continvalue(data, 'reddata' );
    return data;
  }
  // 以行为参考设置单元格是否标记高亮遗漏、是否连号
  continvalue(data, attr: string) {
    for (let i = data.length - 1; i >= 0; i--) {
      const d = data[i][attr];
      if (i === data.length - 1) {
        for (let j = 0; j < d.length; j++) {
          const b: Cell = d[j];
          if (!b.ischecked) {
            b.isomission = true ;
          } else {
            if (d[i][ j - 1] && d[i][j - 1].ischecked) {
              b.iscontin = true ;
              if ( d[i][j - 1] && d[i][j - 1].iscontin) {
                b.isrepet = true ;
              }
            }
          }
        }
      } else {
        for (let n = 0; n < d.length; n++) {
          const b: Cell = d[n];
          if (!b.ischecked && data[ i + 1 ][attr][n].isomission) {
            b.isomission = true ;
          } else {
            if (b.ischecked) {
              if (d[n - 1].ischecked) {
                b.iscontin = true ;
                if ( d[ n - 1 ].iscontin) {
                  b.isrepet = true ;    // TODO：连续重复
                }
              }
            }
          }
        }
      }
    }
  }

  //  以列为参考设置单元格值，标记遗漏数值、是否重号
  omisssionvalue(data, attr: string) {
    for (let i = 0; i < data.length; i++) {
      const d = data[i][attr];
      if (i === 0) {
        for (let n = 0; n < d.length; n++) {
          const b: Cell = d[n] ;
          // console.log(b);
          if (!b.ischecked ) {
            b.value = 1;
          }
        }
        mydata = null ;
        mydata = Object.assign({}, d );
        // console.log(mydata);
      } else {
        for (let j = 0; j < d.length; j++) {
          const c: Cell = d[j] ;
          if (!c.ischecked ) {
            c.value = mydata[j].value + 1;
            if (mydata[j].ischecked ) {
              c.value = 1;
            }
          } else if ( mydata[j].ischecked ) {
            c.isdouble = true;
          }
        }
        mydata = null ;
        mydata = Object.assign({}, d );
      }
    }
  }

  // 把一期中奖号码封装成一组原始数据对象
  creat_tr(redmax, bluemax ) {
    const data = new Datalist;
    data.id = 0;
    data.number = '000000';
    data.reddata = this.createcell(redmax);
    data.bluedata = this.createcell(bluemax);
    return data;
  }
  // 创建 n个单元格
  createcell(n) {
    const data: Cell[] = [];
    for (let i = 0; i < n; i++) {
      data[i] = Object.assign({}, Defaultcell);
      data[i].value =  i + 1 ;  // 初始显示单元格的数据行为参考值
    }
    return data;
  }
}


