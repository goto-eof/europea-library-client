import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lockable-button',
  templateUrl: './lockable-button.component.html',
  styleUrl: './lockable-button.component.css',
})
export class LockableButtonComponent implements OnInit {
  @Input() callback!: Function;
  @Input() label!: string;
  @Input() labelProcessing: string | undefined;
  @Input() classCustom: string = 'btn btn-primary w-100';
  locked = false;
  currentLabel?: string;

  constructor() {}
  ngOnInit(): void {
    this.currentLabel = this.label;
  }

  handleClick() {
    this.locked = true;
    if (this.labelProcessing) {
      this.currentLabel = this.labelProcessing;
    }
    this.callback().then(() => {
      this.unlock();
    });
  }

  unlock() {
    this.locked = false;
    this.currentLabel = this.label;
  }
}
