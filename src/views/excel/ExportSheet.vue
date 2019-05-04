<template>
    <div>
        <table style="border: 1px">
            <tr>
                <th>name</th>
                <th>city</th>
            </tr>
            <tr v-for="item in data">
                <td>{{item.name}}</td>
                <td>{{item.city}}</td>
            </tr>
        </table>
        <el-button @click="handleDownload" type="primary">download</el-button>
    </div>
</template>

<script>
import { GET_ALL_INFORMATIONS } from '../../apis/information'
import XLSX from 'xlsx'

export default {
  name: 'Excel',
  data () {
    return {
      data: [
        { 'name': 'John', 'city': 'Seattle' },
        { 'name': 'Mike', 'city': 'Los Angeles' },
        { 'name': 'Zach', 'city': 'New York' }
      ]
    }
  },
  methods: {
    handleDownload () {
      // GET_ALL_INFORMATIONS()
      //     .then(res=>{
      //         this.data=res.data.list
      //     })
      //     .then(()=>{
      //         this.writeSheet()
      //     })
      this.writeSheet()
    },
    writeSheet () {
      /* make the worksheet */
      var ws = XLSX.utils.json_to_sheet(this.data)

      /* add to workbook */
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'People')

      /* generate an XLSX file */
      XLSX.writeFile(wb, 'sheetjs.xlsx')
    }
  }
}
</script>

<style scoped>

</style>
