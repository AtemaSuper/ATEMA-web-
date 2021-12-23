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
            :rules="[rules.required]"
            name="input-10-2"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">設立</v-col>
        <v-col cols="1">
          <v-text-field outlined label="年"></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-text-field outlined label="月"></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-text-field outlined label="日"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">代表者</v-col>
        <v-col cols="3">
          <v-text-field outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">郵便番号</v-col>
        <v-col cols="1">
          <v-text-field outlined></v-text-field>
        </v-col>
        <div class="to-label">-</div>
        <v-col cols="2">
          <v-text-field outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">住所</v-col>
        <v-col cols="3">
          <v-text-field outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">電話番号</v-col>
        <v-col cols="1">
          <v-text-field outlined></v-text-field>
        </v-col>
        <div class="to-label">-</div>
        <v-col cols="1">
          <v-text-field outlined></v-text-field>
        </v-col>
        <div class="to-label">-</div>
        <v-col cols="1">
          <v-text-field outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">工種</v-col>
        <v-col cols="3">
          <v-select :items="items" label="Solo field" solo></v-select>
          <v-btn class="mx-2" fab dark color="indigo">
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
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
          <v-text-field outlined></v-text-field>
        </v-col>
        <div class="to-label">～</div>
        <v-col cols="1">
          <v-text-field outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">時間外業務時間</v-col>
        <v-col cols="1">
          <v-text-field outlined></v-text-field>
        </v-col>
        <div class="to-label">～</div>
        <v-col cols="1">
          <v-text-field outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label">遅刻の発生</v-col>
        <v-col cols="3">
          <v-radio-group v-model="tardyTime" row>
            <v-radio label="1分から" value="1-minutes"></v-radio>
            <v-radio label="0分から" value="0-minutes"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row class="border"></v-row>
      <v-row>
        <v-col cols="2" class="item-label">丸め</v-col>
        <v-col cols="3">
          <v-radio-group v-model="roundingTime" row>
            <v-radio label="15分" value="15-minutes"></v-radio>
            <v-radio label="30分" value="30-minutes"></v-radio>
            <v-radio label="指定" value="other-minutes"> </v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="1" class="item-label" v-if="roundingTime == 'other-minutes'">
          <v-text-field outlined label="分"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="item-label"></v-col>
        <v-col cols="3">
          <v-radio-group v-model="roundTime" row>
            <v-radio label="切り上げ" value="half-up"></v-radio>
            <v-radio label="切り捨て" value="half-down"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row class="border"></v-row>
    </div>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      radioGroup: 1,
      tardyTime: '1-minutes',
      roundingTime: '15-minutes',
      roundTime: 'half-up',
      showContents: 1,
      rules: {
        required: value => !!value || '入力必須です。',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`)
      }
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

.border {
  border-bottom: 1px solid #ccc;
}
</style>
