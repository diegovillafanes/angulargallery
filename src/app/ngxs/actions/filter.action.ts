import { FilterModel } from './../../_models/filter.model';

export class GetFilterAction {
  static readonly type = '[Filter] Get Filter';
}

export class SetFilterAction {
  static readonly type = '[Filter] Set Filter';
  constructor(public payload: FilterModel) { };
}