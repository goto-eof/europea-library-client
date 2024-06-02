import { Component } from '@angular/core';
import TopSoldService from '../../../service/TopSoldService';

@Component({
  selector: 'app-cursored-by-sold-count-file-explorer',
  templateUrl: './cursored-by-sold-count-file-explorer.component.html',
  styleUrl: './cursored-by-sold-count-file-explorer.component.css',
})
export class CursoredBySoldCountFileExplorerComponent {
  title = 'Explore by Top Sold';
  constructor(public service: TopSoldService) {}
}
