<template>
  <div @mousedown="move" class="main" :style="{top:positionY + 'px',left:positionX + 'px'}">
    <i class="cart-size iconfont icon-float-basket">
      <span class="badge">
        <i>12</i>
      </span>
    </i>
  </div>
</template>
<style scoped>
.main {
  position: fixed;
  top: 10px;
  right: 10px;
  cursor: move;
  z-index: 1000;
  width: 80px;
  height: 80px;
}
.cart-size {
  position: relative;
  font-size: 80px;
  padding: 20px;
  color: red;
}
.badge {
  display: inline-block;
  position: absolute;
  top: -15px;
  right: -15px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: #e6a23c;
}
.badge i {
  position: absolute;
  font-weight: 800;
  font-size: 16px;
  top: 6px;
  left: 4px;
  color: #fff;
}
.show-cart-list {
  position: absolute;
  right: 15px;
  border: 30px solid transparent;
  border-top: 5px solid #dcdfe6;
  cursor: pointer;
}
</style>
<script>
export default {
  data() {
    return {
      positionX: 20,
      positionY: 50
    };
  },
  methods: {
    move(e) {
      let odiv = e.target; //获取目标元素

      let lastX = 0;
      let lastY = 0;

      document.onmousemove = e => {
        //鼠标按下并移动的事件

        this.positionY = e.clientY-30;
        this.positionX = e.clientX -30;
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
};
</script>

