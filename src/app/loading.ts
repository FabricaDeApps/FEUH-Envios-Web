
import { Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'loading',
	template: `		<div class="preloader" id="pause">
	<div class="spinner">
	<div class="dot1"></div>
	<div class="dot2"></div>
  </div>
	
</div>`,
	styleUrls: ['loading.scss']
})

export class LoadingComponent {

}
