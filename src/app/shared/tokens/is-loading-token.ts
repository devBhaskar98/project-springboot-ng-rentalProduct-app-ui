import {InjectionToken} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export const IS_UI_LOADING = new InjectionToken<BehaviorSubject<boolean>>(
  'Is any Http call processing',
  {
    factory: () => {
      return new BehaviorSubject(true);
    },
  },
);
