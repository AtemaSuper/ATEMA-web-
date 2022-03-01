<template>
  <v-app id="inspire">
    <!-- 基本情報 -->
    <div v-if="pageContents == 1">
      <v-row class="justify-start">
        <v-col cols="1" class="page-contents-title">基本情報</v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">会社名</v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            :rules="companyRules"
            name="companyName"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">設立</v-col>
        <v-col cols="1">
          <v-text-field
            outlined
            :rules="companyYearRules"
            label="年"
            name="companyYear"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-text-field
            outlined
            :rules="companyMonthRules"
            label="月"
            name="companyMonth"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-text-field
            outlined
            :rules="companyDayRules"
            label="日"
            name="companyDay"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">代表者</v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            :rules="presidentRules"
            name="president"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">郵便番号</v-col>
        <v-col cols="1">
          <v-text-field
            outlined
            :rules="postNumberFirstRules"
            name="postNumberFirst"
          ></v-text-field>
        </v-col>
        <div class="to-label">-</div>
        <v-col cols="2">
          <v-text-field
            outlined
            :rules="postNumberLastRules"
            name="postNumberLast"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">住所</v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            :rules="addressRules"
            name="address"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">電話番号</v-col>
        <v-col cols="1">
          <v-text-field
            outlined
            :rules="telNumberOneRules"
            name="telNumberOne"
          ></v-text-field>
        </v-col>
        <div class="to-label">-</div>
        <v-col cols="1">
          <v-text-field
            outlined
            :rules="telNumberTwoRules"
            name="telNumberTwo"
          ></v-text-field>
        </v-col>
        <div class="to-label">-</div>
        <v-col cols="1">
          <v-text-field
            outlined
            :rules="telNumberThreeRules"
            name="telNumberThree"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">工種</v-col>
        <v-col cols="3">
          <v-select
            :items="items"
            label="工種を選択してください。"
            solo
            name="workType"
          ></v-select>
          <v-btn color="#ff6669" class="white--text" fab
            ><v-icon large>mdi-plus-thick</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </div>
    <!-- 勤怠情報 -->
    <div v-if="pageContents == 2">
      <v-row class="justify-start">
        <v-col cols="1" class="page-contents-title">勤怠情報</v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">通常業務時間</v-col>
        <v-col cols="1">
          <v-text-field
            outlined
            :rules="normalWorkHoursRules"
            name="normalWorkHours"
          ></v-text-field>
        </v-col>
        <div class="to-label">～</div>
        <v-col cols="1">
          <v-text-field
            outlined
            :rules="normalWorkMinutesRules"
            name="normalWorkMinutes"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">時間外業務時間</v-col>
        <v-col cols="1">
          <v-text-field
            outlined
            :rules="exceptionWorkHoursRules"
            name="exceptionWorkHours"
          ></v-text-field>
        </v-col>
        <div class="to-label">～</div>
        <v-col cols="1">
          <v-text-field
            outlined
            :rules="exceptionWorkMinutesRules"
            name="exceptionWorkMinutes"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">遅刻の発生</v-col>
        <v-col cols="3">
          <v-radio-group v-model="tardyTime" row>
            <v-radio
              label="1分から"
              value="1-minutes"
              color="#ff6669"
            ></v-radio>
            <v-radio
              label="0分から"
              value="0-minutes"
              color="#ff6669"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="2" class="item-label">丸め</v-col>
        <v-col cols="3">
          <v-radio-group v-model="roundingTime" row>
            <v-radio label="15分" value="15-minutes" color="#ff6669"></v-radio>
            <v-radio label="30分" value="30-minutes" color="#ff6669"></v-radio>
            <v-radio label="指定" value="other-minutes" color="#ff6669">
            </v-radio>
          </v-radio-group>
        </v-col>
        <v-col
          cols="1"
          class="item-label"
          v-if="roundingTime == 'other-minutes'"
        >
          <v-text-field
            outlined
            label="分"
            :rules="roundingTimeRules"
            name="roundingTime"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label"></v-col>
        <v-col cols="3">
          <v-radio-group v-model="roundTime" row>
            <v-radio label="切り上げ" value="half-up" color="#ff6669"></v-radio>
            <v-radio
              label="切り捨て"
              value="half-down"
              color="#ff6669"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
  </v-app>
</template>

<script>
/** 外部コンポーネントの呼び出し */
import Methods from '@/api/methods'

export default {
  name: 'OwnCompany',
  props: ['showContents'],
  data () {
    return {
      radioGroup: 1,
      tardyTime: '1-minutes',
      roundingTime: '15-minutes',
      roundTime: 'half-up',
      companyRules: [
        v => !!v || '会社名は必須項目です。',
        v => (v && v.length <= 100) || '会社名は100文字以内で入力してください。'
      ],
      companyYearRules: [
        v => !!v || '設立(年)は必須項目です。',
        v => (v && v.length <= 4) || '設立(年)は4文字以内で入力してください。',
        v => /[0-9]/.test(v) || '設立(年)は半角数字のみ入力してください。'
      ],
      companyMonthRules: [
        v => !!v || '設立(月)は必須項目です。',
        v => (v && v.length <= 4) || '設立(月)は4文字以内で入力してください。',
        v => /[0-9]/.test(v) || '設立(月)は半角数字のみ入力してください。'
      ],
      companyDayRules: [
        v => !!v || '設立(日)は必須項目です。',
        v => (v && v.length <= 4) || '設立(日)は4文字以内で入力してください。',
        v => /[0-9]/.test(v) || '設立(月)は半角数字のみ入力してください。'
      ],
      presidentRules: [
        v => !!v || '代表者は必須項目です。',
        v => (v && v.length <= 100) || '代表者は100文字以内で入力してください。'
      ],
      postNumberFirstRules: [
        v => !!v || '郵便番号1は必須項目です。',
        v => (v && v.length <= 3) || '郵便番号1は3文字以内で入力してください。',
        v => /[0-9]/.test(v) || '郵便番号1は半角数字のみ入力してください。'
      ],
      postNumberLastRules: [
        v => !!v || '郵便番号2は必須項目です。',
        v => (v && v.length <= 4) || '郵便番号2は4文字以内で入力してください。',
        v => /[0-9]/.test(v) || '郵便番号2は半角数字のみ入力してください。'
      ],
      addressRules: [
        v => !!v || '住所は必須項目です。',
        v => (v && v.length <= 100) || '住所は100文字以内で入力してください。'
      ],
      telNumberOneRules: [
        v => !!v || '電話番号1は必須項目です。',
        v => (v && v.length <= 4) || '電話番号1は4文字以内で入力してください。',
        v => /[0-9]/.test(v) || '電話番号1は半角数字のみ入力してください。'
      ],
      telNumberTwoRules: [
        v => !!v || '電話番号2は必須項目です。',
        v => (v && v.length <= 4) || '電話番号2は4文字以内で入力してください。',
        v => /[0-9]/.test(v) || '電話番号2は半角数字のみ入力してください。'
      ],
      telNumberThreeRules: [
        v => !!v || '電話番号3は必須項目です。',
        v => (v && v.length <= 4) || '電話番号3は4文字以内で入力してください。',
        v => /[0-9]/.test(v) || '電話番号3は半角数字のみ入力してください。'
      ],
      normalWorkHoursRules: [
        v => !!v || '通常業務時間(時)は必須項目です。',
        v => (v && v.length <= 2) || '通常業務時間(時)は2文字以内で入力してください。',
        v => /[0-9]/.test(v) || '通常業務時間(時)は半角数字のみ入力してください。'
      ],
      normalWorkMinutesRules: [
        v => !!v || '通常業務時間(分)は必須項目です。',
        v => (v && v.length <= 2) || '通常業務時間(分)は2文字以内で入力してください。',
        v => /[0-9]/.test(v) || '通常業務時間(分)は半角数字のみ入力してください。'
      ],
      exceptionWorkHoursRules: [
        v => !!v || '時間外業務時間(時)は必須項目です。',
        v => (v && v.length <= 2) || '時間外業務時間(時)は2文字以内で入力してください。',
        v => /[0-9]/.test(v) || '時間外業務時間(時)は半角数字のみ入力してください。'
      ],
      exceptionWorkMinutesRules: [
        v => !!v || '時間外業務時間(分)は必須項目です。',
        v => (v && v.length <= 2) || '時間外業務時間(分)は2文字以内で入力してください。',
        v => /[0-9]/.test(v) || '時間外業務時間(分)は半角数字のみ入力してください。'
      ],
      roundingTimeRules: [
        v => !!v || '丸めで指定選択時、指定時間(分)は必須項目です。',
        v => (v && v.length <= 2) || '丸めで指定選択時、指定時間(分)は2文字以内で入力してください。',
        v => /[0-9]/.test(v) || '丸めで指定選択時、指定時間(分)は半角数字のみ入力してください。'
      ]
    }
  },
  components: {},
  computed: {
    // 表示するページコンテンツを切り替えます。
    pageContents: {
      get: function () {
        return this.showContents
      },
      set: function (val) {
        this.showContents = val
      }
    }
  },
  methods: {
    // 初期表示時のデータを取得します。
    async getOwnComapanyInfo () {
      let response = await Methods.testNcmb()
      console.log(response)
    }
  }
}

</script>

<style scoped>
.item-label {
  text-align: left;
}
.page-contents-title {
  font-weight: 600;
}

.to-label {
  line-height: 80px;
}
</style>
