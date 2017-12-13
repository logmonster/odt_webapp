<template>
  <!-- basic search textInput -->
  <div class="searchbar-container">

    <div class="pointer searchbar-category-dropdown" @click='toggleCategoriesDropdown()'>
      {{category}} <i class="fa fa-caret-down" aria-hidden="true"></i>
    </div>
    <input class='searchbar-text'
      v-model='searchbarText'
      v-on:keyup='handleKeyup($event)' />
    <div class="searchbar-icon">
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>

    <!-- create the auto completion suggestions here -->
    <div
      :class="{ 'showing': canShowSuggestionContainer, 'hiding': !canShowSuggestionContainer }"
      class="suggestion-container">
      <div v-for="_sugg in getSearchbarTextSuggestions()"
        class='suggestion-item pointer' >
        <span v-html='_sugg'></span>
      </div>
    </div>

    <!-- get the list through query -->
    <div :class="getCssClassForCategoriesDropdown()">
      <div class="searchbar-category-dropdown-inner">
        <div class='pointer searchbar-category-dropdown-item'
          @click='pickCategory("all")'>all</div>

        <div v-for="_item in getCategoriesFromData()"
          @click='pickCategory(_item.key)'
          class='pointer searchbar-category-dropdown-item'>
          {{ _item.key }}
        </div>
      </div>
    </div>

    <!-- the blocking grey background to simulate modal -->
    <div :class="getCssClassForModalCanvas()">&nbsp;</div>

  </div>
</template>

<script>
// model
function _model_shop_searchbar(_instance) {
  return {
    'instance': _instance,
    'isDropdownVisible': false,
    'isModalCanvasVisible': false,
    'category': 'all',
    'searchbarText': '',

    'canShowSuggestionContainer': false
  };
}

module.exports = {
  name: 'shop-searchbar',
  data: function() {
    return new _model_shop_searchbar(this);
  },
  props: [ 'data', 'dataSuggest' ],
  methods: {
    /**
     *  method to toggle the visibility of the dropdown part
     */
    toggleCategoriesDropdown: function() {
      this.isDropdownVisible = !this.isDropdownVisible;
      if (this.isDropdownVisible) {
        this.isModalCanvasVisible = true;
      } else {
        this.isModalCanvasVisible = false;
      }
      //console.log('** inside toggle category dropdown => '+this.isDropdownVisible);
    },

    // return the css class(s) for the dropdown
    getCssClassForCategoriesDropdown: function() {
      if (this.isDropdownVisible) {
        return {
          'searchbar-category-dropdown-outer': true,
          'hiding': false,
          'showing': true
        }
      } else {
        return {
          'searchbar-category-dropdown-outer': true,
          'hiding': true,
          'showing': false
        }
      }
    },
    // return the css class(s) for the modal canvas
    getCssClassForModalCanvas: function() {
      if (this.isModalCanvasVisible) {
        return {
          'blocking-modal-canvas': true,
          'showing': true,
          'hiding': false
        };
      } else {
        return {
          'blocking-modal-canvas': true,
          'showing': false,
          'hiding': true
        };
      }
    },

    // set the category picked plus toggle dropdown visiblity
    pickCategory: function(_category) {
      this.category=_category;
      this.toggleCategoriesDropdown();
      //console.log(this.category);
    },

    // return the "buckets" of the categories
    getCategoriesFromData: function() {
      let _buckets = [];
      if (this.data) {
          _buckets = this.data[0]['aggregations']['_cats']['buckets'];
      }
      return _buckets;
    },

    handleKeyup: function(_event) {
      if (_event) {
        /*
         *  only emit based on alphanumeric characters
         *  key => Backspace ; keyCode = 8
         */
        let _keyCode = _event.keyCode;
        if (//_keyCode != 8 && // backspace
          _keyCode != 39 && // right, left, up, down
          _keyCode != 37 &&
          _keyCode != 38 &&
          _keyCode != 40) {

          window.Vue.$emit(
            'searchbartextkeyup',
            {
              'key': _event.key,
              'text': this.searchbarText
            }
          );
        }
      } // end -- if (_event is valid)
    },

    /*
     *  get back the suggestion options (could be 0 length array)
     */
    getSearchbarTextSuggestions: function() {
      let _options = [];
      let _instance = this;

      if (this.dataSuggest) {
        // however this is a parent array (bea => beach, beat options)
        //  per term suggested will have another array named options
        let _opts = this.dataSuggest[0]['suggest']['_suggestions'];

        _opts.forEach(function(_parentSugg, _idx_1) {
          _parentSugg['options'].forEach(function(_childSugg, _idx_2) {
            let _val = _childSugg.text;
            // apply style to the "matched" part
            if (_val && _instance.searchbarText) {
              let _idx_3 = _val.toLowerCase().indexOf(_instance.searchbarText.toLowerCase());
              if (_idx_3!=-1) {
                _val = _val.substring(0, _idx_3)+
                  "<span class='suggestion-match'>"+
                  _val.substring(_idx_3, _idx_3+_instance.searchbarText.length)+
                  "</span>"+
                  _val.substring(_idx_3+_instance.searchbarText.length);
              }
            }
            if (_options.indexOf(_val) == -1) {
              _options.push(_val);
            }
          }); // 2nd level (options)
        }); // 1st level (_suggestions)
        // * original approach... didn't work too well
        //_options = this.dataSuggest[0]['suggest']['_suggestions'];
      }
      if (_options.length>0) {
        this.canShowSuggestionContainer = true;
      } else {
        this.canShowSuggestionContainer = false;
      }
      return _options;
    }

  }
};
</script>

<!--
(window.Vue.$emit); => emit an event for parent component to catch
(window.Vue.$on); => the parent component who is interested in a specific event type
-->
