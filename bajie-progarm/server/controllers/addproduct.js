
const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    const {openid, title, image, description} = ctx.request.body
    console.log(openid, title, image, description)
    try {
        await mysql('products').insert({openid, title, image, description})
        ctx.state.data = {
            msg: 'success'
        }
    } catch(e){
        ctx.state = {
            code: -1,
            data: {
                msg:'评论失败：' +e.sqlMessage
            }
        }
    }
}


