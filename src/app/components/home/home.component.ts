import { Component, ElementRef, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { CellgroupService } from './cellgroup.service';
import { Canvasdata } from '../cell';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, AfterViewChecked {
  public DATAS;
  public Celldatas;
  public thdata: any;
  public maindata: any;
  public canvasdata: Canvasdata[] = [];
  public linecolor = '#FF00FF';
  public isshowline = true;

  public testdata;

  public view_paramet = {
    rednumber: 33, // 红球总数量
    bluenumble: 16, // 蓝球总数量
    ischecked: false,  // 是否为开奖号
    isrepet: false,  // 是否为持续连号
    isdouble: false,  // 是否为重号
    iscontin: false,  // 是否为连号
    isside: false,  // 是否为边号
    isomission: false,  // 是否遗漏分层背景
    isomissionshow: false, // 是否显示遗漏分层数据
    issubline: true, // 是否辅助线

  };

  constructor(private cellservice: CellgroupService, private el: ElementRef) { }

  ngOnInit() {
    // 请求数据
    // this.getdata('http://127.0.0.1:3000');

    // 直接获取本地数据
    this.Celldatas = this.cellservice.getcellgroup();
    this.setthdata();
    this.setmaindata();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.canvasdata = this.getcanvasdata('bgblue');
    }, 500);
  }
  ngAfterViewChecked() {
    setTimeout(() => {
      this.drawline(this.canvasdata, this.linecolor);
    }, 1000);
  }
  // 反向排序数据
  chgMenu() {
    this.Celldatas = this.Celldatas.reverse();
    this.setmaindata();
    setTimeout(() => {
      this.canvasdata = this.getcanvasdata('bgblue');
    }, 500);
    setTimeout(() => {
      this.drawline(this.canvasdata, this.linecolor);
    }, 1000);
  }
  // get请求数据处理
  getdata(url) {
    this.cellservice.getdata(url)
      .subscribe(data => {
        this.Celldatas = data;
        this.setthdata();
        this.setmaindata();
      });
  }
 // 获取表单头部第一行单元格
  setthdata() {
    this.thdata = this.cellservice.creat_tr(this.view_paramet.rednumber, this.view_paramet.bluenumble);
    this.thdata = JSON.parse(JSON.stringify(this.thdata));
  }
  // 获取开奖号码表单
  setmaindata() {
    this.maindata = this.cellservice.create_row(this.Celldatas, this.view_paramet.rednumber, this.view_paramet.bluenumble);
    this.maindata = JSON.parse(JSON.stringify(this.maindata));
  }

  // canvas部分，应为需要获取页面元素，不能封装到服务
  drawline(data, color) {
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const str1 = '#' + d.wrapid;
      const elew = this.el.nativeElement.querySelector(str1);
      // 设置canvas画布位置
      elew.style.top = d.top + 'px';
      if (d.reverse) {
        elew.style.left = (d.left - d.width) + 'px';
      } else {

        elew.style.left = d.left + 'px';
      }
      d.color = color;

      //  开始划线
      const str2 = '#' + d.id;
      const ctxele = this.el.nativeElement.querySelector(str2);
      if (ctxele == null) {
        return false;
      }
      const ctx = ctxele.getContext('2d');
      ctx.clearRect(0, 0, d.width, d.height);
      ctx.fillStyle = d.color;
      ctx.strokeStyle = d.color,
        ctx.beginPath();
      ctx.lineWidth = 2;
      // ctx.lineCap = 'round';
      if (d.reverse) {
        ctx.moveTo(0, d.height);
        ctx.lineTo(d.width, 0);
      } else {
        ctx.moveTo(0, 0);
        ctx.lineTo(d.width, d.height);
      }
      ctx.stroke();
    }
  }

  // 获取连线数据（创建canvas数据）
  getcanvasdata(classname: string) {
    const data: Canvasdata[] = [];
    const str = '.' + classname;
    //  获取canvas容器元素集
    const ele = this.el.nativeElement.querySelectorAll(str);
    for (let i = 0; i < ele.length - 1; i++) {
      const d = new Canvasdata;
      const l = ele[i].offsetLeft;
      const t = ele[i].offsetTop;
      let w = l - ele[(i + 1)].offsetLeft;
      if (w > 0) {
        d.reverse = true;
      } else {
        d.reverse = false;
      }
      w = w > 0 ? w : w === 0 ? 2 : -w;
      const h = ele[(i + 1)].offsetTop - t;
      d.left = l + 9;
      d.top = t + 9;
      d.width = w;
      d.height = h;
      d.id = 'canvas' + i;
      d.wrapid = 'canwrap' + i;
      data.push(d);
    }
    return data;
  }

}



