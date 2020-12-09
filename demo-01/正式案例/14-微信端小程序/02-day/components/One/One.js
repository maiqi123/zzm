// components/One/One.js
Component({

  // 配置允许使用多个slot - 具名
  options : {
    multipleSlots : true
  },

  /**
   * 1.  外部传进来的数据   ( 类似 vue 里面的 props ) 
   */
  properties: {

  },

  /**
   * 2.  组件的内部私有数据
   */
  data: {
    name : '张三',
    obj : {
      age : 20
    }
  },

  /**
   * 3. 组件的方法
   */
  methods: {
      // 更新数据
      update(){
        
        //1. 先 把对象拿出来
        const { obj } = this.data

        //2. 把 age => 30
        obj.age = 30

        this.setData({
          name :'李四',
          obj
        })
      }
  },
  /**
   * 4. 监听器
   */
  observers : {
     // 监听 name
     name(newVal){
       console.log('name的新值:',newVal);
     },
     // 监听对象
     obj(newVal){
       console.log('对象的新值',newVal);       
     },
     // 监听 对象里面的属性
     'obj.age'(newVal){
        console.log('年龄的新值',newVal);
     }
  }
})
