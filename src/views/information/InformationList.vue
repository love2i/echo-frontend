<template>
    <div class="wrapper">
        <el-table :data="filterList" v-loading="isLoading">
            <el-table-column
                v-for="(config,index) in tableConfig"
                :key="index"
                :sortable="config.sortable"
                :prop="config.prop"
                :label="config.label">
            </el-table-column>

            <el-table-column label="操作" align="right">
                <template slot="header" slot-scope="scope">
                    <el-input type="text"
                              size="mini"
                              v-model="search"
                              placeholder="search">
                    </el-input>
                </template>
                <template slot-scope="scope">
                    <el-button size="small" type="primary" plain @click="openDialog(scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination
                    background
                    :page-size="page.pageSize"
                    :page-count="page.pages"
                    :current-page="page.pageNum"
                    :total="page.total"
                    @current-change="handleChange"
                    layout="prev, pager, next">
            </el-pagination>
        </div>

        <div>
            <el-dialog :visible.sync="showDialog">
                <information-detail :detail="detail"></information-detail>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import InformationDetail from './InformationDetail'

    export default {
        name: 'Information',
        components: {
            InformationDetail
        },
        data() {
            return {
                isLoading: true,
                detail: {},
                showDialog: false,
                search: '',
                informationInfo: {},
                tableConfig: [
                        {
                    label: '标题',
                    prop: 'title',
                    sortable: false
                }, {
                    label: '内容',
                    prop: 'content',
                    sortable: false
                }, {
                    label: '发布时间',
                    prop: 'time',
                    sortable: true
                }, {
                    label: '发布人员',
                    prop: 'worker.name',
                    sortable: false
                }, {
                    label: '小区',
                    prop: 'zone',
                    sortable: false
                }, {
                    label: '楼号',
                    prop: 'building',
                    sortable: false
                }, {
                    label: '宿舍号',
                    prop: 'room',
                    sortable: false
                }],
                page:{
                    pageSize:10,
                    pages:1,
                    pageNum:1,
                    total:0
                },
            }
        },
        computed: {
            filterList: function () {
                if (!this.informationInfo.list) return []

                return this.informationInfo.list.filter(data => {
                    if (this.search === '') {
                        return true
                    } else {
                        return (
                            data.title.toLowerCase().includes(this.search.toLowerCase()) ||
                            data.content.toLowerCase().includes(this.search.toLowerCase()) ||
                            data.worker.name.toLowerCase().includes(this.search.toLowerCase())
                        )
                    }
                })
            }
        },
        methods: {
            getInformations() {
                this.$axios.get('https://api.echo.ituoniao.net/api/web/information/getAllInformations?pageNum='+this.page.pageNum+'&pageSize='+this.page.pageSize)
                    .then(res => {
                        if (res.success){
                            this.informationInfo = res.data
                            this.page.pages=res.data.pages
                            this.page.pageNum=res.data.pageNum
                            this.page.pageSize=res.data.pageSize
                            this.page.total=res.data.total
                        }
                        else{
                            this.$message.error('获取信息列表出错')
                        }
                    })
                    .then(() => {
                        this.isLoading = false
                    })
                    .catch((err) => {
                        console.error(err)
                        this.isLoading = false
                    })
            },
            handleChange(val) {
                this.page.pageNum=val
                this.isLoading = true
                this.getInformations()
            },
            openDialog(data) {
                this.detail = data
                this.showDialog = true
            }
        },
        mounted() {
            this.getInformations()
        }
    }
</script>

<style scoped>
    .wrapper {

    }
</style>
