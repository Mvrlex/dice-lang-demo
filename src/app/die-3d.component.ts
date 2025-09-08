import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-die-3d',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="scene" #scene>
      <div class="shape die" #cube>
        <div class="face ft">
          <svg xmlns="http://www.w3.org/2000/svg" style="transform: rotate(90deg)"
               width="100%" height="100%" viewBox="2 2 20 20" fill="white">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path
              d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-2.833 12a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm-3.5 -3.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm-3.5 -3.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3z"/>
          </svg>
        </div>
        <div class="face bk">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
               viewBox="2 2 20 20" fill="white">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path
              d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-2.833 12a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm-7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm0 -7a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3z"/>
          </svg>
        </div>
        <div class="face rt">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
               viewBox="2 2 20 20" fill="white">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path
              d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-2.833 13a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm-7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm0 -4.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm-7 -4.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3z"/>
          </svg>
        </div>
        <div class="face lt">
          <svg width="100%" height="100%" viewBox="2 2 20 20" fill="white">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path
              d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-6.333 8.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3z"/>
          </svg>
        </div>
        <div class="face bm">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
               viewBox="2 2 20 20" fill="white">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path
              d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-2.833 12a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm-7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm3.5 -3.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm-3.5 -3.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3z"/>
          </svg>
        </div>
        <div class="face tp">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
               viewBox="2 2 20 20" fill="white">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path
              d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-3.833 11a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3zm-5 -5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3z"/>
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      perspective: 1200px;
      overflow: hidden;
      width: 165px;
      height: 165px;
      background: transparent;
      font-size: 600%;
      cursor: grab;
    }

    .scene, .shape, .face {
      position: absolute;
      transform-style: preserve-3d;
    }

    .scene {
      width: 80em;
      height: 80em;
      top: 50%;
      left: 50%;
      margin: -40em 0 0 -40em;
      user-select: none;
    }

    .shape {
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      transform-origin: 50%;
      background-color: transparent;
      transition: transform 0.3s ease-out;
    }

    .face {
      overflow: hidden;
      transform-origin: 0 0;
      backface-visibility: hidden;
      background: radial-gradient(circle, var(--color-gray-900) 60%, white 60%);
      border: 3px solid var(--color-gray-900)
    }

    .side {
      left: 50%;
    }

    .die {
      opacity: 1;
      width: 1em;
      height: 1em;
      margin: -0.5em 0 0 -0.5em;
    }

    .die .ft, .die .bk {
      width: 100%;
      height: 100%;
    }

    .die .ft {
      transform: translateZ(0.5em);
    }

    .die .bk {
      left: 100%;
      transform: translateZ(-0.5em) rotateY(180deg);
    }

    .die .rt, .die .lt {
      width: 1em;
      height: 1em;
    }

    .die .rt {
      transform: rotateY(-90deg) translateX(-50%);
    }

    .die .lt {
      transform: rotateY(90deg) translateX(-50%);
    }

    .die .tp {
      transform: rotateX(90deg) translateY(-50%);
    }

    .die .bm {
      transform: rotateX(-90deg) translateY(-50%);
    }

    .die .lt {
      left: 100%;
    }

    .die .tp, .die .bm {
      width: 1em;
      height: 1em;
    }

    .die .bm {
      top: 100%;
    }
  `
})
export class Die3dComponent implements AfterViewInit, OnDestroy {

  @ViewChild('cube', { static: true }) cube!: ElementRef<HTMLElement>;
  @ViewChild('scene', { static: true }) scene!: ElementRef<HTMLElement>;

  private isDragging = false;
  private lastMouseX = 0;
  private lastMouseY = 0;
  private rotationX = -35;
  private rotationY = 45;
  private rotationZ = 0;
  private isAnimated = true;
  private animationTimeout: any;
  private animationFrameId: number | null = null;
  private animationStartTime = 0;
  private animationDuration = 15000; // 15 seconds for full rotation
  private pausedTime = 0;
  private baseRotationX = -35;
  private baseRotationY = 45;

  private boundMouseDown = (ev: MouseEvent) => this.onMouseDown(ev);
  private boundMouseMove = (ev: MouseEvent) => this.onMouseMove(ev);
  private boundMouseUp = () => this.onMouseUp();
  private boundTouchStart = (ev: TouchEvent) => this.onTouchStart(ev);
  private boundTouchMove = (ev: TouchEvent) => this.onTouchMove(ev);
  private boundTouchEnd = () => this.onTouchEnd();
  private boundVisibilityChange = () => this.onVisibilityChange();

  ngAfterViewInit(): void {
    // add mouse event listeners, using native event listeners for performance
    this.scene.nativeElement.addEventListener('mousedown', this.boundMouseDown);
    document.addEventListener('mousemove', this.boundMouseMove, { passive: true });
    document.addEventListener('mouseup', this.boundMouseUp);

    // add touch event listeners for mobile support
    this.scene.nativeElement.addEventListener('touchstart', this.boundTouchStart);
    document.addEventListener('touchmove', this.boundTouchMove, { passive: true });
    document.addEventListener('touchend', this.boundTouchEnd);

    // handle page visibility change to pause/resume animation
    document.addEventListener('visibilitychange', this.boundVisibilityChange);

    // start with animation
    this.setAnimationMode(true);
  }

  ngOnDestroy(): void {
    this.scene.nativeElement.removeEventListener('mousedown', this.boundMouseDown);
    document.removeEventListener('mousemove', this.boundMouseMove);
    document.removeEventListener('mouseup', this.boundMouseUp);

    this.scene.nativeElement.removeEventListener('touchstart', this.boundTouchStart);
    document.removeEventListener('touchmove', this.boundTouchMove);
    document.removeEventListener('touchend', this.boundTouchEnd);

    document.removeEventListener('visibilitychange', this.boundVisibilityChange);

    if (this.animationTimeout) clearTimeout(this.animationTimeout);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  onMouseDown(event: MouseEvent): void {
    document.documentElement.style.cursor = 'grabbing';
    this.startDrag(event.clientX, event.clientY);
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.updateDrag(event.clientX, event.clientY);
  }

  onMouseUp(): void {
    document.documentElement.style.cursor = 'initial';
    this.endDrag();
  }

  onTouchStart(event: TouchEvent): void {
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      this.startDrag(touch.clientX, touch.clientY);
      event.preventDefault();
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging || event.touches.length !== 1) return;
    const touch = event.touches[0];
    this.updateDrag(touch.clientX, touch.clientY);
  }

  onTouchEnd(): void {
    this.endDrag();
  }

  startDrag(clientX: number, clientY: number): void {
    this.isDragging = true;
    this.lastMouseX = clientX;
    this.lastMouseY = clientY;

    // switch to manual mode when user starts dragging
    this.setAnimationMode(false);

    if (this.animationTimeout)
      clearTimeout(this.animationTimeout);
  }

  updateDrag(clientX: number, clientY: number): void {
    const deltaX = clientX - this.lastMouseX;
    const deltaY = clientY - this.lastMouseY;

    this.rotationY += deltaX * 0.5;
    this.rotationX -= deltaY * 0.5;

    this.updateCubeTransform();

    this.lastMouseX = clientX;
    this.lastMouseY = clientY;
  }

  endDrag(): void {
    this.isDragging = false;

    // set timeout to return to animation after 1 seconds of inactivity
    this.animationTimeout = setTimeout(() => this.setAnimationMode(true), 1000);
  }

  setAnimationMode(animated: boolean): void {
    this.isAnimated = animated;

    if (animated) {
      this.pausedTime = 0;
      this.startAnimation();
    } else {
      this.stopAnimation();
    }
  }

  startAnimation(): void {
    this.baseRotationX = this.rotationX;
    this.baseRotationY = this.rotationY;
    this.animationStartTime = performance.now();
    this.animate();
  }

  stopAnimation(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  animate(): void {
    if (!this.isAnimated) return;

    const currentTime = performance.now();
    const elapsed = currentTime - this.animationStartTime;
    const progress = elapsed / this.animationDuration;

    this.rotationX = this.baseRotationX + (progress * -360);
    this.rotationY = this.baseRotationY + (progress * 360);
    this.rotationZ = 0;

    this.updateCubeTransform();

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  private lastUpdateTime = 0;
  private readonly UPDATE_INTERVAL = 16; // ~60fps

  updateCubeTransform(): void {
    const now = performance.now();
    if (now - this.lastUpdateTime < this.UPDATE_INTERVAL) return;

    this.lastUpdateTime = now;
    this.cube.nativeElement.style.transform = `translate3D(0em, 0em, 0em) rotateX(${this.rotationX}deg) rotateY(${this.rotationY}deg) rotateZ(${this.rotationZ}deg)`;
  }

  onVisibilityChange(): void {
    if (!this.isAnimated) return;
    if (document.hidden) {
      // page is hidden, pause animation and track time
      this.pausedTime = performance.now();
      this.stopAnimation();
    } else {
      // page is visible again, resume animation
      const timeHidden = performance.now() - this.pausedTime;
      this.animationStartTime += timeHidden;
      this.pausedTime = 0;
      this.animate();
    }
  }

}
