import { Directive, HostListener, HostBinding  } from '@angular/core';
@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  // Hago un binding a la propiedad class del elemento y asi puedo asignarle una clase
  @HostBinding('class.open') isOpen = false;

  // Escucho el evento click con HostListener
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}