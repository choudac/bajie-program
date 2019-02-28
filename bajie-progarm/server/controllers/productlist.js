
const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    // const {id} = ctx.request.query
   
    const products = await mysql('products')
                         .select('products.*')   
    //返回 自增id， title， image，description 。    
    ctx.state.data = {
        list: products
    }

}

