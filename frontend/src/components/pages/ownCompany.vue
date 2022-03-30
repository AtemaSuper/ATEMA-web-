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
                color="#ff6669" class="white--text" rounded
                @click="
                  $refs.foundationMenu.save(
                    foundation
                  )
                "
              >
                OK
              </v-btn>
              <v-btn
                  class="#f5f5f5" rounded
                @click="foundationMenu = false"
              >
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
            label="時"
            maxlength="2"
          ></v-text-field>
        </v-col>
        <div class="to-label">～</div>
        <v-col cols="1">
          <v-text-field
            outlined
            :rules="normalWorkMinutesRules"
            name="normalWorkMinutes"
            label="分"
            maxlength="2"
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
            label="時"
            maxlength="2"
          ></v-text-field>
        </v-col>
        <div class="to-label">～</div>
        <v-col cols="1">
          <v-text-field
            outlined
            :rules="exceptionWorkMinutesRules"
            name="exceptionWorkMinutes"
            label="分"
            maxlength="2"
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
export default {
  name: 'OwnCompany',
  props: ['showContents'],
  data () {
    return {
      radioGroup: 1,
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
  methods: {}
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
