page.login =  {
  name: 'page-login',
  // 声明 props - ↑ 相当于 接受传参 ↑ 看上面
  props: {
    // data:{
    //   type:[Object],
    //   default:[]
    // }
  },
  template: document.querySelector('#page-login').innerHTML,
  data : function(){
    return {
      msg:"测试"
    }
  },
  components: { },
  directives: {},
  filters: {},
  computed: {},
  watch: {
  },
  created:function(){

  },
  methods: {
     
  },
}