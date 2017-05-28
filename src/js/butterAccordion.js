import $ from 'jQuery';
import ButterSlideToggle from 'butter-slide-toggle';

class ButterAccordion {
  constructor(element, options = {}) {
    this.element = element;
    this.$element = $(element);
    this.triggers = null;
    this.targets = null;
    this.slideToggles = [];

    const defaults = {
      toggleTriggers: '> li',
      toggleTargets: '> li > ul',
      beginCollapsed: true,
      defaultOpenItem: false,
      allowMultipleOpen: false,
      triggerButtons: '<button class="butter-accordion-trigger">Toggle</button>'
    };

    this.options = $.extend(defaults, options);

    this._init();
  }

  _init() {

    if (this.$element.length > 0) {
      this.triggers = this.$element.find(this.options.toggleTriggers);
      this.targets = this.$element.find(this.options.toggleTargets);

      if (this.triggers.length > 0 && this.targets.length > 0) {
        this._setup();
      }
    }
  }

  _setup() {
    if (this.options.triggerButtons) {
      this.triggers.each((i, val) => {
        const $button = $(this.options.triggerButtons);
        $(val).prepend($button);

        this.slideToggles.push(
          new ButterSlideToggle(this.targets.eq(i), {
            beginCollapsed: this.options.beginCollapsed && i !== this.options.defaultOpenItem
          })
        );

        $button.click((e) => {
          e.preventDefault();
          this.slideToggles[i].toggle();

          if (!this.options.allowMultipleOpen) {
            this.slideToggles.forEach((val, j) => {
              if (j !== i && !val.isCollapsed()) {
                val.toggle();
              }
            });
          }
        });
      });
    }
  }
}

export default ButterAccordion;
