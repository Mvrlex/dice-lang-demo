import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RollerContextService {

  value = signal({
    strength: 3,
    dexterity: 2,
    constitution: 4,
    intelligence: 5,
    wisdom: 6,
    charisma: 1,
    initiative: 2,
    armor_class: 10,
    hit_points: 20
  });
  keys = computed(() => Object.keys(this.value()));

}
