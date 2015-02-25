module.exports = '<div class="gallery-popup slider js-gallery"> \
				    <div class="gallery-popup__buttons"> \
				        <a href="#" class="gallery-popup__button / btn circle-btn circle-btn--large-icon bg--dark btn--framed icon-arrow-left / js-control--left"></a> \
				        <a href="#" class="gallery-popup__button / btn circle-btn circle-btn--large-icon bg--dark btn--framed icon-arrow-right / js-control--right"></a> \
				    </div> \
					{{#gallery}} \
						<div class="gallery-popup__slide slide js-slide {{#first}}is-active{{/first}} "> \
							<img class="gallery-popup__image" src="{{image}}" /> \
							{{#caption}} \
								<p class="gallery-popup__caption">{{caption}}</p> \
							{{/caption}} \
						</div> \
					{{/gallery}} \
				</div>';
