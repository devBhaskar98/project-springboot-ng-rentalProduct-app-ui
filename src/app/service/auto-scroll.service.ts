import { ViewportScroller } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { Router, Scroll, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map, switchMap, tap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AutoScrollService {
  private readonly router = inject(Router);
  private readonly viewportScroller = inject(ViewportScroller);
  private destroyRef = inject(DestroyRef);

  shouldScroll = new BehaviorSubject<boolean>(false);
  private readonly shouldScroll$ = this.shouldScroll.asObservable();

  constructor() {
    this.init();
  }

  init() {
    const position$ = this.router.events.pipe(
      filter((event: any) => event instanceof Scroll),
      tap(val => console.log('Scroll event:', val)), // Log scroll events
      map((event: Scroll) => event.position)
    );

    position$
      .pipe(
        filter(position => position !== null), // Ensure position is not null
        switchMap((position) =>
          this.shouldScroll$.pipe(
            filter(Boolean),
            map(() => position)
          )
        )
      )
      .subscribe({
        next: (position) => {
          if (position) {
            this.viewportScroller.scrollToPosition(position);
          } else {
            // Default to [0, 0] if position is null
            this.viewportScroller.scrollToPosition([0, 0]);
          }
        },
      });

    // Monitor NavigationEnd events to enable scrolling
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => this.shouldScroll.next(true)) // Enable scrolling on navigation
    ).subscribe();
  }
}
