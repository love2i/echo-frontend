<template>
    <div>
        <h1>excel2</h1>
        <h2>you need permission to visit this page</h2>
        <div>
            <input type="file" @change="importFile($event.target)"/>
        </div>
        <div>
            <el-table :data="tableData">
                <el-table-column v-for="(foo,index) in tableHeaders.length"
                                 :key="index"
                                 :prop="tableHeaders[index]"
                                 :label="tableHeaders[index]">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  name: 'Excel2',
  data () {
    return {
      wb: '',
      tableData: [],
      tableHeaders: []
    }
  },
  methods: {
    importFile (obj) {
      if (!obj.files) {
        return
      }
      let file = obj.files[0]
      let type = file.name.split('.')[1]
      let fileTypes = ['xlsx', 'xls', 'xlm', 'xlc', 'xlt']
      if (!fileTypes.some(item => item === type)) {
        alert('文件格式错误')
        return
      }
      this.readSheet(file)
        .then(json => {
          this.tableData = json
          this.tableHeaders = Object.keys(json[0])
          console.log(this.tableData)
          console.log(this.tableHeaders)
        })
    },
    readSheet (file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = (e) => {
          let data = e.target.result
          this.wb = XLSX.read(data, {
            type: 'binary'
          })
          resolve(XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]]))
        }
        reader.readAsBinaryString(file)
      })
    }
  }
}
</script>

<style scoped>

</style>
