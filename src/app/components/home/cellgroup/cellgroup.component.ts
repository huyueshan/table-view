import { Component, OnInit } from '@angular/core';
import { Cellgroup } from '../../cellgroup';
import { CellgroupService } from '../cellgroup.service';
import { Celldatas } from '../../cellgroupdata';


@Component({
  selector: 'app-cellgroup',
  templateUrl: './cellgroup.component.html',
  styleUrls: ['./cellgroup.component.css']
})
export class CellgroupComponent implements OnInit {
  public cellgroups;
  public thdata: any;
  public view_paramet = {
    rednumber: 33,
    bluenumble: 16,
    ischecked: false,  // 是否为开奖号
    isrepet: false,  // 是否为持续连号
    isdouble: false,  // 是否为连号
    iscontin: false,  // 是否为重号
    isside: false,  // 是否为变号
    isomission: false,  // 是否遗漏分层
    issubline: false, // 是否辅助线

  };
  constructor(private cellservice: CellgroupService) { }

  ngOnInit() {
    this.getCellgroups();
    this.getthdata();
    this.init_data();
  }

  init_data() {
  }

// 获取表头单元格数据
  getthdata() {

    this.thdata = this.cellservice.creat_tr(this.view_paramet.rednumber, this.view_paramet.bluenumble);
    this.thdata = JSON.parse(JSON.stringify(this.thdata));
  }
  getCellgroups() {

    // this.cellgroups = this.cellservice.getcellgroup();
    // console.log( this.cellgroups);
  }

}
