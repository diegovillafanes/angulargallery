import { SetFilterAction, GetFilterAction } from './../actions/filter.action';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { FilterModel } from '@app/_models/filter.model';
import { Injectable } from '@angular/core';



@State<FilterModel>({
  name: 'FilterState',
  defaults: new FilterModel()
})
@Injectable()
export class FilterState {

  constructor() {
  }

  @Selector()
  static getFilter(state: FilterModel) {
    return state;
  }

  @Action(SetFilterAction)
  setFilterAction({ getState, patchState }: StateContext<FilterModel>,  payload : SetFilterAction ) {
    const state = getState();
    patchState({
      ...state,
      ...payload.payload
    });
  }

  @Action(GetFilterAction)
  getFilterAction({ getState }: StateContext<FilterModel>) {
    return getState();
  }

}

