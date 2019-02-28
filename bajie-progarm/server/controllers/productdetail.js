const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {id} = ctx.request.query
    const detail = await mysql('products')
                         .select('products.*')
                         .where('id', id)
                       
    ctx.state.data =  detail
    console.log(detail)

}
