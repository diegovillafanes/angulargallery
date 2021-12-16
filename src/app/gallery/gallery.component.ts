import { Component, OnInit } from '@angular/core';
import { from, map, mapTo, mergeMap, Observable, scan, switchMap, tap, toArray } from 'rxjs';
import { GalleryService } from './gallery.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterModel } from '@app/_models/filter.model';
import { FilterState } from '@app/ngxs/states/filter.state';
import { Select } from '@ngxs/store';
import { HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public list = [];
  public listFiltered = [];
  public filter = new FilterModel();
  public sol: number = 1000;
  public page: number = 1;
  private notscrolly: boolean = true;
  private notEmptyPhotos: boolean = true;
  showScrollHeight = 900;
  hideScrollHeight = 200;
  @Select(FilterState.getFilter) filterState$: Observable<FilterModel>;

  constructor(private galleryService: GalleryService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initialSubscriptions();
    this.getPhotos();
  }

  initialSubscriptions(): void {
    this.filterState$
      .subscribe(val => {
        if (this.filter.rover != val.rover) {
          this.filter = val;
          this.page = 1;
          this.list.length = 0;
          this.getPhotos();
        }
        else {
          this.filter = val;
          this.applyFilter(this.filter)
        }
      });
  }

  applyFilter(filter: FilterModel): void {
    const compare = r => l => (typeof l === "object" ? contains(r)(l) : ( r.length === 0 || l === r));
    const contains = r => l =>Object.keys(r).every(k => l.hasOwnProperty(k) && compare(r[k])(l[k]));
    this.listFiltered = this.list.filter(contains(filter));
    console.log("this.list",this.list);
    console.log("this.listFiltered",this.listFiltered);
  }

  getPhotos(): void {
    this.galleryService.getPhotos(this.sol, this.page, this.filter.rover)
      .pipe
      (
        switchMap(d => d.photos),
        map((d: any) => ({
          camera: d.camera.name,
          rover: d.rover.name.toLowerCase(),
          earthDay: d.earth_date,
          img_src: d.img_src
        })),
        toArray()
      )
      .subscribe(result => {
        this.spinner.hide();
        if (result.length === 0)
          this.notEmptyPhotos = false;
        this.list = this.list.concat(result);
        this.applyFilter(this.filter);
        this.notscrolly = true;
        this.page++;
      });
  }

  onScroll(): void {
    if (this.notscrolly && this.notEmptyPhotos) {
      this.spinner.show();
      this.notscrolly = false;
      this.getPhotos();
    }
  }
}