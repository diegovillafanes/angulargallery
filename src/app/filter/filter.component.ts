import { SetFilterAction } from './../ngxs/actions/filter.action';
import { CameraModel } from '@app/_models/camera.filter.model';
import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import { Select, Store } from '@ngxs/store';
import { FilterState } from '@app/ngxs/states/filter.state';
import { map, Observable, tap } from 'rxjs';
import { FilterModel } from '@app/_models/filter.model';

export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {  
  filterForm: FormGroup
  fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];
  filteredItem = new FilterModel();
  camerasFiltered: CameraModel[];
  public camerasFilter: CameraModel[] = [
    {
      key: 'FHAZ',
      camera: 'Front Hazard Avoidance Camera',
      curiosity: true,
      opportunity: true,
      spirit: true
    },
    {
      key: 'RHAZ',
      camera: 'Rear Hazard Avoidance Camera',
      curiosity: true,
      opportunity: true,
      spirit: true
    },
    {
      key: 'MAST',
      camera: 'Mast Camera',
      curiosity: true,
      opportunity: false,
      spirit: false
    },
    {
      key: 'CHEMCAM',
      camera: 'Chemistry and Camera Complex',
      curiosity: true,
      opportunity: false,
      spirit: false
    },
    {
      key: 'MAHLI',
      camera: 'Mars Hand Lens Imager',
      curiosity: true,
      opportunity: false,
      spirit: false
    },
    {
      key: 'MARDI',
      camera: 'Mars Descent Imager',
      curiosity: true,
      opportunity: false,
      spirit: false
    },
    {
      key: 'NAVCAM',
      camera: 'Navigation Camera',
      curiosity: true,
      opportunity: true,
      spirit: true
    },
    {
      key: 'PANCAM',
      camera: 'Panoramic Camera',
      curiosity: false,
      opportunity: true,
      spirit: true
    },
    {
      key: 'MINITES',
      camera: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
      curiosity: false,
      opportunity: true,
      spirit: true
    }
  ]

  constructor(private store: Store) {}

  ngOnInit() {
    this.filterForm = new FormBuilder().group({
      rover: new FormControl("curiosity"),
      camera: new FormControl("")

    });
    this.initialSubscriptions();
    this.filterCamerasByRover("curiosity");

  }

  initialSubscriptions(): void {
    this.filterForm.valueChanges
    .subscribe(val =>{
      this.filteredItem = {...this.filteredItem,...this.filterForm.value}
      this.store.dispatch(new SetFilterAction(this.filteredItem));
    });
  }

  public onSelect(evt) : void {
    this.filterCamerasByRover(evt.target.value);
  }

  private filterCamerasByRover(roverKey: string): void {
    
    this.camerasFiltered = this.camerasFilter.filter(x => x[roverKey] === true)
    this.filterForm.patchValue({"camera": ""});

  }

}
