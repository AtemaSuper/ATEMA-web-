<template>
  <v-app id="inspire">
    <!-- 基本情報 -->
    <div v-if="pageContents == 1">
      <v-alert v-if="errorList.length" type="error">
        {{errorList}}
      </v-alert>
      <v-row class="justify-start">
        <v-col cols="1" class="page-contents-title">基本情報</v-col>
        <v-col cols="10"></v-col>
        <v-col cols="1">
          <v-btn color="#ff6669" class="white--text" rounded @click="onTouchSave()">
            OK
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">会社名</v-col>
        <v-col cols="3">
          <v-text-field
            v-model="ownCompanyData.contactCompanyName"
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
            v-model="ownCompanyData.foundationYear"
            outlined
            :rules="companyYearRules"
            label="年"
            name="companyYear"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-text-field
            v-model="ownCompanyData.foundationMonth"
            outlined
            :rules="companyMonthRules"
            label="月"
            name="companyMonth"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-text-field
            v-model="ownCompanyData.foundationDay"
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
            v-model="ownCompanyData.leaderName"
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
            v-model="ownCompanyData.postNumber1"
            outlined
            :rules="postNumberFirstRules"
            name="postNumberFirst"
          ></v-text-field>
        </v-col>
        <div class="to-label">-</div>
        <v-col cols="2">
          <v-text-field
            v-model="ownCompanyData.postNumber2"
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
            v-model="ownCompanyData.address"
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
            v-model="ownCompanyData.telNumber1"
            outlined
            :rules="telNumberOneRules"
            name="telNumberOne"
          ></v-text-field>
        </v-col>
        <div class="to-label">-</div>
        <v-col cols="1">
          <v-text-field
            v-model="ownCompanyData.telNumber2"
            outlined
            :rules="telNumberTwoRules"
            name="telNumberTwo"
          ></v-text-field>
        </v-col>
        <div class="to-label">-</div>
        <v-col cols="1">
          <v-text-field
            v-model="ownCompanyData.telNumber3"
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
            v-model="ownCompanyData.selectWorkTypeList[0]"
            item-text="workTypeName"
            item-value="value"
            return-object
            :items="ownCompanyData.workTypeList"
            label="工種を選択してください。"
            solo
            name="workType"
          ></v-select>
          <v-select
            v-if="ownCompanyData.selectWorkTypeList.length >= 2"
            v-model="ownCompanyData.selectWorkTypeList[1]"
            item-text="workTypeName"
            item-value="value"
            return-object
            :items="ownCompanyData.workTypeList"
            label="工種を選択してください。"
            solo
            name="workType"
          ></v-select>
          <v-select
            v-if="ownCompanyData.selectWorkTypeList.length >= 3"
            v-model="ownCompanyData.selectWorkTypeList[2]"
            item-text="workTypeName"
            item-value="value"
            return-object
            :items="ownCompanyData.workTypeList"
            label="工種を選択してください。"
            solo
            name="workType"
          ></v-select>
          <v-select
            v-if="ownCompanyData.selectWorkTypeList.length >= 4"
            v-model="ownCompanyData.selectWorkTypeList[3]"
            item-text="workTypeName"
            item-value="value"
            return-object
            :items="ownCompanyData.workTypeList"
            label="工種を選択してください。"
            solo
            name="workType"
          ></v-select>
          <v-select
            v-if="ownCompanyData.selectWorkTypeList.length >= 5"
            v-model="ownCompanyData.selectWorkTypeList[4]"
            item-text="workTypeName"
            item-value="value"
            return-object
            :items="ownCompanyData.workTypeList"
            label="工種を選択してください。"
            solo
            name="workType"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="1">
          <v-btn
            v-if="ownCompanyData.selectWorkTypeList.length <= 4"
            color="#ff6669"
            class="white--text"
            fab
            @click="onTouchPlusBtn()"
          ><v-icon large>mdi-plus-thick</v-icon></v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn
            v-if="ownCompanyData.selectWorkTypeList.length != 1"
            color="#00ffd0"
            elevation="3"
            outlined
            fab
            @click="onTouchDeleteBtn()"
          ><v-icon large>mdi-delete-empty</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <!-- 勤怠情報 -->
    <div v-if="pageContents == 2">
      <v-row class="justify-start">
        <v-col cols="1" class="page-contents-title">勤怠情報</v-col>
        <v-col cols="10"></v-col>
        <v-col cols="1">
          <v-btn color="#ff6669" class="white--text" rounded>
            OK
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">通常業務時間</v-col>
        <v-col cols="1">
          <v-text-field
            v-model="ownCompanyData.normalWorkStartTime"
            outlined
            :rules="normalWorkHoursRules"
            name="normalWorkHours"
          ></v-text-field>
        </v-col>
        <div class="to-label">～</div>
        <v-col cols="1">
          <v-text-field
            v-model="ownCompanyData.normalWorkFinishTime"
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
            v-model="ownCompanyData.exceptionWorkStartTime"
            outlined
            :rules="exceptionWorkHoursRules"
            name="exceptionWorkHours"
          ></v-text-field>
        </v-col>
        <div class="to-label">～</div>
        <v-col cols="1">
          <v-text-field
            v-model="ownCompanyData.exceptionWorkFinishTime"
            outlined
            :rules="exceptionWorkMinutesRules"
            name="exceptionWorkMinutes"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">遅刻の発生</v-col>
        <v-col cols="3">
          <v-radio-group v-model="ownCompanyData.tardyTime" row>
            <v-radio
              label="1分から"
              value="0"
              color="#ff6669"
            ></v-radio>
            <v-radio
              label="0分から"
              value="1"
              color="#ff6669"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="2" class="item-label">丸め</v-col>
        <v-col cols="3">
          <v-radio-group v-model="ownCompanyData.roundingTime" row>
            <v-radio label="15分" value="0" color="#ff6669"></v-radio>
            <v-radio label="30分" value="1" color="#ff6669"></v-radio>
            <v-radio label="指定" value="2" color="#ff6669">
            </v-radio>
          </v-radio-group>
        </v-col>
        <v-col
          cols="1"
          class="item-label"
          v-if="ownCompanyData.roundingTime == '2'"
        >
          <v-text-field
            v-model="ownCompanyData.selectRoundingTime"
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
          <v-radio-group v-model="ownCompanyData.updownSelect" row>
            <v-radio label="切り上げ" value="0" color="#ff6669"></v-radio>
            <v-radio
              label="切り捨て"
              value="1"
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
      ownCompanyData: {},
      errorList: [],
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
        v => !!v || '通常業務時間(開始)は必須項目です。'
        // TODO HH:MM形式チェック
      ],
      normalWorkMinutesRules: [
        v => !!v || '通常業務時間(終了)は必須項目です。'
        // TODO HH:MM形式チェック
      ],
      exceptionWorkHoursRules: [
        v => !!v || '時間外業務時間(開始)は必須項目です。'
        // TODO HH:MM形式チェック
      ],
      exceptionWorkMinutesRules: [
        v => !!v || '時間外業務時間(終了)は必須項目です。'
        // TODO HH:MM形式チェック
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
  mounted: function () {
    // 自社設定の画面情報をとってきます。
    this.getOwnComapanyInfo()
  },
  methods: {
    // 初期表示処理です。
    async getOwnComapanyInfo () {
      // ※現在(2022/03/01)は、契約が一社のため、固定でIDを設定
      // ※複数社契約になった場合、セッションで契約IDを保持して、
      // ※そのIDをもとに検索するように修正
      let response = await Methods.getOwnComapanyInfo('68vFyGzOcf9lMn1F')
      this.ownCompanyData = response.data
    },
    // 工種プラスボタン押下時の処理です。
    onTouchPlusBtn () {
      this.ownCompanyData.selectWorkTypeList.push({})
    },
    // 工種削除ボタン押下時の処理です。
    onTouchDeleteBtn () {
      this.ownCompanyData.selectWorkTypeList.pop()
    },
    // 自社設定入力内容保存ボタン押下時の処理です。
    async onTouchSave () {
      // 基本情報の保存ボタン押下の場合
      if (this.pageContents === 1) {
        const param = {
          address: this.ownCompanyData.address,
          contactCompanyName: this.ownCompanyData.contactCompanyName,
          postNumber1: this.ownCompanyData.postNumber1,
          postNumber2: this.ownCompanyData.postNumber2,
          telNumber1: this.ownCompanyData.telNumber1,
          telNumber2: this.ownCompanyData.telNumber2,
          telNumber3: this.ownCompanyData.telNumber3,
          foundationDay: this.ownCompanyData.foundationDay,
          foundationMonth: this.ownCompanyData.foundationMonth,
          foundationYear: this.ownCompanyData.foundationYear,
          leaderName: this.ownCompanyData.leaderName
        }
        let response = await Methods.saveOwnCompanyInfo(param)
        this.saveResponse(response)
      // 勤怠情報の保存ボタン押下の場合
      } else {
        const param = {
          exceptionWorkFinishTime: this.ownCompanyData.exceptionWorkFinishTime,
          exceptionWorkStartTime: this.ownCompanyData.exceptionWorkStartTime,
          normalWorkFinishTime: this.ownCompanyData.normalWorkFinishTime,
          normalWorkStartTime: this.ownCompanyData.normalWorkStartTime,
          roundingTime: this.ownCompanyData.roundingTime,
          selectRoundingTime: this.ownCompanyData.selectRoundingTime,
          tardyTime: this.ownCompanyData.tardyTime,
          updownSelect: this.ownCompanyData.updownSelect
        }
        let response = await Methods.saveOwnCompanyInfo(param)
        this.saveResponse(response)
      }
    },
    // 保存処理後、画面側でメッセージを表示します。
    saveResponse (response) {
      this.errorList = response.data.errorList
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
