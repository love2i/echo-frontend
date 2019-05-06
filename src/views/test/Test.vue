<template>
  <div>
    <p>{{$t('route.dashboard')}}</p>
    <el-button @click="changeLanguage">switch language</el-button>
    <p>title=>{{title}}</p>
    <div>
      <language-select></language-select>
    </div>
  </div>
</template>

<script>
  import LanguageSelect from '@/components/languageSelect'

  export default {
    name: 'Test',
    components: {LanguageSelect},
    computed: {
      title: function () {
        return this.$t('route.' + 'dashboard')
      }
    },
    methods: {
      changeLanguage() {
        this.$i18n.locale = this.$i18n.locale === 'en' ? 'zh_CN' : 'en'
        console.log('after change language=>', this.$i18n.locale)
      }
    }
  }

</script>