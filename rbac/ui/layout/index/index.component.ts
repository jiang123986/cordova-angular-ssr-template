import { Component, OnInit, HostBinding, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { IndexService } from './index.service';
import { NavService } from './../../services/nav.service';
import { ConfigService } from '../../services/config.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  @HostBinding('class.sider-shrink') get siderShrink() {
    return this.indexService.local.siderShrink;
  }

  constructor(
    private indexService: IndexService,
    private nav: NavService,
    private config: ConfigService) {
    this.nav.init();
    this.config.init();
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) { }
}
