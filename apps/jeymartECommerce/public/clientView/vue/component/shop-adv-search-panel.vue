<template>
  <div>
    <!-- matchQuery -->
    <div @click='handleQueryHeaderClick("matchQuery")'
      class='shop-adv-s-main-label pointer'>
      <span :class='getMatchQueryUpCss()'>
        <i class="fa fa-arrow-circle-up" aria-hidden="true"></i></span>
      <span :class='getMatchQueryDownCss()'>
        <i class="fa fa-arrow-circle-down" aria-hidden="true"></i></span>
      Match Query
    </div>
    <div
      :class='getMatchQueryCss()'
      class='shop-adv-s-query-panel md-form animated'>
      <!--div><span class="shop-adv-s-query-panel-label">Match Query</span></div-->
      <input type='text'
        class='form-control' placeholder='*(mandatory) text for the match-query'
        v-model='matchQuery.text'  >
      <input type='text'
        class='form-control' placeholder='size for the match-query (default: 10)'
        v-model='matchQuery.size'  >
      <div>
        <span class="shop-adv-s-query-panel-caption">operator&nbsp;&nbsp;</span>
        <input type='radio' v-model='matchQuery.operator' name='matchQueryRadioOperator' value='or' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">OR</span>&nbsp;
        <input type='radio' v-model='matchQuery.operator' name='matchQueryRadioOperator' value='and' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">AND</span>
      </div>
      <input type='text'
        class='form-control' placeholder='minimum should match for the match-query (default: 0)'
        v-model='matchQuery.minShouldMatch'  >
      <div>
        <span class="shop-adv-s-query-panel-caption">field&nbsp;&nbsp;</span>
        <input type='radio' v-model='matchQuery.field'
          name='matchQueryRadioField' value='t_description' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">t_description</span>&nbsp;
        <input type='radio' v-model='matchQuery.field'
          name='matchQueryRadioField' value='s_brand_name' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">s_brand_name</span>
      </div>
      <div>
        <span class="shop-adv-s-query-panel-caption">highlight result?&nbsp;&nbsp;</span>
        <input type='radio' v-model='matchQuery.highlight' name='matchQueryRadioHighLight' value='yes' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">Yes</span>&nbsp;
        <input type='radio' v-model='matchQuery.highlight' name='matchQueryRadioHighLight' value='no' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">No</span>
      </div>
      <input type='button' class='btn btn-primary'
        @click='runMatchQuery()'
        style='margin-top: 12px; margin-left: 0px;' value='Run' />
    </div>

    <!-- matchPhrase -->
    <div @click='handleQueryHeaderClick("matchPhraseQuery")'
      class='shop-adv-s-main-label pointer'>
      <span :class='getMatchPhraseQueryUpCss()'>
        <i class="fa fa-arrow-circle-up" aria-hidden="true"></i></span>
      <span :class='getMatchPhraseQueryDownCss()'>
        <i class="fa fa-arrow-circle-down" aria-hidden="true"></i></span>
      Match Phrase Query
    </div>
    <div
      :class='getMatchPhraseQueryCss()'
      class='shop-adv-s-query-panel md-form animated'>
      <!--div><span class="shop-adv-s-query-panel-label">Match Query</span></div-->
      <input type='text'
        class='form-control' placeholder='*(mandatory) text for the match-phrase-query'
        v-model='matchPhraseQuery.text'  >
      <input type='text'
        class='form-control' placeholder='size for the match-phrase-query (default: 10)'
        v-model='matchPhraseQuery.size'  >
      <input type='text'
        class='form-control' placeholder='slop for the match-phrase-query (default: 0)'
        v-model='matchPhraseQuery.slop'  >
      <div>
        <span class="shop-adv-s-query-panel-caption">field&nbsp;&nbsp;</span>
        <input type='radio' v-model='matchPhraseQuery.field'
          name='matchPhraseQueryRadioField' value='t_description' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">t_description</span>&nbsp;
        <input type='radio' v-model='matchPhraseQuery.field'
          name='matchPhraseQueryRadioField' value='s_brand_name' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">s_brand_name</span>
      </div>
      <div>
        <span class="shop-adv-s-query-panel-caption">highlight result?&nbsp;&nbsp;</span>
        <input type='radio' v-model='matchPhraseQuery.highlight'
          name='matchPhraseQueryRadioHighLight' value='yes' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">Yes</span>&nbsp;
        <input type='radio' v-model='matchPhraseQuery.highlight'
          name='matchPhraseQueryRadioHighLight' value='no' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">No</span>
      </div>
      <input type='button' class='btn btn-primary'
        @click='runMatchPhraseQuery()'
        style='margin-top: 12px; margin-left: 0px;' value='Run' />
    </div>

    <!-- multiMatch -->
    <div @click='handleQueryHeaderClick("multiMatchQuery")'
      class='shop-adv-s-main-label pointer'>
      <span :class='getMultiMatchQueryUpCss()'>
        <i class="fa fa-arrow-circle-up" aria-hidden="true"></i></span>
      <span :class='getMultiMatchQueryDownCss()'>
        <i class="fa fa-arrow-circle-down" aria-hidden="true"></i></span>
      Multi Match Query
    </div>
    <div
      :class='getMultiMatchQueryCss()'
      class='shop-adv-s-query-panel md-form animated'>
      <!--div><span class="shop-adv-s-query-panel-label">Match Query</span></div-->
      <input type='text'
        class='form-control' placeholder='*(mandatory) text for the multi-match-query'
        v-model='multiMatchQuery.text'  >
      <input type='text'
        class='form-control' placeholder='size for the multi-match-query (default: 10)'
        v-model='multiMatchQuery.size'  >
      <div>
        <span class="shop-adv-s-query-panel-caption">fields&nbsp;&nbsp;</span>
        <input type='checkbox' v-model='multiMatchQuery.fields'
          name='multiMatchQueryCheckboxField' value='t_description' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">t_description</span>&nbsp;
        <input type='checkbox' v-model='multiMatchQuery.fields'
          name='multiMatchQueryCheckboxField' value='s_brand_name' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">s_brand_name</span>
      </div>
      <div>
        <span class="shop-adv-s-query-panel-caption">highlight result?&nbsp;&nbsp;</span>
        <input type='radio' v-model='multiMatchQuery.highlight'
          name='mulitMatchQueryRadioHighLight' value='yes' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">Yes</span>&nbsp;
        <input type='radio' v-model='multiMatchQuery.highlight'
          name='mulitMatchQueryRadioHighLight' value='no' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">No</span>
      </div>
      <input type='button' class='btn btn-primary'
        @click='runMultiMatchQuery()'
        style='margin-top: 12px; margin-left: 0px;' value='Run' />
    </div>

    <!-- multiTerms -->
    <div @click='handleQueryHeaderClick("multiTermsQuery")'
      class='shop-adv-s-main-label pointer'>
      <span :class='getMultiTermsQueryUpCss()'>
        <i class="fa fa-arrow-circle-up" aria-hidden="true"></i></span>
      <span :class='getMultiTermsQueryDownCss()'>
        <i class="fa fa-arrow-circle-down" aria-hidden="true"></i></span>
      Multi Terms Query
    </div>
    <div
      :class='getMultiTermsQueryCss()'
      class='shop-adv-s-query-panel md-form animated'>
      <!--div><span class="shop-adv-s-query-panel-label">Match Query</span></div-->
      <input type='text'
        class='form-control' placeholder='*(mandatory) terms for the multi-terms-query (format => "term1", "term2")'
        v-model='multiTermsQuery.terms'  >
      <input type='text'
        class='form-control' placeholder='size for the multi-terms-query (default: 10)'
        v-model='multiTermsQuery.size'  >
      <div>
        <span class="shop-adv-s-query-panel-caption">field&nbsp;&nbsp;</span>
        <input type='radio' v-model='multiTermsQuery.field'
          name='multiTermsQueryRadioField' value='t_description' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">t_description</span>&nbsp;
        <input type='radio' v-model='multiTermsQuery.field'
          name='multiTermsQueryRadioField' value='s_brand_name' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">s_brand_name</span>
      </div>
      <div>
        <span class="shop-adv-s-query-panel-caption">highlight result?&nbsp;&nbsp;</span>
        <input type='radio' v-model='multiTermsQuery.highlight'
          name='mulitTermsQueryRadioHighLight' value='yes' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">Yes</span>&nbsp;
        <input type='radio' v-model='multiTermsQuery.highlight'
          name='mulitTermsQueryRadioHighLight' value='no' />&nbsp;
        <span class="shop-adv-s-query-panel-caption">No</span>
      </div>
      <input type='button' class='btn btn-primary'
        @click='runMultiTermsQuery()'
        style='margin-top: 12px; margin-left: 0px;' value='Run' />
    </div>

  </div>
</template>

<script>
function _model_shop_adv_search_panel(_inst) {
  return {
    'instance': _inst,
    'showingQueryPart': 'matchQuery',
    'matchQuery': {
      'shown': true,
      'text': '',
      'size': '',
      'field': 't_description',
      'operator': 'or',
      'minShouldMatch': '',
      'highlight': 'yes'
    },
    'matchPhraseQuery': {
      'shown': false,
      'text': '',
      'size': '',
      'field': 't_description',
      'slop': '',
      'highlight': 'yes'
    },
    'multiMatchQuery': {
      'shown': false,
      'text': '',
      'size': '',
      'fields': [ 't_description', 's_brand_name' ],
      'highlight': 'yes'
    },
    'multiTermsQuery': {
      'shown': false,
      'terms': '',
      'size': '',
      'field': 't_description',
      'highlight': 'yes'
    }
  };
} // end -- model

module.exports={
  name: 'shop_adv_search_panel',
  data: function() {
    return new _model_shop_adv_search_panel(this);
  },
  props:[],
  methods: {
    /**
     *  determine which query-part should be shown
     */
    handleQueryHeaderClick: function(_qPart) {
      this.showingQueryPart=_qPart;
      if ('matchQuery'==_qPart) {
        this.matchQuery.shown=!this.matchQuery.shown;
      } else if ('matchPhraseQuery'==_qPart) {
        this.matchPhraseQuery.shown=!this.matchPhraseQuery.shown;
      } else if ('multiMatchQuery'==_qPart) {
        this.multiMatchQuery.shown=!this.multiMatchQuery.shown;
      } else if ('multiTermsQuery'==_qPart) {
        this.multiTermsQuery.shown=!this.multiTermsQuery.shown;
      }
    },
    // reset all query parts' visibility
    resetAllQueryPartsVisibility: function() {
      this.matchQuery.shown=false;
      this.matchPhraseQuery.shown=false;
      this.multiMatchQuery.shown=false;
      this.multiTermsQuery.shown=false;
    },

    getMatchQueryCss: function() {
      let _css={};
      if (this.matchQuery.shown) {
        _css['showing']=true;
        _css['hiding']=false;
        _css['bounceInDown']=true;
      } else {
        _css['showing']=false;
        _css['hiding']=true;
      }
      return _css;
    },
    getMatchQueryUpCss: function() {
      let _css={};
      if (this.matchQuery.shown) {
        _css['showing-inline']=true;
        _css['hiding']=false;
      } else {
        _css['showing-inline']=false;
        _css['hiding']=true;
      }
      return _css;
    },
    getMatchQueryDownCss: function() {
      let _css={};
      if (this.matchQuery.shown) {
        _css['showing-inline']=false;
        _css['hiding']=true;
      } else {
        _css['showing-inline']=true;
        _css['hiding']=false;
      }
      return _css;
    },
    runMatchQuery: function() {
      this.resetAllQueryPartsVisibility();
      window.Vue.$emit('runMatchQuery', this.matchQuery);
    },

    getMatchPhraseQueryCss: function() {
      let _css={};
      if (this.matchPhraseQuery.shown) {
        _css['showing']=true;
        _css['hiding']=false;
        _css['bounceInDown']=true;
      } else {
        _css['showing']=false;
        _css['hiding']=true;
      }
      return _css;
    },
    getMatchPhraseQueryUpCss: function() {
      let _css={};
      if (this.matchPhraseQuery.shown) {
        _css['showing-inline']=true;
        _css['hiding']=false;
      } else {
        _css['showing-inline']=false;
        _css['hiding']=true;
      }
      return _css;
    },
    getMatchPhraseQueryDownCss: function() {
      let _css={};
      if (this.matchPhraseQuery.shown) {
        _css['showing-inline']=false;
        _css['hiding']=true;
      } else {
        _css['showing-inline']=true;
        _css['hiding']=false;
      }
      return _css;
    },
    runMatchPhraseQuery: function() {
      this.resetAllQueryPartsVisibility();
      window.Vue.$emit('runMatchPhraseQuery', this.matchPhraseQuery);
    },

    getMultiMatchQueryCss: function() {
      let _css={};
      if (this.multiMatchQuery.shown) {
        _css['showing']=true;
        _css['hiding']=false;
        _css['bounceInDown']=true;
      } else {
        _css['showing']=false;
        _css['hiding']=true;
      }
      return _css;
    },
    getMultiMatchQueryUpCss: function() {
      let _css={};
      if (this.multiMatchQuery.shown) {
        _css['showing-inline']=true;
        _css['hiding']=false;
      } else {
        _css['showing-inline']=false;
        _css['hiding']=true;
      }
      return _css;
    },
    getMultiMatchQueryDownCss: function() {
      let _css={};
      if (this.multiMatchQuery.shown) {
        _css['showing-inline']=false;
        _css['hiding']=true;
      } else {
        _css['showing-inline']=true;
        _css['hiding']=false;
      }
      return _css;
    },
    runMultiMatchQuery: function() {
      this.resetAllQueryPartsVisibility();
      window.Vue.$emit('runMultiMatchQuery', this.multiMatchQuery);
    },

    getMultiTermsQueryCss: function() {
      let _css={};
      if (this.multiTermsQuery.shown) {
        _css['showing']=true;
        _css['hiding']=false;
        _css['bounceInDown']=true;
      } else {
        _css['showing']=false;
        _css['hiding']=true;
      }
      return _css;
    },
    getMultiTermsQueryUpCss: function() {
      let _css={};
      if (this.multiTermsQuery.shown) {
        _css['showing-inline']=true;
        _css['hiding']=false;
      } else {
        _css['showing-inline']=false;
        _css['hiding']=true;
      }
      return _css;
    },
    getMultiTermsQueryDownCss: function() {
      let _css={};
      if (this.multiTermsQuery.shown) {
        _css['showing-inline']=false;
        _css['hiding']=true;
      } else {
        _css['showing-inline']=true;
        _css['hiding']=false;
      }
      return _css;
    },
    runMultiTermsQuery: function() {
      this.resetAllQueryPartsVisibility();
      window.Vue.$emit('runMultiTermsQuery', this.multiTermsQuery);
    }

  }
};
</script>
