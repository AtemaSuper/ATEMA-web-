<template>
  <v-app id="inspire">
    <!-- 基本情報 -->
    <div v-if="pageContents == 1">
      <v-row class="justify-start">
        <v-col cols="1" class="page-contents-title">基本情報</v-col>
        <v-col cols="10"></v-col>
        <v-col cols="1">
          <v-btn color="#ff6669" class="white--text" rounded @click="testf()">
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
            label="(例)株式会社ATEMA"
            :rules="companyRules"
            name="companyName"
            maxlength="100"
            clearable
            clear-icon="mdi-close-circle"
            required
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
            maxlength="4"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-text-field
            v-model="ownCompanyData.foundationMonth"
            outlined
            :rules="companyMonthRules"
            label="月"
            name="companyMonth"
            maxlength="2"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-text-field
            v-model="ownCompanyData.foundationDay"
            outlined
            :rules="companyDayRules"
            label="日"
            name="companyDay"
            maxlength="2"
          ></v-text-field>
        </v-col>
        <v-col cols="2" sm="3" md="3"
          ><v-menu
            ref="foundationMenu"
            v-model="foundationMenu"
            :close-on-content-click="false"
            :return-value.sync="foundation"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="foundation"
                :rules="foundationRules"
                label="日付を選択"
                placeholder="まず20XX年X月をクリック"
                prepend-inner-icon="mdi-calendar"
                readonly
                outlined
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="foundation"
              no-title
              scrollable
              locale="jp-ja"
              :day-format="(date) => new Date(date).getDate()"
            >
              <v-btn
                color="#ff6669"
                class="white--text"
                rounded
                @click="$refs.foundationMenu.save(foundation)"
              >
                OK
              </v-btn>
              <v-btn class="#f5f5f5" rounded @click="foundationMenu = false">
                キャンセル
              </v-btn>
            </v-date-picker>
          </v-menu>
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
            label="(例)宛間太郎"
            maxlength="50"
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
            label="123"
            maxlength="3"
          ></v-text-field>
        </v-col>
        <div class="to-label">-</div>
        <v-col cols="2">
          <v-text-field
            v-model="ownCompanyData.postNumber2"
            outlined
            :rules="postNumberLastRules"
            name="postNumberLast"
            label="4567"
            maxlength="4"
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
            label="(例)千葉県宛間市宛間123-4"
            maxlength="100"
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
            label="090"
            maxlength="4"
          ></v-text-field>
        </v-col>
        <div class="to-label">-</div>
        <v-col cols="1">
          <v-text-field
            v-model="ownCompanyData.telNumber2"
            outlined
            :rules="telNumberTwoRules"
            name="telNumberTwo"
            label="1234"
            maxlength="4"
          ></v-text-field>
        </v-col>
        <div class="to-label">-</div>
        <v-col cols="1">
          <v-text-field
            v-model="ownCompanyData.telNumber3"
            outlined
            :rules="telNumberThreeRules"
            name="telNumberThree"
            label="5678"
            maxlength="4"
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
            ><v-icon large>mdi-plus-thick</v-icon></v-btn
          >
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
          <v-btn
            color="#ff6669"
            class="white--text"
            rounded
            @click="onTouchSave()"
          >
            OK
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">通常業務時間</v-col>
        <v-col cols="1">
          <v-select
            v-model="ownCompanyData.normalWorkStartHours"
            outlined
            :rules="normalWorkStartHoursRules"
            :items="hoursList"
            name="normalWorkStartHours"
            label="時"
          ></v-select>
        </v-col>
        <div class="to-label">：</div>
        <v-col cols="1">
          <v-select
            v-model="ownCompanyData.normalWorkStartMinutes"
            outlined
            :rules="normalWorkStartMinutesRules"
            :items="minutesList"
            name="normalWorkStartMinutes"
            label="分"
          ></v-select>
        </v-col>
        <div class="to-label">～</div>
        <v-col cols="1">
          <v-select
            v-model="ownCompanyData.normalWorkFinishHours"
            outlined
            :rules="normalWorkFinishHoursRules"
            :items="hoursList"
            name="normalWorkFinishHours"
            label="時"
          ></v-select>
        </v-col>
        <div class="to-label">：</div>
        <v-col cols="1">
          <v-select
            v-model="ownCompanyData.normalWorkFinishMinutes"
            outlined
            :rules="normalWorkFinishMinutesRules"
            :items="minutesList"
            name="normalWorkFinishMinutes"
            label="分"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">時間外業務時間</v-col>
        <v-col cols="1">
          <v-select
            v-model="ownCompanyData.exceptionWorkStartHours"
            outlined
            :rules="exceptionWorkStartHoursRules"
            :items="hoursList"
            name="exceptionWorkStartHours"
            label="時"
          ></v-select>
        </v-col>
        <div class="to-label">：</div>
        <v-col cols="1">
          <v-select
            v-model="ownCompanyData.exceptionWorkStartMinutes"
            outlined
            :rules="exceptionWorkStartMinutesRules"
            :items="minutesList"
            name="exceptionWorkStartMinutes"
            label="分"
          ></v-select>
        </v-col>
        <div class="to-label">～</div>
        <v-col cols="1">
          <v-select
            v-model="ownCompanyData.exceptionWorkFinishHours"
            outlined
            :rules="exceptionWorkFinishHoursRules"
            :items="hoursList"
            name="exceptionWorkFinishHours"
            label="時"
          ></v-select>
        </v-col>
        <div class="to-label">：</div>
        <v-col cols="1">
          <v-select
            v-model="ownCompanyData.exceptionWorkFinishMinutes"
            outlined
            :rules="exceptionWorkFinishMinutesRules"
            :items="minutesList"
            name="exceptionWorkFinishMinutes"
            label="分"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">遅刻の発生</v-col>
        <v-col cols="3">
          <v-radio-group v-model="ownCompanyData.tardyTime" row>
            <v-radio label="1分から" value="0" color="#ff6669"></v-radio>
            <v-radio label="0分から" value="1" color="#ff6669"></v-radio>
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
            <v-radio label="指定" value="2" color="#ff6669"> </v-radio>
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
            <v-radio label="切り捨て" value="1" color="#ff6669"></v-radio>
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
      hoursList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
      minutesList: ['00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
      errorList: [],
      tardyTime: '1-minutes',
      roundingTime: '15-minutes',
      roundTime: 'half-up',
      foundationMenu: false,
      foundationName: '',
      foundationRules: [
        v => !!v || '設立が未選択です'
      ],
      companyRules: [
        v => !!v || '会社名が未入力です',
        v => (v && v.length <= 100) || '文字数は100文字以内です'
      ],
      presidentRules: [
        v => !!v || '代表者が未入力です',
        v => (v && v.length <= 50) || '文字数は50文字以内です'
      ],
      postNumberFirstRules: [
        v => !!v || '郵便番号1が未入力です',
        v => (v && v.length <= 3) || '文字数は3文字以内です',
        v => /^[0-9]*$/.test(v) || '郵便番号1の入力は半角数字のみです'
      ],
      postNumberLastRules: [
        v => !!v || '郵便番号2が未入力です',
        v => (v && v.length <= 4) || '文字数は4文字以内です',
        v => /^[0-9]*$/.test(v) || '郵便番号2の入力は半角数字のみです'
      ],
      addressRules: [
        v => !!v || '住所が未入力です',
        v => (v && v.length <= 100) || '文字数は100文字以内です'
      ],
      telNumberOneRules: [
        v => !!v || '電話番号1が未入力です',
        v => (v && v.length <= 4) || '文字数は4文字以内です',
        v => /^[0-9]*$/.test(v) || '電話番号1の入力は半角数字のみです'
      ],
      telNumberTwoRules: [
        v => !!v || '電話番号2が未入力です',
        v => (v && v.length <= 4) || '文字数は4文字以内です',
        v => /^[0-9]*$/.test(v) || '電話番号2の入力は半角数字のみです'
      ],
      telNumberThreeRules: [
        v => !!v || '電話番号3が未入力です',
        v => (v && v.length <= 4) || '文字数は4文字以内です',
        v => /^[0-9]*$/.test(v) || '電話番号3の入力は半角数字のみです'
      ],
      normalWorkHoursRules: [
        v => !!v || '通常業務時間(時)が未入力です',
        v => (v && v.length <= 2) || '文字数は2文字以内です',
        v => /^[0-9]*$/.test(v) || '通常業務時間(時)の入力は半角数字のみです'
      ],
      normalWorkMinutesRules: [
        v => !!v || '通常業務時間(分)が未入力です',
        v => (v && v.length <= 2) || '文字数は2文字以内です',
        v => /^[0-9]*$/.test(v) || '通常業務時間(分)の入力は半角数字のみです'
      ],
      exceptionWorkHoursRules: [
        v => !!v || '時間外業務時間(時)が未入力です',
        v => (v && v.length <= 2) || '文字数は2文字以内です',
        v => /^[0-9]*$/.test(v) || '時間外業務時間(時)の入力は半角数字のみです'
      ],
      exceptionWorkMinutesRules: [
        v => !!v || '時間外業務時間(分)が未入力です',
        v => (v && v.length <= 2) || '文字数は2文字以内です',
        v => /^[0-9]*$/.test(v) || '時間外業務時間(分)の入力は半角数字のみです'
      ],
      roundingTimeRules: [
        v => !!v || '丸めで指定選択時、指定時間(分)が未入力です',
        v => (v && v.length <= 2) || '文字数は2文字以内です',
        v => /^[0-9]*$/.test(v) || '丸めで指定選択時、指定時間(分)の入力は半角数字のみです'
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
          pageContents: this.pageContents,
          objectId: this.ownCompanyData.objectId,
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
          leaderName: this.ownCompanyData.leaderName,
          selectWorkTypeList: this.ownCompanyData.selectWorkTypeList
        }
        let response = await Methods.saveOwnCompanyInfo(param)
        this.saveResponse(response)
      // 勤怠情報の保存ボタン押下の場合
      } else {
        const param = {
          pageContents: this.pageContents,
          objectId: this.ownCompanyData.objectId,
          exceptionWorkStartTime: this.ownCompanyData.exceptionWorkStartHours + '：' + this.ownCompanyData.exceptionWorkStartMinutes,
          exceptionWorkFinishTime: this.ownCompanyData.exceptionWorkFinishHours + '：' + this.ownCompanyData.exceptionWorkFinishMinutes,
          normalWorkStartTime: this.ownCompanyData.normalWorkStartHours + '：' + this.ownCompanyData.normalWorkStartMinutes,
          normalWorkFinishTime: this.ownCompanyData.normalWorkFinishHours + '：' + this.ownCompanyData.normalWorkFinishMinutes,
          roundingTime: this.ownCompanyData.roundingTime,
          selectRoundingTime: this.ownCompanyData.selectRoundingTime,
          tardyTime: this.ownCompanyData.tardyTime,
          updownSelect: this.ownCompanyData.updownSelect
        }
        let response = await Methods.saveOwnCompanyInfo(param)
        this.saveResponse(response)
      }
    },
    testf () {
      var responseData = {}
      this.$emit('alertMethod', responseData)
    },
    // 保存処理後、画面側でメッセージを表示します。
    saveResponse (response) {
      var data = response.data
      this.$emit('alertMethod', data)
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
