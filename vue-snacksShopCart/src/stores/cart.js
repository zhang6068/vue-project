import { defineStore } from "pinia";

// 仓库id 唯一cart
export const useCartStore=defineStore('cart',{
    state(){
        return{
            // 购物车数组，每一项是加入购物车的商品
            cartList:[]
        }
    },
    getters:{
        //选中商品总价
        totalPrice(state){
            let sum=0
            this.cartList.forEach(item=>{
                if(item.checked) sum+=item.price*item.count
            })
            return sum
        },
        //购物车商品总件数
        totalCount(state){
            let num=0
            this.cartList.forEach(item=>{
                num+=item.count
            })
            return num
        },
        //判断是不是全部勾选
        isAllChecked(state){
            if(this.cartList.length===0) return false
            return this.cartList.every(item=>item.checked)
        }
    },
    actions:{
        //商品加入购物车
        addGoods(goods){
            const findItem=this.cartList.find(item=>item.id===goods.id)

            //购物车已加过该商品
            if(findItem){
                 if(findItem.count<goods.stock){
                    findItem.count+=1
                 }
            }else{
                this.cartList.push(
                    {id:goods.id,
                    name:goods.name,
                    price:goods.price,
                    img:goods.img,
                    stock:goods.stock,
                    count:1,
                    checked:true//默认勾选
                    }
                )
            }
        },
        //修改单个商品数量
        changeCount(id,val){
            const target=this.cartList.find(item=>item.id===id)
            if (!target)return
            target.count=Math.max(1,Math.min(val,target.stock))
        },
        // 单个商品选中/取消选中
        toggleCheck(id){
           const findItem= this.cartList.find(item=>item.id===id)
           if(findItem){
            findItem.checked=!findItem.checked
            console.log(findItem.checked);
           }
        },
        //全选框点击
        toggleAllCheck(){
            const newCheck=!this.isAllChecked
            this.cartList.forEach(item=>item.checked=newCheck)
        },
        //删除一个商品
        delGoods(id){
           this.cartList= this.cartList.filter(item=>item.id!==id)
        },
        //结算:删掉所有选中的商品
        settle(){
            this.cartList=this.cartList.filter(item=>!item.checked)
        }
    },
    persist:true // 开启持久化！
}

)