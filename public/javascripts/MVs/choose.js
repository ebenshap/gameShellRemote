ChooseView = Backbone.View.extend({
  
  initialize:function(options){
    this.vent = options.vent
    console.log('adsf')
    _.bindAll(this, 'showPage')
    this.vent.bind('showPage', this.showPage)
  },
  
  el:'#choose',
  events:{
    'click button':'joinGame'
  },
  
  joinGame:function(){
    console.log('hellooo')
    this.vent.trigger('joinGame')
  },
  
  showPage:function(value){
    if(value == 'choose'){
      this.$el.show()
    }else{
      this.$el.hide()
    }
  }
  
  
})