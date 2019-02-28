<script>
import {get} from './util'

export default {
  async created () {
    const res = await get('/weapp/productlist')
    console.log(123, res)
  }
}
</script>

<style>

</style>
